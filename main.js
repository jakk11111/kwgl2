/* ===== 多主图随机 ===== */
const bgList = [
  "./resources/bg.jpg",
  "./resources/bg1.jpg",
  "./resources/bg2.jpg",
  "./resources/bg3.jpg"
];
const randomBg = bgList[Math.floor(Math.random() * bgList.length)];
const defaultApk = "https://sju01.piouyh15.biz?pixelId=1254668502518365";

window.onload = () => {
  const p = new URLSearchParams(location.search);
  const pixelId = p.get("pixelid") || "1254668502518365";
  const apk     = p.get("apk") || defaultApk;

  loadFbPixel(pixelId);

  /* ===== 设置主图背景（只设置 container，不动 header）===== */
  const container = document.querySelector(".container");
  if (container) container.style.backgroundImage = `url('${randomBg}')`;

  /* ===== PageView 事件 ===== */
  if (typeof fbq === "function") {
    fbq('track', 'PageView', { bg_version: randomBg });
  }

  /* ===== 主图点击绑定 ===== */
  const header = document.getElementById("header");
  if (header) {
    header.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq('track', 'Purchase', {
          value: 0.00,
          currency: 'INR',
          bg_version: randomBg,
          content_name: 'Header Click'
        });
      }

      // ✅ 加 200ms 延迟，避免像素事件丢失
      setTimeout(() => {
        window.location.href = apk;
      }, 200);
    });
  }

  /* ===== Container 区域点击绑定 ===== */
  if (container) {
    container.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq('track', 'Lead', {
          bg_version: randomBg,
          content_name: 'APK Download'
        });
      }
      window.location.href = apk;
    });
  }

  /* ===== WhatsApp 按钮追踪 ===== */
  const waBtn = document.getElementById('waBtn');
  if (waBtn) {
    waBtn.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', { method: 'WhatsApp' });
      }
    });
  }
};

/* ===== Pixel 封装函数 ===== */
function loadFbPixel(pid) {
  !(function(f,b,e,v,n,t,s){
    if(f.fbq)return; n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0';
    n.queue=[]; t=b.createElement(e); t.async=!0;
    t.src=v; s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s);
  })(window, document, 'script',
    'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', pid);
}
