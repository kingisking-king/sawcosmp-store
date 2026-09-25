/* =====================================================================
   SawcoSMP store — SITE CONFIG
   Edit the values below. Everything marked PLACEHOLDER must be replaced
   before launch.
   ===================================================================== */
window.SITE_CONFIG = {
  serverName: "SawcoSMP",
  tagline: "A fresh survival multiplayer adventure. Build, trade, and survive together.",

  // Server address players type in Minecraft (used for Copy IP + live status badge).
  // sawcosmp.net works once the _minecraft._tcp SRV record exists (see README).
  serverIp: "sawcosmp.net",

  // Shown next to the IP, e.g. "Java 1.21+" (set to "" to hide)
  versionLabel: "Java Edition 1.21+",

  // PLACEHOLDER — your Tebex webstore URL. Every "Buy" button links here
  // (or to tebexUrl + product.tebexPath if a product has one).
  tebexUrl: "https://sawcosmp.tebex.io",

  // PLACEHOLDER — your Discord invite link
  discordUrl: "https://discord.gg/your-invite",

  // Currency symbol shown before prices
  currency: "$",

  // DEV NOTICE: shows a small "Example products" banner. Set to false once
  // js/products.js contains your real products & prices.
  showExampleNotice: true,

  // Set to true to show a "PLACEHOLDER" tag next to the IP in the hero
  showPlaceholderIpTag: false
};
