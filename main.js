/* ===== 多主图随机 ===== */
const bgList = [
  "./resources/bg.jpg",
  "./resources/bg1.jpg",
  "./resources/bg2.jpg",
  "./resources/bg3.jpg"
];
const randomBg = bgList[Math.floor(Math.random() * bgList.length)];

/* APK 默认地址 */
const defaultApk = "https://kwgl2.pages.dev/";

window.onload = () => {
  const p = new URLSearchParams(location.search);
  const pixelId = p.get("pixelid") || "1254668502518365";
  const apk = p.get("apk") || defaultApk;

  loadFbPixel(pixelId);

  const container = document.querySelector(".container");
  if (container) {
    container.style.backgroundImage = `url('${randomBg}')`;
    container.addEventListener("click", () => handleDownloadClick(apk));
  }

  const header = document.getElementById("header");
  if (header) {
    header.addEventListener("click", () => handleDownloadClick(apk));
  }

  if (typeof fbq === "function") {
    fbq('track', 'PageView', { bg_version: randomBg });
  }

  const waBtn = document.getElementById('waBtn');
  if (waBtn){
    waBtn.addEventListener('click', () => {
      if (typeof fbq === 'function'){
        fbq('track', 'Contact', { method: 'WhatsApp' });
      }
    });
  }

  // 倒计时
  const cd = document.getElementById('countdown');
  if (cd) {
    let t = 3 * 60;
    function tick() {
      if (t <= 0) {
        cd.textContent = '00:00';
        return;
      }
      t--;
      const min = String(Math.floor(t / 60)).padStart(2, '0');
      const sec = String(t % 60).padStart(2, '0');
      cd.textContent = `${min}:${sec}`;
    }
    tick();
    setInterval(tick, 1000);
  }
};

/* ===== 点击下载行为 ===== */
function handleDownloadClick(apk) {
  const bg_version = document.querySelector(".container")?.style.backgroundImage || "unknown";

  if (typeof fbq === "function") {
    fbq('track', 'Lead', { bg_version, content_name: 'APK Download' });
    fbq('track', 'Download');
  }

  window.location.href = apk;
}

/* ===== Pixel 封装 ===== */
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
