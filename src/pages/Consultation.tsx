import { useState } from "react";
import { z } from "zod";
import { Check, Phone, Mail, MapPin, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { countryCodes, flagFor } from "@/data/countryCodes";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(30),
  age: z.coerce.number().int().min(13, "Must be at least 13").max(110),
  concerns: z.string().trim().min(10, "Please describe your concerns (min 10 chars)").max(2000),
  medications: z.string().trim().max(1000).optional().or(z.literal("")),
  preferredTime: z.string().min(1, "Choose a preferred contact time"),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

type FormErrors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const Consultation = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<{ name: string; ref: string } | null>(null);
  const [preferredTime, setPreferredTime] = useState("");
  const [dialCode, setDialCode] = useState("+234");
  const [phoneLocal, setPhoneLocal] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: `${dialCode} ${phoneLocal}`.trim(),
      age: data.get("age") as string,
      concerns: data.get("concerns") as string,
      medications: (data.get("medications") as string) || "",
      preferredTime,
      message: (data.get("message") as string) || "",
    };
    const result = schema.safeParse(payload);
    if (!result.success) {
      const errs: FormErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof FormErrors;
        if (!errs[key]) errs[key] = issue.message;
      }
      setErrors(errs);
      toast.error("Please check the highlighted fields.");
      return;
    }
    setErrors({});
    const ref = "HLE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSubmitted({ name: result.data.name.split(" ")[0], ref });
    form.reset();
    setPreferredTime("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-primary-foreground">
          <Check className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">Request received</p>
        <h1 className="mt-3 font-display text-5xl text-moss-deep text-balance md:text-6xl">
          Thank you, {submitted.name}.
        </h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          Your consultation request <span className="font-medium text-foreground">{submitted.ref}</span> has
          been received. Dr. Oluwatomisin's team will reach out within 24 hours via your preferred channel.
        </p>
        <p className="mt-3 text-xs italic text-muted-foreground">
          (This is a demo form — no information has been transmitted.)
        </p>
        <Button onClick={() => setSubmitted(null)} className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep">
          Submit another request
        </Button>
      </main>
    );
  }

  return (
    <main className="container-narrow py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">Medical Consultation</p>
        <h1 className="mt-3 font-display text-5xl text-moss-deep md:text-6xl">
          Speak privately with Dr. Oluwatomisin's team.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          Share your health intake confidentially. We'll review your information and reach out
          with a personalized natural protocol — typically within 24 hours.
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr,1fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <section className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required className="mt-1.5" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-1.5" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone / WhatsApp</Label>
              <div className="mt-1.5 flex gap-2">
                <Select value={dialCode} onValueChange={setDialCode}>
                  <SelectTrigger className="w-[140px] shrink-0" aria-label="Country code">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {countryCodes.map((c) => (
                      <SelectItem key={c.iso} value={c.dial}>
                        <span className="mr-2 text-base leading-none">{flagFor(c.iso)}</span>
                        <span className="font-medium">{c.dial}</span>
                        <span className="ml-2 text-muted-foreground">{c.name}</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  id="phone"
                  name="phone"
                  required
                  value={phoneLocal}
                  onChange={(e) => setPhoneLocal(e.target.value)}
                  className="flex-1"
                  placeholder="706 296 6893"
                  inputMode="tel"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" min={13} max={110} required className="mt-1.5" />
              {errors.age && <p className="mt-1 text-xs text-destructive">{errors.age}</p>}
            </div>
            <div>
              <Label htmlFor="preferredTime">Preferred contact time</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger id="preferredTime" className="mt-1.5">
                  <SelectValue placeholder="Choose a window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning (8am – 12pm)</SelectItem>
                  <SelectItem value="afternoon">Afternoon (12pm – 4pm)</SelectItem>
                  <SelectItem value="evening">Evening (4pm – 8pm)</SelectItem>
                  <SelectItem value="anytime">Any time</SelectItem>
                </SelectContent>
              </Select>
              {errors.preferredTime && <p className="mt-1 text-xs text-destructive">{errors.preferredTime}</p>}
            </div>
          </section>

          <div>
            <Label htmlFor="concerns">Current health concerns</Label>
            <Textarea
              id="concerns"
              name="concerns"
              required
              rows={5}
              className="mt-1.5"
              placeholder="Briefly describe symptoms, duration, and anything that has been tried..."
            />
            {errors.concerns && <p className="mt-1 text-xs text-destructive">{errors.concerns}</p>}
          </div>

          <div>
            <Label htmlFor="medications">Current medications & supplements (optional)</Label>
            <Textarea
              id="medications"
              name="medications"
              rows={3}
              className="mt-1.5"
              placeholder="List anything you're currently taking, including dosage."
            />
            {errors.medications && <p className="mt-1 text-xs text-destructive">{errors.medications}</p>}
          </div>

          <div>
            <Label htmlFor="message">Anything else you'd like to share? (optional)</Label>
            <Textarea id="message" name="message" rows={3} className="mt-1.5" />
          </div>

          <p className="text-xs italic text-muted-foreground">
            Your information is treated with strict confidentiality. This form is a demo and does not
            transmit data — we'll wire it to a secure backend when you're ready.
          </p>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-moss text-primary-foreground hover:bg-moss-deep sm:w-auto"
          >
            Submit consultation request
          </Button>
        </form>

        <aside className="h-fit space-y-6 bg-cream/50 p-7 lg:sticky lg:top-24">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-moss" strokeWidth={1.5} />
            <h2 className="font-display text-2xl text-moss-deep">What to expect</h2>
          </div>
          <ol className="space-y-4 text-sm text-foreground/80">
            <li className="flex gap-3">
              <span className="font-display text-2xl leading-none text-ochre">1</span>
              <span>Submit your confidential intake — it takes about 3 minutes.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-display text-2xl leading-none text-ochre">2</span>
              <span>Dr. Oluwatomisin's team reviews your case within 24 hours.</span>
            </li>
            <li className="flex gap-3">
              <span className="font-display text-2xl leading-none text-ochre">3</span>
              <span>We reach out with a personalized natural protocol and product recommendations.</span>
            </li>
          </ol>
          <div className="border-t border-border pt-5">
            <p className="text-xs uppercase tracking-[0.22em] text-moss">Or contact us directly</p>
            <ul className="mt-3 space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-moss" /> +234 706 296 6893</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-moss" /> care@healthylifeessentials.co</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-moss" /> Ado Ekiti & Lagos, Nigeria</li>
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default Consultation;
