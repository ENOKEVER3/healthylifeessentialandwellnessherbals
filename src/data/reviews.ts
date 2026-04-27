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

const base: Record<string, Review[]> = {
  "dark-thighs-kit": [
    { id: "r1", author: "Adaeze N.", location: "Lagos, NG", rating: 5, date: "March 2026", title: "My inner thighs are even again", body: "I had given up on inner thigh darkness from years of shaving. Three weeks of consistent use and the difference is undeniable. The serum is gentle — no burning at all.", verified: true },
    { id: "r2", author: "Funke A.", location: "Abuja, NG", rating: 5, date: "February 2026", title: "Bumps gone after one week", body: "I bought it for the post-shave bumps and it actually works. The soap lathers nicely and the serum sinks in fast.", verified: true },
    { id: "r3", author: "Joy O.", location: "Port Harcourt, NG", rating: 4, date: "January 2026", title: "Slow but steady", body: "Took about a month to see real change but it's working. Wish the bottle were bigger.", verified: true },
  ],
  "genital-warts-herpes-kit": [
    { id: "r1", author: "Anonymous", location: "Lagos, NG", rating: 5, date: "April 2026", title: "Discreet and effective", body: "Dr Tomisin walked me through everything. Outbreaks have completely stopped. Forever grateful.", verified: true },
    { id: "r2", author: "K. M.", location: "Ado Ekiti, NG", rating: 5, date: "March 2026", title: "Real results", body: "I was skeptical of herbal options for this but the warts visibly reduced within the first cycle. Highly recommend.", verified: true },
  ],
  "feminine-wellness-tea": [
    { id: "r1", author: "Chioma E.", location: "Enugu, NG", rating: 5, date: "April 2026", title: "Lighter, calmer cycles", body: "My periods are noticeably less painful and my mood swings are softer. Tastes lovely too.", verified: true },
    { id: "r2", author: "Bisi T.", location: "Ibadan, NG", rating: 5, date: "March 2026", title: "Part of my evening ritual", body: "I look forward to a cup every night. Subtle floral, very calming.", verified: true },
  ],
  "womb-cleanse-tea": [
    { id: "r1", author: "Tomi A.", location: "Lagos, NG", rating: 5, date: "April 2026", title: "PCOS regulation", body: "After 6 weeks my cycle returned for the first time in over a year. Combined with the spearmint tea — life changing.", verified: true },
    { id: "r2", author: "Esther U.", location: "Ado Ekiti, NG", rating: 5, date: "February 2026", title: "Postpartum recovery", body: "Helped my body bounce back gently after delivery. Doctor approved.", verified: true },
  ],
  "spearmint-hormone-balance-tea": [
    { id: "r1", author: "Halima B.", location: "Kaduna, NG", rating: 5, date: "March 2026", title: "Hormonal acne cleared", body: "Two cups a day for two months and my chin acne is finally gone. Bright fresh flavour.", verified: true },
    { id: "r2", author: "Ngozi P.", location: "Lagos, NG", rating: 4, date: "February 2026", title: "Reduced facial hair", body: "Noticed slower growth on my chin after about 6 weeks. Will keep going.", verified: true },
  ],
  "infection-flusher-tea": [
    { id: "r1", author: "Sade O.", location: "Lagos, NG", rating: 5, date: "April 2026", title: "Recurrent BV — finally gone", body: "I had been battling BV for over a year. Two weeks on this tea and my tests came back clean.", verified: true },
    { id: "r2", author: "Anonymous", location: "Abuja, NG", rating: 5, date: "March 2026", title: "Strong and effective", body: "Bitter but it works. Cleared a stubborn UTI without antibiotics.", verified: true },
  ],
  "infection-flusher-capsule": [
    { id: "r1", author: "Ifeoma J.", location: "Lagos, NG", rating: 5, date: "April 2026", title: "Easier than the tea", body: "Same results, none of the bitter taste. Perfect for travel.", verified: true },
    { id: "r2", author: "Mary K.", location: "Lagos, NG", rating: 4, date: "February 2026", title: "Great for maintenance", body: "I take it as a monthly cleanse and haven't had an infection since.", verified: true },
  ],
  "medical-grade-boric-acid": [
    { id: "r1", author: "Anonymous", location: "Lagos, NG", rating: 5, date: "April 2026", title: "pH restored", body: "Used for 5 nights and odour was completely gone. Will keep some on hand always.", verified: true },
    { id: "r2", author: "Rita E.", location: "Abuja, NG", rating: 5, date: "March 2026", title: "Trusted product", body: "Clean medical grade — exactly what my gynae recommended.", verified: true },
  ],
  "libido-moisture-boost": [
    { id: "r1", author: "Anonymous", location: "Lagos, NG", rating: 5, date: "April 2026", title: "Things changed at home", body: "Within 3 weeks both my libido and natural moisture noticeably improved. My husband is thrilled.", verified: true },
    { id: "r2", author: "Grace I.", location: "Port Harcourt, NG", rating: 5, date: "March 2026", title: "Gentle and effective", body: "No side effects and I feel more like myself again.", verified: true },
  ],
  "herbal-infection-flusher-liquid": [
    { id: "r1", author: "Linda M.", location: "Lagos, NG", rating: 5, date: "April 2026", title: "Convenient and works fast", body: "Love that it's already brewed. Felt lighter and cleaner within days.", verified: true },
    { id: "r2", author: "Jane O.", location: "Ibadan, NG", rating: 4, date: "February 2026", title: "Earthy taste, real results", body: "Not the best taste but it works — that's what matters.", verified: true },
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
