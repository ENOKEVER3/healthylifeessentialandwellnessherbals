import { Link } from "react-router-dom";
import { ArrowRight, Sprout, Moon, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import hero from "@/assets/hero-herbs.jpg";

const Home = () => {
  const featured = products.slice(0, 3);
  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <img
            src={hero}
            alt="Fresh herbs and an apothecary bottle on linen"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute inset-0 bg-gradient-sun mix-blend-soft-light" />
          <div className="container-narrow relative flex h-full flex-col justify-end pb-20 md:justify-center md:pb-0">
            <p className="mb-5 text-xs uppercase tracking-[0.32em] text-cream/90">
              Apothecary · Est. 2014
            </p>
            <h1 className="max-w-2xl font-display text-5xl leading-[1.05] text-cream text-balance md:text-7xl">
              Slow remedies, gathered from the garden.
            </h1>
            <p className="mt-6 max-w-lg text-base text-cream/85 md:text-lg">
              Hand-formulated tinctures, teas, and balms from wild-grown herbs.
              Made in small batches, the way the old herbalists did.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-cream text-moss-deep hover:bg-background">
                <Link to="/shop">Shop the apothecary <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-cream/40 bg-transparent text-cream hover:bg-cream/10 hover:text-cream">
                <Link to="/about">Our craft</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-narrow py-20">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { icon: Sprout, title: "Wild-grown", body: "Harvested by hand from our high-altitude gardens, never sprayed." },
            { icon: FlaskConical, title: "Small-batch", body: "Each formula made in batches of 40 or fewer, signed and dated." },
            { icon: Moon, title: "Slow-made", body: "Tinctures rest for six full moons before they leave the apothecary." },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start">
              <Icon className="mb-4 h-6 w-6 text-ochre" strokeWidth={1.3} />
              <h3 className="font-display text-2xl text-moss-deep">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="container-narrow pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-ochre">This season</p>
            <h2 className="mt-2 font-display text-4xl text-moss-deep">Stillness, bottled.</h2>
          </div>
          <Link to="/shop" className="hidden text-sm text-moss underline-offset-4 hover:underline md:inline">
            See all remedies →
          </Link>
        </div>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Quote */}
      <section className="bg-moss-deep py-24 text-cream">
        <div className="container-narrow text-center">
          <p className="font-display text-3xl italic leading-snug md:text-5xl text-balance">
            “The garden is a slow conversation —
            <br className="hidden md:block" /> we just bottle what it has to say.”
          </p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-cream/60">
            — Iona Vale, Founder
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;
