import { Link } from "react-router-dom";
import { formatNGN, type Product } from "@/data/products";

export const ProductCard = ({ product }: { product: Product }) => (
  <Link to={`/product/${product.slug}`} className="group block">
    <div className="aspect-[4/5] overflow-hidden bg-muted">
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        width={1024}
        height={1024}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    </div>
    <div className="mt-4 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {product.category}
        </p>
        <h3 className="mt-1 truncate font-display text-xl text-moss-deep">{product.name}</h3>
        <p className="mt-0.5 text-sm text-muted-foreground">{product.tagline}</p>
      </div>
      <div className="text-right">
        <p className="font-display text-base text-moss-deep">{formatNGN(product.price)}</p>
        {product.oldPrice && (
          <p className="text-xs text-muted-foreground line-through">{formatNGN(product.oldPrice)}</p>
        )}
      </div>
    </div>
  </Link>
);
