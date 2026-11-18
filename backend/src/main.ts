import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

// Chạy Node theo giờ UTC ở mọi máy (Render vốn đã là UTC).
// Cột thời gian trong DB là TIMESTAMP không kèm múi giờ, Neon ghi now() theo UTC. Nếu Node chạy theo
// giờ máy (UTC+7 ở VN), thư viện pg đọc giá trị đó như giờ VN và lệch 7 tiếng: thông báo vừa tạo hiện
// "7 giờ trước", và dữ liệu do máy dev ghi lệch với dữ liệu do Render ghi trên cùng DB.
process.env.TZ = 'UTC';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Render/Vercel đặt backend sau 1 lớp proxy: tin header X-Forwarded-For của đúng 1 lớp đó để req.ip
  // là IP thật của người dùng (giới hạn gửi OTP theo IP), không phải IP của proxy.
  app.set('trust proxy', 1);

  const uploadsDir = join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.useStaticAssets(uploadsDir, { prefix: '/uploads/' });

  app.setGlobalPrefix('api/v1');
  // Chỉ cho FE của mình gọi API từ trình duyệt. Nhiều domain thì ngăn cách bằng dấu phẩy trong FRONTEND_URL.
  const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:3001')
    .split(',')
    .map((o) => o.trim().replace(/\/$/, ''))
    .filter(Boolean);
  app.enableCors({ origin: allowedOrigins, credentials: true });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // bỏ field lạ không có trong DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('VegetMealPlan API')
    .setDescription('API cho Ứng dụng hỗ trợ người ăn chay')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 API running on http://localhost:${port}/api/v1`);
  console.log(`📘 Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
