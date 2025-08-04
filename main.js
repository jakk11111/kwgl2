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

  // 初始化像素
  loadFbPixel(pixelId);

  // 设置主图背景
  const container = document.querySelector(".container");
  if (container) container.style.backgroundImage = `url('${randomBg}')`;

  // 点击主图（container）：回传 Purchase + 跳转
  if (container) {
    container.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq('track', 'Purchase', {
          value: 0.00,
          currency: 'INR',
          content_name: 'Main Container',
          content_type: 'product',
          content_ids: ['main-container'],
          contents: [{ id: 'main-container', quantity: 1 }],
        });
      }
      setTimeout(() => {
        window.location.href = apk;
      }, 200);
    });
  }

  // 点击底部按钮：回传 Purchase + 跳转
  const bottomBtn = document.getElementById("bottomBtn");
  if (bottomBtn) {
    bottomBtn.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq('track', 'Purchase', {
          value: 0.00,
          currency: 'INR',
          content_name: 'Bottom Button',
          content_type: 'product',
          content_ids: ['bottom-btn'],
          contents: [{ id: 'bottom-btn', quantity: 1 }],
        });
      }
      setTimeout(() => {
        window.location.href = apk;
      }, 200);
    });
  }

  // WhatsApp 点击追踪
  const waBtn = document.getElementById("waBtn");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq('track', 'Contact', { method: 'WhatsApp' });
      }
    });
  }

  // 倒计时逻辑
  const cd = document.getElementById('countdown');
  if (cd) {
    let t = 180;
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

// Facebook Pixel 封装
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
