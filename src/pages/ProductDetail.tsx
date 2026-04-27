import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { Minus, Plus, ArrowLeft, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { ProductReviews } from "@/components/ProductReviews";
import { Stars } from "@/components/Stars";
import { getProduct, products } from "@/data/products";
import { getReviewSummary } from "@/data/reviews";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = slug ? getProduct(slug) : undefined;
  const { add } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return <Navigate to="/shop" replace />;

  const others = products.filter((p) => p.id !== product.id).slice(0, 3);
  const summary = getReviewSummary(product.slug);

  return (
    <main className="container-narrow py-12 md:py-16">
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-moss">
        <ArrowLeft className="h-4 w-4" /> Back to apothecary
      </Link>

      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        <div className="aspect-[4/5] overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            width={1024}
            height={1024}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-xs uppercase tracking-[0.24em] text-ochre">{product.category}</p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-moss-deep md:text-5xl">
            {product.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">{product.tagline}</p>
          {summary.count > 0 && (
            <a
              href="#reviews"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-moss"
            >
              <Stars value={summary.average} />
              <span className="tabular-nums">{summary.average.toFixed(1)}</span>
              <span className="opacity-70">· {summary.count} reviews</span>
            </a>
          )}
          <p className="mt-6 font-display text-3xl text-moss-deep">${product.price}</p>

          <p className="mt-7 text-base leading-relaxed text-foreground/80">{product.description}</p>

          <div className="mt-8 border-t border-border pt-6">
            <p className="mb-2 text-xs uppercase tracking-[0.2em] text-moss">Ingredients</p>
            <ul className="flex flex-wrap gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
              {product.ingredients.map((i, idx) => (
                <li key={i}>{i}{idx < product.ingredients.length - 1 && " ·"}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex items-start gap-3 bg-cream/60 p-5">
            <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-moss" strokeWidth={1.4} />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-moss">The Ritual</p>
              <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{product.ritual}</p>
            </div>
          </div>

          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 text-muted-foreground hover:text-foreground"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm tabular-nums">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-3 text-muted-foreground hover:text-foreground"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <Button
              size="lg"
              onClick={() => {
                add(product.id, qty);
                toast.success(`${product.name} added to your basket`);
              }}
              className="flex-1 bg-moss text-primary-foreground hover:bg-moss-deep"
            >
              Add to basket — ${product.price * qty}
            </Button>
          </div>
        </div>
      </div>

      <div id="reviews">
        <ProductReviews slug={product.slug} />
      </div>

      <section className="mt-28">
        <h2 className="mb-8 font-display text-3xl text-moss-deep">More from the shelf</h2>
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
          {others.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
