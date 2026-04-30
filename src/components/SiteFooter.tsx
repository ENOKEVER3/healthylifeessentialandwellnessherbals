import { Link } from "react-router-dom";
import { Instagram, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";
import { productGroups } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";

export const SiteFooter = () => {
  const { t } = useLanguage();
  return (
    <footer className="mt-24 border-t border-border/60 bg-cream/40">
      <div className="container-narrow grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={logo} alt="Healthy Life Essentials & Wellness Herbals" className="h-14 w-auto" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            {t("footer_tagline")}
          </p>
          <div className="mt-5 space-y-1.5 text-sm text-muted-foreground">
            <p className="flex items-center gap-2"><Phone className="h-3.5 w-3.5 text-moss" /> +234 706 296 6893</p>
            <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-moss" /> Ado Ekiti & Lagos, Nigeria</p>
            <a
              href="https://instagram.com/healthylifeessentials_herbals"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-moss"
            >
              <Instagram className="h-3.5 w-3.5 text-moss" />
              @healthylifeessentials_herbals
            </a>
            <a
              href="https://www.tiktok.com/@healthessentialwellness"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-moss"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-moss" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
              </svg>
              @healthessentialwellness
            </a>
          </div>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-moss">{t("footer_shop")}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {productGroups.map((g) => (
              <li key={g}>
                <Link to={`/shop?group=${encodeURIComponent(g)}`} className="hover:text-moss">{g}</Link>
              </li>
            ))}
            <li><Link to="/shop" className="hover:text-moss">{t("nav_all_products")}</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-moss">{t("footer_company")}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/ceo" className="hover:text-moss">{t("footer_about_ceo")}</Link></li>
            <li><Link to="/consultation" className="hover:text-moss">{t("footer_consultation")}</Link></li>
            <li><Link to="/about" className="hover:text-moss">{t("footer_about")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Healthy Life Essentials & Wellness Herbals.
      </div>
    </footer>
  );
};
