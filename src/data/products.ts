import darkThighs from "@/assets/p-dark-thighs.jpg";
import wartsKit from "@/assets/p-warts-kit.jpg";
import feminineTea from "@/assets/p-feminine-tea.jpg";
import wombTea from "@/assets/p-womb-tea.jpg";
import spearmint from "@/assets/p-spearmint.jpg";
import infectionTea from "@/assets/p-infection-tea.jpg";
import infectionCaps from "@/assets/p-infection-caps.jpg";
import boric from "@/assets/p-boric.jpg";
import libido from "@/assets/p-libido.jpg";
import flusherLiquid from "@/assets/p-flusher-liquid.jpg";

export type ProductGroup = "Supplements" | "Skin Care" | "Herbals";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;       // current NGN price
  oldPrice?: number;   // strike-through NGN price
  category: string;    // sub-category label
  group: ProductGroup; // top-level shop group
  image: string;
  ingredients: string[];
  description: string;
  ritual: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "dark-thighs-kit",
    name: "Dark Thighs Kit",
    tagline: "Exfoliate · brighten · soothe",
    price: 15000,
    oldPrice: 20000,
    category: "Body Care",
    group: "Skin Care",
    image: darkThighs,
    ingredients: ["Exfoliating herbal serum", "Botanical cleansing bar", "Plant butters"],
    description:
      "A complete after-shave and bumps removal kit formulated to gently brighten dark inner thighs, underarms and bikini area. Plant-based actives soften pigmentation and calm shaving irritation without harshness.",
    ritual: "Cleanse with the bar in the shower, pat dry, and massage 4–5 drops of the serum into the area morning and night.",
  },
  {
    id: "2",
    slug: "genital-warts-herpes-kit",
    name: "Genital Warts & Herpes Kit",
    tagline: "Herbal antiviral support",
    price: 30000,
    oldPrice: 35000,
    category: "Wellness Kits",
    group: "Herbals",
    image: wartsKit,
    ingredients: ["Antiviral herbal capsules", "Topical botanical solution", "Immune-support blend"],
    description:
      "A discreet, doctor-formulated kit that pairs internal antiviral herbal capsules with a topical botanical solution to support the body’s response to genital warts and herpes outbreaks.",
    ritual: "Take capsules twice daily after meals and apply the topical solution morning and night for the recommended cycle.",
  },
  {
    id: "3",
    slug: "feminine-wellness-tea",
    name: "Feminine Wellness Tea",
    tagline: "Cycle · mood · balance",
    price: 13000,
    oldPrice: 15000,
    category: "Teas",
    group: "Herbals",
    image: feminineTea,
    ingredients: ["Raspberry leaf", "Chasteberry", "Rose petals", "Nettle"],
    description:
      "A soft floral blend crafted for everyday feminine balance — supports a comfortable cycle, steadier moods, and a sense of calm through the month.",
    ritual: "Steep one tablespoon in 250ml of just-off-boiling water for 7 minutes. Sip warm, once or twice daily.",
  },
  {
    id: "4",
    slug: "womb-cleanse-tea",
    name: "Womb Cleanse Tea",
    tagline: "PCOS · fertility · postpartum",
    price: 35000,
    oldPrice: 40000,
    category: "Teas",
    group: "Herbals",
    image: wombTea,
    ingredients: ["Red clover", "Dong quai", "Mugwort", "Ginger root"],
    description:
      "A deep botanical infusion that supports womb cleansing, hormonal balance, ovulation, period regulation, and postpartum recovery. Gentle enough for daily use.",
    ritual: "Steep one tablespoon in hot water for 8–10 minutes. Drink in the morning on an empty stomach for best results.",
  },
  {
    id: "5",
    slug: "spearmint-hormone-balance-tea",
    name: "Spearmint Hormone Balance Tea",
    tagline: "Hormones · skin · facial hair",
    price: 12000,
    oldPrice: 15000,
    category: "Teas",
    group: "Herbals",
    image: spearmint,
    ingredients: ["Wild spearmint leaves"],
    description:
      "A bright, single-origin spearmint infusion long used to help balance androgens, calm hormonal acne, and reduce unwanted facial hair growth.",
    ritual: "Steep one tablespoon in hot water for 6 minutes. Two cups daily over several weeks for noticeable results.",
  },
  {
    id: "6",
    slug: "infection-flusher-tea",
    name: "Infection Flusher Tea",
    tagline: "Detox · anti-infection",
    price: 15000,
    oldPrice: 20000,
    category: "Teas",
    group: "Herbals",
    image: infectionTea,
    ingredients: ["Bitter leaf", "Dandelion", "Goldenseal", "Burdock"],
    description:
      "A potent herbal tea that supports the body in flushing out chronic infections, candida, UTIs, and STIs. Cleansing, mineral-rich, and gently detoxifying.",
    ritual: "Steep one tablespoon in hot water for 8 minutes. Drink twice daily for a 14–21 day cycle.",
  },
  {
    id: "7",
    slug: "infection-flusher-capsule",
    name: "Infection Flusher Capsules",
    tagline: "Travel-friendly cleanse",
    price: 12000,
    oldPrice: 15000,
    category: "Capsules",
    group: "Supplements",
    image: infectionCaps,
    ingredients: ["Concentrated bitter leaf", "Goldenseal", "Echinacea", "Garlic extract"],
    description:
      "The same trusted infection-flushing formula in convenient vegetarian capsules — ideal for travel or for those who prefer not to brew tea.",
    ritual: "Take 2 capsules twice daily after meals with a full glass of water for 14–21 days.",
  },
  {
    id: "8",
    slug: "medical-grade-boric-acid",
    name: "Medical Grade Boric Acid",
    tagline: "Vaginal pH support",
    price: 6500,
    oldPrice: 7000,
    category: "Capsules",
    group: "Supplements",
    image: boric,
    ingredients: ["USP-grade boric acid", "Vegetable capsule"],
    description:
      "Medical grade boric acid suppositories used to restore healthy vaginal pH, reduce odour, and address recurrent BV and yeast infections.",
    ritual: "Insert one capsule vaginally at bedtime for up to 7 nights. Do not take orally.",
  },
  {
    id: "9",
    slug: "libido-moisture-boost",
    name: "Libido & Moisture Boost",
    tagline: "Desire · natural lubrication",
    price: 10000,
    oldPrice: 12000,
    category: "Capsules",
    group: "Supplements",
    image: libido,
    ingredients: ["Maca root", "Sea moss", "Fenugreek", "Ashwagandha"],
    description:
      "An adaptogenic herbal supplement that gently restores libido, increases natural lubrication, and supports vaginal tissue health and overall vitality.",
    ritual: "Take 2 capsules daily with food. Best taken consistently for 4–6 weeks.",
  },
  {
    id: "10",
    slug: "herbal-infection-flusher-liquid",
    name: "Herbal Infection Flusher (Liquid)",
    tagline: "Ready-to-drink cleanse",
    price: 12000,
    oldPrice: 15000,
    category: "Tonics",
    group: "Herbals",
    image: flusherLiquid,
    ingredients: ["Brewed herbal concentrate", "Honey", "Spring water"],
    description:
      "A ready-to-drink bottled tonic of our infection-flusher herbs — convenient, fast-acting, and gentle on the stomach.",
    ritual: "Shake well. Take 30ml in the morning and 30ml at night for 14 days.",
  },
];

export const productGroups: ProductGroup[] = ["Supplements", "Skin Care", "Herbals"];

export const formatNGN = (n: number) =>
  `NGN ${n.toLocaleString("en-NG")}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
