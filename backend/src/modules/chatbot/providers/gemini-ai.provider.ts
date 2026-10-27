import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import { AiProvider, AiPromptContext } from './ai-provider.interface';
import { ErrorCode } from '../../../common/constants/error-codes.enum';

function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMsg: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(errorMsg)), timeoutMs),
    ),
  ]);
}

@Injectable()
export class GeminiAiProvider implements AiProvider {
  readonly providerName = 'gemini';
  private readonly logger = new Logger(GeminiAiProvider.name);

  async generateResponse(context: AiPromptContext): Promise<string> {
    const apiKey = process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_AI_NOT_CONFIGURED,
          message: 'Server chưa cấu hình AI_API_KEY',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const modelName = process.env.AI_MODEL || 'gemini-3.5-flash';
    const timeoutMs = Number(process.env.AI_TIMEOUT_MS) || 40000;
    const maxTokens = Number(process.env.AI_MAX_OUTPUT_TOKENS) || 4096;

    const ai = new GoogleGenAI({ apiKey });

    // Định dạng lịch sử hội thoại thành contents theo chuẩn GoogleGenAI
    const rawTurns: Array<{ role: string; parts: Array<{ text: string }> }> = [];

    if (context.history && context.history.length > 0) {
      for (const turn of context.history) {
        if (turn.parts && turn.parts.trim()) {
          rawTurns.push({
            role: turn.role,
            parts: [{ text: turn.parts.trim() }],
          });
        }
      }
    }

    rawTurns.push({
      role: 'user',
      parts: [{ text: context.userMessage.trim() }],
    });

    // Chuẩn hóa contents đảm bảo vai trò user và model bắt buộc xen kẽ nhau (chuẩn GoogleGenAI multiturn)
    const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
    for (const item of rawTurns) {
      if (contents.length === 0) {
        if (item.role === 'user') {
          contents.push(item);
        }
      } else {
        const last = contents[contents.length - 1];
        if (last.role !== item.role) {
          contents.push(item);
        } else {
          // Nếu trùng vai trò liên tiếp, gộp nội dung thay vì gửi 2 lượt cùng role
          last.parts[0].text += `\n${item.parts[0].text}`;
        }
      }
    }

    // Đảm bảo lượt cuối cùng luôn là user
    if (contents.length === 0 || contents[contents.length - 1].role !== 'user') {
      contents.push({
        role: 'user',
        parts: [{ text: context.userMessage.trim() }],
      });
    }

    // Thử gọi AI với tối đa 2 lần thử lại khi gặp lỗi tạm thời (429, 503, network)
    let lastError: any = null;
    const maxAttempts = 3;
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const result = await withTimeout(
          ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: context.systemInstruction,
              maxOutputTokens: maxTokens,
            },
          }),
          timeoutMs,
          'AI_TIMEOUT',
        );

        const text = result?.text;
        if (typeof text === 'string' && text.trim().length > 0) {
          return text.trim();
        }

        throw new Error('AI trả về phản hồi rỗng');
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || 'Unknown error';
        if (msg === 'AI_TIMEOUT') {
          this.logger.warn(`Lần gọi Gemini thứ ${attempt}/${maxAttempts} bị quá thời gian (${timeoutMs}ms)`);
          break; // Quá thời gian thì không thử lại để tránh kéo dài độ trễ của client
        }
        this.logger.warn(`Lần gọi Gemini thứ ${attempt}/${maxAttempts} thất bại: ${msg}`);
        if (attempt < maxAttempts) {
          // Chờ tăng dần 1000ms, 2000ms trước khi thử lại
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    const errDetail = lastError?.status || lastError?.error?.message || lastError?.message || 'Không xác định';
    this.logger.error(`Gọi Gemini AI thất bại: ${errDetail}`);

    throw new HttpException(
      {
        code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
        message: 'Dịch vụ AI đang tạm thời không phản hồi, vui lòng thử lại sau.',
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
