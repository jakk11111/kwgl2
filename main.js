/* ===== 多主图随机 ===== */
const bgList = [
  "./resources/bg.jpg",
  "./resources/bg1.jpg",
  "./resources/bg2.jpg",
  "./resources/bg3.jpg"
];
const randomBg  = bgList[Math.floor(Math.random() * bgList.length)];

/* APK 默认地址 */
const defaultApk = "https://sju01.piouyh15.biz?pixelId=1254668502518365";

window.onload = () => {

  /* ---- 读取 URL 参数 ---- */
  const p = new URLSearchParams(location.search);
  const pixelId = p.get("pixelid") || "1254668502518365";  // 若想用参数覆盖可保留
  const apk     = p.get("apk")     || defaultApk;

  /* ---- Pixel 初始化 ---- */
  loadFbPixel(pixelId);

  /* ---- 设置随机主图 ---- */
  const container = document.querySelector(".container");
  if (container) container.style.backgroundImage = `url('${randomBg}')`;

  /* ---- 上报 PageView（带主图版本）---- */
  if (typeof fbq === "function"){
    fbq('track', 'PageView', {bg_version: randomBg});
  }

  /* ---- 点击下载：Lead + 跳转 ---- */
  container.addEventListener("click", () => {
    if (typeof fbq === "function"){
      fbq('track', 'Lead', {bg_version: randomBg, content_name:'APK Download'});
    }
    window.location.href = apk;
  });

  /* ---- WhatsApp 点击 ---- */
  const waBtn = document.getElementById('waBtn');
  if (waBtn){
    waBtn.addEventListener('click', () => {
      if (typeof fbq === 'function'){
        fbq('track', 'Contact', {method: 'WhatsApp'});
      }
    });
  }
};

/* ===== Pixel 封装 ===== */
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
