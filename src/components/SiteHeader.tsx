import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";
import { productGroups } from "@/data/products";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { useLanguage } from "@/i18n/LanguageContext";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `transition-colors hover:text-moss ${isActive ? "text-moss" : "text-muted-foreground"}`;

export const SiteHeader = () => {
  const { count, setOpen } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-narrow flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Healthy Life Essentials & Wellness Herbals — Home">
          <img src={logo} alt="Healthy Life Essentials & Wellness Herbals logo" className="h-12 w-auto md:h-14" />
        </Link>

        <nav className="hidden items-center gap-7 text-sm md:flex">
          <NavLink to="/" end className={navLinkClass}>{t("nav_home")}</NavLink>
          <NavLink to="/consultation" className={navLinkClass}>{t("nav_consultation")}</NavLink>
          <NavLink to="/advisor" className={navLinkClass}>{t("nav_advisor")}</NavLink>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-moss focus:outline-none">
              {t("nav_shop")} <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.6} />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuItem onSelect={() => navigate("/shop")}>
                {t("nav_all_products")}
              </DropdownMenuItem>
              {productGroups.map((g) => (
                <DropdownMenuItem
                  key={g}
                  onSelect={() => navigate(`/shop?group=${encodeURIComponent(g)}`)}
                >
                  {g}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <NavLink to="/ceo" className={navLinkClass}>{t("nav_ceo")}</NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setOpen(true)}
            className="relative gap-2 text-foreground hover:bg-muted"
            aria-label={`${t("cart")}, ${count}`}
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">{t("cart")}</span>
            {count > 0 && (
              <span className="ml-1 rounded-full bg-moss px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <nav className="flex items-center justify-center gap-5 border-t border-border/60 px-4 py-2 text-xs md:hidden">
        <NavLink to="/" end className={navLinkClass}>{t("nav_home")}</NavLink>
        <NavLink to="/consultation" className={navLinkClass}>{t("nav_consult_short")}</NavLink>
        <NavLink to="/advisor" className={navLinkClass}>{t("nav_advisor_short")}</NavLink>
        <NavLink to="/shop" className={navLinkClass}>{t("nav_shop")}</NavLink>
        <NavLink to="/ceo" className={navLinkClass}>{t("nav_ceo_short")}</NavLink>
      </nav>
    </header>
  );
};
