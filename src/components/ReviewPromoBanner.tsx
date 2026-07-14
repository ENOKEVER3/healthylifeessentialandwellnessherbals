import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-herbs.jpg";

/**
 * Reviews page promotional banner.
 * - Subtle fade-in on mount (skipped when user prefers reduced motion)
 * - Descriptive alt text and keyboard-accessible CTA with visible focus
 * - Lazy-loaded, async-decoded hero image with responsive sizing hint
 * - CTA points to the best-selling Hormonal Imbalance Tea
 */
export const ReviewPromoBanner = () => {
  const [visible, setVisible] = useState(false);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion.current) {
      setVisible(true);
      return;
    }
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section
      aria-label="Featured product promotion"
      className={`relative overflow-hidden rounded-2xl border border-border transition-opacity duration-700 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative grid min-h-[220px] items-center md:min-h-[260px] lg:grid-cols-[1.2fr,1fr]">
        <img
          src={hero}
          alt="Freshly harvested medicinal herbs — chasteberry, red raspberry leaf and ginger — arranged on natural linen, representing our best-selling Hormonal Imbalance Tea."
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1024px) 720px, 100vw"
          width={1600}
          height={900}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-moss-deep/90 via-moss-deep/75 to-moss-deep/30"
        />
        <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-cream/70">
            Bestseller · Trusted by our community
          </p>
          <h2 className="mt-3 max-w-md font-display text-3xl leading-tight text-cream md:text-4xl">
            Try the blend our reviewers love most
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">
            Our Hormonal Imbalance Tea — small-batch, plant-grown, and hand-formulated by Dr. Oluwatomisin.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-cream text-moss-deep hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-moss-deep"
            >
              <Link
                to="/product/hormonal-imbalance-tea"
                aria-label="Shop the best-selling Hormonal Imbalance Tea"
              >
                Shop the bestseller
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
