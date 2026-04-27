export type Review = {
  id: string;
  author: string;
  location: string;
  rating: number; // 1–5
  date: string;
  title: string;
  body: string;
  verified: boolean;
};

// Mocked reviews keyed by product slug.
const base: Record<string, Review[]> = {
  "rosemary-tincture": [
    { id: "r1", author: "Maren H.", location: "Portland, OR", rating: 5, date: "March 2026", title: "My morning anchor", body: "Earthy, peppery, and surprisingly bright. I take 15 drops before deep work and the difference is unmistakable. The amber bottle feels like a small ceremony.", verified: true },
    { id: "r2", author: "Theo L.", location: "Brooklyn, NY", rating: 5, date: "February 2026", title: "Better than coffee for focus", body: "I was skeptical, but two weeks in I noticed I wasn't reaching for a third cup of coffee. Clean, gentle, no jitters.", verified: true },
    { id: "r3", author: "Priya S.", location: "Austin, TX", rating: 4, date: "January 2026", title: "Lovely — a bit strong on its own", body: "I prefer it stirred into water rather than under the tongue, but the quality is obvious. You can smell the rosemary before you open the bottle.", verified: true },
  ],
  "chamomile-tea": [
    { id: "r1", author: "Eleni K.", location: "Athens, GA", rating: 5, date: "April 2026", title: "Tastes like a summer field", body: "I've tried dozens of chamomile teas — most taste like dust. This one tastes like the actual flower. My evenings are softer because of it.", verified: true },
    { id: "r2", author: "Jonas R.", location: "Berlin, DE", rating: 5, date: "March 2026", title: "The lemon balm makes it", body: "Subtle citrus note from the lemon balm rounds it out beautifully. My partner and I share a pot every night now.", verified: true },
  ],
  "eucalyptus-balm": [
    { id: "r1", author: "Sofia A.", location: "Lisbon, PT", rating: 5, date: "April 2026", title: "Saved my chest cold", body: "Rubbed this on before bed during a brutal cold and woke up actually breathing. The texture melts immediately — not greasy at all.", verified: true },
    { id: "r2", author: "Daniel W.", location: "Manchester, UK", rating: 4, date: "February 2026", title: "Strong scent, in a good way", body: "Use a smaller amount than you think. A pea-sized bit on the temples is plenty for tension headaches.", verified: false },
    { id: "r3", author: "Anika M.", location: "Toronto, CA", rating: 5, date: "January 2026", title: "Permanent fixture on my nightstand", body: "I use it for tight shoulders after long studio days. The tin is gorgeous too.", verified: true },
  ],
  "lavender-oil": [
    { id: "r1", author: "Rosa V.", location: "Mexico City, MX", rating: 5, date: "March 2026", title: "Sleep, finally", body: "Two drops on the soles of my feet and I'm out within 20 minutes. The scent is real lavender — not the perfumed imitation.", verified: true },
    { id: "r2", author: "Hugo P.", location: "Paris, FR", rating: 5, date: "February 2026", title: "Beautifully balanced", body: "The jojoba carrier means it absorbs without leaving residue. I use it on my face after shaving.", verified: true },
  ],
  "wildflower-honey": [
    { id: "r1", author: "Clara D.", location: "Asheville, NC", rating: 5, date: "April 2026", title: "Stopped a sore throat in its tracks", body: "Took a teaspoon at the first scratch and by morning it was gone. The flavor is complex — floral, slightly bitter from the propolis.", verified: true },
    { id: "r2", author: "Mateo G.", location: "Buenos Aires, AR", rating: 4, date: "March 2026", title: "Lovely on toast too", body: "Yes, it's medicinal. It's also just delicious. The jar didn't last long in our kitchen.", verified: true },
  ],
  "sage-bundle": [
    { id: "r1", author: "Wren T.", location: "Santa Fe, NM", rating: 5, date: "March 2026", title: "Beautifully tied", body: "Burns slow and clean — no harsh smoke. I love that the twine is hemp. A gentle ritual to mark new beginnings in a space.", verified: true },
    { id: "r2", author: "Beatrice O.", location: "Edinburgh, UK", rating: 5, date: "February 2026", title: "A small, perfect thing", body: "Bought one for myself and three as gifts. Everyone has come back asking where I found them.", verified: true },
  ],
};

export const getReviews = (slug: string): Review[] => base[slug] ?? [];

export const getReviewSummary = (slug: string) => {
  const reviews = getReviews(slug);
  if (reviews.length === 0) return { count: 0, average: 0, distribution: [0, 0, 0, 0, 0] };
  const total = reviews.reduce((s, r) => s + r.rating, 0);
  const distribution = [5, 4, 3, 2, 1].map(
    (n) => reviews.filter((r) => r.rating === n).length
  );
  return {
    count: reviews.length,
    average: Math.round((total / reviews.length) * 10) / 10,
    distribution,
  };
};
