import { useMemo, useState } from "react";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Input } from "@/components/ui/input";

const Shop = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (active !== "All" && p.category !== active) return false;
      if (!q) return true;
      const haystack = [
        p.name,
        p.tagline,
        p.category,
        p.description,
        ...p.ingredients,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [active, query]);

  return (
    <main className="container-narrow py-16 md:py-24">
      <header className="mb-14 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">The Apothecary</p>
        <h1 className="mt-3 font-display text-5xl text-moss-deep md:text-6xl">
          A shelf of small remedies.
        </h1>
        <p className="mt-5 text-base text-muted-foreground">
          Every bottle, jar, and bundle is formulated and packed by hand. Choose a ritual that meets you where you are.
        </p>
      </header>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ingredient, or ritual…"
            aria-label="Search products"
            className="h-11 rounded-none border-border bg-background pl-10 pr-10 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-moss"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-2 border-y border-border py-4">
        {categories.map((c) => {
          const count = c === "All" ? products.length : products.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                active === c
                  ? "bg-moss text-primary-foreground"
                  : "text-muted-foreground hover:text-moss"
              }`}
            >
              {c} <span className="ml-1 opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="border border-dashed border-border py-20 text-center">
          <p className="font-display text-2xl text-moss-deep">Nothing matches that search.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a gentler word — or browse a different shelf.
          </p>
          <button
            onClick={() => { setQuery(""); setActive("All"); }}
            className="mt-5 text-xs uppercase tracking-[0.2em] text-moss underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "remedy" : "remedies"}
            {query && <> · matching “{query}”</>}
          </p>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </>
      )}
    </main>
  );
};

export default Shop;
