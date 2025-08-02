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

  // URL decode apk 参数
  const apk = decodeURIComponent(p.get("apk") || defaultApk);

  loadFbPixel(pixelId);
  const bg_version = randomBg;

  // 设置主图背景
  const container = document.querySelector(".container");
  if (container) {
    container.style.backgroundImage = `url('${bg_version}')`;
  }

  // 主图点击 -> Purchase + 跳转
  const header = document.getElementById("header");
  if (header) {
    header.addEventListener("click", () => {
      handlePurchaseClick(apk, "HeaderImage", bg_version);
    });
  }

  // 下载按钮点击 -> Purchase + 跳转
  const bottomBtn = document.getElementById("bottomBtn");
  if (bottomBtn) {
    bottomBtn.setAttribute("data-apk", apk);
    bottomBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handlePurchaseClick(apk, "DownloadButton", bg_version);
    });
  }

  // WhatsApp按钮点击
  const waBtn = document.getElementById("waBtn");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      if (typeof fbq === "function") {
        fbq('track', 'Contact', { method: "WhatsApp" });
      }
    });
  }

  // 页面加载打 PageView
  if (typeof fbq === "function") {
    fbq('track', 'PageView', { bg_version });
  }

  // 倒计时功能
  const cd = document.getElementById("countdown");
  if (cd) {
    let t = 180;
    const tick = () => {
      if (t <= 0) {
        cd.textContent = "00:00";
        return;
      }
      t--;
      const min = String(Math.floor(t / 60)).padStart(2, '0');
      const sec = String(t % 60).padStart(2, '0');
      cd.textContent = `${min}:${sec}`;
    };
    tick();
    setInterval(tick, 1000);
  }
};

function handlePurchaseClick(apk, source, bg_version) {
  if (typeof fbq === "function") {
    fbq('track', 'Purchase', {
      source,
      bg_version,
      value: 0.0,
      currency: 'INR'
    });
  }

  setTimeout(() => {
    window.location.href = apk;
  }, 300); // 确保 Pixel 有时间上传
}

function loadFbPixel(pid) {
  !(function(f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ?
        n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script',
    'https://connect.facebook.net/en_US/fbevents.js');

  fbq('init', pid);
}
