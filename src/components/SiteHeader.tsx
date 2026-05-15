import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ShoppingBag, ChevronDown, Menu } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-narrow flex h-16 items-center justify-between gap-3 md:h-20 md:gap-4">
        <Link to="/" className="flex items-center gap-3" aria-label="Healthy Life Essentials & Wellness Herbals — Home">
          <img src={logo} alt="Healthy Life Essentials & Wellness Herbals logo" className="h-10 w-auto md:h-14" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 text-sm lg:flex">
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
          <NavLink to="/reviews" className={navLinkClass}>Reviews</NavLink>
          <NavLink to="/track" className={navLinkClass}>Track</NavLink>
        </nav>

        <div className="flex items-center gap-1">
          <div className="hidden sm:flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeSwitcher />
          </div>
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

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" strokeWidth={1.5} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="font-display text-xl text-moss-deep">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col gap-1 text-base">
                <NavLink to="/" end onClick={closeMobile} className={({ isActive }) => `rounded-md px-3 py-3 transition-colors ${isActive ? "bg-moss/10 text-moss" : "text-foreground hover:bg-muted"}`}>{t("nav_home")}</NavLink>
                <NavLink to="/consultation" onClick={closeMobile} className={({ isActive }) => `rounded-md px-3 py-3 transition-colors ${isActive ? "bg-moss/10 text-moss" : "text-foreground hover:bg-muted"}`}>{t("nav_consultation")}</NavLink>
                <NavLink to="/advisor" onClick={closeMobile} className={({ isActive }) => `rounded-md px-3 py-3 transition-colors ${isActive ? "bg-moss/10 text-moss" : "text-foreground hover:bg-muted"}`}>{t("nav_advisor")}</NavLink>
                <NavLink to="/shop" onClick={closeMobile} className={({ isActive }) => `rounded-md px-3 py-3 transition-colors ${isActive ? "bg-moss/10 text-moss" : "text-foreground hover:bg-muted"}`}>{t("nav_shop")}</NavLink>
                <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-border pl-3 text-sm">
                  <Link to="/shop" onClick={closeMobile} className="rounded px-2 py-1.5 text-muted-foreground hover:text-moss">{t("nav_all_products")}</Link>
                  {productGroups.map((g) => (
                    <Link
                      key={g}
                      to={`/shop?group=${encodeURIComponent(g)}`}
                      onClick={closeMobile}
                      className="rounded px-2 py-1.5 text-muted-foreground hover:text-moss"
                    >
                      {g}
                    </Link>
                  ))}
                </div>
                <NavLink to="/ceo" onClick={closeMobile} className={({ isActive }) => `rounded-md px-3 py-3 transition-colors ${isActive ? "bg-moss/10 text-moss" : "text-foreground hover:bg-muted"}`}>{t("nav_ceo")}</NavLink>
                <NavLink to="/reviews" onClick={closeMobile} className={({ isActive }) => `rounded-md px-3 py-3 transition-colors ${isActive ? "bg-moss/10 text-moss" : "text-foreground hover:bg-muted"}`}>Reviews</NavLink>
              </nav>

              <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 sm:hidden">
                <LanguageSwitcher />
                <ThemeSwitcher />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
