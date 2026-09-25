/* =====================================================================
   SawcoSMP store — PRODUCTS (EXAMPLE DATA)
   All products and prices below are EXAMPLES. Edit freely.

   Each category has: id, title, subtitle, items[]
   Each item has:
     name      – product name
     price     – number (e.g. 4.99)
     icon      – one of: crown, sword, diamond, emerald, star, key, chest,
                 bundle, pickaxe, heart, shield, obsidian, trophy, helmet,
                 orb, skeletonkey
     color     – optional accent color for the card (any CSS color)
     badge     – optional ribbon text, e.g. "Most popular" / "Best value"
     featured  – optional true: highlighted card (glow + ribbon). Use on 1 per category
     perks     – list of bullet points
     tebexPath – optional path appended to SITE_CONFIG.tebexUrl
                 (e.g. "/package/123456"). Leave out to use the store home.
   ===================================================================== */
window.STORE_PRODUCTS = [
  {
    id: "ranks",
    title: "Ranks",
    subtitle: "Permanent ranks with perks that support the server.",
    items: [
      {
        name: "Iron", price: 4.99, icon: "shield", color: "#cbd5e1",
        perks: ["[Iron] rank prefix", "/craft anywhere", "2 extra homes", "+2 auction house slots"]
      },
      {
        name: "Gold", price: 9.99, icon: "star", color: "#ffb000",
        perks: ["Everything in Iron", "[Gold] rank prefix", "/enderchest anywhere", "5 extra homes", "1 monthly Vote Key"]
      },
      {
        name: "Diamond", price: 19.99, icon: "diamond", color: "#22d3ee", badge: "Most popular", featured: true,
        perks: ["Everything in Gold", "[Diamond] rank prefix", "/feed & /anvil", "10 extra homes", "Priority queue"]
      },
      {
        name: "Netherite", price: 29.99, icon: "sword", color: "#ff5a4e",
        perks: ["Everything in Diamond", "[Netherite] rank prefix", "/repair hand (daily)", "15 extra homes", "3 monthly Rare Keys"]
      },
      {
        name: "Emerald", price: 39.99, icon: "emerald", color: "#34d399",
        perks: ["Everything in Netherite", "[Emerald] rank prefix", "/fly in the spawn lobby", "20 extra homes", "+5 auction house slots"]
      },
      {
        name: "Obsidian", price: 54.99, icon: "obsidian", color: "#8b5cf6",
        perks: ["Everything in Emerald", "[Obsidian] rank prefix", "Reserved slot when full", "/back after death", "1 monthly Epic Key"]
      },
      {
        name: "Legend", price: 74.99, icon: "trophy", color: "#ff4fd8",
        perks: ["Everything in Obsidian", "[Legend] rank prefix", "Unlimited homes", "/kit legend (weekly)", "1 monthly Legendary Key"]
      },
      {
        name: "Titan", price: 99.99, icon: "helmet", color: "#fde047", badge: "Top tier",
        perks: ["Everything in Legend", "[Titan] rank prefix", "/repair all (daily)", "+15 auction house slots", "1 monthly Mythic Key"]
      }
    ]
  },
  {
    id: "keys",
    title: "Keys & Crates",
    subtitle: "Open crates at spawn for random loot.",
    items: [
      {
        name: "Common Key ×5", price: 0.99, icon: "key", color: "#cbd5e1",
        perks: ["5 Common Crate keys", "Food, torches & basic tools", "Chance for iron gear"]
      },
      {
        name: "Vote Key ×5", price: 1.99, icon: "key", color: "#7ee081",
        perks: ["5 Vote Crate keys", "Common tools & food", "Chance for enchanted books"]
      },
      {
        name: "Rare Key ×3", price: 3.99, icon: "key", color: "#4da3ff",
        perks: ["3 Rare Crate keys", "Enchanted gear", "Chance for Mending books"]
      },
      {
        name: "Epic Key ×3", price: 6.99, icon: "skeletonkey", color: "#b58cff",
        perks: ["3 Epic Crate keys", "Diamond gear & rare enchants", "Chance for a Totem of Undying"]
      },
      {
        name: "Legendary Key ×2", price: 9.99, icon: "chest", color: "#ffb000", badge: "Best loot",
        perks: ["2 Legendary Crate keys", "Top-tier loot pool", "Chance for netherite gear"]
      },
      {
        name: "Mythic Key", price: 12.99, icon: "orb", color: "#ff4fd8", badge: "Rarest",
        perks: ["1 Mythic Crate key", "The best loot on the server", "Chance for an Elytra"]
      }
    ]
  },
  {
    id: "bundles",
    title: "Bundles",
    subtitle: "Save money by grabbing a few things at once.",
    items: [
      {
        name: "Starter Bundle", price: 7.99, icon: "pickaxe", color: "#7ee081",
        perks: ["Iron rank", "5 Vote Keys", "1 Rare Key", "Save ~20%"]
      },
      {
        name: "Supporter Bundle", price: 24.99, icon: "bundle", color: "#ffb000", badge: "Best value", featured: true,
        perks: ["Diamond rank", "3 Rare Keys", "1 Legendary Key", "Save ~30%"]
      },
      {
        name: "Ultimate Bundle", price: 49.99, icon: "heart", color: "#b58cff",
        perks: ["Netherite rank", "3 Legendary Keys", "5 Rare Keys", "Save ~35%"]
      }
    ]
  }
];
