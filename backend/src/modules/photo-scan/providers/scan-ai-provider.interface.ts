export type FreshnessStatus = 'fresh' | 'aging' | 'spoiled' | 'unknown';
export type ImageQuality = 'good' | 'blurry' | 'dark' | 'no_food';

export interface RawDetectedIngredient {
  name: string;
  confidence: number;
  freshness: FreshnessStatus;
}

export interface RawScanDetectionResult {
  items: RawDetectedIngredient[];
  image_quality: ImageQuality;
}

export interface ScanAiProvider {
  readonly providerName: string;
  detectIngredients(
    imageBuffer: Buffer,
    mimeType: string,
  ): Promise<RawScanDetectionResult>;

  detectBatchIngredients(
    images: Array<{ imageBuffer: Buffer; mimeType: string }>,
  ): Promise<RawScanDetectionResult>;
}
