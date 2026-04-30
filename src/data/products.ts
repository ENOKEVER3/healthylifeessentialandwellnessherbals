import darkThighsKit from "@/assets/p-dark-thighs-kit.jpeg";
import wartsKit from "@/assets/p-warts-kit-real.jpeg";
import hormonalTea from "@/assets/p-hormonal-imbalance-tea.jpeg";
import hormonalTeabags from "@/assets/p-hormonal-imbalance-teabags.jpeg";
import hormonalImbalance3L from "@/assets/p-hormonal-imbalance-3l.jpeg";
import spearmintCaps from "@/assets/p-spearmint-capsule.jpeg";
import spearmintTea from "@/assets/p-spearmint-tea.jpeg";
import pidKit from "@/assets/p-pid-kit.jpeg";
import pidHerbs from "@/assets/p-pid-herbs.jpeg";
import rheumatismTea from "@/assets/p-rheumatism-tea.jpeg";
import diabetesTea from "@/assets/p-diabetes-tea.jpeg";
import hypertensionTea from "@/assets/p-hypertension-tea.jpeg";
import liverLungsTea from "@/assets/p-liver-lungs-tea.jpeg";
import feminineWellnessTea from "@/assets/p-feminine-wellness-tea.jpeg";
import wombCleanseTea from "@/assets/p-womb-cleanse-tea.jpeg";
import cookieCleanser from "@/assets/p-cookie-cleanser.jpeg";
import cookieCleanserMint from "@/assets/p-cookie-cleanser-mint.jpeg";
import infectionCaps from "@/assets/p-infection-flusher-caps.jpeg";
import flusherDrink from "@/assets/p-flusher-drink.jpeg";
import infectionFlusherHerbs from "@/assets/p-infection-flusher-herbs.jpeg";
import boric from "@/assets/p-boric-real.jpeg";
import libido from "@/assets/p-libido-real.jpeg";
import amenorrheaHerb from "@/assets/p-amenorrhea-herb.jpeg";
import fallopianHerbs from "@/assets/p-fallopian-tube-herbs.jpeg";
import ovarianCystHerbs from "@/assets/p-ovarian-cyst-herbs.jpeg";
import fibroidHerbs from "@/assets/p-fibroid-herbs.jpeg";
import ulcerCapsule from "@/assets/p-ulcer-capsule.jpeg";
import ulcerHerbs from "@/assets/p-ulcer-treatment-herbs.jpeg";

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
    price: 25000,
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
    slug: "hormonal-imbalance-herbs",
    name: "Hormonal Imbalance Treatment Herbs",
    tagline: "3L brewed herbal tonic",
    price: 30000,
    category: "Tonics",
    group: "Herbals",
    image: hormonalImbalance3L,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic that helps regulate the menstrual cycle, eases cramps and PMS, supports fertility and ovulation, and naturally balances estrogen and progesterone.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "3",
    slug: "spearmint-hormone-balanced-capsule",
    name: "Spearmint Hormone Balanced Capsule",
    tagline: "PCOS · acne · facial hair",
    price: 15000,
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
    slug: "spearmint-hormone-balanced-tea",
    name: "Spearmint Hormone Balanced Tea (PCOS Tea)",
    tagline: "PCOS · hormones · skin",
    price: 30000,
    category: "Teas",
    group: "Herbals",
    image: spearmintTea,
    ingredients: ["Wild spearmint leaves"],
    description:
      "30 organic teabags rich in antioxidants. Supports PCOS, eliminates hormonal acne, reduces androgens and hirsutism, regulates cycle and mood, improves digestion and reduces inflammation.",
    ritual: "Boil 1 teabag with a glass cup of hot water for 5 min, allow to cool. Take 2 teabags daily — first thing in the morning and last thing at night.",
  },
  {
    id: "5",
    slug: "feminine-wellness-tea",
    name: "Feminine Wellness Tea",
    tagline: "Womb · fertility · UTI",
    price: 25000,
    category: "Teas",
    group: "Herbals",
    image: feminineWellnessTea,
    ingredients: ["Raspberry leaf", "Chasteberry", "Rose petals", "Nettle"],
    description:
      "30 teabags of a flawless chemistry of nature's organic herbs that cleanses the womb of toxins and waste, supports PCOS and hormonal imbalance, ovarian cysts and fibroids, reduces menstrual discomfort, promotes fertility, eases menopause symptoms, fights UTIs and regulates high prolactin.",
    ritual: "Steep 1 teabag in hot water for 2–3 minutes. Take 2 daily — 1 morning, 1 night. Drink as hot as you can.",
  },
  {
    id: "6",
    slug: "womb-cleanse-tea",
    name: "Womb Cleanse Tea",
    tagline: "PCOS · fertility · ovulation",
    price: 35000,
    category: "Teas",
    group: "Herbals",
    image: wombCleanseTea,
    ingredients: ["Red clover", "Dong quai", "Mugwort", "Ginger root"],
    description:
      "A specially crafted female corrective formula (30 teabags) of organic herbs designed to cleanse, restore and rejuvenate the female reproductive system. Supports PCOS relief, hormone balance, fertility, ovulation, PMS, lost periods, uterine toning and conception.",
    ritual: "Take 2 teabags daily, 1 morning and 1 night. Boil for 5 minutes and drink as hot as you can.",
  },
  {
    id: "7",
    slug: "amenorrhea-herb",
    name: "Amenorrhea Herb",
    tagline: "Restore lost periods",
    price: 30000,
    category: "Tonics",
    group: "Herbals",
    image: amenorrheaHerb,
    ingredients: ["Brewed herbal blend (500ml)"],
    description:
      "A natural herbal tonic that helps treat amenorrhea — the absence or stoppage of menstruation in women of reproductive age, not due to pregnancy, breastfeeding or menopause.",
    ritual: "Shake well. Take 30ml twice daily, morning and night.",
  },
  {
    id: "8",
    slug: "pid-treatment-kit",
    name: "PID Pelvic Inflammatory Disease Treatment Kit",
    tagline: "Complete 4-step protocol",
    price: 50000,
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
    id: "9",
    slug: "pid-treatment-herbs",
    name: "PID Treatment Herbs",
    tagline: "3L brewed PID tonic",
    price: 30000,
    category: "Tonics",
    group: "Herbals",
    image: pidHerbs,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic that helps in treating Pelvic Inflammatory Disease in both men and women, while protecting the reproductive organs from being affected.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "10",
    slug: "fallopian-tube-blockage-herbs",
    name: "Fallopian Tube Blockage Treatment Herbs",
    tagline: "Open tubes · restore flow",
    price: 50000,
    category: "Tonics",
    group: "Herbals",
    image: fallopianHerbs,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic that helps treat hormonal imbalances, restore lost periods, cleanse the womb, and balance hormonal irregularities — supporting the unblocking of fallopian tubes naturally.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "11",
    slug: "ovarian-cyst-treatment-herbs",
    name: "Ovarian Cyst Treatment Herbs",
    tagline: "Shrinks cysts · balances hormones",
    price: 50000,
    category: "Tonics",
    group: "Herbals",
    image: ovarianCystHerbs,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic that naturally shrinks ovarian cysts, clears infection and balances hormones. Relieves pain, reduces heavy bleeding, eases bloated tummy, improves sexual health, promotes fertility and regulates menstrual cycle.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "12",
    slug: "fibroid-treatment-herbs",
    name: "Fibroid Treatment Herbs",
    tagline: "Naturally shrinks fibroid",
    price: 50000,
    category: "Tonics",
    group: "Herbals",
    image: fibroidHerbs,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic that naturally shrinks fibroid, clears infection and balances hormones. Relieves fibroid pain, reduces heavy bleeding to normal, eases bloated tummy, improves sexual health, promotes fertility and regulates menstrual cycle.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "13",
    slug: "ulcer-treatment-herbs",
    name: "Ulcer Treatment Herbs",
    tagline: "Relieve symptoms · pain · sores",
    price: 40000,
    category: "Tonics",
    group: "Herbals",
    image: ulcerHerbs,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic that helps in treating ulcer, relieves ulcer pain and sores.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "14",
    slug: "ulcer-care-capsule",
    name: "Ulcer Care Capsule",
    tagline: "Relieve ulcer symptoms · vegan",
    price: 15000,
    category: "Capsules",
    group: "Supplements",
    image: ulcerCapsule,
    ingredients: ["Vegan herbal ulcer-care blend"],
    description:
      "Vegan herbal capsules formulated to relieve ulcer symptoms, pain and sores, while supporting the healing of the stomach lining.",
    ritual: "Take 2 capsules twice daily, morning and night, with water.",
  },
  {
    id: "15",
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
    id: "16",
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
    id: "17",
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
    id: "18",
    slug: "liver-lungs-detox-tea",
    name: "Liver and Lungs Detox Tea",
    tagline: "Hepatitis · fatty liver · smokers",
    price: 35000,
    category: "Teas",
    group: "Herbals",
    image: liverLungsTea,
    ingredients: ["Milk thistle", "Dandelion root", "Mullein", "Burdock"],
    description:
      "60 teabags (40g) for hepatitis care, reducing fatty and swollen liver, detoxifying against toxins, easing bloating, eliminating waste, supporting healthy daily liver function and reducing the risk of liver and lung damage in smokers.",
    ritual: "Take 2 teabags daily — 1 morning and 1 night. Boil 1 teabag in a cup of water for 3–5 minutes and drink as hot as you can.",
  },
  {
    id: "19",
    slug: "liver-detox-capsules",
    name: "Liver Detox Capsules",
    tagline: "Daily liver support",
    price: 15000,
    category: "Capsules",
    group: "Supplements",
    image: infectionCaps,
    ingredients: ["Milk thistle", "Dandelion root", "Burdock", "Artichoke"],
    description:
      "Vegan herbal capsules that support daily liver detoxification, reduce fatty liver, ease bloating, and help eliminate toxins and waste from the body.",
    ritual: "Take 2 capsules twice daily, morning and night, after meals with a full glass of water.",
  },
  {
    id: "20",
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
    id: "21",
    slug: "cookie-cleanser-minty-wash",
    name: "Cookie Cleanser Minty Wash",
    tagline: "Cooling pH-balanced wash",
    price: 9500,
    oldPrice: 11500,
    category: "Feminine Care",
    group: "Skin Care",
    image: cookieCleanserMint,
    ingredients: ["Plant-based foaming base", "Spearmint extract", "Soothing botanicals"],
    description:
      "150ml non-irritating, pH-balanced foaming wash with a cooling minty finish. Vegan and made for refreshing daily feminine cleansing of the vulva.",
    ritual: "Pump a small amount onto wet skin externally, lather, rinse thoroughly. Use daily.",
  },
  {
    id: "22",
    slug: "herbal-infection-flusher-capsules",
    name: "Herbal Infection Flusher & Detoxifying Capsules",
    tagline: "For both genders",
    price: 15000,
    category: "Capsules",
    group: "Supplements",
    image: infectionCaps,
    ingredients: ["Bitter leaf", "Goldenseal", "Echinacea", "Garlic extract"],
    description:
      "60 vegan capsules that flush chronic infections, candida, UTIs and STIs while supporting full-body detox. Suitable for men and women.",
    ritual: "Take 2 capsules twice daily after meals with a full glass of water for 14–21 days.",
  },
  {
    id: "23",
    slug: "herbal-infection-flusher-drink",
    name: "Herbal Infection Flusher & Detoxifying Drink",
    tagline: "1.2L ready-to-drink cleanse",
    price: 15000,
    category: "Tonics",
    group: "Herbals",
    image: flusherDrink,
    ingredients: ["Brewed herbal concentrate", "Honey", "Spring water"],
    description:
      "1.2 litre ready-to-drink bottled tonic of our infection-flusher herbs — convenient, fast-acting, and gentle on the stomach. For both genders.",
    ritual: "Shake well. Take 30ml in the morning and 30ml at night for 14 days.",
  },
  {
    id: "24",
    slug: "infection-flusher-herbs-3l",
    name: "Herbal Infection Flusher & Detoxifying Herbs",
    tagline: "3L · UTI · BV · candida · STIs",
    price: 30000,
    category: "Tonics",
    group: "Herbals",
    image: infectionFlusherHerbs,
    ingredients: ["Brewed herbal blend (3 litres)"],
    description:
      "A 3-litre brewed herbal tonic for both genders. Amazing solution for U.T.I, Chlamydia, H.P.V Warts, Bacterial Vaginosis (BV), Staphylococcus, P.I.D, S.T.D, Syphilis, Candidiasis / yeast infection, Gonorrhea, and infections with symptoms like nipple discharge, wormlike movements, painful blisters, sores, discharge from penis/vagina and itching.",
    ritual: "Comes with a measuring cup. Take a cup in the morning before eating and a cup at night after eating.",
  },
  {
    id: "25",
    slug: "dark-thighs-kit",
    name: "Dark Thigh, After Shave & Bumps Removal Kit",
    tagline: "Exfoliate · brighten · soothe",
    price: 15000,
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
    id: "26",
    slug: "genital-warts-removal-kit",
    name: "Genital Wart Removal Kit",
    tagline: "Targeted herbal antiviral",
    price: 28000,
    oldPrice: 33000,
    category: "Wellness Kits",
    group: "Herbals",
    image: wartsKit,
    ingredients: ["Genital Wart & Removal Herbal Soap (100ml)", "Herbal Infection Flusher Capsules (60)"],
    description:
      "A two-part kit pairing our targeted herbal soap that addresses genital warts and blisters with internal infection-flushing capsules to support the body's antiviral response. For both genders.",
    ritual: "Wash the affected area with the herbal soap morning and night. Take 2 capsules twice daily after meals for the recommended cycle.",
  },
  {
    id: "27",
    slug: "medical-grade-boric-acid-20",
    name: "Medical Grade Boric Acid (20 count)",
    tagline: "Vaginal pH support",
    price: 6500,
    category: "Capsules",
    group: "Supplements",
    image: boric,
    ingredients: ["USP-grade boric acid 600mg", "Vegetable capsule"],
    description:
      "20 capsules · 600mg per serving. Medical grade boric acid vaginal suppositories used to restore healthy vaginal pH, reduce odour, and address recurrent BV and yeast infections.",
    ritual: "Insert one capsule vaginally at bedtime for up to 7 nights. Do not take orally.",
  },
  {
    id: "28",
    slug: "medical-grade-boric-acid-10",
    name: "Medical Grade Boric Acid (10 count)",
    tagline: "Vaginal pH support · trial size",
    price: 3000,
    category: "Capsules",
    group: "Supplements",
    image: boric,
    ingredients: ["USP-grade boric acid 600mg", "Vegetable capsule"],
    description:
      "10 capsules · 600mg per serving. Medical grade boric acid vaginal suppositories used to restore healthy vaginal pH, reduce odour, and address recurrent BV and yeast infections. Smaller pack, perfect to try.",
    ritual: "Insert one capsule vaginally at bedtime for up to 7 nights. Do not take orally.",
  },
  {
    id: "29",
    slug: "libido-moisture-boost",
    name: "Libido & Moisture Boost Herbal Supplements",
    tagline: "Slippery elm + African okra",
    price: 15000,
    category: "Capsules",
    group: "Supplements",
    image: libido,
    ingredients: ["Slippery elm", "African okra", "Maca root", "Sea moss"],
    description:
      "30 vegan capsules that relieve vaginal dryness and boost natural moisture. Made with slippery elm and African okra to support libido, lubrication and overall vaginal tissue health.",
    ritual: "Take 1 capsule daily with food. Best taken consistently for 4–6 weeks.",
  },
  {
    id: "30",
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
];

export const productGroups: ProductGroup[] = ["Supplements", "Skin Care", "Herbals"];

export const formatNGN = (n: number) =>
  `NGN ${n.toLocaleString("en-NG")}`;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
