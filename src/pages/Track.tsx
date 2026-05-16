import { useMemo, useState } from "react";
import { Package, ExternalLink, Truck, Calculator, Globe2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Seo } from "@/components/Seo";

type Courier = {
  id: string;
  name: string;
  // {code} is replaced with the user's tracking code
  url: (code: string) => string;
  hint?: string;
};

const couriers: Courier[] = [
  {
    id: "gig",
    name: "GIG Logistics",
    url: (c) => `https://giglogistics.com/tracking?waybill=${encodeURIComponent(c)}`,
    hint: "Waybill number from your GIG receipt",
  },
  {
    id: "nipost",
    name: "NIPOST (Nigerian Postal Service)",
    url: (c) => `https://www.nipost.gov.ng/track_trace?tracking_no=${encodeURIComponent(c)}`,
  },
  {
    id: "dhl",
    name: "DHL Express",
    url: (c) => `https://www.dhl.com/ng-en/home/tracking/tracking-express.html?tracking-id=${encodeURIComponent(c)}`,
  },
  {
    id: "fedex",
    name: "FedEx",
    url: (c) => `https://www.fedex.com/fedextrack/?trknbr=${encodeURIComponent(c)}`,
  },
  {
    id: "ups",
    name: "UPS",
    url: (c) => `https://www.ups.com/track?tracknum=${encodeURIComponent(c)}`,
  },
  {
    id: "aramex",
    name: "Aramex",
    url: (c) => `https://www.aramex.com/track/results?ShipmentNumber=${encodeURIComponent(c)}`,
  },
  {
    id: "redstar",
    name: "Red Star Express",
    url: (c) => `https://www.redstarplc.com/tracking?awb=${encodeURIComponent(c)}`,
  },
];

const Track = () => {
  const [courier, setCourier] = useState<string>("gig");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const selected = couriers.find((c) => c.id === courier)!;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) {
      setError("Please enter your tracking code.");
      return;
    }
    setError(null);
    window.open(selected.url(trimmed), "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Seo
        title="Track Your Package | Healthy Life Essentials"
        description="Track your Healthy Life Essentials & Wellness Herbals order in real time using your courier's tracking number."
        path="/track"
      />
      <section className="container-narrow py-14 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-moss/10 text-moss">
            <Package className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <h1 className="font-display text-3xl text-moss-deep md:text-5xl">
            Track your package
          </h1>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Enter the tracking number we shared after dispatch and choose your courier.
            We'll open your live tracking page on the courier's website.
          </p>
        </div>

        <form
          onSubmit={onSubmit}
          className="mx-auto mt-10 max-w-xl rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8"
        >
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="courier">Courier</Label>
              <Select value={courier} onValueChange={setCourier}>
                <SelectTrigger id="courier">
                  <SelectValue placeholder="Choose your courier" />
                </SelectTrigger>
                <SelectContent>
                  {couriers.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Tracking number</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={selected.hint ?? "e.g. 1234567890"}
                autoComplete="off"
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>

            <Button type="submit" className="w-full gap-2">
              <Truck className="h-4 w-4" /> Track package
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              Tracking opens on the courier's official website in a new tab.
            </p>
          </div>
        </form>

        <div className="mx-auto mt-10 max-w-2xl rounded-xl border border-border/60 bg-cream/40 p-5 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Don't have a tracking number yet?</p>
          <p className="mt-1">
            Orders are dispatched within 24–48 hours. Once shipped, you'll receive a
            tracking number via WhatsApp or SMS. For help, message us on WhatsApp at{" "}
            <a href="https://wa.me/2347062966893" className="text-moss hover:underline">
              +234 706 296 6893
            </a>
            .
          </p>
        </div>

        <WaybillCalculator />
      </section>
    </>
  );
};

/* ---------------- Waybill pricing calculator ---------------- */

type StatePrice = { name: string; price: number };

// Nigeria — flat waybill prices from Ado-Ekiti (origin), in Naira
const nigeriaStates: StatePrice[] = [
  { name: "Ekiti (within Ado-Ekiti)", price: 1500 },
  { name: "Ekiti (other towns)", price: 2000 },
  { name: "Ondo (Akure)", price: 2000 },
  { name: "Ondo (other towns)", price: 2500 },
  { name: "Osun", price: 2500 },
  { name: "Kwara", price: 2500 },
  { name: "Oyo (Ibadan)", price: 3000 },
  { name: "Ogun", price: 4000 },
  { name: "Lagos", price: 5000 },
  { name: "Edo", price: 4000 },
  { name: "Delta", price: 4500 },
  { name: "Anambra", price: 5000 },
  { name: "Enugu", price: 5000 },
  { name: "Imo", price: 5500 },
  { name: "Abia", price: 5500 },
  { name: "Ebonyi", price: 5500 },
  { name: "Rivers (Port Harcourt)", price: 6000 },
  { name: "Bayelsa", price: 6500 },
  { name: "Cross River (Calabar)", price: 6500 },
  { name: "Akwa Ibom (Uyo)", price: 6500 },
  { name: "Kogi", price: 3500 },
  { name: "Benue", price: 5500 },
  { name: "Nasarawa", price: 5500 },
  { name: "FCT (Abuja)", price: 6000 },
  { name: "Plateau (Jos)", price: 6500 },
  { name: "Niger", price: 5500 },
  { name: "Kaduna", price: 6500 },
  { name: "Kano", price: 7500 },
  { name: "Katsina", price: 8000 },
  { name: "Jigawa", price: 8500 },
  { name: "Bauchi", price: 7500 },
  { name: "Gombe", price: 8000 },
  { name: "Adamawa", price: 9000 },
  { name: "Taraba", price: 8500 },
  { name: "Yobe", price: 9500 },
  { name: "Borno (Maiduguri)", price: 10000 },
  { name: "Sokoto", price: 9000 },
  { name: "Kebbi", price: 9000 },
  { name: "Zamfara", price: 9000 },
];

