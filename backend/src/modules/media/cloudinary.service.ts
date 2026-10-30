import { BadGatewayException, Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createHash } from 'crypto';
import { ErrorCode } from '../../common/constants/error-codes.enum';

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  version: number;
  width: number;
  height: number;
  bytes: number;
  format: string;
}

type SignedParams = Record<string, string | number>;

const API_BASE = 'https://api.cloudinary.com/v1_1';
const REQUEST_TIMEOUT_MS = 30_000;

/**
 * Gọi thẳng REST API của Cloudinary (upload có chữ ký), không cần cài SDK.
 * apiSecret chỉ dùng để ký trên server, không bao giờ gửi đi.
 * Thiếu biến môi trường thì riêng chức năng upload báo 503, phần còn lại của app vẫn chạy.
 */
@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  private readonly cloudName?: string;
  private readonly apiKey?: string;
  private readonly apiSecret?: string;

  constructor(config: ConfigService) {
    this.cloudName = config.get<string>('CLOUDINARY_CLOUD_NAME')?.trim() || undefined;
    this.apiKey = config.get<string>('CLOUDINARY_API_KEY')?.trim() || undefined;
    this.apiSecret = config.get<string>('CLOUDINARY_API_SECRET')?.trim() || undefined;
  }

  get isConfigured(): boolean {
    return !!(this.cloudName && this.apiKey && this.apiSecret);
  }

  assertConfigured(): void {
    if (!this.isConfigured) {
      throw new ServiceUnavailableException({
        code: ErrorCode.UPLOAD_NOT_CONFIGURED,
        message: 'Chức năng tải ảnh chưa được cấu hình trên server.',
      });
    }
  }

  /**
   * Chữ ký Cloudinary: các tham số (trừ file, api_key, resource_type) xếp theo alphabet,
   * nối "k=v&k=v", ghép apiSecret vào cuối rồi băm SHA-1.
   */
  sign(params: SignedParams): string {
    const toSign = Object.keys(params)
      .sort()
      .map((k) => `${k}=${params[k]}`)
      .join('&');
    return createHash('sha1').update(toSign + this.apiSecret).digest('hex');
  }

  /** Upload (ghi đè nếu trùng publicId) ảnh từ buffer. publicId có thể chứa thư mục: "a/b/ten-anh". */
  uploadImage(buffer: Buffer, mimetype: string, publicId: string): Promise<CloudinaryUploadResult> {
    return this.upload(`data:${mimetype};base64,${buffer.toString('base64')}`, publicId);
  }

  /** Cloudinary tự tải ảnh từ link công khai (không đi qua máy mình). Dùng cho script đưa ảnh seed lên. */
  uploadImageFromUrl(url: string, publicId: string): Promise<CloudinaryUploadResult> {
    return this.upload(url, publicId);
  }

  private upload(file: string, publicId: string): Promise<CloudinaryUploadResult> {
    this.assertConfigured();
    const params: SignedParams = {
      invalidate: 'true',
      overwrite: 'true',
      public_id: publicId,
      timestamp: Math.floor(Date.now() / 1000),
    };
    return this.post<CloudinaryUploadResult>('image/upload', params, { file });
  }

  /** Xoá ảnh theo publicId. Không có ảnh thì Cloudinary trả "not found", coi như đã xoá. */
  async destroyImage(publicId: string): Promise<void> {
    this.assertConfigured();
    await this.post('image/destroy', {
      invalidate: 'true',
      public_id: publicId,
      timestamp: Math.floor(Date.now() / 1000),
    });
  }

  private async post<T>(path: string, params: SignedParams, unsigned: Record<string, string> = {}): Promise<T> {
    const body = new URLSearchParams({
      ...Object.fromEntries(Object.entries(params).map(([k, v]) => [k, String(v)])),
      ...unsigned,
      api_key: this.apiKey!,
      signature: this.sign(params),
    });

    let res: Response;
    try {
      res = await fetch(`${API_BASE}/${this.cloudName}/${path}`, {
        method: 'POST',
        body,
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (err) {
      this.logger.error(`Không gọi được Cloudinary (${path}): ${(err as Error)?.message ?? err}`);
      throw new BadGatewayException({ code: ErrorCode.UPLOAD_FAILED, message: 'Không kết nối được máy chủ lưu ảnh, vui lòng thử lại.' });
    }

    const json = (await res.json().catch(() => ({}))) as { error?: { message?: string } } & T;
    if (!res.ok) {
      this.logger.error(`Cloudinary ${path} trả ${res.status}: ${json.error?.message ?? 'không rõ lỗi'}`);
      throw new BadGatewayException({ code: ErrorCode.UPLOAD_FAILED, message: 'Máy chủ lưu ảnh từ chối ảnh này, vui lòng thử ảnh khác.' });
    }
    return json;
  }
}
