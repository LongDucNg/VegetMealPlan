/**
 * Làm sạch văn bản câu trả lời từ AI để hiển thị thân thiện, tự nhiên như chat bình thường:
 * - Bỏ tất cả emoji, icon biểu tượng
 * - Bỏ các ký tự tiêu đề markdown thừa: ###, ##, #
 * - Bỏ toàn bộ dấu * (bao gồm cả ** và *)
 * - Chuyển dấu gạch đứng | thành dấu phẩy
 * - Chuyển ký tự bullet • thành dấu gạch ngang (-)
 * - Chuẩn hóa khoảng trắng và ngắt dòng gọn gàng, thanh thoát.
 */
export function cleanTextFormatting(text: string): string {
  if (!text) return '';

  return text
    // Bỏ tất cả emoji, biểu tượng cảm xúc và icon Unicode
    .replace(
      /[\u{1F300}-\u{1FAFF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}\u{1F1E6}-\u{1F1FF}\u{200D}]/gu,
      '',
    )
    // Bỏ các ký tự heading markdown ở đầu dòng: ###, ##, #
    .replace(/^#{1,6}\s+/gm, '')
    // Bỏ dấu gạch ngang ngăn cách thừa: --- ở đầu/cuối khối
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Chuyển dấu hoa thị gạch đầu dòng thành dấu gạch ngang: * item -> - item
    .replace(/^(\s*)\*\s+/gm, (_match, p1) => `${p1}- `)
    // Bỏ toàn bộ dấu sao * còn lại
    .replace(/\*/g, '')
    // Chuyển dấu gạch đứng | thành dấu phẩy
    .replace(/\s*\|\s*/g, ', ')
    // Chuyển ký tự bullet • thành gạch đầu dòng -
    .replace(/^\s*•\s*/gm, '- ')
    .replace(/•/g, '')
    // Chuẩn hóa dấu phẩy thừa
    .replace(/\s+,/g, ',')
    .replace(/,\s*,/g, ',')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    // Chuẩn hóa tối đa 2 dòng ngắt liên tiếp
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
