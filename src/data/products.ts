import tincture from "@/assets/product-tincture.jpg";
import tea from "@/assets/product-tea.jpg";
import balm from "@/assets/product-balm.jpg";
import oil from "@/assets/product-oil.jpg";
import honey from "@/assets/product-honey.jpg";
import smudge from "@/assets/product-smudge.jpg";

export type Product = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: string;
  image: string;
  ingredients: string[];
  description: string;
  ritual: string;
};

export const products: Product[] = [
  {
    id: "1",
    slug: "rosemary-tincture",
    name: "Rosemary Clarity Tincture",
    tagline: "Focus & circulation",
    price: 28,
    category: "Tinctures",
    image: tincture,
    ingredients: ["Wild rosemary", "Organic cane spirit", "Spring water"],
    description:
      "A small-batch tincture distilled from sun-grown rosemary harvested at dawn. Earthy, resinous, and grounding — designed to sharpen the mind and warm the body.",
    ritual: "Place 15 drops under the tongue in the morning, or stir into still water before deep work.",
  },
  {
    id: "2",
    slug: "chamomile-tea",
    name: "Wild Chamomile Loose-Leaf",
    tagline: "Evening calm",
    price: 18,
    category: "Teas",
    image: tea,
    ingredients: ["Hand-picked chamomile flowers", "Lemon balm", "Linden"],
    description:
      "A whisper-soft infusion of chamomile blossoms, lemon balm, and linden — an evening ritual to slow the breath and soften the day.",
    ritual: "Steep one tablespoon in 250ml of just-off-boiling water for 6 minutes. Sip slowly.",
  },
  {
    id: "3",
    slug: "eucalyptus-balm",
    name: "Eucalyptus Restorative Balm",
    tagline: "Breath & muscle",
    price: 24,
    category: "Balms",
    image: balm,
    ingredients: ["Beeswax", "Eucalyptus essential oil", "Shea butter", "Olive oil"],
    description:
      "A clean-burning balm of eucalyptus and shea — melts on contact to open the chest and ease tired shoulders.",
    ritual: "Warm a small amount between palms and massage into the chest, temples, or wrists.",
  },
  {
    id: "4",
    slug: "lavender-oil",
    name: "Lavender Stillness Oil",
    tagline: "Sleep & skin",
    price: 32,
    category: "Oils",
    image: oil,
    ingredients: ["Cold-pressed lavender", "Jojoba", "Sweet almond"],
    description:
      "Steam-distilled lavender suspended in jojoba and sweet almond. Drift-soft, faintly sweet, and unmistakably calming.",
    ritual: "Massage two drops into the soles of the feet before sleep, or smooth over freshly cleansed skin.",
  },
  {
    id: "5",
    slug: "wildflower-honey",
    name: "Wildflower Apothecary Honey",
    tagline: "Throat & immunity",
    price: 22,
    category: "Honey",
    image: honey,
    ingredients: ["Raw wildflower honey", "Propolis", "Echinacea infusion"],
    description:
      "Raw honey infused with propolis and echinacea — a spoonful when the seasons turn and the throat feels tender.",
    ritual: "Take one teaspoon at the first sign of a cold, or stir into warm (not hot) tea.",
  },
  {
    id: "6",
    slug: "sage-bundle",
    name: "Garden Sage Bundle",
    tagline: "Space & intention",
    price: 14,
    category: "Smoke",
    image: smudge,
    ingredients: ["Sun-dried garden sage", "Hemp twine"],
    description:
      "A hand-tied bundle of garden sage, dried slowly in the rafters. A quiet ritual to clear a room and mark a beginning.",
    ritual: "Light the tip, let the flame catch, then blow out so the smoke curls upward. Move room to room with intention.",
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
