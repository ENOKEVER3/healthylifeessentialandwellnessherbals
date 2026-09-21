import { ExternalLink, HeartPulse, ShieldAlert, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";

const sources = [
  {
    name: "CDC: About Pelvic Inflammatory Disease",
    href: "https://www.cdc.gov/pid/about/index.html",
  },
  {
    name: "MedlinePlus: Pelvic Inflammatory Disease",
    href: "https://medlineplus.gov/pelvicinflammatorydisease.html",
  },
  {
    name: "WHO: Sexually transmitted infections",
    href: "https://www.who.int/en/news-room/fact-sheets/detail/sexually-transmitted-infections-%28stis%29",
  },
];

const PidGuide = () => (
  <div className="container-narrow py-12 md:py-20">
    <Seo
      title="Pelvic Inflammatory Disease (PID): Symptoms, Care & Prevention"
      description="A medically careful guide to pelvic inflammatory disease: symptoms, possible causes, diagnosis, treatment, prevention, and when to seek urgent care."
      path="/pid-guide"
      type="article"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: "Pelvic Inflammatory Disease (PID): Symptoms, Care & Prevention",
        description:
          "A medically careful, patient-friendly guide to pelvic inflammatory disease, including symptoms, diagnosis, treatment, prevention, and urgent warning signs.",
        url: "https://healthylifeessentialandwellnessherbals.lovable.app/pid-guide",
        about: { "@type": "MedicalCondition", name: "Pelvic inflammatory disease" },
        reviewedBy: { "@type": "Organization", name: "Healthy Life Essentials & Wellness Herbals" },
      }}
    />

    <header className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ochre">Patient education</p>
      <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.03] text-moss-deep md:text-7xl">
        Pelvic inflammatory disease, explained with care.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
        A plain-language starting point for understanding PID, knowing what questions to ask, and getting timely professional care.
      </p>
      <div className="mt-8 border-l-2 border-ochre pl-4 text-sm leading-relaxed text-foreground/80">
        <strong className="font-semibold text-foreground">Important:</strong> This guide is educational. It cannot diagnose PID or replace an examination, testing, or treatment from a qualified healthcare professional.
      </div>
    </header>

    <nav aria-label="On this page" className="mt-12 border-y border-border/70 py-5">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ochre">On this page</p>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
        <a href="#what-is-pid" className="text-moss underline-offset-4 hover:underline">What PID is</a>
        <a href="#symptoms" className="text-moss underline-offset-4 hover:underline">Symptoms</a>
        <a href="#diagnosis" className="text-moss underline-offset-4 hover:underline">Diagnosis</a>
        <a href="#treatment" className="text-moss underline-offset-4 hover:underline">Treatment</a>
        <a href="#urgent-care" className="text-moss underline-offset-4 hover:underline">Urgent care</a>
        <a href="#prevention" className="text-moss underline-offset-4 hover:underline">Prevention</a>
        <a href="#stories" className="text-moss underline-offset-4 hover:underline">Customer stories</a>
      </div>
    </nav>

    <main className="mt-14 max-w-4xl space-y-16">
      <section id="what-is-pid" className="scroll-mt-24">
        <div className="flex items-start gap-4">
          <HeartPulse className="mt-1 h-6 w-6 shrink-0 text-moss" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">01 · The basics</p>
            <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">What is PID?</h2>
          </div>
        </div>
        <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-foreground/85">
          <p>
            Pelvic inflammatory disease is an infection affecting the upper reproductive organs, which can include the uterus, fallopian tubes, and ovaries. It is often associated with untreated sexually transmitted infections such as chlamydia or gonorrhea, but other bacteria can also be involved. Read the CDC overview for the medical definition and current prevention information.
          </p>
          <p>
            PID can be mild or have no obvious symptoms. That is why a person should not use the absence of pain as proof that everything is fine after a possible STI exposure. Early assessment matters because infection and inflammation can cause complications if care is delayed.
          </p>
        </div>
      </section>

      <section id="symptoms" className="scroll-mt-24 border-t border-border/70 pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">02 · Notice the signs</p>
        <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">Possible symptoms of PID</h2>
        <p className="mt-5 max-w-3xl text-[15px] leading-[1.8] text-foreground/85">
          Symptoms vary, and these signs can have other causes. A healthcare professional should assess new, persistent, or worsening symptoms rather than relying on an online checklist.
        </p>
        <ul className="mt-7 grid gap-3 sm:grid-cols-2">
          {[
            "Pain in the lower abdomen or pelvis",
            "Fever or feeling unusually unwell",
            "Unusual or bad-smelling vaginal discharge",
            "Pain or bleeding during sex",
            "Bleeding between periods",
            "Pain or burning when urinating",
          ].map((symptom) => (
            <li key={symptom} className="border border-border/70 bg-secondary/20 px-4 py-3 text-sm text-foreground/85">
              {symptom}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          The CDC and MedlinePlus both note that symptoms may be mild or absent. See their patient information for more detail: {" "}
          <a href={sources[0].href} target="_blank" rel="noreferrer" className="text-moss underline underline-offset-4">CDC</a> and {" "}
          <a href={sources[1].href} target="_blank" rel="noreferrer" className="text-moss underline underline-offset-4">MedlinePlus</a>.
        </p>
      </section>

      <section id="diagnosis" className="scroll-mt-24 border-t border-border/70 pt-12">
        <div className="flex items-start gap-4">
          <Stethoscope className="mt-1 h-6 w-6 shrink-0 text-moss" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">03 · Get assessed</p>
            <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">How PID is diagnosed</h2>
          </div>
        </div>
        <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-foreground/85">
          <p>
            There is no single test that confirms every case of PID. A clinician may consider your symptoms, medical and sexual health history, physical or pelvic examination, pregnancy testing, STI tests, blood or urine tests, and imaging when appropriate. The right combination depends on your situation.
          </p>
          <p>
            If you think you may have been exposed to an STI, tell the clinician directly. Honest information helps them choose appropriate tests and care. Do not self-diagnose from a product label, social post, or customer review.
          </p>
        </div>
      </section>

      <section id="treatment" className="scroll-mt-24 border-t border-border/70 pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">04 · Treatment questions</p>
        <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">What treatment usually involves</h2>
        <div className="mt-6 space-y-5 text-[15px] leading-[1.8] text-foreground/85">
          <p>
            PID is treated with prescription antibiotics selected by a healthcare professional. Take medicine exactly as prescribed and ask what to do if side effects occur. Symptoms can improve before an infection is fully treated, so do not stop a prescribed course early unless the prescriber tells you to.
          </p>
          <p>
            Ask the clinician whether sexual partners need testing or treatment, when sexual activity can safely resume, and whether a follow-up visit is needed. Herbal products, teas, or supplements should never replace antibiotics or urgent evaluation for suspected PID. Tell your clinician about every supplement you take, especially if you are pregnant, trying to conceive, or taking other medicines.
          </p>
        </div>
      </section>

      <section id="urgent-care" className="scroll-mt-24 border-y border-ochre/50 bg-ochre/10 px-5 py-7 md:px-8">
        <div className="flex items-start gap-4">
          <ShieldAlert className="mt-1 h-6 w-6 shrink-0 text-ochre" aria-hidden="true" />
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">05 · Do not wait</p>
            <h2 className="mt-2 font-display text-3xl text-moss-deep">When to seek urgent care</h2>
            <p className="mt-4 text-[15px] leading-[1.8] text-foreground/85">
              Seek urgent medical care for severe or worsening pelvic pain, high fever, repeated vomiting, fainting or marked weakness, heavy bleeding, or possible pregnancy with pelvic pain or bleeding. If you feel seriously ill, use your local emergency service. These symptoms need in-person assessment; they are not a situation to manage with an online consultation or herbal product alone.
            </p>
          </div>
        </div>
      </section>

      <section id="prevention" className="scroll-mt-24 border-t border-border/70 pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">06 · Lower the risk</p>
        <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">Practical prevention steps</h2>
        <ul className="mt-6 space-y-4 text-[15px] leading-[1.8] text-foreground/85">
          <li><strong className="font-semibold text-foreground">Test when appropriate:</strong> ask a qualified provider about STI testing for you and your partner, especially after a new exposure or when symptoms appear.</li>
          <li><strong className="font-semibold text-foreground">Use barrier protection:</strong> condoms and dental dams can reduce STI transmission when used correctly and consistently.</li>
          <li><strong className="font-semibold text-foreground">Avoid douching:</strong> it can disturb the vaginal environment and may push bacteria upward.</li>
          <li><strong className="font-semibold text-foreground">Get follow-up care:</strong> return for review if symptoms do not improve or come back, even if you have already started treatment.</li>
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          The World Health Organization explains why many STIs can have no symptoms and why testing and prevention matter: {" "}
          <a href={sources[2].href} target="_blank" rel="noreferrer" className="text-moss underline underline-offset-4">WHO STI information</a>.
        </p>
      </section>

      <section id="stories" className="scroll-mt-24 border-t border-border/70 pt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">07 · Read with context</p>
        <h2 className="mt-2 font-display text-3xl text-moss-deep md:text-4xl">Customer stories are personal experiences</h2>
        <p className="mt-5 max-w-3xl text-[15px] leading-[1.8] text-foreground/85">
          Reviews can help you understand how someone experienced a service, but they cannot prove that a product diagnosed, treated, or cured PID. People’s symptoms, diagnoses, treatments, and outcomes differ. Read reviews as personal accounts, and speak with a qualified clinician about your own health.
        </p>
        <Link to="/reviews" className="mt-6 inline-flex text-sm font-medium text-moss underline underline-offset-4 hover:text-moss-deep">
          Read customer reviews →
        </Link>
      </section>
    </main>

    <footer className="mt-16 border-t border-border/70 pt-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ochre">Further reading</p>
      <div className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
        {sources.map((source) => (
          <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="flex items-start gap-2 border border-border/70 p-4 transition-colors hover:border-moss/50 hover:text-moss">
            <ExternalLink className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{source.name}</span>
          </a>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-4 text-sm">
        <Link to="/consultation" className="text-moss underline underline-offset-4 hover:text-moss-deep">Book a consultation</Link>
        <Link to="/advisor" className="text-moss underline underline-offset-4 hover:text-moss-deep">Use the wellness advisor</Link>
        <Link to="/journal" className="text-moss underline underline-offset-4 hover:text-moss-deep">Read the Journal</Link>
      </div>
    </footer>
  </div>
);

export default PidGuide;