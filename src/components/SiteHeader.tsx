import { Link, NavLink } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpeg";

export const SiteHeader = () => {
  const { count, setOpen } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-narrow flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Healthy Life Essentials & Wellness Herbals — Home">
          <img src={logo} alt="Healthy Life Essentials & Wellness Herbals logo" className="h-12 w-auto md:h-14" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Apothecary" },
            { to: "/about", label: "Our Craft" },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `transition-colors hover:text-moss ${isActive ? "text-moss" : "text-muted-foreground"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setOpen(true)}
          className="relative gap-2 text-foreground hover:bg-muted"
          aria-label={`Open cart, ${count} items`}
        >
          <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="ml-1 rounded-full bg-moss px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
              {count}
            </span>
          )}
        </Button>
      </div>
    </header>
  );
};
