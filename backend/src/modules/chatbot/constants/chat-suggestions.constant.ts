export interface ChatSuggestionItem {
  text: string;
  category: 'dinner' | 'macros' | 'bmi' | 'general' | 'substitute';
}

export const DEFAULT_CHAT_SUGGESTIONS: ChatSuggestionItem[] = [
  {
    text: 'Tối nay tôi nên nấu món chay gì nhanh và đủ đạm?',
    category: 'dinner',
  },
  {
    text: 'Cách phối hợp thực phẩm để bổ sung đủ đạm (protein) cho người ăn chay?',
    category: 'macros',
  },
  {
    text: 'Người ăn chay tại Việt Nam nên bổ sung Vitamin B12 như thế nào?',
    category: 'general',
  },
  {
    text: 'Nguyên liệu thực vật nào có thể thay thế trứng khi làm bánh?',
    category: 'substitute',
  },
  {
    text: 'Giải thích chỉ số BMI và cách tính calo duy trì cân nặng?',
    category: 'bmi',
  },
  {
    text: 'Thực đơn chay 7 ngày thanh lọc cơ thể và dễ tiêu hóa?',
    category: 'general',
  },
];
