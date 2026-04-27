import { Link } from "react-router-dom";
import { Phone, Instagram, MapPin, Stethoscope, FlaskConical, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import ceo1 from "@/assets/ceo-portrait.jpeg";
import ceo2 from "@/assets/ceo-2.jpeg";

const CEO = () => (
  <main>
    <section className="container-narrow grid items-center gap-12 py-16 md:grid-cols-[1fr,1.1fr] md:py-24">
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={ceo1}
          alt="Dr. Tosin Kolawole, founder of Healthy Life Essentials & Wellness Herbals"
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">The face behind the brand</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moss-deep text-balance md:text-6xl">
          Dr. Tosin Kolawole
        </h1>
        <p className="mt-3 text-sm uppercase tracking-[0.2em] text-moss">
          BMLS · Naturopathic Doctor · Founder
        </p>
        <p className="mt-6 text-base leading-relaxed text-foreground/80">
          Kolawole Oluwatomisin Esther — known to her community as <em>Tommy01</em> —
          is a passionate Naturopathic Doctor and Biomedical Laboratory Scientist
          dedicated to empowering individuals with safe, effective, and holistic
          natural healthcare solutions.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-moss text-primary-foreground hover:bg-moss-deep">
            <Link to="/consultation">Book a consultation</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/shop">Browse products</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Credentials */}
    <section className="bg-cream/40 py-16">
      <div className="container-narrow grid gap-10 md:grid-cols-3">
        {[
          { icon: Stethoscope, title: "Naturopathic Doctor", body: "Trained in root-cause holistic medicine — treating the whole person, not just symptoms." },
          { icon: FlaskConical, title: "Biomedical Laboratory Scientist (BMLS)", body: "Scientific rigor at the foundation of every formulation and protocol." },
          { icon: Leaf, title: "Founder, Healthy Life Essentials", body: "Two brands serving women's wellness across Ado Ekiti, Lagos and beyond." },
        ].map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex flex-col items-start">
            <Icon className="mb-4 h-6 w-6 text-moss" strokeWidth={1.3} />
            <h3 className="font-display text-xl text-moss-deep">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
          </div>
        ))}
      </div>
    </section>

    {/* Full bio */}
    <section className="container-narrow grid gap-12 py-20 md:grid-cols-[1.4fr,1fr]">
      <div className="space-y-6 text-base leading-relaxed text-foreground/85">
        <p>
          As the founder of <strong>Healthy Life Essentials & Wellness</strong>, Dr. Tomisin
          combines her strong scientific background in medical laboratory science with deep
          expertise in naturopathy and herbal medicine to address a wide range of health
          challenges.
        </p>
        <p>
          With a special focus on both <strong>masculine and feminine wellness</strong>, she
          provides natural treatment protocols for conditions such as sexually transmitted
          infections (STIs/STDs), hemorrhoids, premature ejaculation, hormonal imbalances,
          PCOS, PID, infertility, and overall reproductive health. Her approach emphasizes
          root-cause healing using high-quality herbal formulations, supplements, IV
          Glutathione infusions, and clinically inspired wellness products.
        </p>
        <p>
          Operating from <strong>Ado Ekiti and Lagos, Nigeria</strong>, her brands —
          <em> Healthy Life Essentials & Wellness Herbals</em> and the wellness supplement arm —
          have gained recognition for delivering results-driven, natural alternatives that
          support beauty, detoxification, vaginal health, and general vitality. She is also
          actively involved in feminine care education, sharing practical tips on achieving
          and maintaining a healthy vagina, hormonal balance, and overall wellness.
        </p>
        <p>
          Driven by compassion and a commitment to accessible healthcare, Dr. Tomisin
          treats patients with professionalism, discretion, and proven natural protocols.
          Her pages serve as trusted resources for those seeking holistic alternatives to
          conventional treatments — especially in areas like premature ejaculation,
          infertility, and chronic infections.
        </p>
        <p>
          Whether you're looking for boric acid treatments, slippery elm solutions,
          premium supplements, or personalized herbal regimens, Dr. Kolawole and her team
          at Healthy Life Essentials are committed to helping you reclaim your health
          naturally.
        </p>
      </div>

      <aside className="h-fit space-y-6 bg-cream/50 p-7">
        <div className="aspect-[4/5] overflow-hidden">
          <img src={ceo2} alt="Dr. Tosin Kolawole portrait" className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-moss">Connect</p>
          <ul className="mt-3 space-y-2 text-sm text-foreground/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-moss" /> +234 706 296 6893</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-moss" /> Ado Ekiti & Lagos, Nigeria</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-moss" /> @healthylifeessentials_herbals</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-moss" /> @healthylifeessentialswellness</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4 text-moss" /> @iam_tommy01</li>
          </ul>
        </div>
        <Button asChild className="w-full bg-moss text-primary-foreground hover:bg-moss-deep">
          <Link to="/consultation">Book a consultation</Link>
        </Button>
      </aside>
    </section>
  </main>
);

export default CEO;
