import { writeFileSync } from 'fs';
import { join, resolve } from 'path';
import { hasImage, loadMap } from './recipe-image-map';

/**
 * BƯỚC 2/4: tạo trang backend/recipe-images-review.html để lướt xem toàn bộ ảnh đã chọn.
 * Tích vào ảnh SAI (dính thịt cá, không đúng món...), bấm "Sao chép danh sách", dán vào file
 * backend/recipe-images-reject.txt rồi chạy:  npm run images:fetch reject=recipe-images-reject.txt
 * Lặp lại đến khi ổn, rồi sang bước 3: npm run images:cloudinary
 *
 * Chạy:  npm run images:review
 */

const OUTPUT = resolve(join(__dirname, '..', '..', '..', 'recipe-images-review.html'));

const LABEL: Record<string, string> = { exact: 'đúng món', similar: 'gần đúng', generic: 'minh hoạ chung' };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function main() {
  const map = loadMap();
  const entries = Object.entries(map);
  // Ảnh minh hoạ chung lên đầu: dễ sai nhất, cần xem kỹ nhất.
  const rank = { generic: 0, similar: 1, exact: 2 } as const;
  const withImage = entries
    .filter(([, e]) => hasImage(e))
    .sort(([, a], [, b]) => (hasImage(a) && hasImage(b) ? rank[a.match ?? 'exact'] - rank[b.match ?? 'exact'] : 0));
  const count = (m: string) => withImage.filter(([, e]) => hasImage(e) && (e.match ?? 'exact') === m).length;
  const missing = entries.filter(([, e]) => !hasImage(e)).map(([t]) => t);

  const cards = withImage
    .map(([title, e]) => {
      if (!hasImage(e)) return '';
      return `<label class="card" data-title="${esc(title)}">
  <img loading="lazy" src="${esc(e.url)}" alt="${esc(title)}">
  <div class="meta"><span><input type="checkbox"> <b>${esc(title)}</b> <i class="m-${esc(e.match ?? 'exact')}">${LABEL[e.match ?? 'exact']}${e.shared ? ' · dùng chung' : ''}</i></span>
  <small>${esc(e.provider)} · "${esc(e.query)}" · <a href="${esc(e.source_url)}" target="_blank" rel="noopener">nguồn</a></small>
  <small class="desc">${esc(e.description)}</small></div>
</label>`;
    })
    .join('\n');

  const html = `<!doctype html><html lang="vi"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Xem lại ảnh món ăn</title>
<style>
body{font-family:system-ui,sans-serif;margin:0;background:#f5f5f4;color:#1c1917}
header{position:sticky;top:0;background:#fff;border-bottom:1px solid #e7e5e4;padding:12px 16px;display:flex;gap:12px;align-items:center;flex-wrap:wrap;z-index:1}
button{background:#047857;color:#fff;border:0;border-radius:8px;padding:8px 14px;font-weight:600;cursor:pointer}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;padding:16px}
.card{background:#fff;border:2px solid transparent;border-radius:12px;overflow:hidden;cursor:pointer;display:block}
.card:has(input:checked){border-color:#dc2626;opacity:.6}
.card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;background:#e7e5e4}
.meta{padding:8px 10px;font-size:13px;display:grid;gap:4px}
small{color:#78716c}.desc{font-size:11px}
i{font-style:normal;font-size:11px;padding:1px 6px;border-radius:99px;white-space:nowrap}
.m-exact{background:#d1fae5;color:#065f46}.m-similar{background:#fef3c7;color:#92400e}.m-generic{background:#fee2e2;color:#991b1b}
details{padding:0 16px 24px}
</style></head><body>
<header><b>${withImage.length} món có ảnh (${count('exact')} đúng món · ${count('similar')} gần đúng · ${count('generic')} minh hoạ chung) · ${missing.length} món chưa có</b>
<span>Tích vào ảnh <b>sai</b> (dính thịt cá, không đúng món), rồi:</span>
<button id="copy">Sao chép danh sách ảnh sai (<span id="n">0</span>)</button>
<span id="msg"></span></header>
<div class="grid">${cards}</div>
<details><summary>${missing.length} món chưa có ảnh</summary><p>${missing.map(esc).join('<br>')}</p></details>
<script>
const boxes=[...document.querySelectorAll('.card input')];
const n=document.getElementById('n');
boxes.forEach(b=>b.addEventListener('change',()=>{n.textContent=boxes.filter(x=>x.checked).length}));
document.getElementById('copy').onclick=async()=>{
  const titles=boxes.filter(x=>x.checked).map(x=>x.closest('.card').dataset.title).join('\\n');
  try{await navigator.clipboard.writeText(titles);document.getElementById('msg').textContent='Đã chép. Dán vào backend/recipe-images-reject.txt';}
  catch{prompt('Chép danh sách này:',titles);}
};
</script></body></html>`;

  writeFileSync(OUTPUT, html, 'utf8');
  console.log(`Đã tạo ${OUTPUT}`);
  console.log(`${withImage.length} món có ảnh, ${missing.length} món chưa có. Mở file bằng trình duyệt để xem.`);
}

main();
