import { Seo } from "@/components/Seo";

const Terms = () => (
  <div className="container-narrow py-16 md:py-24">
    <Seo
      title="Terms of Service | Healthy Life Essentials"
      description="The terms governing your use of the Healthy Life Essentials & Wellness Herbals website, products and consultations."
      path="/terms"
    />
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-ochre">Legal</p>
      <h1 className="mt-4 font-display text-5xl text-moss-deep md:text-6xl">Terms of service</h1>
      <p className="mt-4 text-sm text-muted-foreground">Last updated: July 2026</p>
    </header>

    <div className="mt-12 max-w-3xl space-y-8 text-[15px] leading-[1.8] text-foreground/85">
      <section>
        <h2 className="font-display text-2xl text-moss-deep">Acceptance</h2>
        <p className="mt-2">
          By using this website or purchasing our products you agree to these terms. If you do
          not agree, please do not use the site.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Medical disclaimer</h2>
        <p className="mt-2">
          The content on this website, including articles in the Journal, product descriptions,
          the AI Symptom Advisor and consultation notes, is provided for educational and wellness
          purposes only. It is not medical advice, does not create a doctor-patient relationship
          and is not intended to diagnose, treat, cure or prevent any disease. Always consult a
          qualified healthcare professional before starting any herbal protocol, particularly if
          you are pregnant, breastfeeding, taking prescription medication, or managing a chronic
          condition.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Product use</h2>
        <p className="mt-2">
          Our herbal products are traditionally used for the purposes described on each product
          page. Individual results vary. Discontinue use and consult a doctor if you experience
          any adverse reaction.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Orders and payment</h2>
        <p className="mt-2">
          All prices are in Nigerian Naira unless otherwise stated. We reserve the right to
          refuse or cancel any order at our discretion, including for suspected fraud or
          incorrect pricing. Payment must clear before dispatch.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Intellectual property</h2>
        <p className="mt-2">
          All text, imagery, formulations and branding on this site are the property of Healthy
          Life Essentials & Wellness Herbals. You may not copy, republish or use them
          commercially without written permission.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">User content</h2>
        <p className="mt-2">
          Reviews and photos you submit remain yours, but you grant us a non-exclusive licence to
          display them on the site and in marketing. You are responsible for the accuracy of your
          reviews and must not post false, defamatory or infringing content.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Limitation of liability</h2>
        <p className="mt-2">
          To the maximum extent permitted by law, Healthy Life Essentials & Wellness Herbals is
          not liable for indirect, incidental or consequential damages arising from the use of
          our website or products. Our maximum aggregate liability for any claim is limited to
          the value of the product purchased.
        </p>
      </section>

      <section>
        <h2 className="font-display text-2xl text-moss-deep">Governing law</h2>
        <p className="mt-2">
          These terms are governed by the laws of the Federal Republic of Nigeria. Any dispute
          will be resolved in the courts of Ekiti State.
        </p>
      </section>
    </div>
  </div>
);

export default Terms;
