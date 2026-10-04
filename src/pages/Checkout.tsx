import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Leaf, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { formatNGN, type Product } from "@/data/products";
import { useLanguage } from "@/i18n/LanguageContext";
import { Seo } from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import { buildWhatsAppLink } from "@/lib/whatsapp";

type SnapshotLine = { product: Product; quantity: number; lineTotal: number };
type Snapshot = {
  orderNumber: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  items: SnapshotLine[];
  subtotal: number;
  shipping: number;
  total: number;
  date: string;
};

const Checkout = () => {
  const { t } = useLanguage();
  const { detailedItems, subtotal, clear } = useCart();
  const { toast } = useToast();
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const shipping = subtotal >= 50000 || subtotal === 0 ? 0 : 2500;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting || detailedItems.length === 0) return;
    const data = new FormData(e.currentTarget);
    const field = (k: string) => String(data.get(k) ?? "").trim();
    const email = field("email");
    const first = field("first");
    const last = field("last");
    const phone = field("phone");
    const address = field("addr");
    const city = field("city");
    const zip = field("zip");
    const name = `${first} ${last}`.trim();
    const num = "HLE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const lines = detailedItems.map((i) => ({ ...i }));

    setSubmitting(true);
    const { error } = await supabase.from("orders").insert({
      order_number: num,
      customer_name: name,
      email,
      phone,
      address,
      city,
      postal_code: zip,
      items: lines.map((l) => ({
        id: l.product.id,
        name: l.product.name,
        quantity: l.quantity,
        unit_price: l.product.price,
        line_total: l.lineTotal,
      })),
      subtotal,
      shipping,
      total,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "We couldn't place your order",
        description: "Please check your details and try again, or order via WhatsApp from your basket.",
        variant: "destructive",
      });
      return;
    }

    setSnapshot({
      orderNumber: num,
      email,
      name,
      phone,
      address: `${address}, ${city} ${zip}`,
      items: lines,
      subtotal,
      shipping,
      total,
      date: new Date().toLocaleDateString(undefined, { dateStyle: "long" }),
    });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (snapshot) {
    const waMessage = [
      "Hello Healthy Life Essentials 🌿",
      `I just placed order ${snapshot.orderNumber} on your website.`,
      "",
      ...snapshot.items.map((i) => `• ${i.product.name} × ${i.quantity} — ${formatNGN(i.lineTotal)}`),
      "",
      `Total: ${formatNGN(snapshot.total)}`,
      `Name: ${snapshot.name}`,
      `Deliver to: ${snapshot.address}`,
      "",
      "Please confirm and send payment details. Thank you!",
    ].join("\n");

    return (
      <div className="container-narrow py-16 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-primary-foreground">
            <Check className="h-6 w-6" strokeWidth={1.5} />
          </div>
          <p className="text-xs uppercase tracking-[0.28em] text-ochre">{t("checkout_confirmed_eyebrow")}</p>
          <h1 className="mt-3 font-display text-5xl text-moss-deep text-balance md:text-6xl">
            {t("checkout_confirmed_title")}
          </h1>
          <p className="mt-5 text-muted-foreground">
            {t("checkout_order_label")} <span className="font-medium text-foreground">{snapshot.orderNumber}</span> has been received and sent to our team. We'll contact you on{" "}
            <span className="font-medium text-foreground">{snapshot.phone}</span> to confirm payment and delivery.
          </p>
          <Button asChild size="lg" className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep">
            <a href={buildWhatsAppLink(waMessage)} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" /> Confirm on WhatsApp
            </a>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">
            Message us on WhatsApp for the fastest confirmation and payment details.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-2xl">
          <div className="overflow-hidden border border-border bg-background shadow-soft">
            <div className="px-7 py-10 md:px-10 md:py-12">
              <div className="mb-6 flex items-center gap-2">
                <Leaf className="h-4 w-4 text-moss" strokeWidth={1.5} />
                <span className="font-display text-xl tracking-wide text-moss-deep">Healthy Life Essentials & Wellness Herbals</span>
              </div>
              <h2 className="font-display text-3xl text-moss-deep">{t("checkout_email_thank")} {snapshot.name}.</h2>
              <p className="mt-3 text-sm leading-relaxed text-foreground/80">{t("checkout_email_body")}</p>

              <div className="mt-8 grid grid-cols-2 gap-4 border-y border-border py-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("checkout_order_short")}</p>
                  <p className="mt-1 font-medium text-foreground">{snapshot.orderNumber}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("checkout_placed")}</p>
                  <p className="mt-1 font-medium text-foreground">{snapshot.date}</p>
                </div>
              </div>

              <p className="mt-8 mb-4 text-xs uppercase tracking-[0.2em] text-moss">{t("checkout_your_remedies")}</p>
              <ul className="space-y-4">
                {snapshot.items.map(({ product, quantity, lineTotal }) => (
                  <li key={product.id} className="flex gap-4">
                    <div className="h-20 w-16 shrink-0 overflow-hidden bg-muted">
                      <img src={product.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="font-display text-base leading-tight text-moss-deep">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                      <p className="mt-auto text-xs text-muted-foreground">{t("checkout_qty")} {quantity} · {formatNGN(product.price)} {t("checkout_each")}</p>
                    </div>
                    <p className="font-display text-base text-moss-deep">{formatNGN(lineTotal)}</p>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-1.5 border-t border-border pt-5 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart_subtotal")}</dt><dd>{formatNGN(snapshot.subtotal)}</dd></div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t("checkout_shipping_label")}</dt>
                  <dd>{snapshot.shipping === 0 ? t("checkout_free") : formatNGN(snapshot.shipping)}</dd>
                </div>
                <div className="mt-2 flex items-baseline justify-between border-t border-border pt-3">
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t("checkout_total")}</dt>
                  <dd className="font-display text-2xl text-moss-deep">{formatNGN(snapshot.total)}</dd>
                </div>
              </dl>

              <p className="mt-10 text-sm leading-relaxed text-foreground/80">
                {t("checkout_with_gratitude")}<br />
                <span className="font-display text-base text-moss-deep">{t("checkout_team")}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          <Button asChild size="lg" variant="outline">
            <Link to="/shop">{t("checkout_continue_browsing")}</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate("/")}>{t("checkout_return_home")}</Button>
        </div>
      </div>
    );
  }

  if (detailedItems.length === 0) {
    return (
      <div className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="font-display text-4xl text-moss-deep">{t("checkout_empty_title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("checkout_empty_body")}</p>
        <Button asChild className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep">
          <Link to="/shop">{t("checkout_visit_apothecary")}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-narrow py-12 md:py-16">
      <Seo
        title="Checkout — Healthy Life Essentials"
        description="Review your basket and place your herbal order with Healthy Life Essentials & Wellness Herbals."
        path="/checkout"
      />
      <Link to="/shop" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-moss">
        <ArrowLeft className="h-4 w-4" /> {t("checkout_continue_shopping")}
      </Link>
      <h1 className="mb-12 font-display text-5xl text-moss-deep">{t("checkout_title")}</h1>

      <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr]">
        <form onSubmit={handleSubmit} className="space-y-10">
          <section>
            <h2 className="mb-5 font-display text-2xl text-moss-deep">{t("checkout_contact")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="email">{t("consult_email")}</Label>
                <Input id="email" name="email" type="email" required maxLength={255} placeholder="you@example.com" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone / WhatsApp</Label>
                <Input id="phone" name="phone" type="tel" required minLength={5} maxLength={30} placeholder="+234 …" className="mt-1.5" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-5 font-display text-2xl text-moss-deep">{t("checkout_shipping")}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div><Label htmlFor="first">{t("checkout_first_name")}</Label><Input id="first" name="first" required maxLength={60} className="mt-1.5" /></div>
              <div><Label htmlFor="last">{t("checkout_last_name")}</Label><Input id="last" name="last" required maxLength={60} className="mt-1.5" /></div>
              <div className="sm:col-span-2"><Label htmlFor="addr">{t("checkout_address")}</Label><Input id="addr" name="addr" required maxLength={300} className="mt-1.5" /></div>
              <div><Label htmlFor="city">{t("checkout_city")}</Label><Input id="city" name="city" required maxLength={100} className="mt-1.5" /></div>
              <div><Label htmlFor="zip">{t("checkout_postal")}</Label><Input id="zip" name="zip" required maxLength={20} className="mt-1.5" /></div>
            </div>
          </section>

          <section>
            <h2 className="mb-2 font-display text-2xl text-moss-deep">{t("checkout_payment")}</h2>
            <p className="text-sm text-muted-foreground">
              No card details are needed here. After you place your order our team will contact you by phone or WhatsApp to confirm the total and share secure payment instructions.
            </p>
          </section>

          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-moss text-primary-foreground hover:bg-moss-deep"
          >
            {submitting ? "Placing order…" : `${t("checkout_confirm_order")} ${formatNGN(total)}`}
          </Button>
        </form>

        <aside className="h-fit bg-cream/50 p-7 lg:sticky lg:top-24">
          <h2 className="mb-5 font-display text-2xl text-moss-deep">{t("checkout_your_order")}</h2>
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
                <p className="font-display text-base text-moss-deep">{formatNGN(lineTotal)}</p>
              </li>
            ))}
          </ul>
          <dl className="space-y-2 py-5 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">{t("cart_subtotal")}</dt><dd>{formatNGN(subtotal)}</dd></div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">{t("checkout_shipping_label")}</dt>
              <dd>{shipping === 0 ? t("checkout_free") : formatNGN(shipping)}</dd>
            </div>
          </dl>
          <div className="flex items-baseline justify-between border-t border-border pt-4">
            <span className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{t("checkout_total")}</span>
            <span className="font-display text-3xl text-moss-deep">{formatNGN(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
