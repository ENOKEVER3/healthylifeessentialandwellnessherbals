import { Seo } from "@/components/Seo";
import { Link } from "react-router-dom";

const articles = [
  {
    id: "understanding-pid-naturally",
    title: "Understanding Pelvic Inflammatory Disease (PID) and How Herbs Support Recovery",
    excerpt:
      "PID is one of the most common causes of chronic pelvic pain, infertility and tubal damage in Nigerian women. Here is how our herbal protocol works alongside your medical care.",
    body: [
      "Pelvic Inflammatory Disease (PID) develops when bacteria from the vagina or cervix ascend into the uterus, fallopian tubes and ovaries. Left unmanaged, scarring in the tubes can block the natural passage of an egg and lead to secondary infertility, ectopic pregnancy or chronic pelvic pain. In our consultation practice we see women who have completed several rounds of antibiotics yet still complain of lower abdominal heaviness, foul discharge, painful sex and irregular cycles — a pattern that responds well to a combined naturopathic protocol.",
      "The herbs we use in the PID Treatment Kit are chosen for four actions: antimicrobial (goldenseal-family bitters, uziza, bitter leaf), lymphatic drainage (cleavers and calendula analogues sourced locally), uterine tonifying (red raspberry leaf, cramp bark) and hormonal rebalancing (chasteberry, spearmint). Together they help the pelvic tissues drain, reduce inflammation and restore a healthy vaginal terrain so re-infection is less likely.",
      "A realistic recovery timeline is 8–12 weeks of consistent use, paired with a low-sugar diet, warm castor-oil packs over the lower abdomen three evenings a week, and abstaining from sex for the first 21 days of the protocol. We always encourage women to continue any antibiotic course prescribed by their doctor — herbs are complementary, not a replacement for acute-care medicine.",
      "If you are trying to conceive after PID, we usually recommend three full menstrual cycles on the protocol before attempting pregnancy so the tubes have time to decongest. A HSG (hysterosalpingogram) after the third cycle is a helpful way to confirm tubal patency.",
    ],
  },
  {
    id: "hormonal-imbalance-signs",
    title: "10 Signs Your Hormones Are Out of Balance (and What to Do About It)",
    excerpt:
      "Acne on the jawline, painful periods, mid-cycle spotting, weight around the hips, mood swings — these are all messages from your endocrine system. Learn to read them.",
    body: [
      "Hormonal imbalance is not a single diagnosis — it is a spectrum that includes estrogen dominance, low progesterone, elevated androgens (as in PCOS), thyroid dysfunction and cortisol dysregulation. The common thread is that the body's chemical messengers are no longer arriving in the right amounts at the right times. Because these hormones govern mood, sleep, weight, skin and fertility, the symptoms show up almost everywhere.",
      "The ten patterns we screen for at consultation are: (1) jawline and chin acne that flares before your period, (2) periods that are heavy enough to soak through a pad in under two hours, (3) cycles shorter than 24 or longer than 35 days, (4) mid-cycle brown spotting, (5) breast tenderness lasting more than four days, (6) sudden weight gain around the hips and thighs, (7) unexplained hair on the chin, chest or lower belly, (8) hair thinning at the crown, (9) low libido or vaginal dryness in your twenties or thirties, and (10) waking between 2 and 4 a.m. and struggling to fall back asleep.",
      "Our Hormonal Imbalance Tea and Spearmint Hormone Balanced Capsule address the two most common presentations we see in Nigerian women — estrogen-dominant PMS and androgen-driven PCOS. The tea uses chasteberry, red raspberry leaf and ginger to gently lift progesterone in the second half of the cycle. The capsule uses spearmint, which is one of the few herbs with published clinical trials showing measurable reductions in free testosterone.",
      "Alongside herbs, three lifestyle changes accelerate results: eliminate seed oils and replace them with palm, coconut or olive oil; eat at least 100 g of protein a day; and walk 20 minutes after your largest meal to blunt the insulin spike that drives androgen production.",
    ],
  },
  {
    id: "fibroid-treatment-guide",
    title: "A Naturopathic Guide to Shrinking Fibroids Without Surgery",
    excerpt:
      "Fibroids affect up to 8 in 10 Black women by age 50. Surgery is not the only answer — here is the herbal, dietary and lifestyle protocol we have used for eight years.",
    body: [
      "Uterine fibroids (leiomyomas) are benign muscular growths that feed on estrogen. Because Nigerian women tend to have higher circulating estrogen (partly genetic, partly from exposure to xenoestrogens in cosmetics, plastics and processed foods), fibroids are especially common in our community. Myomectomy and hysterectomy are effective but invasive; many women want to try a natural approach first, particularly when they still want to conceive.",
      "Our Fibroid Treatment Herbs is a 3-litre brewed tonic taken as a shot glass twice daily for 90 days. It combines uterine astringents (yarrow, shepherd's purse analogues), liver decongestants (milk thistle, dandelion root) and hormonal modulators (chasteberry, wild yam) so the body clears excess estrogen through the bile faster than the fibroid can absorb it.",
      "Results depend on fibroid size and position. Subserosal fibroids under 4 cm often shrink 40–60% in a single 90-day round. Intramural fibroids may need two rounds. Submucosal fibroids close to the endometrium respond more slowly and sometimes require a combined approach with your gynaecologist. We recommend a pelvic ultrasound at baseline and after 90 days to measure progress objectively.",
      "During treatment, avoid soy protein isolates, hormone-injected chicken, and skin-lightening creams — all three are potent xenoestrogens. Prioritise cruciferous vegetables (ugu, ewedu, cabbage) which contain DIM, a compound that helps the liver metabolise estrogen along the safer 2-hydroxy pathway.",
    ],
  },
  {
    id: "safe-herbal-medicine",
    title: "How to Buy Herbal Medicine Safely in Nigeria",
    excerpt:
      "The Nigerian herbal market is booming — and largely unregulated. Here are the red flags to avoid and the questions to ask any herbal brand before you spend money.",
    body: [
      "Herbal medicine has been part of West African healing for centuries, but the recent explosion of Instagram and WhatsApp herbal sellers has made it much harder to tell quality from marketing. Poorly prepared herbs can contain heavy metals, undeclared steroids or the wrong plant species entirely. Before you buy from any brand — including ours — run through this checklist.",
      "First, look for a named, qualified formulator. A brand should tell you who mixes their herbs and what their training is. A verifiable naturopathic doctor, pharmacist, or accredited herbalist should stand behind the product. Anonymous 'Mama's blend' formulations are a red flag.",
      "Second, ask where the herbs are grown or sourced. Wild-harvested herbs from roadsides or industrial areas absorb heavy metals from car exhaust and pesticide runoff. Our herbs are either grown on our own farm in Ekiti or sourced from named smallholder farms we have visited.",
      "Third, check the packaging. Tinctures should be in dark amber glass (light degrades the actives). Capsules should list every ingredient, not just 'proprietary blend'. Brewed tonics should ship in food-grade PET or glass, not recycled plastic bottles.",
      "Finally, demand a consultation. Any brand willing to sell you a strong herbal formula for fibroids, PID or hormonal issues without asking about your medical history, medications and pregnancy status is not treating your safety seriously. A short questionnaire before purchase is the minimum standard.",
    ],
  },
  {
    id: "morning-wellness-ritual",
    title: "The 15-Minute Morning Ritual That Rebalances Your Cycle",
    excerpt:
      "Small daily rituals compound. This is the exact morning routine we prescribe to consultation clients working on fertility, PMS and energy.",
    body: [
      "Consistency beats intensity when you are working with plant medicine. A 15-minute morning ritual done every day for 90 days will do more for your hormones than an expensive weekend detox once a quarter. Here is the exact sequence we teach.",
      "Minute 1–3: On waking, drink 500 ml of warm water with the juice of half a lime and a pinch of unrefined sea salt. This rehydrates you after 8 hours of fasting, gently stimulates bile flow, and gives your adrenals the sodium they need before cortisol peaks.",
      "Minute 4–8: Steep one teaspoon of our Hormonal Imbalance Tea in 300 ml of just-boiled water, covered, for four minutes. Sip slowly while you plan your day. Covering the cup keeps the volatile oils (which do most of the hormonal work) from evaporating.",
      "Minute 9–12: Do four rounds of box breathing (inhale 4, hold 4, exhale 4, hold 4) followed by ten slow cat-cow stretches. This activates the vagus nerve, which regulates digestion, mood and menstrual pain.",
      "Minute 13–15: Eat 30 g of protein within an hour of waking — two boiled eggs, a cup of Greek yoghurt, or a protein smoothie. Skipping breakfast or starting the day with only bread and tea spikes cortisol and worsens PMS, acne and cravings for the rest of the day.",
    ],
  },
];

