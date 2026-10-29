import { ImageCandidate, isAcceptable, slugify } from './recipe-image-sources';
import { analyzeTitle } from './recipe-image-keywords';
import { buildAttempts, isRelevant, parseArgs } from './fetch-recipe-images';

const candidate = (description: string): ImageCandidate => ({
  id: 'pixabay:1',
  provider: 'pixabay',
  url: 'https://example.com/a.jpg',
  source_url: 'https://example.com',
  author: 'a',
  author_url: 'https://example.com/a',
  description,
});

describe('Script ảnh món: tên file Cloudinary theo tên món', () => {
  it.each([
    ['Canh chua chay', 'canh-chua-chay'],
    ['Đậu hũ sốt cà chua', 'dau-hu-sot-ca-chua'],
    ['Mì, Bún & Phở  xào', 'mi-bun-pho-xao'],
    ['  Gỏi cuốn (chay) ', 'goi-cuon-chay'],
  ])('"%s" -> %s', (title, slug) => {
    expect(slugify(title)).toBe(slug);
  });
});

describe('Script ảnh món: lọc ảnh dính đồ mặn', () => {
  it('bỏ ảnh có thịt, cá, hải sản', () => {
    expect(isAcceptable(candidate('fried chicken, rice'), 'lacto_ovo')).toBe(false);
    expect(isAcceptable(candidate('shrimp noodle soup'), 'vegan')).toBe(false);
    expect(isAcceptable(candidate('tofu, vegetables, vegan'), 'vegan')).toBe(true);
  });

  it('món thuần chay bỏ thêm trứng, sữa; món trứng sữa thì giữ', () => {
    expect(isAcceptable(candidate('fried egg, toast'), 'vegan')).toBe(false);
    expect(isAcceptable(candidate('fried egg, toast'), 'ovo')).toBe(true);
    expect(isAcceptable(candidate('cheese pizza'), 'lacto')).toBe(true);
  });

  it('không chặn nhầm chữ chứa từ khoá (eggplant, hamburger bun...)', () => {
    expect(isAcceptable(candidate('eggplant, grilled'), 'vegan')).toBe(true);
    expect(isAcceptable(candidate('shamrock salad'), 'vegan')).toBe(true);
  });
});

describe('Script ảnh món: tags tiếng Việt (Pixabay lang=vi) dính đồ mặn', () => {
  // Tags thật từ lần chạy đầu: bộ lọc tiếng Anh cũ để lọt hết.
  it.each(['bún chả tôm, món ăn, chả giò', 'trà chiều, cà phê, cá hồi, bánh', 'bánh mì kẹp thịt, patty, người ăn chay'])(
    'loại "%s"',
    (tags) => {
      expect(isAcceptable(candidate(tags), 'lacto_ovo')).toBe(false);
    },
  );

  it('không bắt nhầm "các loại", "cà chua", "người ăn chay"', () => {
    expect(isAcceptable(candidate('các loại thảo mộc, cà chua, người ăn chay'), 'vegan')).toBe(true);
  });

  it('món thuần chay loại ảnh có trứng (tags tiếng Việt)', () => {
    expect(isAcceptable(candidate('bánh sandwich trứng, trứng luộc'), 'vegan')).toBe(false);
  });
});

