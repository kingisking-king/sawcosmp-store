/* =====================================================================
   SawcoSMP store — PRODUCTS (EXAMPLE DATA)
   All products and prices below are EXAMPLES. Edit freely.

   Each category has: id, title, subtitle, items[]
   Each item has:
     name      – product name
     price     – number (e.g. 4.99)
     icon      – one of: crown, sword, diamond, emerald, star, key, chest,
                 bundle, pickaxe, heart, shield
     color     – optional accent color for the card (any CSS color)
     badge     – optional ribbon text, e.g. "Popular" / "Best value"
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
        name: "Iron", price: 4.99, icon: "shield", color: "#c9d1d9",
        perks: ["[Iron] rank prefix", "/craft anywhere", "2 extra homes", "+2 auction house slots"]
      },
      {
        name: "Gold", price: 9.99, icon: "star", color: "#f5c542",
        perks: ["Everything in Iron", "[Gold] rank prefix", "/enderchest anywhere", "5 extra homes", "1 monthly Vote Key"]
      },
      {
        name: "Diamond", price: 19.99, icon: "diamond", color: "#4de1e6", badge: "Popular",
        perks: ["Everything in Gold", "[Diamond] rank prefix", "/feed & /anvil", "10 extra homes", "Priority queue"]
      },
      {
        name: "Netherite", price: 34.99, icon: "crown", color: "#b58cff",
        perks: ["Everything in Diamond", "[Netherite] rank prefix", "Unlimited homes", "Reserved slot when full", "Monthly Legendary Key"]
      }
    ]
  },
  {
    id: "keys",
    title: "Keys & Crates",
    subtitle: "Open crates at spawn for random loot.",
    items: [
      {
        name: "Vote Key ×5", price: 1.99, icon: "key", color: "#7ee081",
        perks: ["5 Vote Crate keys", "Common tools & food", "Chance for enchanted books"]
      },
      {
        name: "Rare Key ×3", price: 3.99, icon: "key", color: "#4da3ff",
        perks: ["3 Rare Crate keys", "Enchanted gear", "Chance for Mending books"]
      },
      {
        name: "Legendary Key", price: 5.99, icon: "chest", color: "#f5a742", badge: "Best loot",
        perks: ["1 Legendary Crate key", "Top-tier loot pool", "Chance for netherite gear"]
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
        name: "Supporter Bundle", price: 24.99, icon: "bundle", color: "#4de1e6", badge: "Best value",
        perks: ["Diamond rank", "3 Rare Keys", "1 Legendary Key", "Save ~30%"]
      },
      {
        name: "Ultimate Bundle", price: 49.99, icon: "heart", color: "#b58cff",
        perks: ["Netherite rank", "3 Legendary Keys", "5 Rare Keys", "Save ~35%"]
      }
    ]
  }
];