const Journal = () => (
  <div className="container-narrow py-16 md:py-24">
    <Seo
      title="Journal — Herbal Wellness Articles | Healthy Life Essentials"
      description="In-depth articles on PID, fibroids, hormonal imbalance, PCOS and safe herbal medicine — written by naturopathic Dr. Kolawole Oluwatomisin Esther."
      path="/journal"
    />
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-ochre">The Journal</p>
      <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moss-deep md:text-6xl">
        Herbal wellness, written slowly.
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        Long-form articles from our clinic — on hormones, fertility, PID, fibroids, and the small
        daily rituals that keep the body in balance. Written by Dr. Kolawole Oluwatomisin Esther
        and reviewed against current naturopathic practice.
      </p>
    </header>

    <div className="mt-16 space-y-20">
      {articles.map((a) => (
        <article key={a.id} id={a.id} className="max-w-3xl scroll-mt-24">
          <h2 className="font-display text-3xl leading-tight text-moss-deep md:text-4xl">
            {a.title}
          </h2>
          <p className="mt-3 text-base italic text-muted-foreground">{a.excerpt}</p>
          <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-foreground/85">
            {a.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 text-sm">
            <Link
              to="/consultation"
              className="text-moss underline underline-offset-4 hover:text-moss-deep"
            >
              Book a private consultation to discuss your case →
            </Link>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default Journal;
