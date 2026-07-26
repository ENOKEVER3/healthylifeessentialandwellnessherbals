import { Seo } from "@/components/Seo";

const Shipping = () => (
  <div className="container-narrow py-16 md:py-24">
    <Seo
      title="Shipping & Returns | Healthy Life Essentials"
      description="Nigerian and international shipping rates, delivery timelines, and our returns policy for herbal wellness products."
      path="/shipping"
    />
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-ochre">Policies</p>
      <h1 className="mt-4 font-display text-5xl text-moss-deep md:text-6xl">
        Shipping & returns
      </h1>
    </header>

    <div className="mt-12 max-w-3xl space-y-10 text-[15px] leading-[1.8] text-foreground/85">
      <section>
        <h2 className="font-display text-2xl text-moss-deep">Processing time</h2>
        <p className="mt-3">
          All orders are hand-packed in our Ado-Ekiti facility. Standard processing takes 1–3
          business days. Brewed tonics (like the Fibroid Treatment Herbs) are brewed to order and
          take up to 5 business days. You will receive a courier tracking number as soon as your
          parcel leaves us.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Nigerian delivery</h2>
        <p className="mt-3">
          We ship nationwide via GIG Logistics, NIPOST EMS and Red Star Express. Ado-Ekiti local
          delivery starts at ₦1,500. Lagos is ₦5,000. Abuja is ₦4,500. Port Harcourt is ₦4,500.
          Full state-by-state pricing is available on the Track Package page. Standard delivery is
          2–5 business days depending on state.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">International delivery</h2>
        <p className="mt-3">
          We ship worldwide via DHL Express and FedEx International Priority. International
          shipping starts at ₦20,000 and is calculated by weight. Example rates: United States
          ₦120,000 per kg; United Kingdom ₦95,000 per kg; Canada ₦110,000 per kg; South Africa
          ₦65,000 per kg. Delivery is typically 4–8 business days. Customers are responsible for
          any import duties charged in the destination country.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Returns & refunds</h2>
        <p className="mt-3">
          For hygiene and safety reasons we cannot accept returns of opened herbal products. Sealed,
          unopened products may be returned within 7 days of delivery for a store credit — the
          customer covers return shipping. If your parcel arrives damaged or you receive the wrong
          item, contact us within 48 hours with photos and we will replace it at our cost.
        </p>
        <p className="mt-3">
          If you have completed a full course of a therapeutic product as directed and seen no
          improvement, please email us. We will review your intake, adjust the formula, or apply
          the value of the product as credit toward a follow-up consultation.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Contact</h2>
        <p className="mt-3">
          Shipping questions: WhatsApp +234 706 296 6893 or email
          healthylifeessentialsherbals@gmail.com. We reply within one business day.
        </p>
      </section>
    </div>
  </div>
);

export default Shipping;
