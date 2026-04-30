import { Link } from "react-router-dom";
import { Phone, Instagram, MapPin, Stethoscope, FlaskConical, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/LanguageContext";
import ceo1 from "@/assets/ceo-portrait.jpeg";
import ceo2 from "@/assets/ceo-2.jpeg";

const CEO = () => {
  const { t } = useLanguage();
  const credentials = [
    { icon: Stethoscope, title: t("ceo_cred1_title"), body: t("ceo_cred1_body") },
    { icon: FlaskConical, title: t("ceo_cred2_title"), body: t("ceo_cred2_body") },
    { icon: Leaf, title: t("ceo_cred3_title"), body: t("ceo_cred3_body") },
  ];
  return (
    <main>
      <section className="container-narrow grid items-center gap-12 py-16 md:grid-cols-[1fr,1.1fr] md:py-24">
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={ceo1}
            alt="Dr. Kolawole Oluwatomisin Esther, founder of Healthy Life Essentials & Wellness Herbals"
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-ochre">{t("ceo_eyebrow")}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moss-deep text-balance md:text-6xl">
            Dr. Kolawole Oluwatomisin Esther
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-moss">
            {t("ceo_credentials")}
          </p>
          <p className="mt-6 text-base leading-relaxed text-foreground/80">
            {t("ceo_intro")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-moss text-primary-foreground hover:bg-moss-deep">
              <Link to="/consultation">{t("ceo_book")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/shop">{t("ceo_browse")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-cream/40 py-16">
        <div className="container-narrow grid gap-10 md:grid-cols-3">
          {credentials.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col items-start">
              <Icon className="mb-4 h-6 w-6 text-moss" strokeWidth={1.3} />
              <h3 className="font-display text-xl text-moss-deep">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Full bio */}
      <section className="container-narrow grid gap-12 py-20 md:grid-cols-[1.4fr,1fr]">
        <div className="space-y-6 text-base leading-relaxed text-foreground/85">
          <p>{t("ceo_bio_p1")}</p>
          <p>{t("ceo_bio_p2")}</p>
          <p>{t("ceo_bio_p3")}</p>
          <p>{t("ceo_bio_p4")}</p>
          <p>{t("ceo_bio_p5")}</p>
        </div>

        <aside className="h-fit space-y-6 bg-cream/50 p-7">
          <div className="aspect-[4/5] overflow-hidden">
            <img src={ceo2} alt="Dr. Kolawole Oluwatomisin Esther portrait" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-moss">{t("ceo_contact")}</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-moss" /> +234 706 296 6893</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-moss" /> Ado Ekiti & Lagos, Nigeria</li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-moss">{t("ceo_brand_handles")}</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>
                <a
                  href="https://instagram.com/healthylifeessentials_herbals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-moss"
                >
                  <Instagram className="h-4 w-4 text-moss" /> @healthylifeessentials_herbals
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/healthylifeessentialswellness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-moss"
                >
                  <Instagram className="h-4 w-4 text-moss" /> @healthylifeessentialswellness
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@healthessentialwellness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-moss"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-moss" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                  </svg>
                  @healthessentialwellness
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-moss">{t("ceo_personal_handle")}</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li>
                <a
                  href="https://instagram.com/iam_tommy01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-colors hover:text-moss"
                >
                  <Instagram className="h-4 w-4 text-moss" /> @iam_tommy01
                </a>
              </li>
            </ul>
          </div>
          <Button asChild className="w-full bg-moss text-primary-foreground hover:bg-moss-deep">
            <Link to="/consultation">{t("ceo_book")}</Link>
          </Button>
        </aside>
      </section>
    </main>
  );
};

export default CEO;
