import { Test, TestingModule } from '@nestjs/testing';
import { ChatbotSafetyService } from './chatbot-safety.service';
import { NonVegetarianDetectorService } from '../../common/services/non-vegetarian-detector.service';

describe('ChatbotSafetyService', () => {
  let service: ChatbotSafetyService;
  let detector: NonVegetarianDetectorService;

  beforeEach(async () => {
    detector = new NonVegetarianDetectorService();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatbotSafetyService,
        { provide: NonVegetarianDetectorService, useValue: detector },
      ],
    }).compile();

    service = module.get<ChatbotSafetyService>(ChatbotSafetyService);
  });

  describe('Kiểm tra an toàn dị ứng & nguyên liệu thay thế', () => {
    it('cho phép câu trả lời tư vấn thay thế cho nấm khi người dùng hỏi thay thế nấm và có dị ứng nấm', () => {
      const userQuestion = 'các nguyên liệu nào thay thế cho nấm';
      const answer = `Dưới đây là một số nguyên liệu thay thế tuyệt vời cho nấm:
- Cà tím: Khi kho hoặc nướng, cà tím có kết cấu mềm dai và vị ngọt umami tự nhiên tương tự nấm.
- Mít non: Mít non xé sợi có độ dai rất giống nấm đùi gà, thích hợp làm các món kho, gỏi.
- Đậu hũ ky (tàu hũ ky): Giúp bổ sung protein thơm béo, tạo kết cấu dai giòn ngon miệng.`;

      const result = service.checkAnswer(answer, ['nấm'], userQuestion);
      expect(result.isSafe).toBe(true);
      expect(result.reason).toBeUndefined();
    });

    it('chặn câu trả lời nếu AI hướng dẫn trực tiếp tiêu thụ nguyên liệu dị ứng dù câu hỏi là thay thế', () => {
      const userQuestion = 'các nguyên liệu nào thay thế cho nấm';
      const answer = `Để thay thế, bạn có thể:
- Dùng nấm rơm 200g nấu canh vì nấm rơm lành tính.
- Hoặc dùng đậu hũ.`;

      const result = service.checkAnswer(answer, ['nấm'], userQuestion);
      expect(result.isSafe).toBe(false);
      expect(result.reason).toContain('Đề xuất nguyên liệu nằm trong danh sách dị ứng');
    });

    it('chặn đề xuất món ăn có chứa nguyên liệu dị ứng trong câu hỏi thông thường', () => {
      const userQuestion = 'Gợi ý cho tôi bữa trưa chay thanh đạm';
      const answer = `Gợi ý thực đơn cho bạn:
- Canh nấm hạt sen tươi mát
- Đậu hũ sốt cà chua
- Cơm gạo lứt`;

      const result = service.checkAnswer(answer, ['nấm'], userQuestion);
      expect(result.isSafe).toBe(false);
      expect(result.reason).toContain('nấm');
    });

    it('cho phép câu trả lời nhắc đến nguyên liệu dị ứng trong câu cảnh báo an toàn', () => {
      const userQuestion = 'Hôm nay ăn gì?';
      const answer = `Bạn có thể dùng món canh bí đỏ đậu phộng. Lưu ý hồ sơ của bạn có ghi nhận dị ứng nấm nên hãy tránh dùng nấm trong các món canh này nhé.`;

      const result = service.checkAnswer(answer, ['nấm'], userQuestion);
      expect(result.isSafe).toBe(true);
    });

    it('cho phép nhắc đến từ thay thế cho nấm ngay cả khi không truyền userQuestion (tự nhận diện qua ngữ cảnh an toàn)', () => {
      const answer = `Một số lựa chọn thay thế cho nấm:
- Cà tím có độ mềm dai tương tự nấm.
- Mít non thay cho nấm trong các món kho chay.`;

      const result = service.checkAnswer(answer, ['nấm']);
      expect(result.isSafe).toBe(true);
    });
  });

  describe('Kiểm tra từ khóa nguồn gốc động vật (Non-vegetarian)', () => {
    it('cho phép mô tả món chay có cụm từ so sánh như "thay thế cho thịt", "dai như thịt"', () => {
      const answer = `Mít non kho là món chay rất ngon, mít non xé sợi có độ dai như thịt và thường được dùng để thay thế cho thịt trong các món kho chay.`;
      const result = service.checkAnswer(answer, []);
      expect(result.isSafe).toBe(true);
    });

    it('chặn câu trả lời đề xuất nguyên liệu mặn thực sự', () => {
      const answer = `Bạn có thể nấu canh thịt bò với cải thảo để bồi bổ sức khỏe.`;
      const result = service.checkAnswer(answer, []);
      expect(result.isSafe).toBe(false);
      expect(result.reason).toContain('thịt');
    });

    it('chặn câu trả lời rỗng hoặc khoảng trắng', () => {
      expect(service.checkAnswer('', []).isSafe).toBe(false);
      expect(service.checkAnswer('   ', []).isSafe).toBe(false);
    });
  });
});

