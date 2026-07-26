import { Seo } from "@/components/Seo";

const Privacy = () => (
  <div className="container-narrow py-16 md:py-24">
    <Seo
      title="Privacy Policy | Healthy Life Essentials"
      description="How Healthy Life Essentials & Wellness Herbals collects, uses and protects your personal information."
      path="/privacy"
    />
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-ochre">Legal</p>
      <h1 className="mt-4 font-display text-5xl text-moss-deep md:text-6xl">Privacy policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: July 2026</p>
    </header>

    <div className="mt-12 max-w-3xl space-y-8 text-[15px] leading-[1.8] text-foreground/85">
      <section>
        <h2 className="font-display text-2xl text-moss-deep">Who we are</h2>
        <p className="mt-2">
          Healthy Life Essentials & Wellness Herbals is a Nigerian herbal wellness company
          operating from Ado-Ekiti and Lagos. This policy explains what data we collect when you
          use our website, order products, or book a consultation.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Information we collect</h2>
        <ul className="mt-2 list-disc space-y-1 pl-6">
          <li>Name, email, phone number and shipping address when you place an order.</li>
          <li>Health information you voluntarily share during a consultation.</li>
          <li>Test-result files you upload for a consultation (stored encrypted).</li>
          <li>Reviews, ratings and photos you submit to the Reviews page.</li>
          <li>Anonymous device identifiers used to prevent duplicate reactions and likes.</li>
          <li>Basic analytics (page views, referring site) collected only after cookie consent.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">How we use your information</h2>
        <p className="mt-2">
          We use your information to fulfil orders, provide personalised herbal recommendations,
          respond to your questions, improve the website, and comply with legal obligations.
          Consultation health data is used only by Dr. Kolawole Oluwatomisin Esther and stored
          separately from marketing data.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Cookies and advertising</h2>
        <p className="mt-2">
          We use essential cookies to keep your cart working and analytics cookies to understand
          how the site is used. We also serve Google AdSense advertising, which uses cookies to
          personalise ads. No cookies (other than strictly necessary ones) are set until you
          accept them via the cookie banner. You can withdraw consent any time from the "Cookie
          preferences" link in the footer.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Third parties</h2>
        <p className="mt-2">
          We share limited data with couriers (for delivery), payment processors (for checkout),
          and our secure hosting infrastructure. We do not sell your personal information.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Your rights</h2>
        <p className="mt-2">
          You can request a copy of your data, ask us to correct or delete it, or withdraw
          consent at any time by emailing healthylifeessentialsherbals@gmail.com. We will respond
          within 30 days.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Contact</h2>
        <p className="mt-2">
          Questions about this policy: healthylifeessentialsherbals@gmail.com or WhatsApp
          +234 706 296 6893.
        </p>
      </section>
    </div>
  </div>
);

export default Privacy;
