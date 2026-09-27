/* SawcoSMP store: rendering & effects. You normally don't need to edit this.
   Change js/config.js and js/products.js instead. */
(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const categories = window.STORE_PRODUCTS || [];
  const icon = window.PIXEL_ICONS || (() => "");
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Config text & links ---------- */
  $$("[data-config]").forEach(el => {
    const v = cfg[el.dataset.config];
    if (v) el.textContent = v; else if (v === "") el.hidden = true;
  });
  $$("[data-link]").forEach(el => { if (cfg[el.dataset.link]) el.href = cfg[el.dataset.link]; });
  $("#year").textContent = new Date().getFullYear();
  if (cfg.showPlaceholderIpTag) $("#ipPlaceholderTag").hidden = false;
  $$("[data-icon]").forEach(el => { el.innerHTML = icon(el.dataset.icon, el.dataset.color); });

  if (cfg.showExampleNotice) {
    const n = $("#devNotice");
    n.hidden = false;
    $("#devNoticeClose").addEventListener("click", () => { n.hidden = true; });
  }

  /* ---------- Toast + copy IP ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2400);
  }
  function fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (_) {}
    ta.remove();
  }
  function copyIp(btn) {
    const ip = cfg.serverIp || "";
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(ip).catch(() => fallbackCopy(ip));
    else fallbackCopy(ip);
    btn.classList.add("is-copied");
    setTimeout(() => btn.classList.remove("is-copied"), 1600);
    toast(`✔ Copied ${ip}. See you in-game!`);
  }
  $$("[data-copy-ip]").forEach(b => b.addEventListener("click", () => copyIp(b)));

  /* ---------- Nav solidifies on scroll ---------- */
  const nav = $("#nav");
  const onScrollNav = () => nav.classList.toggle("is-scrolled", window.scrollY > 24);
  onScrollNav();
  addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- Hero sky: stars, clouds, terrain ---------- */
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  (function stars() {
    const wrap = $("#stars"); let html = "";
    for (let i = 0; i < 90; i++) {
      const size = rand() < 0.15 ? 4 : rand() < 0.5 ? 3 : 2;
      html += `<i style="left:${(rand() * 100).toFixed(2)}%;top:${(rand() * 75).toFixed(2)}%;width:${size}px;height:${size}px;animation-delay:${(rand() * 4).toFixed(2)}s;animation-duration:${(2.5 + rand() * 3).toFixed(2)}s"></i>`;
    }
    wrap.innerHTML = html;
  })();

  (function clouds() {
    const shapes = [
      ["..xxxx......", ".xxxxxxx.xx.", "xxxxxxxxxxxx", ".xxxxxxxxxx."],
      ["...xxx...", ".xxxxxxx.", "xxxxxxxxx"],
      ["....xxxx.....", "..xxxxxxxxx..", "xxxxxxxxxxxxx", ".xxxxxxxxxxx."]
    ];
    const wrap = $("#clouds"); let html = "";
    for (let i = 0; i < 6; i++) {
      const s = shapes[i % shapes.length], w = s[0].length, h = s.length;
      let rects = "";
      s.forEach((row, y) => [...row].forEach((c, x) => { if (c === "x") rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02"/>`; }));
      const scale = 10 + rand() * 10, dur = 90 + rand() * 80;
      html += `<svg class="cloud" viewBox="0 0 ${w} ${h}" shape-rendering="crispEdges" style="width:${(w * scale).toFixed(0)}px;top:${(6 + rand() * 42).toFixed(1)}%;opacity:${(0.05 + rand() * 0.1).toFixed(2)};animation-duration:${dur.toFixed(0)}s;animation-delay:-${(rand() * dur).toFixed(0)}s">${rects}</svg>`;
    }
    wrap.innerHTML = html;
  })();

  function terrain(svg, { width = 1600, height, block, min, max, fill, top, seedVal }) {
    seed = seedVal;
    let x = 0, h = min + rand() * (max - min), d = `M0 ${height}`, grass = "";
    while (x < width) {
      const run = block * (1 + Math.floor(rand() * 3));
      h = Math.max(min, Math.min(max, h + (Math.floor(rand() * 3) - 1) * block));
      const y = height - h;
      d += ` L${x} ${y} L${x + run} ${y}`;
      if (top) grass += `<rect x="${x}" y="${y}" width="${run}" height="${block / 2}" fill="${top}"/>`;
      x += run;
    }
    d += ` L${width} ${height} Z`;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = `<path d="${d}" fill="${fill}"/>${grass}`;
  }
  terrain($("#terrainFar"), { height: 260, block: 32, min: 90, max: 220, fill: "#132a60", seedVal: 11 });
  terrain($("#terrainNear"), { height: 180, block: 24, min: 36, max: 120, fill: "#0a1533", top: "#1f5a3a", seedVal: 23 });

  // Parallax (skipped for reduced motion)
  if (!reduceMotion) {
    const layers = $$("[data-parallax]");
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return; ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, innerHeight);
        layers.forEach(l => { l.style.transform = `translate3d(0, ${(y * l.dataset.parallax).toFixed(1)}px, 0)`; });
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Live server status (mcsrvstat.us) with fallback ---------- */
  (function status() {
    const el = $("#status"), count = $("#playerCount"), label = $("#statusLabel");
    const set = (state, c, l) => { el.dataset.state = state; count.textContent = c; label.textContent = l; };
    const countUp = (to, suffix) => {
      if (reduceMotion || to === 0) { count.textContent = to; return; }
      const start = performance.now(), dur = 900;
      const step = t => {
        const p = Math.min(1, (t - start) / dur);
        count.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!cfg.serverIp) return set("unknown", "–", "status unavailable");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(cfg.serverIp), { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => {
        if (d && d.online) {
          const on = d.players ? d.players.online : 0;
          set("online", "0", on === 1 ? "player online" : "players online");
          countUp(on);
          $$(".nav__ip, .footer__ip").forEach(b => b.classList.add("is-online"));
        } else set("offline", "Soon", "server offline");
      })
      .catch(() => set("unknown", "–", "status unavailable"))
      .finally(() => clearTimeout(timer));
  })();

  /* ---------- Store ---------- */
  const cur = cfg.currency || "$";
  const priceHtml = p => {
    const [whole, cents] = Number(p).toFixed(2).split(".");
    return `<span class="price__cur">${esc(cur)}</span><span class="price__num">${whole}</span><span class="price__cents">.${cents}</span>`;
  };
  const buyUrl = item => (cfg.tebexUrl || "#").replace(/\/$/, "") + (item.tebexPath || "");

  $("#chips").innerHTML = categories.map(c =>
    `<a class="chip" href="#${esc(c.id)}">${esc(c.title)}<span>${c.items.length}</span></a>`).join("");

  $("#storeSections").innerHTML = categories.map(c => `
    <section class="category" id="${esc(c.id)}" aria-labelledby="h-${esc(c.id)}">
      <div class="category__head reveal">
        <h3 class="category__title" id="h-${esc(c.id)}"><span class="category__block" aria-hidden="true"></span>${esc(c.title)}</h3>
        <p class="category__sub">${esc(c.subtitle || "")}</p>
      </div>
      <p class="swipe-hint" aria-hidden="true">Swipe to see all ${c.items.length} →</p>
      <div class="grid grid--${c.items.length}">
        ${c.items.map(item => `
          <div class="card-wrap reveal">
            <article class="card${item.featured ? " card--featured" : ""}" style="--accent:${esc(item.color || "#ffb000")}">
              ${item.badge ? `<span class="ribbon">${esc(item.badge)}</span>` : ""}
              <div class="card__stage">
                <div class="card__icon">${icon(item.icon, item.color)}</div>
                <div class="card__platform" aria-hidden="true"></div>
              </div>
              <h4 class="card__name">${esc(item.name)}</h4>
              <div class="price" aria-label="${esc(cur)}${Number(item.price).toFixed(2)}">${priceHtml(item.price)}</div>
              <ul class="card__perks">${(item.perks || []).map(p => `<li>${esc(p)}</li>`).join("")}</ul>
              ${Array.isArray(item.kit) && item.kit.length ? `<button type="button" class="btn btn--kit btn--block" data-kit="${esc(c.id)}:${c.items.indexOf(item)}" aria-haspopup="dialog">
                <svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M1 1h6v6H1zM2 2v1h4V2zm0 2v2h4V4zm1 0h2v1H3z" fill-rule="evenodd"/></svg>
                Preview kit
              </button>` : ""}
              <a class="btn btn--buy btn--block" href="${esc(buyUrl(item))}" target="_blank" rel="noopener"
                 aria-label="Buy ${esc(item.name)} for ${esc(cur)}${Number(item.price).toFixed(2)}">
                Buy now
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5Z"/></svg>
              </a>
            </article>
          </div>`).join("")}
      </div>
      <div class="dots" aria-hidden="true">${c.items.map((_, i) => `<i${i ? "" : ' class="is-on"'}></i>`).join("")}</div>
    </section>`).join("");

  /* ---------- Kit preview modal ---------- */
  // Tiny 8x8 pixel icons for kit items. Palette per icon; "." = empty.
  const ITEM_ICONS = (() => {
    const shapes = {
      ingot:  ["........", "........", "..llll..", ".lmmmmd.", "lmmmmmdd", "dddddddk", "kkkkkkk.", "........"],
      log:    ["kkkkkkkk", "kmllllmk", "klmddmlk", "kldmmdlk", "kldmmdlk", "klmddmlk", "kmllllmk", "kkkkkkkk"],
      torch:  ["...ll...", "...lm...", "...md...", "...bb...", "...bb...", "...bb...", "...bb...", "...bd..."],
      bread:  ["........", "..llll..", ".lmmmml.", "lmdmdmml", "mmmmmmmd", ".dmmmmd.", "..dddd..", "........"],
      meat:   ["........", "...lmm..", "..lmmmd.", ".lmmmmd.", ".mmmmdd.", "w.mmdd..", "ww.dd...", ".w......"],
      carrot: [".....gg.", "....g.gg", "....lg..", "...lm...", "..lmd...", ".lmd....", ".md.....", "d......."],
      coal:   ["........", "..kkkk..", ".kmlmdk.", ".kmmmlk.", ".kdmmmk.", ".kkdmkk.", "..kkkk..", "........"],
      bottle: ["...kk...", "...bb...", "..kllk..", ".klmmmk.", ".kmmmmk.", ".kmmmdk.", "..kddk..", "...kk..."],
      gem:    ["...ll...", "..lmml..", ".lmmmmd.", "lmmmmmmd", ".dmmmdd.", "..dmdd..", "...dd...", "........"],
      block:  ["kkkkkkkk", "kmdmmlmk", "kmmdmmdk", "kldmmmmk", "kmmmdlmk", "kdmmmmmk", "kmmldmdk", "kkkkkkkk"],
      tag:    [".....kk.", "....kmlk", "...kmmdk", "..kmmmk.", ".kmmmk..", "kwmmk...", "kwwk....", ".kk....."],
      rocket: ["...ll...", "..lmml..", "..mmmd..", "..wwww..", "..mmmd..", "..mmmd..", "...bb...", "...bb..."],
      chest:  ["kkkkkkkk", "kmmmmmmk", "kmmmmmmk", "kkkllkkk", "kddllddk", "kddddddk", "kddddddk", "kkkkkkkk"]
    };
    const P = (m, l, d, extra) => Object.assign({ k: "#1a1206", m, l, d, w: "#f4efe4", b: "#7a4e22", g: "#3fa34d" }, extra);
    const items = {
      "iron ingot": ["ingot", P("#c9ced6", "#f2f4f7", "#8b929c")],
      "gold ingot": ["ingot", P("#ffc933", "#fff09a", "#c07a00")],
      "oak log": ["log", P("#b8894a", "#d8b074", "#6b4a26")],
      "torch": ["torch", P("#ffb000", "#fff3a0", "#ff6a00")],
      "bread": ["bread", P("#d0913a", "#f0c070", "#8a5a1e")],
      "cooked beef": ["meat", P("#8a4a2a", "#b87050", "#4e2410")],
      "cooked porkchop": ["meat", P("#c9875a", "#e8b48a", "#8a5030")],
      "golden carrot": ["carrot", P("#ffc933", "#fff09a", "#c07a00", { g: "#e8c040" })],
      "carrot": ["carrot", P("#ff8a1e", "#ffc070", "#b85000")],
      "coal": ["coal", P("#2e2e34", "#5a5a66", "#18181c", { k: "#0b0b0e" })],
      "bottle o' enchanting": ["bottle", P("#3ad0a0", "#b8fff0", "#1a7a70", { b: "#8a6a4a", k: "#0d2a33" })],
      "emerald": ["gem", P("#34d399", "#b6ffdc", "#0f8a5a")],
      "diamond": ["gem", P("#22d3ee", "#c8fbff", "#0891b2")],
      "obsidian": ["block", P("#2a1a44", "#6b4aa8", "#140a24", { k: "#08040f" })],
      "name tag": ["tag", P("#c8a070", "#ecd2a8", "#8a6440", { w: "#f4efe4" })],
      "firework rocket": ["rocket", P("#e04040", "#ff9a8a", "#8a1a1a", { b: "#7a4e22" })]
    };
    const fallback = ["chest", P("#b8894a", "#ffcf4a", "#6b4a26")];
    return name => {
      const [shape, pal] = items[String(name).toLowerCase()] || fallback;
      let rects = "";
      shapes[shape].forEach((row, y) => [...row].forEach((ch, x) => {
        if (ch !== "." && pal[ch]) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${pal[ch]}"/>`;
      }));
      return `<svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
    };
  })();

  const kitModal = document.createElement("div");
  kitModal.className = "kit-modal";
  kitModal.hidden = true;
  kitModal.innerHTML = `
    <div class="kit-modal__backdrop" data-kit-close></div>
    <div class="kit-modal__panel" role="dialog" aria-modal="true" aria-labelledby="kitTitle" aria-describedby="kitDesc" tabindex="-1">
      <button type="button" class="kit-modal__close" data-kit-close aria-label="Close kit preview">
        <svg viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true"><path fill="currentColor" d="M1 1h1v1h1v1h2V2h1V1h1v1H6v1H5v2h1v1h1v1H6V6H5V5H3v1H2v1H1V6h1V5h1V3H2V2H1z"/></svg>
      </button>
      <div class="kit-modal__head">
        <div class="kit-modal__icon" id="kitIcon" aria-hidden="true"></div>
        <div>
          <p class="kit-modal__eyebrow">Daily kit · 24h cooldown</p>
          <h2 class="kit-modal__title" id="kitTitle"></h2>
        </div>
      </div>
      <p class="kit-modal__desc" id="kitDesc"></p>
      <ul class="kit-grid" id="kitGrid"></ul>
      <p class="kit-modal__note">Contents may change as the server is updated.</p>
    </div>`;
  document.body.appendChild(kitModal);
  const kitPanel = $(".kit-modal__panel", kitModal);
  let kitReturnFocus = null, kitCloseTimer, kitInerted = [];

  function openKit(item, trigger) {
    clearTimeout(kitCloseTimer);
    kitReturnFocus = trigger || document.activeElement;
    kitPanel.style.setProperty("--accent", item.color || "#ffb000");
    $("#kitIcon").innerHTML = icon(item.icon, item.color);
    $("#kitTitle").textContent = `${item.name} kit`;
    const total = item.kit.length;
    $("#kitDesc").textContent = `Included with the ${item.name} rank. Claim it once every 24 hours. ${total} item stack${total === 1 ? "" : "s"}:`;
    const slots = Math.max(9, Math.ceil(total / 3) * 3);
    let html = "";
    for (let i = 0; i < slots; i++) {
      const k = item.kit[i];
      html += k
        ? `<li class="kit-slot" style="--i:${i}"><span class="kit-slot__icon">${ITEM_ICONS(k.item)}</span><span class="kit-slot__count" aria-hidden="true">${esc(k.amount)}</span><span class="kit-slot__name"><span class="sr-only">${esc(k.amount)} × </span>${esc(k.item)}</span></li>`
        : `<li class="kit-slot kit-slot--empty" aria-hidden="true"></li>`;
    }
    $("#kitGrid").innerHTML = html;
    kitModal.hidden = false;
    document.documentElement.classList.add("kit-open");
    kitInerted = [...document.body.children].filter(el => el !== kitModal && !el.inert);
    kitInerted.forEach(el => { el.inert = true; });
    requestAnimationFrame(() => { kitModal.classList.add("is-open"); kitPanel.focus({ preventScroll: true }); });
  }
  function closeKit() {
    if (kitModal.hidden) return;
    kitModal.classList.remove("is-open");
    document.documentElement.classList.remove("kit-open");
    kitInerted.forEach(el => { el.inert = false; });
    kitInerted = [];
    kitCloseTimer = setTimeout(() => { kitModal.hidden = true; }, reduceMotion ? 0 : 200);
    if (kitReturnFocus && kitReturnFocus.focus) kitReturnFocus.focus({ preventScroll: true });
  }
  $$("[data-kit]").forEach(btn => btn.addEventListener("click", () => {
    const [cid, idx] = btn.dataset.kit.split(":");
    const cat = categories.find(c => c.id === cid);
    const item = cat && cat.items[+idx];
    if (item) openKit(item, btn);
  }));
  kitModal.addEventListener("click", e => { if (e.target.closest("[data-kit-close]")) closeKit(); });
  document.addEventListener("keydown", e => {
    if (kitModal.hidden) return;
    if (e.key === "Escape") { e.preventDefault(); closeKit(); return; }
    if (e.key === "Tab") { // keep focus inside the dialog
      const f = $$('button, [href], [tabindex]:not([tabindex="-1"])', kitPanel);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === kitPanel)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Carousel dots (mobile) ---------- */
  $$(".category").forEach(sec => {
    const grid = $(".grid", sec), dots = $$(".dots i", sec);
    grid.addEventListener("scroll", () => {
      const cards = grid.children;
      if (!cards.length) return;
      const step = cards[0].getBoundingClientRect().width + 16;
      const max = grid.scrollWidth - grid.clientWidth;
      const idx = grid.scrollLeft >= max - 4 ? cards.length - 1 : Math.round(grid.scrollLeft / step);
      dots.forEach((d, i) => d.classList.toggle("is-on", i === idx));
    }, { passive: true });
  });

  /* ---------- 3D tilt on hover (desktop only) ---------- */
  if (finePointer && !reduceMotion) {
    $$(".card").forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--ry", (px * 10).toFixed(2) + "deg");
        card.style.setProperty("--rx", (-py * 10).toFixed(2) + "deg");
        card.style.setProperty("--mx", ((px + 0.5) * 100).toFixed(1) + "%");
        card.style.setProperty("--my", ((py + 0.5) * 100).toFixed(1) + "%");
      });
      card.addEventListener("pointerleave", () => { card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg"); });
    });
  }

  /* ---------- Active chip while scrolling ---------- */
  if ("IntersectionObserver" in window) {
    const chips = $$(".chip");
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) chips.forEach(c => c.classList.toggle("is-active", c.getAttribute("href") === "#" + e.target.id));
    }), { rootMargin: "-45% 0px -50% 0px" });
    $$(".category").forEach(s => spy.observe(s));
  }

  /* ---------- FAQ: only one open at a time ---------- */
  $$(".faq__item").forEach(d => d.addEventListener("toggle", () => {
    if (d.open) $$(".faq__item").forEach(o => { if (o !== d) o.open = false; });
  }));

  /* ---------- Scroll reveal ---------- */
  const els = $$(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("js-reveal");
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -60px 0px" });
    els.forEach(el => {
      const sib = el.parentElement ? [...el.parentElement.children].filter(c => c.classList.contains("reveal")) : [];
      el.style.transitionDelay = Math.max(0, sib.indexOf(el)) * 80 + "ms";
      io.observe(el);
    });
  } else {
    els.forEach(el => el.classList.add("is-in"));
  }
})();