describe('Script ảnh món: chỉ nhận ảnh khớp món', () => {
  const firstAttempt = (title: string) => buildAttempts(title, null)[0];

  it.each([
    // [tên món, tags thật Pixabay trả về, có nhận không]
    ['Bánh canh nấm chay', 'pizza, hình nền đẹp, bánh ngọt, món ăn', false],
    ['Phở chay', 'bữa ăn sáng, khỏe mạnh, hummus, bánh mì', false],
    ['Xôi lạc', 'uống, trái cây, hoa quả, dâu rừng', false],
    ['Bánh khọt nấm', 'bánh khọt, bữa ăn, nhà bếp, món ăn việt nam', true],
    ['Cháo bắp', 'ngô, cháo ngô, polenta, bữa ăn', true],
    // "xôi" trong "quả mâm xôi" không phải món xôi; loại món một chữ phải có thêm nguyên liệu chính.
    ['Xôi đậu xanh', 'trái cây, món ăn, dâu tây, quả mâm xôi', false],
    ['Cháo đậu xanh', 'bữa ăn, món ăn, đậu hũ, cơm, cháo', false],
  ])('%s: tags "%s" -> nhận = %s', (title, tags, expected) => {
    expect(isRelevant(candidate(tags), firstAttempt(title))).toBe(expected);
  });

  it.each([
    // Tags thật lần chạy thứ 2: ảnh chung kiểu Tây bị loại.
    ['Bún riêu chay', 'spaghetti, pasta, noodles, italian, eat, food', false],
    ['Bún Huế chay', 'bowl, vermicelli, food, vietnam, rice, noodle, asian', true],
    ['Cháo hạt sen táo tàu', 'porridge, oatmeal, breakfast, healthy, porridge with berries', false],
    ['Cháo đậu đen', 'congee, rice porridge, beans, asian', true],
  ])('ảnh minh hoạ chung %s: tags "%s" -> nhận = %s', (title, tags, expected) => {
    const generic = buildAttempts(title, null).find((a) => a.match === 'generic')!;
    expect(isRelevant(candidate(tags), generic)).toBe(expected);
  });

  it('món mở đầu bằng loại món: thử tiếng Việt, rồi "nguyên liệu + loại món", rồi chỉ loại món', () => {
    expect(buildAttempts('Cháo bí đỏ', null).map((a) => [a.match, a.lang, a.query])).toEqual([
      ['exact', 'vi', 'Cháo bí đỏ'],
      ['similar', 'en', 'pumpkin congee rice porridge'],
      ['generic', 'en', 'congee rice porridge vegetarian'],
    ]);
  });

  it('món mở đầu bằng nguyên liệu: dùng cách nấu + nguyên liệu', () => {
    expect(analyzeTitle('Đậu hũ xào sả ớt')).toMatchObject({ dish: null, ingredient: { en: 'tofu' }, method: 'stir fried' });
    expect(buildAttempts('Đậu hũ xào sả ớt', null)[1]).toMatchObject({ query: 'stir fried tofu', required: [['tofu']] });
  });

  it('cụm dài thắng cụm ngắn: "bánh mì" không bị hiểu là "bánh", "nước ép" không là "nước"', () => {
    expect(analyzeTitle('Bánh mì nấm kho').dish?.vi).toBe('bánh mì');
    expect(analyzeTitle('Nước ép dưa hấu')).toMatchObject({ dish: { vi: 'nước ép' }, ingredient: { vi: 'dưa hấu' } });
  });
});

describe('Script ảnh món: tham số dòng lệnh', () => {
  it('nhận cả kiểu PowerShell (limit=20) lẫn kiểu --limit 20', () => {
    expect(parseArgs(['limit=20', 'fresh'])).toEqual({ limit: '20', fresh: true });
    expect(parseArgs(['--limit', '20', '--retry-missing'])).toEqual({ limit: '20', 'retry-missing': true });
    expect(parseArgs(['reject=recipe-images-reject.txt'])).toEqual({ reject: 'recipe-images-reject.txt' });
  });
});

describe('Script ảnh món: từ điển nguyên liệu (lỗi thấy ở lần chạy đủ 633 món)', () => {
  it.each([
    ['Trà đá lá dứa', 'pandan'], // trước: "pineapple tea"
    ['Nước táo đỏ kỷ tử hạt sen', 'jujube'], // trước: "apple drink"
    ['Gỏi củ cải', 'radish'], // trước: "leafy greens salad"
    ['Đậu phụ nhồi cà chua', 'tofu'], // trước: "stuffed beans"
    ['Su su xào tỏi', 'chayote'], // trước: "winter melon"
  ])('%s -> nguyên liệu chính "%s"', (title, en) => {
    expect(analyzeTitle(title).ingredient?.en).toBe(en);
  });

  it('"Bánh hỏi" là bún lá, không phải bánh ngọt', () => {
    expect(analyzeTitle('Bánh hỏi nấm').dish?.en).toBe('rice vermicelli');
  });
});

describe('Script ảnh món: loại ảnh lạc đề', () => {
  it('"Đậu đen xào cà chua" không nhận ảnh hạt cà phê; "Matcha latte" vẫn nhận ảnh latte', () => {
    const coffee = candidate('coffee, beans, coffee beans, roasting');
    expect(buildAttempts('Đậu đen xào cà chua', null).some((a) => isRelevant(coffee, a))).toBe(false);
    const latte = candidate('matcha, latte, green tea, drink');
    expect(buildAttempts('Matcha latte sữa đậu nành', null).some((a) => isRelevant(latte, a))).toBe(true);
  });
});

