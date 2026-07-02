(function () {
  var SIGNALS = [
    {
      id: "001",
      label: "NOXA LAUNCH",
      code: "NX-01",
      text: "signal intercepted: $METAHOOD deploying on NOXA. robinhood chain confirmed. hood stays on. trenches notified.",
      stamp: "HOOD APPROVED",
    },
    {
      id: "002",
      label: "LP LOCKED",
      code: "LP-77",
      text: "liquidity pool sealed permanently. no migration. no rug. only hood. vault access: denied to paper hands.",
      stamp: "LP LOCKED",
    },
    {
      id: "003",
      label: "ANON MODE",
      code: "AN-42",
      text: "connecting wallet: optional. connecting your hood: mandatory. identity stripped. fox off-grid. vibes immaculate.",
      stamp: "ANON ON",
    },
    {
      id: "004",
      label: "FUD FILTER",
      code: "FV-09",
      text: 'incoming noise: "scam" "rug" "going to zero". fud vault absorbing. all fudders rekt. silence restored.',
      stamp: "FUD FILTERED",
    },
    {
      id: "005",
      label: "GAS TANK",
      code: "GS-00",
      text: "robinhood chain gas: basically free. tank reading empty but tx still confirming. hood council not concerned.",
      stamp: "GAS OK",
    },
    {
      id: "006",
      label: "HOOD UPGRADE",
      code: "HU-88",
      text: "equality patch deployed. equally anon. equally degen. equally in the hood. fox upgrade complete.",
      stamp: "UPGRADED",
    },
  ];

  var TWITTER = "https://x.com/MetaHoodX";
  var typeTimer = null;

  function mount() {
    var root = document.getElementById("hood-signal-root");
    if (!root) {
      var section = document.getElementById("dispatches");
      if (!section) return;
      var inner = section.querySelector(".relative.mx-auto");
      if (!inner) return;
      inner.innerHTML =
        '<div class="flex flex-col text-left items-start">' +
        '<p class="font-mono text-xs uppercase tracking-widest text-red-primary mb-4">◈ INTERCEPT FEED</p>' +
        '<h2 class="font-section text-[clamp(1.8rem,3vw,2.8rem)] font-bold uppercase leading-[1.1] text-cream mb-[28px]">HOOD SIGNAL</h2>' +
        '<p class="text-xl text-cream/60 max-w-2xl">intercept transmissions from the hood. click a blip on the radar to decode.</p>' +
        "</div>" +
        '<div id="hood-signal-root" class="mt-8"></div>';
      root = document.getElementById("hood-signal-root");
      if (!root) return;
    }

    if (root.querySelector(".hood-radar")) return;

    root.innerHTML =
      '<div class="hood-signal-layout">' +
      '  <div class="hood-radar-wrap">' +
      '    <div class="hood-radar" role="img" aria-label="Hood signal radar">' +
      '      <svg class="hood-radar-svg" viewBox="0 0 400 400" aria-hidden="true">' +
      '        <circle cx="200" cy="200" r="188" class="hood-radar-ring hood-radar-ring-outer"/>' +
      '        <circle cx="200" cy="200" r="140" class="hood-radar-ring"/>' +
      '        <circle cx="200" cy="200" r="92" class="hood-radar-ring"/>' +
      '        <circle cx="200" cy="200" r="44" class="hood-radar-ring"/>' +
      '        <line x1="200" y1="12" x2="200" y2="388" class="hood-radar-cross"/>' +
      '        <line x1="12" y1="200" x2="388" y2="200" class="hood-radar-cross"/>' +
      '        <line x1="56" y1="56" x2="344" y2="344" class="hood-radar-cross hood-radar-cross-dim"/>' +
      '        <line x1="344" y1="56" x2="56" y2="344" class="hood-radar-cross hood-radar-cross-dim"/>' +
      '        <g class="hood-radar-sweep">' +
      '          <path d="M200 200 L200 12 A188 188 0 0 1 368 128 Z" class="hood-radar-sweep-wedge"/>' +
      '          <line x1="200" y1="200" x2="200" y2="12" class="hood-radar-sweep-line"/>' +
      "        </g>" +
      '        <circle cx="200" cy="200" r="5" class="hood-radar-core"/>' +
      "      </svg>" +
      '      <div class="hood-radar-blips" id="hood-radar-blips"></div>' +
      '      <div class="hood-radar-hud">' +
      '        <span class="hood-radar-hud-label">HOOD SIGNAL</span>' +
      '        <span class="hood-radar-hud-status loop-dot-pulse">SCANNING</span>' +
      "      </div>" +
      "    </div>" +
      "  </div>" +
      '  <div class="hood-transmission-panel red-glow">' +
      '    <div class="hood-transmission-header">' +
      '      <span class="font-mono text-[10px] uppercase tracking-widest text-cream/40">INTERCEPTED TRANSMISSION</span>' +
      '      <span class="font-mono text-[10px] uppercase tracking-widest text-red-primary" id="hood-signal-code">---</span>' +
      "    </div>" +
      '    <h3 class="font-display text-2xl tracking-widest text-gold lg:text-3xl" id="hood-signal-title">SELECT A BLIP</h3>' +
      '    <p class="mt-4 min-h-[5.5rem] font-body text-lg leading-relaxed text-cream/80" id="hood-signal-text">click a signal on the radar to decode the transmission.</p>' +
      '    <div class="mt-4 flex flex-wrap items-center gap-3">' +
      '      <span class="hood-stamp hidden" id="hood-signal-stamp"></span>' +
      '      <span class="font-mono text-[10px] uppercase tracking-widest text-cream/30" id="hood-signal-file">FILE ◈ ---</span>' +
      "    </div>" +
      '    <div class="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.18)_2px,rgba(0,0,0,0.18)_3px)] opacity-30"></div>' +
      "  </div>" +
      "</div>" +
      '<p class="mt-8 text-center font-mono text-xs uppercase tracking-widest text-cream/40">click blips to intercept // 6 signals detected</p>';

    var blipsRoot = document.getElementById("hood-radar-blips");
    var radius = 38;

    SIGNALS.forEach(function (signal, index) {
      var angle = (index / SIGNALS.length) * Math.PI * 2 - Math.PI / 2;
      var x = 50 + Math.cos(angle) * radius;
      var y = 50 + Math.sin(angle) * radius;
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hood-radar-blip loop-dot-pulse";
      btn.style.left = x + "%";
      btn.style.top = y + "%";
      btn.style.animationDelay = index * 0.35 + "s";
      btn.setAttribute("aria-label", "Intercept signal " + signal.label);
      btn.setAttribute("data-index", String(index));
      btn.innerHTML =
        '<span class="hood-radar-blip-core"></span>' +
        '<span class="hood-radar-blip-label">' +
        signal.code +
        "</span>";
      btn.addEventListener("click", function () {
        selectSignal(index);
      });
      blipsRoot.appendChild(btn);
    });

    var footer = document.createElement("div");
    footer.className = "mt-12 text-center";
    footer.innerHTML =
      '<a href="' +
      TWITTER +
      '" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border-2 border-red-primary/40 bg-soviet-black/60 px-6 py-3 font-display text-sm tracking-widest text-cream/70 transition hover:border-red-primary hover:text-cream">MONITOR ALL TRANSMISSIONS →</a>';
    root.appendChild(footer);

    selectSignal(0);
  }

  function selectSignal(index) {
    var signal = SIGNALS[index];
    if (!signal) return;

    document.querySelectorAll(".hood-radar-blip").forEach(function (btn, i) {
      btn.classList.toggle("hood-radar-blip-active", i === index);
    });

    document.getElementById("hood-signal-code").textContent = signal.code;
    document.getElementById("hood-signal-title").textContent = signal.label;
    document.getElementById("hood-signal-file").textContent =
      "FILE ◈ " + signal.id;

    var stamp = document.getElementById("hood-signal-stamp");
    stamp.textContent = signal.stamp;
    stamp.classList.remove("hidden");
    stamp.classList.remove("animate-stamp");
    void stamp.offsetWidth;
    stamp.classList.add("animate-stamp");

    typeText(signal.text);
  }

  function typeText(text) {
    var el = document.getElementById("hood-signal-text");
    if (!el) return;
    if (typeTimer) clearInterval(typeTimer);
    el.textContent = "";
    var i = 0;
    typeTimer = setInterval(function () {
      el.textContent += text.charAt(i);
      i += 1;
      if (i >= text.length) clearInterval(typeTimer);
    }, 18);
  }

  function boot() {
    mount();
    window.setTimeout(mount, 0);
    window.setTimeout(mount, 100);
    window.setTimeout(mount, 500);
    window.setTimeout(mount, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
