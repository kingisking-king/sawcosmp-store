# SawcoSMP Store

A fast, static web store for the **SawcoSMP** Minecraft server. Plain HTML/CSS/vanilla JS with no build step, so it runs on GitHub Pages for free.

> ⚠️ All products and prices in `js/products.js` are **example data**. The Tebex and Discord links are **placeholders**.

## Files

```
index.html          Page layout (hero, store, FAQ, Discord CTA, footer)
css/style.css       All styling. Theme colors are CSS variables at the top
js/config.js        Site settings: server IP, Tebex URL, Discord link, notices
js/products.js      Every product and price (edit this to change the store)
js/icons.js         Pixel-art product icons (SVG, no image files needed)
js/main.js          Rendering, Copy IP, live server status (usually no edits needed)
assets/logo.png     Full-size logo (transparent PNG)
assets/logo-512.png Optimized logo used on the page
assets/favicon-64.png, assets/icon-192.png, assets/apple-touch-icon.png, favicon.ico
CNAME               Custom domain for GitHub Pages (sawcosmp.net)
.nojekyll           Tells GitHub Pages to serve files as-is
screens/            Preview screenshots (desktop.png, mobile.png)
```

## Quick edits

### Server IP, Tebex link, Discord link
Open **`js/config.js`**:

```js
serverIp:   "sawcosmp.net",                  // shown on the site, copied by "Copy IP", used for the live status badge
tebexUrl:   "https://sawcosmp.tebex.io",     // PLACEHOLDER: your Tebex webstore
discordUrl: "https://discord.gg/your-invite",// PLACEHOLDER: your Discord invite
versionLabel: "Java Edition 1.21+",
currency: "$",
showExampleNotice: true,                     // set to false to hide the yellow "Example products" bar
```

The online/player-count badge uses `https://api.mcsrvstat.us/3/<serverIp>`. If the server is offline or the API can't be reached, it shows "Server offline" or "Status unavailable" instead of breaking.

### Products and prices
Open **`js/products.js`**. It has four categories (`ranks`, `keys`, `cosmetics`, `bundles`), and each one holds a list of items:

```js
{
  name: "Diamond",
  price: 19.99,
  icon: "diamond",        // crown, sword, diamond, emerald, star, key, chest, cape,
                          // pet, particle, tag, bundle, pickaxe, heart, shield
  color: "#4de1e6",       // card accent color (hex)
  badge: "Popular",       // optional ribbon
  perks: ["Everything in Gold", "/nick & /feed"],
  tebexPath: "/package/123456"   // optional: links straight to that Tebex package
}
```

To add, remove, or reorder products, edit this list. You can also add a whole new category object and it will show up with its own nav chip. Once the real products are in, set `showExampleNotice: false` in `js/config.js`.

**Payments and in-game delivery** go through [Tebex](https://www.tebex.io/). Create your packages there, install the Tebex plugin on the server, and paste each package's URL path into `tebexPath`.

### Logo
Replace `assets/logo.png` (full size) and `assets/logo-512.png` (512×512, used on the page) with new transparent PNGs using the same file names. Update the favicons in `assets/` and `favicon.ico` too if you want.

### Colors / theme
All colors are CSS variables at the top of **`css/style.css`** (`--gold`, `--orange`, `--cyan`, `--bg`, `--surface`, ...). Change them there to re-theme the whole site.

## Preview locally

```bash
cd sawcosmp-store
python3 -m http.server 8000
# open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a GitHub repository (for example `sawcosmp-store`) and push this folder to the `main` branch.
2. In the repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, then click **Save**.
4. After a minute or so the site is live at `https://<username>.github.io/<repo>/`, or at your custom domain (see below).

## Custom domain (Cloudflare)

The `CNAME` file already contains `sawcosmp.net`, so GitHub Pages will serve the site on the apex domain. In **Settings → Pages → Custom domain**, make sure it says `sawcosmp.net`.

In the Cloudflare dashboard, go to **sawcosmp.net → DNS → Records** and add:

| Type  | Name  | Content                      | Proxy status |
|-------|-------|------------------------------|--------------|
| A     | `@`   | `185.199.108.153`            | DNS only (grey cloud) |
| A     | `@`   | `185.199.109.153`            | DNS only (grey cloud) |
| A     | `@`   | `185.199.110.153`            | DNS only (grey cloud) |
| A     | `@`   | `185.199.111.153`            | DNS only (grey cloud) |
| CNAME | `www` | `kingisking-king.github.io`  | DNS only (grey cloud) |

- Leave these records as **DNS only (grey cloud)** until GitHub finishes issuing the HTTPS certificate. Then turn on **Enforce HTTPS** in Settings → Pages. After that, turning on Cloudflare's proxy (orange cloud) is optional. If you do turn it on, set Cloudflare **SSL/TLS** mode to **Full**.
- Optional: add AAAA records for IPv6 (`2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`).

### Letting players join with `sawcosmp.net`

The apex `sawcosmp.net` now points at GitHub Pages (the website), so the Minecraft server needs **its own hostname** plus an **SRV record**. Minecraft Java looks up the SRV record first, so players can still type `sawcosmp.net`:

| Type | Name                    | Content / Target                                   | Proxy status |
|------|-------------------------|----------------------------------------------------|--------------|
| A    | `play`                  | `<your game server's IP>`                          | **DNS only** (Cloudflare can't proxy Minecraft) |
| SRV  | `_minecraft._tcp` (on `sawcosmp.net`) | priority `0`, weight `5`, port `25565`, target `play.sawcosmp.net` | n/a |

In Cloudflare's SRV form that means: Name `@` (or `sawcosmp.net`), Service `_minecraft`, Protocol `TCP`, Priority `0`, Weight `5`, Port `25565` (or your server's port), Target `play.sawcosmp.net`.

After that, both `sawcosmp.net` and `play.sawcosmp.net` work in the Minecraft server list. Bedrock clients don't use SRV, so they would need `play.sawcosmp.net` plus the port.

---

Not affiliated with Mojang or Microsoft. Minecraft is a trademark of Mojang AB.
