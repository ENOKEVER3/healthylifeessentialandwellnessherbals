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
            <p className="flex items-center gap-2">
              <Instagram className="h-3.5 w-3.5 text-moss" />
              @healthylifeessentials_herbals
            </p>
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
