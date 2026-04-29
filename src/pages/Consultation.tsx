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
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t } = useLanguage();
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
      toast.error(t("consult_check_fields"));
      return;
    }
    setErrors({});
    const ref = "HLE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    setSubmitted({ name: result.data.name.split(" ")[0], ref });
    form.reset();
    setPreferredTime("");
    setPhoneLocal("");
    setDialCode("+234");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <main className="container-narrow flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-moss text-primary-foreground">
          <Check className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">{t("consult_received")}</p>
        <h1 className="mt-3 font-display text-5xl text-moss-deep text-balance md:text-6xl">
          {t("consult_thank_you")} {submitted.name}.
        </h1>
        <p className="mt-5 max-w-xl text-muted-foreground">
          {t("consult_received_body_a")} <span className="font-medium text-foreground">{submitted.ref}</span> {t("consult_received_body_b")}
        </p>
        <p className="mt-3 text-xs italic text-muted-foreground">
          {t("consult_received_demo")}
        </p>
        <Button onClick={() => setSubmitted(null)} className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep">
          {t("consult_submit_another")}
        </Button>
      </main>
    );
  }

  return (
    <main className="container-narrow py-16 md:py-24">
      <header className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-ochre">{t("consult_eyebrow")}</p>
        <h1 className="mt-3 font-display text-5xl text-moss-deep md:text-6xl">
          {t("consult_title")}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">
          {t("consult_subtitle")}
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr,1fr]">
        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <section className="grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="name">{t("consult_full_name")}</Label>
              <Input id="name" name="name" required className="mt-1.5" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">{t("consult_email")}</Label>
              <Input id="email" name="email" type="email" required className="mt-1.5" />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="phone">{t("consult_phone")}</Label>
              <div className="mt-1.5 flex gap-2">
                <Select value={dialCode} onValueChange={setDialCode}>
                  <SelectTrigger className="w-[140px] shrink-0" aria-label={t("consult_country_code")}>
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
              <Label htmlFor="age">{t("consult_age")}</Label>
              <Input id="age" name="age" type="number" min={13} max={110} required className="mt-1.5" />
              {errors.age && <p className="mt-1 text-xs text-destructive">{errors.age}</p>}
            </div>
            <div>
              <Label htmlFor="preferredTime">{t("consult_preferred_time")}</Label>
              <Select value={preferredTime} onValueChange={setPreferredTime}>
                <SelectTrigger id="preferredTime" className="mt-1.5">
                  <SelectValue placeholder={t("consult_choose_window")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">{t("consult_morning")}</SelectItem>
                  <SelectItem value="afternoon">{t("consult_afternoon")}</SelectItem>
                  <SelectItem value="evening">{t("consult_evening")}</SelectItem>
                  <SelectItem value="anytime">{t("consult_anytime")}</SelectItem>
                </SelectContent>
              </Select>
              {errors.preferredTime && <p className="mt-1 text-xs text-destructive">{errors.preferredTime}</p>}
            </div>
          </section>

          <div>
            <Label htmlFor="concerns">{t("consult_concerns")}</Label>
            <Textarea
              id="concerns"
              name="concerns"
              required
              rows={5}
              className="mt-1.5"
              placeholder={t("consult_concerns_placeholder")}
            />
            {errors.concerns && <p className="mt-1 text-xs text-destructive">{errors.concerns}</p>}
          </div>

          <div>
            <Label htmlFor="medications">{t("consult_meds")}</Label>
            <Textarea
              id="medications"
              name="medications"
              rows={3}
              className="mt-1.5"
              placeholder={t("consult_meds_placeholder")}
            />
            {errors.medications && <p className="mt-1 text-xs text-destructive">{errors.medications}</p>}
          </div>

          <div>
            <Label htmlFor="message">{t("consult_message")}</Label>
            <Textarea id="message" name="message" rows={3} className="mt-1.5" />
          </div>

          <p className="text-xs italic text-muted-foreground">
            {t("consult_privacy")}
          </p>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-moss text-primary-foreground hover:bg-moss-deep sm:w-auto"
          >
            {t("consult_submit")}
          </Button>
        </form>

        <aside className="h-fit space-y-6 bg-cream/50 p-7 lg:sticky lg:top-24">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-moss" strokeWidth={1.5} />
            <h2 className="font-display text-2xl text-moss-deep">{t("consult_what_to_expect")}</h2>
          </div>
          <ol className="space-y-4 text-sm text-foreground/80">
            <li className="flex gap-3">
              <span className="font-display text-2xl leading-none text-ochre">1</span>
              <span>{t("consult_step1")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-display text-2xl leading-none text-ochre">2</span>
              <span>{t("consult_step2")}</span>
            </li>
            <li className="flex gap-3">
              <span className="font-display text-2xl leading-none text-ochre">3</span>
              <span>{t("consult_step3")}</span>
            </li>
          </ol>
          <div className="border-t border-border pt-5">
            <p className="text-xs uppercase tracking-[0.22em] text-moss">{t("consult_or_contact")}</p>
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
