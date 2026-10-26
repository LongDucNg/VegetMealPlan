import { NonVegetarianDetectorService } from './non-vegetarian-detector.service';

describe('NonVegetarianDetectorService', () => {
  let detector: NonVegetarianDetectorService;

  beforeEach(() => {
    detector = new NonVegetarianDetectorService();
  });

  it('chặn nguyên liệu có từ khóa mặn (ví dụ "thịt heo", "cá hồi")', () => {
    const res1 = detector.checkText('thịt heo');
    expect(res1.isClean).toBe(false);
    expect(res1.violations).toContain('thịt');
    expect(res1.violations).toContain('heo');

    const res2 = detector.checkText('Cá hồi phi lê');
    expect(res2.isClean).toBe(false);
    expect(res2.violations).toContain('cá');
  });

  it('cho qua khi từ khóa mặn đi kèm chữ "chay" ngay sau (ví dụ "thịt chay", "cá chay")', () => {
    const res1 = detector.checkText('thịt chay');
    expect(res1.isClean).toBe(true);
    expect(res1.violations).toEqual([]);

    const res2 = detector.checkText('Cá chay sốt cà chua');
    expect(res2.isClean).toBe(true);

    const res3 = detector.checkText('Nước mắm chay');
    expect(res3.isClean).toBe(true);
  });

  it('chặn nếu chuỗi có cả "thịt chay" và "thịt heo"', () => {
    const res = detector.checkText('thịt chay và thịt heo');
    expect(res.isClean).toBe(false);
    expect(res.violations).toContain('thịt');
    expect(res.violations).toContain('heo');
  });

  it('bỏ qua ngoại lệ "cá nhân", không nhầm với "cá"', () => {
    const res = detector.checkText('Quan điểm cá nhân của tôi về món ăn');
    expect(res.isClean).toBe(true);
    expect(res.violations).toEqual([]);
  });

  it('không nhầm "cà chua" với "cá"', () => {
    const res = detector.checkText('Cà chua và đậu phụ');
    expect(res.isClean).toBe(true);
    expect(res.violations).toEqual([]);
  });

  it('checkIngredients trả về danh sách nguyên liệu vi phạm', () => {
    const ingredients = [
      { name: 'Đậu hũ non', amount: '2 bìa' },
      { name: 'Thịt bò xắt lát', amount: '200g' },
      { name: 'Nước tương', amount: '2 muỗng' },
    ];
    const res = detector.checkIngredients(ingredients);
    expect(res.isClean).toBe(false);
    expect(res.violations).toContain('thịt');
    expect(res.violations).toContain('bò');
    expect(res.offendingIngredients).toContain('Thịt bò xắt lát');
  });
});
