export interface ScanPresetItem {
  id: string;
  label: string;
  description: string;
  guidelines: string;
  recommended_angle?: string;
}

export const SCAN_PRESETS: ScanPresetItem[] = [
  {
    id: 'pantry',
    label: 'Giỏ nguyên liệu / Bàn bếp (Pantry Produce Basket)',
    description:
      'Chụp tổng quan rổ rau củ, giỏ quả hoặc các nguyên liệu được bày sẵn trên bàn bếp.',
    guidelines:
      'Đặt nguyên liệu trải đều trên mặt phẳng sáng sủa, hạn chế để xếp chồng lấp lên nhau để AI quan sát rõ bề mặt từng món.',
    recommended_angle: 'Chụp góc 45 - 60 độ hoặc góc thẳng từ trên xuống (top-down).',
  },
  {
    id: 'fridge',
    label: 'Ngăn tủ lạnh / Hộp bảo quản (Fridge Leftovers Box)',
    description:
      'Chụp góc nhìn vào ngăn tủ lạnh hoặc bên trong hộp đựng thực phẩm lưu trữ.',
    guidelines:
      'Mở rộng cửa tủ lạnh hoặc nắp hộp, đảm bảo đủ ánh sáng chiếu vào các khay đựng và không bị che khuất bởi bao bì kín.',
    recommended_angle: 'Chụp trực diện ngang tầm mắt hoặc hơi chếch nhẹ vào lòng khay đựng.',
  },
  {
    id: 'single',
    label: 'Cận cảnh một nguyên liệu (Single Ingredient Close-up)',
    description:
      'Chụp chi tiết một loại rau củ, trái cây hoặc nấm đơn lẻ để kiểm tra độ tươi chính xác.',
    guidelines:
      'Để nguyên liệu ở khoảng cách 20 - 30 cm, lấy nét vào phần thân/lá và vùng có dấu hiệu thay đổi màu sắc nếu có.',
    recommended_angle: 'Chụp cận cảnh góc 90 độ hoặc góc nghiêng 45 độ.',
  },
];
