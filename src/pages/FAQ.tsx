import { Seo } from "@/components/Seo";

const faqs = [
  {
    q: "Are your herbs safe to take with prescription medication?",
    a: "Most of our formulas are gentle enough to combine with common medications, but there are important exceptions — particularly blood thinners, thyroid replacement, antidepressants and diabetes drugs. Always book a consultation and disclose every medication you are on before starting a protocol so we can screen for interactions.",
  },
  {
    q: "Can I use your products while pregnant or breastfeeding?",
    a: "No. Several of our herbs — chasteberry, spearmint at therapeutic doses, and the fibroid tonic — are contraindicated in pregnancy. Only the postpartum recovery blends are safe while breastfeeding, and even those should be started after a consultation.",
  },
  {
    q: "How long before I see results?",
    a: "It depends on the condition. Menstrual cramps and PMS often improve within one cycle. Fibroids and PCOS typically need 90 days of consistent use. PID recovery is 8–12 weeks. Chronic hormonal issues that took years to develop rarely resolve in less than three months.",
  },
  {
    q: "Do you ship outside Nigeria?",
    a: "Yes. We ship worldwide via DHL and FedEx. International shipping starts from ₦20,000, calculated by weight and destination. Use the Track Package page to estimate your waybill before ordering.",
  },
  {
    q: "What if the product doesn't work for me?",
    a: "Herbal medicine is highly individual. If you have completed a full protocol as directed and seen no improvement, contact us. We will review your intake, adjust the formula, or credit you toward a different product — we do not offer cash refunds on opened herbal goods for hygiene reasons.",
  },
  {
    q: "Are your products NAFDAC registered?",
    a: "Our facility follows NAFDAC good-manufacturing guidelines and we are in the process of individual product registration. Registration numbers will be printed on packaging as each product completes the review cycle.",
  },
  {
    q: "How do I store the tonics and teas?",
    a: "Loose teas and capsules: cool, dry, dark cupboard, away from the stove. Brewed tonics: refrigerated after opening and used within 30 days. Never leave a tonic bottle in a hot car — heat degrades the active compounds.",
  },
  {
    q: "Do I need a consultation to buy?",
    a: "For simple products like the daily wellness teas, no. For therapeutic protocols (fibroids, PID, PCOS, fertility support), we strongly recommend a paid consultation first so we can tailor dose and duration to your medical history.",
  },
];

const FAQ = () => (
  <div className="container-narrow py-16 md:py-24">
    <Seo
      title="Frequently Asked Questions | Healthy Life Essentials"
      description="Answers to the most common questions about our herbal products, safety, shipping, and consultations."
      path="/faq"
    />
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-ochre">Support</p>
      <h1 className="mt-4 font-display text-5xl text-moss-deep md:text-6xl">
        Frequently asked questions
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Everything customers ask us most often — safety, results timelines, shipping, and how our
        consultation process works.
      </p>
    </header>
    <div className="mt-14 max-w-3xl divide-y divide-border">
      {faqs.map((f, i) => (
        <div key={i} className="py-7">
          <h2 className="font-display text-xl text-moss-deep">{f.q}</h2>
          <p className="mt-3 leading-relaxed text-foreground/80">{f.a}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FAQ;
