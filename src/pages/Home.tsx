import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sprout, ShieldCheck, HeartPulse, Stethoscope, MapPin, Globe2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products, productGroups } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";
import hero from "@/assets/hero-herbs.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import hero5 from "@/assets/hero-5.jpg";
import ceoPortrait from "@/assets/ceo-portrait.jpeg";
import { Seo } from "@/components/Seo";

const heroSlides = [
  { src: hero, alt: "Fresh herbs and an apothecary bottle on linen" },
  { src: hero2, alt: "Laboratory examination of dried medicinal herbs" },
  { src: hero3, alt: "Herbal supplement capsules with mortar and pestle" },
  { src: hero4, alt: "Essential oil dripping from a fresh leaf into an amber bottle" },
  { src: hero5, alt: "Medicinal herbs and tinctures arranged in a meadow" },
];

const Home = () => {
  const [slide, setSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % heroSlides.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <Seo
        title="Herbal Remedies in Nigeria | Healthy Life Essentials"
        description="Doctor-formulated herbal teas, tinctures, capsules, and wellness kits from our Ado-Ekiti headquarters, dispatched through Lagos and shipped worldwide."
        path="/"
      />
      {/* Bento hero */}
      <section className="bg-cream/40">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-3 p-4 sm:p-6 md:grid-cols-12 md:gap-5 md:p-8">
          {/* Main hero tile */}
          <div className="group relative flex flex-col justify-center overflow-hidden rounded-3xl bg-moss-deep p-7 sm:p-10 col-span-2 md:col-span-8 md:p-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-leaf/30 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 left-10 h-64 w-64 rounded-full bg-gold/15 blur-[110px]" />
            <div className="relative z-10">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.28em] text-gold">
                {t("hero_eyebrow")}
              </p>
              <h1 className="max-w-2xl font-display text-4xl leading-[1.05] text-cream text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                {t("hero_title")}
              </h1>
              <p className="mt-6 max-w-lg text-base font-light leading-relaxed text-cream/80 md:text-lg">
                {t("hero_subtitle")}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full bg-gold px-8 text-moss-deep transition-transform hover:-translate-y-0.5 hover:bg-gold/90">
                  <Link to="/shop">{t("hero_cta_shop")} <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full border-cream/30 bg-transparent px-8 text-cream hover:bg-cream/10 hover:text-cream">
                  <Link to="/consultation">{t("hero_cta_book")}</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image showcase tile */}
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl bg-leaf col-span-2 md:col-span-4 md:min-h-0">
            {heroSlides.map((s, i) => (
              <img
                key={s.src}
                src={s.src}
                alt={s.alt}
                width={800}
                height={1000}
                fetchPriority={i === 0 ? "high" : "low"}
                loading={i === 0 ? "eager" : "lazy"}
                decoding={i === 0 ? "sync" : "async"}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-moss-deep/70 via-transparent to-transparent" />
            <span className="absolute bottom-6 left-6 text-sm font-medium uppercase tracking-wider text-cream">
              {t("pillar2_title")}
            </span>
          </div>

          {/* Pillar tiles */}
          {[
            { icon: Stethoscope, title: t("pillar1_title"), body: t("pillar1_body"), tone: "bg-card border border-gold/25 text-moss-deep" },
            { icon: Sprout, title: t("pillar2_title"), body: t("pillar2_body"), tone: "bg-leaf text-moss-deep" },
            { icon: ShieldCheck, title: t("pillar3_title"), body: t("pillar3_body"), tone: "bg-card border border-gold/25 text-moss-deep" },
            { icon: HeartPulse, title: t("pillar4_title"), body: t("pillar4_body"), tone: "bg-cream border-2 border-moss-deep text-moss-deep" },
          ].map(({ icon: Icon, title, body, tone }) => (
            <div
              key={title}
              className={`flex flex-col justify-between gap-6 rounded-3xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:gap-8 sm:p-7 md:col-span-3 ${tone}`}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cream/70">
                <Icon className="h-6 w-6 text-moss-deep" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-display text-xl sm:text-2xl">{title}</h3>
                <p className="mt-2 text-xs leading-relaxed opacity-75 sm:text-sm">{body}</p>
              </div>
            </div>
          ))}

          {/* Location tiles */}
          <div className="flex items-start gap-4 rounded-3xl border-2 border-moss-deep bg-cream p-6 col-span-2 md:p-7 md:col-span-6">
            <MapPin className="mt-1 h-6 w-6 shrink-0 text-moss-deep" strokeWidth={1.5} />
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-gold">From Nigeria to the world</p>
              <h2 className="mt-2 font-display text-2xl text-moss-deep md:text-3xl">Rooted in Ado-Ekiti. Dispatching through Lagos.</h2>
              <p className="mt-2 text-sm leading-relaxed text-moss-deep/70">
                Our herbal wellness products are formulated and packed at our Ado-Ekiti, Ekiti State headquarters.
              </p>
            </div>
          </div>
          <Link
            to="/shipping"
            className="group flex items-center justify-between gap-4 rounded-3xl bg-gold p-6 col-span-2 text-moss-deep transition-transform hover:-translate-y-1 md:p-7 md:col-span-6"
          >
            <div className="flex items-start gap-4">
              <Globe2 className="mt-1 h-6 w-6 shrink-0" strokeWidth={1.5} />
              <div>
                <h3 className="font-display text-2xl md:text-3xl">Worldwide delivery</h3>
                <p className="mt-2 text-sm leading-relaxed text-moss-deep/80">
                  Orders move through our Lagos dispatch hub across Nigeria and to customers around the world.
                </p>
              </div>
            </div>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-moss-deep text-cream transition-transform group-hover:translate-x-1">
              <ArrowRight className="h-5 w-5" />
            </span>
          </Link>
        </div>
      </section>

      <div className="h-16" />

      {/* All products by category */}
      <section className="container-narrow pb-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ochre">{t("home_products_eyebrow")}</p>
            <h2 className="mt-2 font-display text-4xl text-moss-deep">{t("home_products_title")}</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-moss underline-offset-4 hover:underline md:inline">
            {t("home_products_view_all")}
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
                {t("home_see_all")} {g.toLowerCase()} →
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 md:grid-cols-3">
              {items.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </section>
        );
      })}

      {/* CEO teaser */}
      <section className="bg-moss-deep py-20 text-cream">
        <div className="container-narrow grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr,1.2fr]">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={ceoPortrait}
              alt="Dr. Kolawole Oluwatomisin Esther, founder of Healthy Life Essentials"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-cream/70">{t("home_ceo_eyebrow")}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">
              Dr. Kolawole Oluwatomisin Esther
            </h2>
            <p className="mt-2 text-sm uppercase tracking-[0.2em] text-cream/70">
              {t("home_ceo_credentials")}
            </p>
            <p className="mt-6 max-w-xl leading-relaxed text-cream/85">
              {t("home_ceo_blurb")}
            </p>
            <Button asChild size="lg" variant="outline" className="mt-8 border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream">
              <Link to="/ceo">{t("home_ceo_cta")}</Link>
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
          Share your concerns confidentially and Dr. Oluwatomisin's team will recommend
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
