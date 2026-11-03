import 'dotenv/config';
import { PayOS } from '@payos/node';

async function main() {
  const url = process.argv[2]?.trim();
  if (!url) {
    console.log('================================================================');
    console.log('HƯỚNG DẪN ĐĂNG KÝ WEBHOOK URL VỚI PAYOS:');
    console.log('Chạy lệnh:');
    console.log('  npm --prefix backend run payos:webhook -- <URL_CÔNG_KHAI_CỦA_BẠN>');
    console.log('Ví dụ:');
    console.log('  npm --prefix backend run payos:webhook -- https://abcd-123.ngrok-free.app/api/v1/subscriptions/payos-webhook');
    console.log('================================================================');
    process.exit(0);
  }

  const clientId = process.env.PAYOS_CLIENT_ID?.trim();
  const apiKey = process.env.PAYOS_API_KEY?.trim();
  const checksumKey = process.env.PAYOS_CHECKSUM_KEY?.trim();

  if (!clientId || !apiKey || !checksumKey) {
    console.error('❌ Lỗi: Chưa cấu hình đủ PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY trong backend/.env');
    process.exit(1);
  }

  const payos = new PayOS({ clientId, apiKey, checksumKey });
  console.log(`Đang gửi yêu cầu đăng ký Webhook URL tới PayOS: ${url} ...`);
  try {
    const res = await payos.webhooks.confirm(url);
    console.log('✅ Đăng ký Webhook với PayOS thành công rực rỡ!');
    console.log('Kết quả từ PayOS:', res);
    console.log('Bây giờ bạn tải lại trang my.payos.vn sẽ thấy Webhook URL xuất hiện!');
  } catch (err: any) {
    console.error('❌ Đăng ký thất bại. Chi tiết lỗi:', err?.message || err);
    console.log('Lưu ý: URL phải là HTTPS công khai và server backend phải đang chạy để nhận phản hồi từ PayOS.');
    process.exit(1);
  }
}

main();

