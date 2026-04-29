import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout, ShieldCheck, HeartPulse, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, productGroups } from "@/data/products";
import hero from "@/assets/hero-herbs.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import ceoPortrait from "@/assets/ceo-portrait.jpeg";

const heroSlides = [
  { src: hero, alt: "Fresh herbs and an apothecary bottle on linen" },
  { src: hero2, alt: "Laboratory examination of dried medicinal herbs" },
  { src: hero3, alt: "Herbal supplement capsules with mortar and pestle" },
  { src: hero4, alt: "Essential oil dripping from a fresh leaf into an amber bottle" },
  { src: hero5, alt: "Medicinal herbs and tinctures arranged in a meadow" },
];

const Home = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          {heroSlides.map((s, i) => (
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              width={1920}
              height={1080}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-sun mix-blend-soft-light" />
          <div className="container-narrow relative flex h-full flex-col justify-end pb-20 md:justify-center md:pb-0">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-cream/90">
              Healthy Life Essentials & Wellness Herbals
            </p>
            <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-cream text-balance md:text-7xl">
              Natural healing, doctor-formulated.
            </h1>
            <p className="mt-6 max-w-lg text-base text-cream/85 md:text-lg">
              Herbal remedies for feminine wellness, hormonal balance, infections,
              vitality and skin — crafted by Naturopathic Dr. Tosin Kolawole.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-cream text-moss-deep hover:bg-background">
                <Link to="/shop">Shop products <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream">
                <Link to="/consultation">Book a consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-narrow py-20">
        <div className="grid gap-10 md:grid-cols-4">
          {[
            { icon: Stethoscope, title: "Doctor-formulated", body: "Every product is developed by a licensed Naturopathic Doctor & BMLS." },
            { icon: Sprout, title: "Plant-based", body: "Pure herbs, roots, and botanicals — no harsh fillers or synthetics." },
            { icon: ShieldCheck, title: "Lab-conscious", body: "Backed by a biomedical laboratory science background and quality testing." },
            { icon: HeartPulse, title: "Whole-body care", body: "From hormones to skin to intimacy — holistic, root-cause solutions." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start">
              <Icon className="mb-4 h-6 w-6 text-ochre" strokeWidth={1.3} />
              <h3 className="font-display text-xl text-moss-deep">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* All products by category */}
      <section className="container-narrow pb-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ochre">Our products</p>
            <h2 className="mt-2 font-display text-4xl text-moss-deep">Everything we make.</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-moss underline-offset-4 hover:underline md:inline">
            View full apothecary →
          </Link>
        </div>
      </section>

      {productGroups.map((g) => {
        const items = products.filter((p) => p.group === g);
        if (items.length === 0) return null;
        return (
          <section key={g} className="container-narrow pb-20">
            <div className="mb-6 flex items-baseline justify-between border-b border-border pb-3">
              <h3 className="font-display text-2xl text-moss-deep">{g}</h3>
              <Link
                to={`/shop?group=${encodeURIComponent(g)}`}
                className="text-xs uppercase tracking-[0.18em] text-moss hover:underline"
              >
                See all {g.toLowerCase()} →
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
              {items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        );
      })}

      {/* CEO teaser */}
      <section className="bg-moss-deep py-20 text-cream">
        <div className="container-narrow grid items-center gap-12 md:grid-cols-[1fr,1.2fr]">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={ceoPortrait}
              alt="Dr. Tosin Kolawole, founder of Healthy Life Essentials"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cream/70">The face behind the brand</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Dr. Tosin Kolawole
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cream/70">
              BMLS · Naturopathic Doctor · Founder
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-cream/85">
              A Biomedical Laboratory Scientist and Naturopathic Doctor on a mission
              to make safe, effective, root-cause natural healthcare accessible —
              especially for women's health, hormonal balance, fertility and intimacy.
            </p>
            <Button asChild size="lg" variant="outline" className="mt-8 border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream">
              <Link to="/ceo">Read her full story →</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="container-narrow py-20 text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">Need personal guidance?</p>
        <h2 className="mt-3 font-display text-4xl text-moss-deep md:text-5xl">
          Book a private medical consultation.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
          Share your concerns confidentially and Dr. Tosin's team will recommend
          a personalized natural protocol.
        </p>
        <Button asChild size="lg" className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep">
          <Link to="/consultation">Start consultation</Link>
        </Button>
      </section>
    </>
  );
};

export default Home;
