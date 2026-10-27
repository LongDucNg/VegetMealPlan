import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
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
export class OpenAiCompatibleAiProvider implements AiProvider {
  readonly providerName = 'openai-compatible';
  private readonly logger = new Logger(OpenAiCompatibleAiProvider.name);

  private getDefaultBaseUrl(provider: string): string {
    switch (provider.toLowerCase().trim()) {
      case 'grok':
      case 'xai':
        return 'https://api.x.ai/v1';
      case 'deepseek':
        return 'https://api.deepseek.com/v1';
      case 'openrouter':
        return 'https://openrouter.ai/api/v1';
      case 'groq':
        return 'https://api.groq.com/openai/v1';
      case 'openai':
      default:
        return 'https://api.openai.com/v1';
    }
  }

  private getDefaultModel(provider: string): string {
    switch (provider.toLowerCase().trim()) {
      case 'grok':
      case 'xai':
        return 'grok-2-latest';
      case 'deepseek':
        return 'deepseek-chat';
      case 'openrouter':
        return 'openai/gpt-4o-mini';
      case 'groq':
        return 'llama-3.3-70b-versatile';
      case 'openai':
      default:
        return 'gpt-4o-mini';
    }
  }

  async generateResponse(context: AiPromptContext): Promise<string> {
    const provider = (process.env.AI_PROVIDER || 'openai').toLowerCase().trim();
    const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GROK_API_KEY;

    if (!apiKey || !apiKey.trim()) {
      throw new HttpException(
        {
          code: ErrorCode.CHATBOT_AI_NOT_CONFIGURED,
          message: `Server chưa cấu hình API key (AI_API_KEY) cho nhà cung cấp ${provider}.`,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const rawBaseUrl = process.env.AI_BASE_URL || this.getDefaultBaseUrl(provider);
    const baseUrl = rawBaseUrl.replace(/\/+$/, '');
    const endpoint = baseUrl.endsWith('/chat/completions') ? baseUrl : `${baseUrl}/chat/completions`;

    let modelName = process.env.AI_MODEL;
    if (!modelName || (modelName.startsWith('gemini-') && provider !== 'gemini')) {
      modelName = this.getDefaultModel(provider);
    }
    const timeoutMs = Number(process.env.AI_TIMEOUT_MS) || 40000;
    const maxTokens = Number(process.env.AI_MAX_OUTPUT_TOKENS) || 4096;

    // Chuẩn bị danh sách messages theo chuẩn OpenAI / Grok
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

    let lastError: any = null;
    const maxAttempts = 3;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        const fetchPromise = fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey.trim()}`,
          },
          body: JSON.stringify({
            model: modelName,
            messages,
            max_tokens: maxTokens,
            temperature: 0.7,
          }),
        });

        const res = await withTimeout(fetchPromise, timeoutMs, 'AI_TIMEOUT');

        if (!res.ok) {
          const errorBody = await res.text().catch(() => '');
          throw new Error(`HTTP ${res.status}: ${errorBody}`);
        }

        const data: any = await res.json();
        const content = data?.choices?.[0]?.message?.content;

        if (typeof content === 'string' && content.trim().length > 0) {
          return content.trim();
        }

        throw new Error('AI trả về phản hồi rỗng');
      } catch (err: any) {
        lastError = err;
        const msg = err?.message || 'Unknown error';
        if (msg === 'AI_TIMEOUT') {
          this.logger.warn(`Lần gọi ${provider} thứ ${attempt}/${maxAttempts} bị quá thời gian (${timeoutMs}ms)`);
          break;
        }
        this.logger.warn(`Lần gọi ${provider} thứ ${attempt}/${maxAttempts} thất bại: ${msg}`);
        if (attempt < maxAttempts) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
      }
    }

    const errDetail = lastError?.message || 'Không xác định';
    this.logger.error(`Gọi ${provider} (${modelName}) thất bại: ${errDetail}`);

    throw new HttpException(
      {
        code: ErrorCode.CHATBOT_SERVICE_UNAVAILABLE,
        message: 'Dịch vụ AI đang tạm thời không phản hồi, vui lòng thử lại sau.',
      },
      HttpStatus.SERVICE_UNAVAILABLE,
    );
  }
}
