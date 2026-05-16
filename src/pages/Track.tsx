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
      </section>
    </>
  );
};

export default Track;
