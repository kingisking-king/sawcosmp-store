/* SawcoSMP store — rendering & behaviour. You normally don't need to edit this;
   change js/config.js and js/products.js instead. */
(function () {
  "use strict";
  const cfg = window.SITE_CONFIG || {};
  const categories = window.STORE_PRODUCTS || [];
  const icon = window.PIXEL_ICONS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // Fill config text + links
  $$("[data-config]").forEach(el => {
    const v = cfg[el.dataset.config];
    if (v) el.textContent = v; else if (v === "") el.hidden = true;
  });
  $$("[data-link]").forEach(el => { if (cfg[el.dataset.link]) el.href = cfg[el.dataset.link]; });
  $("#year").textContent = new Date().getFullYear();
  if (cfg.showPlaceholderIpTag) $("#ipPlaceholderTag").hidden = false;

  // Dev notice
  if (cfg.showExampleNotice) {
    const n = $("#devNotice");
    n.hidden = false;
    $("#devNoticeClose").addEventListener("click", () => { n.hidden = true; });
  }

  // Toast
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-visible"), 2200);
  }

  // Copy IP
  $("#copyIp").addEventListener("click", async () => {
    const ip = cfg.serverIp;
    try {
      await navigator.clipboard.writeText(ip);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = ip; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch (_) {}
      ta.remove();
    }
    const label = $("#copyIp span");
    label.textContent = "Copied!";
    setTimeout(() => (label.textContent = "Copy IP"), 1800);
    toast(`Copied ${ip} — see you in-game!`);
  });

  // Live server status (mcsrvstat.us) with graceful fallback
  (function status() {
    const el = $("#status"), text = $(".status__text", el);
    const setState = (state, msg) => { el.dataset.state = state; text.textContent = msg; };
    if (!cfg.serverIp) return setState("unknown", "Status unavailable");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 7000);
    fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(cfg.serverIp), { signal: ctrl.signal })
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => {
        if (d && d.online) {
          const on = d.players ? d.players.online : 0, max = d.players ? d.players.max : 0;
          setState("online", `Online · ${on}${max ? " / " + max : ""} playing`);
        } else {
          setState("offline", "Server offline · coming soon");
        }
      })
      .catch(() => setState("unknown", "Status unavailable"))
      .finally(() => clearTimeout(timer));
  })();

  // Store rendering
  const money = p => (cfg.currency || "$") + Number(p).toFixed(2);
  const buyUrl = item => (cfg.tebexUrl || "#").replace(/\/$/, "") + (item.tebexPath || "");

  $("#chips").innerHTML = categories.map(c =>
    `<a class="chip" href="#${esc(c.id)}">${esc(c.title)} <span>${c.items.length}</span></a>`).join("");

  $("#storeSections").innerHTML = categories.map(c => `
    <section class="category" id="${esc(c.id)}" aria-labelledby="h-${esc(c.id)}">
      <div class="category__head">
        <h3 class="category__title" id="h-${esc(c.id)}">${esc(c.title)}</h3>
        <p class="category__sub">${esc(c.subtitle || "")}</p>
      </div>
      ${c.items.length > 1 ? `<p class="swipe-hint" aria-hidden="true">Swipe to see all ${c.items.length} →</p>` : ""}
      <div class="grid">
        ${c.items.map(item => `
          <article class="card reveal" style="--card-accent:${esc(item.color || "var(--gold)")}">
            ${item.badge ? `<span class="card__badge">${esc(item.badge)}</span>` : ""}
            <div class="card__icon">${icon ? icon(item.icon, item.color) : ""}</div>
            <h4 class="card__name">${esc(item.name)}</h4>
            <div class="card__price">${money(item.price)}</div>
            <ul class="card__perks">
              ${(item.perks || []).map(p => `<li>${esc(p)}</li>`).join("")}
            </ul>
            <a class="btn btn--primary btn--block card__buy" href="${esc(buyUrl(item))}" target="_blank" rel="noopener"
               aria-label="Buy ${esc(item.name)} for ${money(item.price)}">Buy now</a>
          </article>`).join("")}
      </div>
    </section>`).join("");

  // Reveal-on-scroll animation
  const els = $$(".reveal");
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    }), { rootMargin: "0px 0px -40px 0px" });
    els.forEach((el, i) => { el.style.transitionDelay = (i % 4) * 60 + "ms"; io.observe(el); });
  } else {
    els.forEach(el => el.classList.add("is-in"));
  }
})();
