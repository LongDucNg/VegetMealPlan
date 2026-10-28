import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AiProvider, AiPromptContext } from './ai-provider.interface';
import { ErrorCode } from '../../../common/constants/error-codes.enum';

@Injectable()
export class GroqAiProvider implements AiProvider {
  readonly providerName = 'groq';
  private readonly logger = new Logger(GroqAiProvider.name);

  async generateResponse(context: AiPromptContext): Promise<string> {
    const apiKey = (process.env.GROQ_API_KEY || process.env.AI_API_KEY || '').trim();
    const modelName = (process.env.GROQ_MODEL || process.env.AI_MODEL || '').trim();

    if (!apiKey) {
      this.logger.error('Chưa cấu hình GROQ_API_KEY cho chatbot AI.');
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_AI_NOT_CONFIGURED,
          message: 'Server chưa cấu hình khóa API (GROQ_API_KEY) cho chatbot.',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    if (!modelName) {
      this.logger.error('Chưa cấu hình GROQ_MODEL cho chatbot AI.');
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_AI_NOT_CONFIGURED,
          message: 'Server chưa cấu hình tên model (GROQ_MODEL) cho chatbot.',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const rawBaseUrl = (process.env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1').trim();
    const baseUrl = rawBaseUrl.replace(/\/+$/, '');
    const endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`;

    const timeoutMs = Number(process.env.GROQ_TIMEOUT_MS) || 20000;
    const maxTokens = Number(process.env.GROQ_MAX_OUTPUT_TOKENS) || 2048;

    // Chuẩn bị danh sách messages theo chuẩn OpenAI tương thích với Groq
    const messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }> = [
      {
        role: 'system',
        content: context.systemInstruction,
      },
    ];

    if (context.history && context.history.length > 0) {
      for (const turn of context.history) {
        if (turn.parts && turn.parts.trim()) {
          messages.push({
            role: turn.role === 'model' ? 'assistant' : 'user',
            content: turn.parts.trim(),
          });
        }
      }
    }

    messages.push({
      role: 'user',
      content: context.userMessage.trim(),
    });

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: modelName,
          messages,
          max_tokens: maxTokens,
          temperature: 0.7,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const status = res.status;
        const errorText = await res.text().catch(() => '');

        if (status === 401) {
          this.logger.error(`Khóa API Groq không hợp lệ hoặc đã hết hạn (HTTP 401): ${errorText}`);
          throw new HttpException(
            {
              code: ErrorCode.CHATBOT_AI_NOT_CONFIGURED,
              message: 'Khóa API Groq không hợp lệ hoặc chưa được kích hoạt.',
            },
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }

        if (status === 404 || status === 400) {
          this.logger.error(
            `Model Groq không tồn tại hoặc yêu cầu không hợp lệ (HTTP ${status}): ${errorText}`,
          );
          throw new HttpException(
            {
              code: ErrorCode.CHATBOT_AI_NOT_CONFIGURED,
              message: 'Model Groq được cấu hình không hợp lệ hoặc không tồn tại.',
            },
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }

        if (status === 429) {
          this.logger.warn(`Groq API vượt quá giới hạn tốc độ (HTTP 429): ${errorText}`);
          throw new HttpException(
            {
              code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
              message: 'Dịch vụ AI đang quá tải, vui lòng thử lại sau ít phút.',
            },
            HttpStatus.SERVICE_UNAVAILABLE,
          );
        }

        this.logger.error(`Lỗi từ máy chủ Groq (HTTP ${status}): ${errorText}`);
        throw new HttpException(
          {
            code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
            message: 'Dịch vụ AI đang tạm thời không phản hồi, vui lòng thử lại sau.',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      const data: any = await res.json();
      const content = data?.choices?.[0]?.message?.content;

      if (typeof content === 'string' && content.trim().length > 0) {
        return content.trim();
      }

      this.logger.warn('Groq trả về phản hồi rỗng');
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
          message: 'AI trả về phản hồi rỗng, vui lòng thử lại.',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } catch (err: any) {
      if (err instanceof HttpException) {
        throw err;
      }

      if (err?.name === 'AbortError' || controller.signal.aborted) {
        this.logger.warn(`Groq request bị quá thời gian (${timeoutMs}ms)`);
        throw new HttpException(
          {
            code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
            message: 'Dịch vụ AI phản hồi quá thời gian, vui lòng thử lại.',
          },
          HttpStatus.SERVICE_UNAVAILABLE,
        );
      }

      this.logger.error(`Lỗi kết nối khi gọi Groq: ${err?.message || err}`);
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
          message: 'Dịch vụ AI đang tạm thời không phản hồi, vui lòng thử lại sau.',
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } finally {
      clearTimeout(timer);
    }
  }
}
