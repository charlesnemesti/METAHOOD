(function () {
  var loader = document.getElementById("hood-loader");
  if (!loader || loader.dataset.dismissed === "1") return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var minMs = reducedMotion ? 800 : 3000;
  var pageStart =
    window.__hoodLoadStart ||
    (typeof performance !== "undefined" && performance.timeOrigin
      ? performance.timeOrigin
      : Date.now());
  var fadeMs = reducedMotion ? 150 : 550;
  var loadDone = document.readyState === "complete";
  var scheduled = false;

  document.body.style.overflow = "hidden";

  function hideLoader() {
    loader.classList.add("hood-loader-out");
    window.setTimeout(function () {
      loader.remove();
      document.body.style.overflow = "";
    }, fadeMs);
  }

  function scheduleDismiss() {
    if (scheduled || !loadDone) return;
    scheduled = true;
    loader.dataset.dismissed = "1";

    var wait = Math.max(0, minMs - (Date.now() - pageStart));
    window.setTimeout(hideLoader, wait);
  }

  function onLoad() {
    loadDone = true;
    scheduleDismiss();
  }

  window.addEventListener("load", onLoad, { once: true });
  if (loadDone) scheduleDismiss();
})();
