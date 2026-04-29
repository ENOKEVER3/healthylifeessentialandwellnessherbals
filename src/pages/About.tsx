import hero from "@/assets/hero-herbs.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  return (
    <main>
      <section className="container-narrow py-20 md:py-28">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.28em] text-ochre">{t("about_eyebrow")}</p>
          <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moss-deep md:text-7xl text-balance">
            {t("about_title")}
          </h1>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            {t("about_intro")}
          </p>
        </div>
      </section>

      <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      </section>

      <section className="container-narrow grid gap-14 py-20 md:grid-cols-2 md:py-28">
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-moss">{t("about_soil_eyebrow")}</p>
          <h2 className="font-display text-3xl text-moss-deep">{t("about_soil_title")}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("about_soil_body")}
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-moss">{t("about_bottle_eyebrow")}</p>
          <h2 className="font-display text-3xl text-moss-deep">{t("about_bottle_title")}</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {t("about_bottle_body")}
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
