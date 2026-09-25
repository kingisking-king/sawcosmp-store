/* Pixel-art icons drawn as SVG. Each icon is a 12x12 grid.
   Palette keys:  a = card accent color, l = light highlight, d = dark shade,
                  k = outline, w = white, b = wood/brown, g = gray, . = empty */
window.PIXEL_ICONS = (function () {
  const maps = {
    crown: [
      "............",
      "............",
      "k....kk....k",
      "ak..kaak..ka",
      "aak.kaak.kaa",
      "aaakaaaakaaa",
      "alaaaaaaaala",
      "aaawaaaawaaa",
      "adddddddddda",
      "aaaaaaaaaaaa",
      "kkkkkkkkkkkk",
      "............"
    ],
    sword: [
      "..........kk",
      ".........kwk",
      "........kwak",
      ".......kwak.",
      "......kwak..",
      ".k...kwak...",
      ".kk.kwak....",
      "..kkwak.....",
      "...kbk......",
      "..kbkkk.....",
      ".kbk..kk....",
      ".kk.........",
    ],
    diamond: [
      "............",
      "...kkkkkk...",
      "..kwllaaak..",
      ".kwlaaaaddk.",
      "kkkkkkkkkkkk",
      ".kaaaaaaadk.",
      "..kaaaaadk..",
      "...kaaadk...",
      "....kadk....",
      ".....kk.....",
      "............",
      "............"
    ],
    star: [
      ".....kk.....",
      ".....kak....",
      "....kaak....",
      "kkkkkaakkkkk",
      "kwlaaaaaaadk",
      ".kaaaaaaadk.",
      "..kaaaaadk..",
      "..kaadaadk..",
      ".kaadkkdadk.",
      ".kadk..kddk.",
      ".kkk....kkk.",
      "............"
    ],
    shield: [
      "............",
      ".kkkkkkkkkk.",
      ".kwlaaaaadk.",
      ".klaaaaaadk.",
      ".kaaaggaadk.",
      ".kaaggggadk.",
      ".kaaaggaadk.",
      ".kaaaaaaadk.",
      "..kaaaaadk..",
      "...kaaadk...",
      "....kkkk....",
      "............"
    ],
    key: [
      "............",
      ".kkkk.......",
      "kwlaak......",
      "kl..ak......",
      "ka..akkkkkkk",
      "kaaaaaaaaaak",
      ".kddkkkkakak",
      "..kk....kk.k",
      "............",
      "............",
      "............",
      "............"
    ],
    chest: [
      "............",
      ".kkkkkkkkkk.",
      "kbbbbbbbbbbk",
      "kbddddddddbk",
      "kbbbbbbbbbbk",
      "kkkkkaakkkkk",
      "kbbbkawkbbbk",
      "kbbbkaakbbbk",
      "kbbbbkkbbbbk",
      "kddddddddddk",
      "kkkkkkkkkkkk",
      "............"
    ],
    emerald: [
      "....kkkk....",
      "...kwlaak...",
      "..kwlaaadk..",
      "..klaaaadk..",
      "..kaaaaadk..",
      "..kaaaaadk..",
      "..kaaaaddk..",
      "...kadddk...",
      "....kkkk....",
      "............",
      "............",
      "............"
    ],
    bundle: [
      "....kkkk....",
      "...kbbbbk...",
      "....kbbk....",
      "...kaaaak...",
      "..kalaaaak..",
      ".kalaaaaaak.",
      ".kaaaaaaadk.",
      ".kaaawwaadk.",
      ".kaaaaaaadk.",
      "..kaaaaadk..",
      "...kkkkkk...",
      "............"
    ],
    pickaxe: [
      "............",
      "..kkkkkkk...",
      ".kwlaaaaak..",
      "..kkkk.kak..",
      ".....kbkak..",
      "....kbk.kak.",
      "...kbk...kk.",
      "..kbk.......",
      ".kbk........",
      "kbk.........",
      "kk..........",
      "............"
    ],
    heart: [
      "............",
      ".kkk...kkk..",
      "kwlak.kaaak.",
      "klaaakaaadk.",
      "kaaaaaaaadk.",
      "kaaaaaaaadk.",
      ".kaaaaaadk..",
      "..kaaaadk...",
      "...kaadk....",
      "....kdk.....",
      ".....k......",
      "............"
    ]
  };

  function shade(hex, amt) {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(x => x + x).join("");
    const n = parseInt(c, 16);
    let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    const f = v => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
    return "#" + [f(r), f(g), f(b)].map(v => v.toString(16).padStart(2, "0")).join("");
  }

  return function render(name, accent) {
    const map = maps[name] || maps.star;
    const a = /^#[0-9a-f]{3,6}$/i.test(accent || "") ? accent : "#7ee081";
    const pal = { a, l: shade(a, 0.45), d: shade(a, -0.35), k: "#15171c", w: "#ffffff", b: "#8b5a2b", g: "#3a3f4b" };
    let rects = "";
    map.forEach((row, y) => {
      [...row].forEach((ch, x) => {
        if (pal[ch]) rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${pal[ch]}"/>`;
      });
    });
    return `<svg viewBox="0 0 12 12" shape-rendering="crispEdges" aria-hidden="true" focusable="false">${rects}</svg>`;
  };
})();
