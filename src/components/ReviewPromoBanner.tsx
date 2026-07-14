import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero-herbs.jpg";

export const ReviewPromoBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border">
      <div className="relative grid min-h-[220px] items-center md:min-h-[260px] lg:grid-cols-[1.2fr,1fr]">
        <img
          src={hero}
          alt="Fresh herbs and natural remedies arranged on linen"
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-moss-deep/90 via-moss-deep/75 to-moss-deep/30" />
        <div className="relative z-10 flex flex-col justify-center p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.24em] text-cream/70">
            Trusted by our community
          </p>
          <h2 className="mt-3 max-w-md font-display text-3xl leading-tight text-cream md:text-4xl">
            Real stories, real wellness
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-cream/80">
            Every review is a personal journey. Discover how our hand-formulated herbals are helping people feel better, naturally.
          </p>
          <div className="mt-6">
            <Button
              asChild
              size="lg"
              className="bg-cream text-moss-deep hover:bg-background"
            >
              <Link to="/shop">
                Explore products <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
