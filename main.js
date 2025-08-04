// ===== 多主图随机 =====
const bgList = [
  "./resources/bg.jpg",
  "./resources/bg1.jpg",
  "./resources/bg2.jpg",
  "./resources/bg3.jpg"
];
const randomBg  = bgList[Math.floor(Math.random() * bgList.length)];
const defaultApk = "https://sju01.piouyh15.biz?pixelId=1254668502518365";

window.onload = () => {
  const p = new URLSearchParams(location.search);
  const pixelId = p.get("pixelid") || "1254668502518365";
  const apk     = p.get("apk")     || defaultApk;

  loadFbPixel(pixelId);

  // 设置 container 背景图（主图）
  const container = document.querySelector(".container");
  if (container) container.style.backgroundImage = `url('${randomBg}')`;

  // PageView 上报
  if (typeof fbq === "function") {
    fbq('track', 'PageView', { bg_version: randomBg });
  }

  // WhatsApp 点击上报
  const waBtn = document.getElementById('waBtn');
  if (waBtn){
    waBtn.addEventListener('click', () => {
      if (typeof fbq === 'function') {
        fbq('track', 'Contact', { method: 'WhatsApp' });
      }
    });
  }
};

// ===== Pixel 封装 =====
function loadFbPixel(pid){
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
