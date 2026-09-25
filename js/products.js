/* =====================================================================
   SawcoSMP store — PRODUCTS (EXAMPLE DATA)
   All products and prices below are EXAMPLES. Edit freely.

   Each category has: id, title, subtitle, items[]
   Each item has:
     name      – product name
     price     – number (e.g. 4.99)
     icon      – one of: crown, sword, diamond, emerald, star, key, chest,
                 cape, pet, particle, tag, bundle, pickaxe, heart, shield
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
        perks: ["[Iron] chat prefix", "/hat & /craft", "2 extra homes", "Colored chat"]
      },
      {
        name: "Gold", price: 9.99, icon: "star", color: "#f5c542",
        perks: ["Everything in Iron", "[Gold] chat prefix", "/enderchest anywhere", "5 extra homes", "1 monthly Vote Key"]
      },
      {
        name: "Diamond", price: 19.99, icon: "diamond", color: "#4de1e6", badge: "Popular",
        perks: ["Everything in Gold", "[Diamond] chat prefix", "/nick & /feed", "10 extra homes", "Priority queue"]
      },
      {
        name: "Netherite", price: 34.99, icon: "crown", color: "#b58cff",
        perks: ["Everything in Diamond", "[Netherite] animated prefix", "Unlimited homes", "Exclusive particle trail", "Monthly Legendary Key"]
      }
    ]
  },
  {
    id: "keys",
    title: "Keys & Crates",
    subtitle: "Open crates at spawn for random loot and cosmetics.",
    items: [
      {
        name: "Vote Key ×5", price: 1.99, icon: "key", color: "#7ee081",
        perks: ["5 Vote Crate keys", "Common tools & food", "Chance for enchanted books"]
      },
      {
        name: "Rare Key ×3", price: 3.99, icon: "key", color: "#4da3ff",
        perks: ["3 Rare Crate keys", "Enchanted gear", "Chance for cosmetic tags"]
      },
      {
        name: "Legendary Key", price: 5.99, icon: "chest", color: "#f5a742", badge: "Best loot",
        perks: ["1 Legendary Crate key", "Top-tier loot pool", "Chance for exclusive cape"]
      }
    ]
  },
  {
    id: "cosmetics",
    title: "Cosmetics",
    subtitle: "Stand out without affecting gameplay balance.",
    items: [
      {
        name: "Particle Trail", price: 2.99, icon: "particle", color: "#ff7ac6",
        perks: ["Choose from 8 trail effects", "Toggle anytime with /trails"]
      },
      {
        name: "Custom Chat Tag", price: 3.49, icon: "tag", color: "#f5c542",
        perks: ["Your own short tag", "Staff-approved text", "Pick a color"]
      },
      {
        name: "Pet Companion", price: 4.99, icon: "pet", color: "#ffb86b",
        perks: ["Cosmetic follower pet", "Rename your pet", "5 pet types"]
      },
      {
        name: "Server Cape", price: 6.99, icon: "cape", color: "#e5534b",
        perks: ["Exclusive SawcoSMP cape", "Visible with resource pack", "Supporter forever"]
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
        perks: ["Iron rank", "5 Vote Keys", "1 Particle Trail", "Save ~20%"]
      },
      {
        name: "Supporter Bundle", price: 24.99, icon: "bundle", color: "#4de1e6", badge: "Best value",
        perks: ["Diamond rank", "3 Rare Keys", "1 Legendary Key", "Custom Chat Tag", "Save ~30%"]
      },
      {
        name: "Ultimate Bundle", price: 49.99, icon: "heart", color: "#b58cff",
        perks: ["Netherite rank", "3 Legendary Keys", "Server Cape + Pet", "All particle trails", "Save ~35%"]
      }
    ]
  }
];