type IntlCountry = { code: string; name: string; perKg: number };

// International — price per KG in Naira
const intlCountries: IntlCountry[] = [
  { code: "US", name: "United States", perKg: 120000 },
  { code: "CA", name: "Canada", perKg: 130000 },
  { code: "GB", name: "United Kingdom", perKg: 90000 },
  { code: "IE", name: "Ireland", perKg: 95000 },
  { code: "DE", name: "Germany", perKg: 95000 },
  { code: "FR", name: "France", perKg: 95000 },
  { code: "IT", name: "Italy", perKg: 100000 },
  { code: "ES", name: "Spain", perKg: 100000 },
  { code: "NL", name: "Netherlands", perKg: 95000 },
  { code: "AE", name: "United Arab Emirates", perKg: 85000 },
  { code: "SA", name: "Saudi Arabia", perKg: 90000 },
  { code: "AU", name: "Australia", perKg: 140000 },
  { code: "ZA", name: "South Africa", perKg: 80000 },
  { code: "GH", name: "Ghana", perKg: 45000 },
  { code: "KE", name: "Kenya", perKg: 70000 },
  { code: "CN", name: "China", perKg: 110000 },
  { code: "IN", name: "India", perKg: 95000 },
];

const INTL_MINIMUM = 20000;
const naira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);

const WaybillCalculator = () => {
  const [region, setRegion] = useState<"nigeria" | "international">("nigeria");
  const [ngState, setNgState] = useState<string>(nigeriaStates[0].name);
  const [country, setCountry] = useState<string>(intlCountries[0].code);
  const [weight, setWeight] = useState<string>("1");

  const ngPrice = useMemo(
    () => nigeriaStates.find((s) => s.name === ngState)?.price ?? 0,
    [ngState]
  );

  const intlResult = useMemo(() => {
    const c = intlCountries.find((x) => x.code === country);
    const kg = Math.max(parseFloat(weight) || 0, 0);
    const raw = (c?.perKg ?? 0) * kg;
    const total = Math.max(raw, INTL_MINIMUM);
    return { country: c, kg, total };
  }, [country, weight]);

  return (
    <div className="mx-auto mt-14 max-w-3xl">
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-ochre/15 text-ochre">
          <Calculator className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <h2 className="font-display text-2xl text-moss-deep md:text-3xl">
          Waybill / Shipping cost calculator
        </h2>
        <p className="mt-2 text-sm text-muted-foreground md:text-base">
          Estimate the cost of shipping your order from our Ado-Ekiti base.
          Final price may vary slightly based on package weight and courier.
        </p>
      </div>

      <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm md:p-8">
        <div className="mb-6 inline-flex w-full rounded-lg border border-border/60 p-1 sm:w-auto">
          <button
            type="button"
            onClick={() => setRegion("nigeria")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition sm:flex-none ${
              region === "nigeria"
                ? "bg-moss text-cream"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" /> Within Nigeria
          </button>
          <button
            type="button"
            onClick={() => setRegion("international")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm transition sm:flex-none ${
              region === "international"
                ? "bg-moss text-cream"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Globe2 className="h-4 w-4" /> International
          </button>
        </div>

        {region === "nigeria" ? (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="ng-state">Destination state</Label>
              <Select value={ngState} onValueChange={setNgState}>
                <SelectTrigger id="ng-state">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {nigeriaStates.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="rounded-xl bg-cream/50 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Estimated waybill
              </p>
              <p className="mt-2 font-display text-4xl text-moss-deep">{naira(ngPrice)}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Minimum within Ado-Ekiti is {naira(1500)}. Prices increase by distance.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="intl-country">Destination country</Label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger id="intl-country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {intlCountries.map((c) => (
                      <SelectItem key={c.code} value={c.code}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Package weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>
            </div>
            <div className="rounded-xl bg-cream/50 p-5 text-center">
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Estimated shipping
              </p>
              <p className="mt-2 font-display text-4xl text-moss-deep">
                {naira(intlResult.total)}
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                {intlResult.country
                  ? `${naira(intlResult.country.perKg)} per kg × ${intlResult.kg}kg`
                  : ""}{" "}
                · Minimum international shipping is {naira(INTL_MINIMUM)}.
              </p>
            </div>
          </div>
        )}

        <p className="mt-5 text-center text-xs text-muted-foreground">
          To confirm and pay, message us on WhatsApp at{" "}
          <a href="https://wa.me/2347062966893" className="text-moss hover:underline">
            +234 706 296 6893
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Track;
