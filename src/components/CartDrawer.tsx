import { Link } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatNGN } from "@/data/products";

export const CartDrawer = () => {
  const { isOpen, setOpen, detailedItems, subtotal, setQty, remove, count } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent side="right" className="flex w-full flex-col bg-background sm:max-w-md">
        <SheetHeader className="border-b border-border pb-4 text-left">
          <SheetTitle className="font-display text-2xl text-moss-deep">
            Your Basket {count > 0 && <span className="text-muted-foreground">· {count}</span>}
          </SheetTitle>
        </SheetHeader>

        {detailedItems.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
            <ShoppingBag className="h-10 w-10 text-sage" strokeWidth={1.2} />
            <p className="font-display text-xl text-moss-deep">Your basket is empty</p>
            <p className="max-w-xs text-sm text-muted-foreground">
              Begin with a tincture, a tea, or a quiet bundle of sage.
            </p>
            <Button asChild variant="outline" className="mt-3" onClick={() => setOpen(false)}>
              <Link to="/shop">Browse the apothecary</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-5 overflow-y-auto py-5">
              {detailedItems.map(({ product, quantity, lineTotal }) => (
                <div key={product.id} className="flex gap-4">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setOpen(false)}
                    className="h-24 w-20 shrink-0 overflow-hidden bg-muted"
                  >
                    <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-display text-base leading-tight text-moss-deep">
                          {product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <button
                        onClick={() => remove(product.id)}
                        className="text-muted-foreground transition hover:text-foreground"
                        aria-label="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => setQty(product.id, quantity - 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground"
                          aria-label="Decrease"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums">{quantity}</span>
                        <button
                          onClick={() => setQty(product.id, quantity + 1)}
                          className="p-1.5 text-muted-foreground hover:text-foreground"
                          aria-label="Increase"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="font-display text-base text-moss-deep">{formatNGN(lineTotal)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-border pt-5 sm:flex-col sm:space-x-0">
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Subtotal</span>
                <span className="font-display text-2xl text-moss-deep">{formatNGN(subtotal)}</span>
              </div>
              <p className="mb-4 text-xs text-muted-foreground">Shipping calculated at checkout. Complimentary over NGN 50,000.</p>
              <Button asChild size="lg" className="w-full bg-moss text-primary-foreground hover:bg-moss-deep">
                <Link to="/checkout" onClick={() => setOpen(false)}>Proceed to checkout</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
