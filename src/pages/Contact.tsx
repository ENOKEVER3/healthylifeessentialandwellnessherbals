import { Seo } from "@/components/Seo";
import { Phone, Mail, MapPin, Instagram } from "lucide-react";

const Contact = () => (
  <div className="container-narrow py-16 md:py-24">
    <Seo
      title="Contact Us | Healthy Life Essentials"
      description="Contact Healthy Life Essentials & Wellness Herbals in Ado-Ekiti, Nigeria, or reach our Lagos dispatch hub for herbal product orders and worldwide delivery."
      path="/contact"
    />
    <header className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.28em] text-ochre">Get in touch</p>
      <h1 className="mt-4 font-display text-5xl text-moss-deep md:text-6xl">Contact us</h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        We reply within one business day. For urgent product or delivery questions, WhatsApp is
        fastest.
      </p>
    </header>

    <div className="mt-14 grid max-w-3xl gap-8 md:grid-cols-2">
      <a
        href="https://wa.me/2347062966893"
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-border bg-cream/40 p-8 transition-colors hover:border-moss"
      >
        <Phone className="h-6 w-6 text-moss" />
        <h2 className="mt-4 font-display text-2xl text-moss-deep">WhatsApp</h2>
        <p className="mt-2 text-muted-foreground">+234 706 296 6893</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Fastest for orders, tracking and quick product questions. 8am–8pm WAT, seven days a week.
        </p>
      </a>

      <a
        href="mailto:healthylifeessentialsherbals@gmail.com"
        className="group block rounded-2xl border border-border bg-cream/40 p-8 transition-colors hover:border-moss"
      >
        <Mail className="h-6 w-6 text-moss" />
        <h2 className="mt-4 font-display text-2xl text-moss-deep">Email</h2>
        <p className="mt-2 break-all text-muted-foreground">
          healthylifeessentialsherbals@gmail.com
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          Best for consultation enquiries, wholesale requests and press.
        </p>
      </a>

      <a
        href="https://instagram.com/healthylifeessentials_herbals"
        target="_blank"
        rel="noopener noreferrer"
        className="group block rounded-2xl border border-border bg-cream/40 p-8 transition-colors hover:border-moss"
      >
        <Instagram className="h-6 w-6 text-moss" />
        <h2 className="mt-4 font-display text-2xl text-moss-deep">Instagram</h2>
        <p className="mt-2 text-muted-foreground">@healthylifeessentials_herbals</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Daily herbal tips, client transformations and behind-the-scenes at our farm.
        </p>
      </a>

      <div className="rounded-2xl border border-border bg-cream/40 p-8">
        <MapPin className="h-6 w-6 text-moss" />
        <h2 className="mt-4 font-display text-2xl text-moss-deep">Clinics</h2>
        <p className="mt-2 text-muted-foreground">Ado-Ekiti (headquarters, formulation & production)</p>
        <p className="text-muted-foreground">Lagos (dispatch hub and consultation, by appointment)</p>
        <p className="mt-3 text-sm text-muted-foreground">
          We dispatch Nigerian and worldwide orders through Lagos. Consultations are by appointment
          only; please book through our consultation page.
        </p>
      </div>
    </div>
  </div>
);

export default Contact;
