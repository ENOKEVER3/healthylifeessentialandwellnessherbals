import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  const { detailedItems, subtotal, clear } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const navigate = useNavigate();

  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = "VER-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setOrderNumber(num);
    setConfirmed(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (confirmed) {
    return (
      <main className="container-narrow flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-primary-foreground">
          <Check className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">Order confirmed</p>
        <h1 className="mt-3 max-w-xl font-display text-5xl text-moss-deep text-balance">
          Thank you. Your remedies are on their way.
        </h1>
        <p className="mt-5 max-w-md text-muted-foreground">
          Order <span className="font-medium text-foreground">{orderNumber}</span> has been received.
          A confirmation will arrive in your inbox shortly.
        </p>
        <div className="mt-10 flex gap-3">
          <Button asChild size="lg" className="bg-moss text-primary-foreground hover:bg-moss-deep">
            <Link to="/shop">Continue browsing</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/")}>Return home</Button>
        </div>
      </main>
    );
  }

  if (detailedItems.length === 0) {
    return (
      <main className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-4xl text-moss-deep">Your basket is empty.</h1>
        <p className="mt-3 text-muted-foreground">There's nothing to check out just yet.</p>
        <Button asChild className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep">
          <Link to="/shop">Visit the apothecary</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container-narrow py-12 md:py-16">
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-moss">
        <ArrowLeft className="h-4 w-4" /> Continue shopping
      </Link>
      <h1 className="mb-12 font-display text-5xl text-moss-deep">Checkout</h1>

      <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <h2 className="mb-5 font-display text-2xl text-moss-deep">Contact</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="you@garden.co" className="mt-1.5" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-display text-2xl text-moss-deep">Shipping</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="first">First name</Label><Input id="first" required className="mt-1.5" /></div>
              <div><Label htmlFor="last">Last name</Label><Input id="last" required className="mt-1.5" /></div>
              <div className="sm:col-span-2"><Label htmlFor="addr">Address</Label><Input id="addr" required className="mt-1.5" /></div>
              <div><Label htmlFor="city">City</Label><Input id="city" required className="mt-1.5" /></div>
              <div><Label htmlFor="zip">Postal code</Label><Input id="zip" required className="mt-1.5" /></div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-display text-2xl text-moss-deep">Payment</h2>
            <p className="mb-5 text-xs italic text-muted-foreground">
              This is a demo storefront — no real payment will be processed.
            </p>
            <div className="space-y-4">
              <div><Label htmlFor="card">Card number</Label><Input id="card" placeholder="4242 4242 4242 4242" className="mt-1.5" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="exp">Expiry</Label><Input id="exp" placeholder="MM / YY" className="mt-1.5" /></div>
                <div><Label htmlFor="cvc">CVC</Label><Input id="cvc" placeholder="123" className="mt-1.5" /></div>
              </div>
            </div>
          </section>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-moss text-primary-foreground hover:bg-moss-deep"
          >
            Confirm order — ${total}
          </Button>
        </form>

        <aside className="h-fit bg-cream/50 p-7 lg:sticky lg:top-24">
          <h2 className="mb-5 font-display text-2xl text-moss-deep">Your order</h2>
          <ul className="space-y-4 border-b border-border pb-5">
            {detailedItems.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex gap-4">
                <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-background">
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-moss text-[10px] text-primary-foreground">
                    {quantity}
                  </span>
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <p className="font-display text-base leading-tight text-moss-deep">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.category}</p>
                </div>
                <p className="font-display text-base text-moss-deep">${lineTotal}</p>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 py-5 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${subtotal}</dd></div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd>{shipping === 0 ? "Free" : `$${shipping}`}</dd>
            </div>
          </dl>
          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Total</span>
            <span className="font-display text-3xl text-moss-deep">${total}</span>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Checkout;
