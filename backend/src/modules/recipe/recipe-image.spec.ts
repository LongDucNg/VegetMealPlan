/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloudinaryService } from '../media/cloudinary.service';
import { RecipeImageService } from './recipe-image.service';

const config = (env: Record<string, string>) => ({ get: (k: string) => env[k] }) as any;
const FULL_ENV = { CLOUDINARY_CLOUD_NAME: 'demo', CLOUDINARY_API_KEY: '123', CLOUDINARY_API_SECRET: 'abcd' };

const png = (size = 1000) => ({ buffer: Buffer.alloc(size, 1), mimetype: 'image/png', size });
const errorCode = (code: string) => expect.objectContaining({ response: expect.objectContaining({ code }) });

function build(opts: { env?: Record<string, string>; recipe?: any; existsAfterDelete?: boolean } = {}) {
  const cloudinary = new CloudinaryService(config(opts.env ?? FULL_ENV));
  const uploads: any[] = [];
  const destroyed: string[] = [];
  jest.spyOn(cloudinary, 'uploadImage').mockImplementation(async (buffer, mimetype, publicId) => {
    uploads.push({ bytes: buffer.length, mimetype, publicId });
    return { secure_url: `https://res.cloudinary.com/demo/image/upload/v1/${publicId}.png`, public_id: publicId } as any;
  });
  jest.spyOn(cloudinary, 'destroyImage').mockImplementation(async (publicId) => {
    destroyed.push(publicId);
  });
  const updates: any[] = [];
  const repo: any = {
    findOne: async () => (opts.recipe === undefined ? { recipe_id: 7, created_by: 1 } : opts.recipe),
    update: async (where: any, data: any) => updates.push({ where, data }),
    exists: async () => opts.existsAfterDelete ?? false,
  };
  return { svc: new RecipeImageService(repo, cloudinary), uploads, destroyed, updates };
}

describe('Cloudinary: chữ ký upload', () => {
  it('ký đúng theo ví dụ trong tài liệu Cloudinary (sắp xếp tham số + SHA-1)', () => {
    const svc = new CloudinaryService(config(FULL_ENV));
    // Ví dụ chính thức: eager=...&public_id=sample_image&timestamp=1315060510 + secret "abcd"
    expect(
      svc.sign({ timestamp: 1315060510, public_id: 'sample_image', eager: 'w_400,h_300,c_pad|w_260,h_200,c_crop' }),
    ).toBe('bfd09f95f331f558cbd1320e67aa8d488770583e');
  });

  it('thiếu biến môi trường -> 503 UPLOAD_NOT_CONFIGURED, app vẫn khởi tạo được', () => {
    const svc = new CloudinaryService(config({ CLOUDINARY_CLOUD_NAME: 'demo' }));
    expect(svc.isConfigured).toBe(false);
    expect(() => svc.assertConfigured()).toThrow(errorCode('UPLOAD_NOT_CONFIGURED'));
  });
});

describe('Ảnh món ăn: POST /recipes/:id/image', () => {
  it('chủ món tải ảnh: lưu đúng 1 file cố định theo id món và ghi secure_url vào image_url', async () => {
    const { svc, uploads, updates } = build();
    const res = await svc.upload(7, 1, 'user', png());
    expect(uploads).toEqual([{ bytes: 1000, mimetype: 'image/png', publicId: 'vegetmealplan/recipes/recipe-7' }]);
    expect(updates).toEqual([{ where: { recipe_id: 7 }, data: { image_url: res.image_url } }]);
    expect(res.image_url).toContain('res.cloudinary.com');
  });

  it('admin đổi ảnh món của người khác được', async () => {
    const { svc, uploads } = build();
    await svc.upload(7, 99, 'admin', png());
    expect(uploads).toHaveLength(1);
  });

  it('người khác không phải chủ món -> 403, không upload gì', async () => {
    const { svc, uploads } = build();
    await expect(svc.upload(7, 2, 'user', png())).rejects.toEqual(errorCode('AUTH_FORBIDDEN'));
    expect(uploads).toHaveLength(0);
  });

  it('món không tồn tại -> 404', async () => {
    const { svc } = build({ recipe: null });
    await expect(svc.upload(404, 1, 'user', png())).rejects.toEqual(errorCode('RECIPE_NOT_FOUND'));
  });

  it.each([
    ['không gửi file', undefined],
    ['file rỗng', { buffer: Buffer.alloc(0), mimetype: 'image/png', size: 0 }],
    ['file PDF', { buffer: Buffer.alloc(10), mimetype: 'application/pdf', size: 10 }],
    ['ảnh GIF', { buffer: Buffer.alloc(10), mimetype: 'image/gif', size: 10 }],
    ['ảnh quá 5 MB', png(5 * 1024 * 1024 + 1)],
  ])('%s -> 400 UPLOAD_INVALID_FILE, không upload', async (_name, file: any) => {
    const { svc, uploads } = build();
    await expect(svc.upload(7, 1, 'user', file)).rejects.toEqual(errorCode('UPLOAD_INVALID_FILE'));
    expect(uploads).toHaveLength(0);
  });

  it('chưa cấu hình Cloudinary -> 503 trước khi đụng DB', async () => {
    const { svc } = build({ env: {} });
    await expect(svc.upload(7, 1, 'user', png())).rejects.toEqual(errorCode('UPLOAD_NOT_CONFIGURED'));
  });
});

describe('Ảnh món ăn: dọn ảnh khi xoá món', () => {
  it('món đã xoá hẳn -> xoá ảnh trên Cloudinary', async () => {
    const { svc, destroyed } = build({ existsAfterDelete: false });
    await svc.removeIfRecipeDeleted(7);
    expect(destroyed).toEqual(['vegetmealplan/recipes/recipe-7']);
  });

  it('món chỉ bị ẩn (còn trong thực đơn) -> giữ ảnh', async () => {
    const { svc, destroyed } = build({ existsAfterDelete: true });
    await svc.removeIfRecipeDeleted(7);
    expect(destroyed).toEqual([]);
  });
});
