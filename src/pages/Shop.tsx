import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

const Shop = () => {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category)))],
    []
  );
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? products : products.filter((p) => p.category === active);

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

      <div className="mb-10 flex flex-wrap gap-2 border-y border-border py-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors ${
              active === c
                ? "bg-moss text-primary-foreground"
                : "text-muted-foreground hover:text-moss"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
};

export default Shop;
