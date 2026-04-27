import logo from "@/assets/logo.png";

export const SiteFooter = () => (
  <footer className="mt-24 border-t border-border/60 bg-cream/40">
    <div className="container-narrow grid gap-10 py-14 md:grid-cols-4">
      <div className="md:col-span-2">
        <img src={logo} alt="Healthy Life Essentials & Wellness Herbals" className="h-14 w-auto" />
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Small-batch herbal remedies, hand-formulated for everyday wellness.
          Plant-grown, slowly made, and shipped in compostable packaging.
        </p>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-moss">Shop</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Tinctures</li><li>Teas</li><li>Balms & Oils</li><li>Honey</li>
        </ul>
      </div>
      <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-moss">Hours</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>Tue – Sat · 10–6</li><li>Sunday · 11–4</li><li>Closed Mondays</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
      © {new Date().getFullYear()} Healthy Life Essentials & Wellness Herbals. Made with intention.
    </div>
  </footer>
);
