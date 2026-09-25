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
              <a class="btn btn--buy btn--block" href="${esc(buyUrl(item))}" target="_blank" rel="noopener"
                 aria-label="Buy ${esc(item.name)} for ${esc(cur)}${Number(item.price).toFixed(2)}">
                Buy now
                <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2l-4.6-4.6L13 5Z"/></svg>
              </a>
            </article>
          </div>`).join("")}
      </div>
    </section>`).join("");

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
