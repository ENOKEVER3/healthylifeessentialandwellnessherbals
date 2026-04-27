import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Mail, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@/data/products";

type SnapshotLine = { product: Product; quantity: number; lineTotal: number };
type Snapshot = {
  orderNumber: string;
  email: string;
  name: string;
  items: SnapshotLine[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
};

const Checkout = () => {
  const { detailedItems, subtotal, clear } = useCart();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const navigate = useNavigate();

  const shipping = subtotal >= 60 || subtotal === 0 ? 0 : 6;
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    const email = (data.get("email") as string) || "you@garden.co";
    const first = (data.get("first") as string) || "";
    const last = (data.get("last") as string) || "";
    const num = "VER-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSnapshot({
      orderNumber: num,
      email,
      name: `${first} ${last}`.trim() || "Friend",
      items: detailedItems.map((i) => ({ ...i })),
      subtotal,
      shipping,
      total,
      date: new Date().toLocaleDateString(undefined, { dateStyle: "long" }),
    });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (snapshot) {
    return (
      <main className="container-narrow py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-primary-foreground">
            <Check className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-ochre">Order confirmed</p>
          <h1 className="mt-3 font-display text-5xl text-moss-deep text-balance md:text-6xl">
            Thank you. Your remedies are on their way.
          </h1>
          <p className="mt-5 text-muted-foreground">
            Order <span className="font-medium text-foreground">{snapshot.orderNumber}</span> has been received.
            A confirmation has been sent to <span className="font-medium text-foreground">{snapshot.email}</span>.
          </p>
        </div>

        {/* Mock email preview */}
        <div className="mx-auto mt-14 max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <Mail className="h-3.5 w-3.5" strokeWidth={1.6} /> Email preview
          </p>
          <div className="overflow-hidden border border-border bg-cream/40 shadow-soft">
            {/* Email client chrome */}
            <div className="flex items-center justify-between border-b border-border bg-background/80 px-5 py-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-ochre/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-moss/70" />
              </div>
              <span className="text-muted-foreground">Inbox · {snapshot.date}</span>
            </div>
            <div className="border-b border-border bg-background px-6 py-4 text-sm">
              <p><span className="text-muted-foreground">From:</span> Verda Apothecary &lt;orders@verda.co&gt;</p>
              <p><span className="text-muted-foreground">To:</span> {snapshot.email}</p>
              <p><span className="text-muted-foreground">Subject:</span> Your Verda order {snapshot.orderNumber} is confirmed</p>
            </div>

            {/* Email body */}
            <div className="bg-background px-7 py-10 md:px-10 md:py-12">
              <div className="mb-6 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-moss" strokeWidth={1.5} />
                <span className="font-display text-xl tracking-wide text-moss-deep">Verda</span>
              </div>
              <h2 className="font-display text-3xl text-moss-deep">Thank you, {snapshot.name}.</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">
                We've received your order and begun gathering your remedies from the apothecary.
                You'll get a second note from us when it ships — usually within two working days.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Order</p>
                  <p className="mt-1 font-medium text-foreground">{snapshot.orderNumber}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Placed</p>
                  <p className="mt-1 font-medium text-foreground">{snapshot.date}</p>
                </div>
              </div>

              <p className="mt-8 mb-4 text-xs uppercase tracking-[0.2em] text-moss">Your remedies</p>
              <ul className="space-y-4">
                {snapshot.items.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id} className="flex gap-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden bg-muted">
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="font-display text-base leading-tight text-moss-deep">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <p className="mt-auto text-xs text-muted-foreground">Qty {quantity} · ${product.price} each</p>
                    </div>
                    <p className="font-display text-base text-moss-deep">${lineTotal}</p>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-1.5 border-t border-border pt-5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>${snapshot.subtotal}</dd></div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd>{snapshot.shipping === 0 ? "Free" : `$${snapshot.shipping}`}</dd>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-border pt-3">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Total</dt>
                  <dd className="font-display text-2xl text-moss-deep">${snapshot.total}</dd>
                </div>
              </dl>

              <p className="mt-10 text-sm leading-relaxed text-foreground/80">
                With gratitude,<br />
                <span className="font-display text-base text-moss-deep">Iona & the Verda team</span>
              </p>

              <p className="mt-8 border-t border-border pt-5 text-[11px] leading-relaxed text-muted-foreground">
                Verda Apothecary · Made by hand in the foothills.<br />
                This is a demo email preview — no real message has been sent.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-3">
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
