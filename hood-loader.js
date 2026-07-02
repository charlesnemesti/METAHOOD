(function () {
  var loader = document.getElementById("hood-loader");
  if (!loader) return;

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var minMs = reducedMotion ? 800 : 3000;

  function dismiss() {
    var start = loader.dataset.start
      ? Number(loader.dataset.start)
      : Date.now();
    var wait = Math.max(0, minMs - (Date.now() - start));
    window.setTimeout(function () {
      loader.classList.add("hood-loader-out");
      window.setTimeout(function () {
        loader.remove();
      }, reducedMotion ? 150 : 550);
    }, wait);
  }

  loader.dataset.start = String(Date.now());

  if (document.readyState === "complete") {
    dismiss();
  } else {
    window.addEventListener("load", dismiss, { once: true });
  }
})();
