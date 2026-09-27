/* =====================================================================
   SawcoSMP store — PRODUCTS (EXAMPLE DATA)
   All products and prices below are EXAMPLES. Edit freely.

   Each category has: id, title, subtitle, items[]
   Each item has:
     name      – product name
     price     – number (e.g. 4.99)
     icon      – one of: crown, sword, diamond, emerald, star, key, chest,
                 bundle, coin, pickaxe, heart, shield, obsidian, trophy, helmet,
                 orb, skeletonkey
     color     – optional accent color for the card (any CSS color)
     badge     – optional ribbon text, e.g. "Most popular" / "Best value"
     featured  – optional true: highlighted card (glow + ribbon). Use on 1 per category
     perks     – list of bullet points
     kit       – optional (ranks): daily kit contents shown by the "Preview kit"
                 button, e.g. [{ item: "Cooked Beef", amount: 16 }].
                 KEEP IN SYNC with the plugin config
                 sawcocore/src/main/resources/perks.yml (section `kits`).
     tebexPath – optional path appended to SITE_CONFIG.tebexUrl
                 (e.g. "/package/123456"). Leave out to use the store home.
   ===================================================================== */
window.STORE_PRODUCTS = [
  {
    id: "ranks",
    title: "Ranks",
    subtitle: "Permanent ranks with perks that support the server.",
    // Rank `kit` arrays mirror the daily kits (24h cooldown) in
    // sawcocore/src/main/resources/perks.yml -> kits. Keep them in sync with perks.yml.
    items: [
      {
        name: "Iron", price: 4.99, icon: "shield", color: "#cbd5e1",
        perks: ["[Iron] rank prefix", "2 homes", "Daily Iron kit", "/fly in spawn", "4 auction house listings", "/rtp every 4.5 min", "+5% AFK coins"],
        kit: [{ item: "Bread", amount: 16 }, { item: "Torch", amount: 16 }, { item: "Oak Log", amount: 16 }]
      },
      {
        name: "Gold", price: 9.99, icon: "star", color: "#ffb000",
        perks: ["Everything in Iron", "[Gold] rank prefix", "3 homes", "Daily Gold kit", "/craft anywhere", "5 auction house listings", "+10% AFK coins"],
        kit: [{ item: "Cooked Beef", amount: 16 }, { item: "Torch", amount: 32 }, { item: "Oak Log", amount: 32 }, { item: "Iron Ingot", amount: 4 }]
      },
      {
        name: "Diamond", price: 19.99, icon: "diamond", color: "#22d3ee", badge: "Most popular", featured: true,
        perks: ["Everything in Gold", "[Diamond] rank prefix", "4 homes", "Daily Diamond kit", "/hat", "6 auction house listings", "+15% AFK coins"],
        kit: [{ item: "Cooked Beef", amount: 24 }, { item: "Torch", amount: 32 }, { item: "Iron Ingot", amount: 8 }, { item: "Coal", amount: 16 }, { item: "Bottle o' Enchanting", amount: 4 }]
      },
      {
        name: "Netherite", price: 29.99, icon: "sword", color: "#ff5a4e",
        perks: ["Everything in Diamond", "[Netherite] rank prefix", "5 homes", "Daily Netherite kit", "/enderchest anywhere", "7 auction house listings", "+20% AFK coins"],
        kit: [{ item: "Cooked Porkchop", amount: 32 }, { item: "Iron Ingot", amount: 12 }, { item: "Coal", amount: 24 }, { item: "Bottle o' Enchanting", amount: 8 }, { item: "Emerald", amount: 4 }]
      },
      {
        name: "Emerald", price: 39.99, icon: "emerald", color: "#34d399",
        perks: ["Everything in Netherite", "[Emerald] rank prefix", "6 homes", "Daily Emerald kit", "8 auction house listings", "/rtp every 2.5 min", "+25% AFK coins"],
        kit: [{ item: "Golden Carrot", amount: 16 }, { item: "Iron Ingot", amount: 16 }, { item: "Gold Ingot", amount: 8 }, { item: "Bottle o' Enchanting", amount: 12 }]
      },
      {
        name: "Obsidian", price: 54.99, icon: "obsidian", color: "#8b5cf6",
        perks: ["Everything in Emerald", "[Obsidian] rank prefix", "8 homes", "Daily Obsidian kit", "10 auction house listings", "/rtp every 2 min", "+30% AFK coins"],
        kit: [{ item: "Golden Carrot", amount: 24 }, { item: "Iron Ingot", amount: 20 }, { item: "Gold Ingot", amount: 12 }, { item: "Bottle o' Enchanting", amount: 16 }, { item: "Obsidian", amount: 8 }]
      },
      {
        name: "Legend", price: 74.99, icon: "trophy", color: "#ff4fd8",
        perks: ["Everything in Obsidian", "[Legend] rank prefix", "10 homes", "Daily Legend kit", "/nick + pink chat color", "12 auction house listings", "+40% AFK coins"],
        kit: [{ item: "Golden Carrot", amount: 32 }, { item: "Iron Ingot", amount: 24 }, { item: "Gold Ingot", amount: 16 }, { item: "Bottle o' Enchanting", amount: 24 }, { item: "Name Tag", amount: 1 }]
      },
      {
        name: "Titan", price: 99.99, icon: "helmet", color: "#fde047", badge: "Top tier",
        perks: ["Everything in Legend", "[Titan] rank prefix", "15 homes", "Daily Titan kit", "Gold chat color", "15 auction house listings", "/rtp every 1 min", "+50% AFK coins"],
        kit: [{ item: "Golden Carrot", amount: 48 }, { item: "Iron Ingot", amount: 32 }, { item: "Gold Ingot", amount: 24 }, { item: "Bottle o' Enchanting", amount: 32 }, { item: "Name Tag", amount: 2 }, { item: "Firework Rocket", amount: 16 }]
      }
    ]
  },
  {
    id: "coins",
    title: "Coins",
    subtitle: "EXAMPLE prices — adjust before launch. Spend coins in-game on /coinshop, the auction house and more; earn them by playing.",
    items: [
      {
        name: "1,000 Coins", price: 1.99, icon: "coin", color: "#ffb000",
        perks: ["1,000 coins", "Spend in-game on /coinshop, the auction house & more", "Also earned by playing"]
      },
      {
        name: "2,750 Coins", price: 4.99, icon: "coin", color: "#ffb000",
        perks: ["2,750 coins", "+10% bonus", "Spend in-game on /coinshop, the auction house & more"]
      },
      {
        name: "6,000 Coins", price: 9.99, icon: "coin", color: "#ffd43b", badge: "Most popular", featured: true,
        perks: ["6,000 coins", "+20% bonus", "Spend in-game on /coinshop, the auction house & more"]
      },
      {
        name: "13,000 Coins", price: 19.99, icon: "coin", color: "#ffd43b",
        perks: ["13,000 coins", "+30% bonus", "Spend in-game on /coinshop, the auction house & more"]
      },
      {
        name: "35,000 Coins", price: 49.99, icon: "coin", color: "#ffd43b", badge: "Best value",
        perks: ["35,000 coins", "+40% bonus", "Spend in-game on /coinshop, the auction house & more"]
      }
    ]
  }
];
