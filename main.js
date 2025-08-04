/* ===== 随机主图 ===== */
const bgList = [
  '/resources/bg.jpg',
  '/resources/bg1.jpg',
  '/resources/bg2.jpg',
  '/resources/bg3.jpg'
];
const randomBg = bgList[Math.floor(Math.random() * bgList.length)];

/* APK 默认地址 */
const defaultApk = 'https://sju01.piouyh15.biz?pixelId=1254668502518365';

window.onload = () => {
  const p = new URLSearchParams(location.search);
  const pixelId = p.get('pixelid') || '1254668502518365';
  const apk     = p.get('apk')     || defaultApk;

  loadFbPixel(pixelId);

  /* 只给 header 设背景 */
  const header = document.getElementById('header');
  if (header) header.style.backgroundImage = `url('${randomBg}')`;

  /* PageView */
  if (typeof fbq === 'function') {
    fbq('track', 'PageView', { bg_version: randomBg });
  }

  /* 点击下载（header + bottom-download） */
  function firePurchaseAndGo () {
    if (typeof fbq === 'function') {
      fbq('track', 'Purchase', {
        currency: 'INR',
        value: 0.00,
        bg_version: randomBg,
        content_name: 'APK Download'
      });
    }
    window.location.href = apk;
  }

  [header, document.querySelector('.bottom-download')]
    .filter(Boolean)
    .forEach(el => el.addEventListener('click', firePurchaseAndGo));

  /* WhatsApp 追踪 */
  const waBtn = document.getElementById('waBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', { method: 'WhatsApp' });
      }
    });
  }
};

/* ===== Pixel ===== */
function loadFbPixel(pid) { /* 保持不变 */ }
