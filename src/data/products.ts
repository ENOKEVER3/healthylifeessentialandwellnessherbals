import darkThighsKit from "@/assets/p-dark-thighs-kit.jpeg";
import wartsKit from "@/assets/p-warts-kit.jpg";
import hormonalTea from "@/assets/p-hormonal-imbalance-tea.jpeg";
import hormonalTeabags from "@/assets/p-hormonal-imbalance-teabags.jpeg";
import spearmintCaps from "@/assets/p-spearmint-capsule.jpeg";
import pidKit from "@/assets/p-pid-kit.jpeg";
import rheumatismTea from "@/assets/p-rheumatism-tea.jpeg";
import diabetesTea from "@/assets/p-diabetes-tea.jpeg";
import hypertensionTea from "@/assets/p-hypertension-tea.jpeg";
import cookieCleanser from "@/assets/p-cookie-cleanser.jpeg";
import infectionCaps from "@/assets/p-infection-flusher-caps.jpeg";
import boric from "@/assets/p-boric.jpg";
import libido from "@/assets/p-libido.jpg";
import flusherLiquid from "@/assets/p-flusher-liquid.jpg";

export type ProductGroup = "Supplements" | "Skin Care" | "Herbals";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  oldPrice?: number;
  category: string;
  group: ProductGroup;
  image: string;
  ingredients: string[];
  description: string;
  ritual: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "hormonal-imbalance-tea",
    name: "Hormonal Imbalance Tea",
    tagline: "Cycle · fertility · PMS relief",
    price: 18000,
    oldPrice: 22000,
    category: "Teas",
    group: "Herbals",
    image: hormonalTea,
    ingredients: ["Chasteberry", "Red raspberry leaf", "Dong quai", "Ginger root"],
    description:
      "A 500g pouch of our signature herbal blend that helps regulate the menstrual cycle, ease cramps and PMS, support fertility and ovulation, and naturally balance estrogen and progesterone.",
    ritual: "Add 1 spoon to hot water with pap or as tea once daily. Use consistently for best results.",
  },
  {
    id: "2",
    slug: "hormonal-imbalance-teabags",
    name: "Hormonal Imbalance Teabags",
    tagline: "Convenient hormone support",
    price: 13000,
    oldPrice: 15000,
    category: "Teas",
    group: "Herbals",
    image: hormonalTeabags,
    ingredients: ["Chasteberry", "Raspberry leaf", "Dong quai", "Ginger"],
    description:
      "The same trusted Hormonal Imbalance formula in pre-portioned teabags — for easy daily support of menstrual regularity, fertility, and hormonal harmony.",
    ritual: "Steep 1 teabag in hot water for 6–8 minutes. Drink once daily.",
  },
  {
    id: "3",
    slug: "spearmint-hormone-balanced-capsule",
    name: "Spearmint Hormone Balanced Capsule",
    tagline: "PCOS · acne · facial hair",
    price: 15000,
    oldPrice: 18000,
    category: "Capsules",
    group: "Supplements",
    image: spearmintCaps,
    ingredients: ["Concentrated wild spearmint extract"],
    description:
      "60 herbal capsules formulated to support PCOS, eliminate hormonal acne, reduce androgens and hirsutism, regulate the menstrual cycle and mood, and improve digestion. Antioxidant and anti-inflammatory.",
    ritual: "Take 2 capsules in the morning and 2 at night with water.",
  },
  {
    id: "4",
    slug: "pid-treatment-kit",
    name: "PID Pelvic Inflammatory Disease Treatment Kit",
    tagline: "Complete 4-step protocol",
    price: 65000,
    oldPrice: 75000,
    category: "Wellness Kits",
    group: "Herbals",
    image: pidKit,
    ingredients: [
      "Feminine Wellness Tea",
      "Herbal Infection Flusher Capsules",
      "Herbal Infection Flusher Drink (1.2L)",
      "Boric Acid Vaginal Suppositories",
    ],
    description:
      "A complete doctor-formulated kit for Pelvic Inflammatory Disease — combines our wellness tea, detoxifying capsules, flusher drink, and boric acid suppositories for full-spectrum reproductive cleansing and recovery.",
    ritual: "Follow the included protocol card. Full cycle is 21–28 days.",
  },
  {
    id: "5",
    slug: "anti-rheumatism-arthritis-tea",
    name: "Anti-Rheumatism & Arthritis Support Tea",
    tagline: "Joint · circulation · relief",
    price: 14000,
    oldPrice: 16000,
    category: "Teas",
    group: "Herbals",
    image: rheumatismTea,
    ingredients: ["Spearmint", "Turmeric", "Ginger", "Devil's claw"],
    description:
      "30 teabags (40g) of an organic herbal blend supporting rheumatism and arthritis care, healthy joints, and easy blood flow.",
    ritual: "Boil 1 teabag in a cup of hot water for 5 min, allow to cool. Take 2 teabags daily — first thing in the morning and last thing at night.",
  },
  {
    id: "6",
    slug: "anti-diabetes-herbal-tea",
    name: "Anti-Diabetes Herbal Tea",
    tagline: "Blood sugar · insulin support",
    price: 14000,
    oldPrice: 16000,
    category: "Teas",
    group: "Herbals",
    image: diabetesTea,
    ingredients: ["Bitter leaf", "Moringa", "Cinnamon", "Spearmint"],
    description:
      "30 teabags (40g) supporting healthy blood sugar regulation, enhancing insulin action, and ameliorating insulin resistance through gentle daily use.",
    ritual: "Boil 1 teabag in a cup of hot water for 5 min. Drink 2 teabags daily — morning and night.",
  },
  {
    id: "7",
    slug: "anti-hypertension-regulating-tea",
    name: "Anti-Hypertension Regulating Tea",
    tagline: "Blood pressure balance",
    price: 14000,
    oldPrice: 16000,
    category: "Teas",
    group: "Herbals",
    image: hypertensionTea,
    ingredients: ["Hibiscus", "Olive leaf", "Hawthorn", "Garlic extract"],
    description:
      "30 teabags (40g) that help lower high blood pressure to a normal range, normalize blood pressure, and reduce the risks and complications of hypertension.",
    ritual: "Boil 1 teabag in a cup of hot water for 5 min. Take 2 teabags daily, morning and night.",
  },
  {
    id: "8",
    slug: "cookie-cleanser-feminine-wash",
    name: "Cookie Cleanser Feminine Wash",
    tagline: "pH-balanced · plant-based",
    price: 9000,
    oldPrice: 11000,
    category: "Feminine Care",
    group: "Skin Care",
    image: cookieCleanser,
    ingredients: ["Plant-based foaming base", "Soothing botanical extracts"],
    description:
      "150ml non-irritating, pH-balanced foaming wash for the vulva. Vegan and made for daily gentle feminine cleansing.",
    ritual: "Pump a small amount onto wet skin externally, lather, rinse thoroughly. Use daily.",
  },
  {
    id: "9",
    slug: "herbal-infection-flusher-capsules",
    name: "Herbal Infection Flusher & Detoxifying Capsules",
    tagline: "For both genders",
    price: 18000,
    oldPrice: 22000,
    category: "Capsules",
    group: "Supplements",
    image: infectionCaps,
    ingredients: ["Bitter leaf", "Goldenseal", "Echinacea", "Garlic extract"],
    description:
      "60 vegan capsules that flush chronic infections, candida, UTIs and STIs while supporting full-body detox. Suitable for men and women.",
    ritual: "Take 2 capsules twice daily after meals with a full glass of water for 14–21 days.",
  },
  {
    id: "10",
    slug: "dark-thighs-kit",
    name: "Dark Thigh, After Shave & Bumps Removal Kit",
    tagline: "Exfoliate · brighten · soothe",
    price: 16000,
    oldPrice: 20000,
    category: "Body Care",
    group: "Skin Care",
    image: darkThighsKit,
    ingredients: ["Exfoliating Herbal Soap (100ml)", "Dark Area Kitty Oil (50ml)"],
    description:
      "A two-step kit for dark inner thighs, dark armpits, dark butt, ingrown hairs and discoloration. Clears razor bumps, prevents ingrowns, and brightens dark marks. For both masculine and feminine care.",
    ritual: "Cleanse with the herbal soap in the shower, pat dry, then massage 4–5 drops of Dark Area Kitty Oil into the area morning and night.",
  },
  {
    id: "11",
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
      "Discreet kit pairing internal antiviral herbal capsules with a topical botanical solution to support the body's response to genital warts and herpes outbreaks.",
    ritual: "Take capsules twice daily after meals and apply the topical solution morning and night for the recommended cycle.",
  },
  {
    id: "12",
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
    id: "13",
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
    id: "14",
    slug: "herbal-infection-flusher-liquid",
    name: "Herbal Infection Flusher Drink",
    tagline: "Ready-to-drink cleanse",
    price: 12000,
    oldPrice: 15000,
    category: "Tonics",
    group: "Herbals",
    image: flusherLiquid,
    ingredients: ["Brewed herbal concentrate", "Honey", "Spring water"],
    description:
      "A ready-to-drink bottled tonic of our infection-flusher herbs — convenient, fast-acting, and gentle on the stomach. For both genders.",
    ritual: "Shake well. Take 30ml in the morning and 30ml at night for 14 days.",
  },
];

export const productGroups: ProductGroup[] = ["Supplements", "Skin Care", "Herbals"];

export const formatNGN = (n: number) =>
  `NGN ${n.toLocaleString("en-NG")}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
