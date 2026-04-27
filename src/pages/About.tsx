import hero from "@/assets/hero-herbs.jpg";

const About = () => (
  <main>
    <section className="container-narrow py-20 md:py-28">
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">Our craft</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moss-deep md:text-7xl text-balance">
          A practice of patience, written in plants.
        </h1>
        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          Healthy Life Essentials & Wellness Herbals began as a row of glass jars on a kitchen
          windowsill. Today, we still formulate every remedy by hand — distilling, decanting,
          and labeling in the same small studio above the garden.
        </p>
      </div>
    </section>

    <section className="relative h-[60vh] min-h-[420px] w-full overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
    </section>

    <section className="container-narrow grid gap-14 py-20 md:grid-cols-2 md:py-28">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-moss">From the soil</p>
        <h2 className="font-display text-3xl text-moss-deep">Wild, never sprayed.</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Our herbs are grown at altitude in mineral-rich soil and harvested by hand at the moment of greatest potency. Nothing is sprayed; nothing is rushed.
        </p>
      </div>
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.22em] text-moss">To the bottle</p>
        <h2 className="font-display text-3xl text-moss-deep">Slow, by design.</h2>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Tinctures rest for six lunar cycles. Balms cure on cedar shelves. Each batch is signed, dated, and packed in glass — never plastic — by the person who made it.
        </p>
      </div>
    </section>
  </main>
);

export default About;
