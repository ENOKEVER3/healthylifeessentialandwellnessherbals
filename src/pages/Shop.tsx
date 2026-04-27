import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { products, productGroups, type ProductGroup } from "@/data/products";
import { Input } from "@/components/ui/input";

const ALL = "All" as const;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupParam = searchParams.get("group") as ProductGroup | null;
  const [group, setGroup] = useState<ProductGroup | typeof ALL>(
    groupParam && (productGroups as string[]).includes(groupParam) ? groupParam : ALL
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  // Sync group from URL when navigating via the dropdown
  useEffect(() => {
    const fromUrl = searchParams.get("group") as ProductGroup | null;
    if (fromUrl && (productGroups as string[]).includes(fromUrl)) {
      setGroup(fromUrl);
      setActiveCategory("All");
    } else if (!fromUrl) {
      setGroup(ALL);
    }
  }, [searchParams]);

  const groupProducts = useMemo(
    () => (group === ALL ? products : products.filter((p) => p.group === group)),
    [group]
  );

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(groupProducts.map((p) => p.category)))],
    [groupProducts]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groupProducts.filter((p) => {
      if (activeCategory !== "All" && p.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [p.name, p.tagline, p.category, p.description, ...p.ingredients]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [groupProducts, activeCategory, query]);

  const setGroupAndUrl = (g: ProductGroup | typeof ALL) => {
    setGroup(g);
    setActiveCategory("All");
    if (g === ALL) {
      searchParams.delete("group");
    } else {
      searchParams.set("group", g);
    }
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <main className="container-narrow py-16 md:py-24">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">The Apothecary</p>
        <h1 className="mt-3 font-display text-5xl text-moss-deep md:text-6xl">
          {group === ALL ? "A shelf of small remedies." : group}
        </h1>
        <p className="mt-5 text-base text-muted-foreground">
          Every formula is doctor-developed and packed by hand.
          {group !== ALL && ` Browse our ${group.toLowerCase()} collection below.`}
        </p>
      </header>

      {/* Group tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[ALL, ...productGroups].map((g) => (
          <button
            key={g}
            onClick={() => setGroupAndUrl(g)}
            className={`px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
              group === g
                ? "bg-moss-deep text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-moss"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, ingredient, or concern…"
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
          const count =
            c === "All"
              ? groupProducts.length
              : groupProducts.filter((p) => p.category === c).length;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                activeCategory === c
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
            Try a different word — or browse another shelf.
          </p>
          <button
            onClick={() => { setQuery(""); setActiveCategory("All"); }}
            className="mt-5 text-xs uppercase tracking-[0.2em] text-moss underline-offset-4 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
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
