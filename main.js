const bgList = ["./resources/bg.jpg",
                "./resources/bg1.jpg",
                "./resources/bg2.jpg",
                "./resources/bg3.jpg"];

const randomBg = bgList[Math.floor(Math.random() * bgList.length)];
const defaultApk = "https://kwgs.live/app2";

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const pixelId = urlParams.get("pixelid") || "";
  const apk = urlParams.get("apk") || defaultApk;

  if (pixelId) {
    loadFbPixel(pixelId);
  }

  const container = document.querySelector(".container");document.querySelector(".container").style.backgroundImage = 
      `url('${randomBg}')`;
  fbq('track', 'Lead', {content_name: 'APK Download'});
  container.addEventListener("click", () => {window.location.href = apk;});
};fbq('track', 'PageView', {bg_version: randomBg});

function loadFbPixel(pixelId) {
  !(function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod
        ? n.callMethod.apply(n, arguments)
        : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = "2.0";
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = "https://connect.facebook.net/en_US/fbevents.js";
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, "script");

  fbq("init", pixelId);
  fbq("track", "PageView");
}
document.getElementById('waBtn').addEventListener('click', () => {
  if (typeof fbq === 'function') {
    fbq('track', 'Contact', {method: 'WhatsApp'});
  }
});
