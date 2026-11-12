import { Injectable, Logger } from '@nestjs/common';
import {
  ScanAiProvider,
  RawScanDetectionResult,
} from './scan-ai-provider.interface';

@Injectable()
export class MockScanAiProvider implements ScanAiProvider {
  readonly providerName = 'mock';
  private readonly logger = new Logger(MockScanAiProvider.name);

  async detectIngredients(
    imageBuffer: Buffer,
    mimeType: string,
  ): Promise<RawScanDetectionResult> {
    this.logger.log(
      `[MOCK SCAN AI] Nhận diện ảnh mô phỏng (${mimeType}, ${imageBuffer.length} bytes)`,
    );

    return {
      image_quality: 'good',
      items: [
        {
          name: 'Đậu phụ',
          confidence: 0.96,
          freshness: 'fresh',
        },
        {
          name: 'Cà chua',
          confidence: 0.94,
          freshness: 'fresh',
        },
        {
          name: 'Rau cải ngọt',
          confidence: 0.89,
          freshness: 'fresh',
        },
        {
          name: 'Nấm hương',
          confidence: 0.91,
          freshness: 'aging',
        },
      ],
    };
  }

  async detectBatchIngredients(
    images: Array<{ imageBuffer: Buffer; mimeType: string }>,
  ): Promise<RawScanDetectionResult> {
    this.logger.log(
      `[MOCK SCAN AI] Nhận diện chùm ảnh mô phỏng (${images.length} ảnh)`,
    );

    return {
      image_quality: 'good',
      items: [
        { name: 'Đậu phụ', confidence: 0.96, freshness: 'fresh' },
        { name: 'Cà chua', confidence: 0.94, freshness: 'fresh' },
        { name: 'Rau cải ngọt', confidence: 0.89, freshness: 'fresh' },
        { name: 'Nấm hương', confidence: 0.91, freshness: 'aging' },
        { name: 'Ớt chuông đỏ', confidence: 0.93, freshness: 'fresh' },
        { name: 'Khoai tây', confidence: 0.95, freshness: 'fresh' },
      ],
    };
  }
}
