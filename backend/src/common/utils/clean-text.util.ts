/**
 * Làm sạch văn bản câu trả lời từ AI để hiển thị thân thiện trên giao diện:
 * - Bỏ các ký tự tiêu đề markdown thừa: ###, ##, #
 * - Bỏ ký tự in đậm: **từ** -> từ
 * - Chuyển dấu hoa thị gạch đầu dòng (*) thành dấu gạch ngang (-)
 * - Chuẩn hóa khoảng trắng và ngắt dòng gọn gàng, thanh thoát.
 */
export function cleanTextFormatting(text: string): string {
  if (!text) return '';

  return text
    // Bỏ các ký tự heading markdown ở đầu dòng: ###, ##, #
    .replace(/^#{1,6}\s+/gm, '')
    // Bỏ định dạng in đậm: **nội dung** -> nội dung
    .replace(/\*\*([^*\n]+?)\*\*/g, (_match, p1) => p1)
    // Bỏ dấu gạch ngang ngăn cách thừa: --- ở đầu/cuối khối
    .replace(/^[-*_]{3,}\s*$/gm, '')
    // Chuyển dấu hoa thị gạch đầu dòng thành dấu gạch ngang: * item -> - item
    .replace(/^(\s*)\*\s+/gm, (_match, p1) => `${p1}- `)
    // Chuẩn hóa tối đa 2 dòng ngắt liên tiếp để giao diện thoáng đãng
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}
