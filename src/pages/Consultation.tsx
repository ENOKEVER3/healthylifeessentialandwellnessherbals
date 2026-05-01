import { useState } from "react";
import { z } from "zod";
import { Check, Phone, Mail, MapPin, Stethoscope, Upload, X, Loader2, MessageCircle } from "lucide-react";
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
import { supabase } from "@/integrations/supabase/client";
import { buildWhatsAppLink } from "@/lib/whatsapp";

const DOCTOR_EMAIL = "Oluwatomisin625@gmail.com";
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
  const [submitted, setSubmitted] = useState<{ name: string; ref: string; waLink: string; mailLink: string } | null>(null);
  const [preferredTime, setPreferredTime] = useState("");
  const [dialCode, setDialCode] = useState("+234");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const onPickFiles = (list: FileList | null) => {
    if (!list) return;
    const next: File[] = [...files];
    for (const f of Array.from(list)) {
      if (!ALLOWED_TYPES.includes(f.type)) {
        toast.error(`${f.name}: only images (JPG, PNG, WEBP, HEIC) and PDF are allowed.`);
        continue;
      }
      if (f.size > MAX_FILE_SIZE) {
        toast.error(`${f.name}: max file size is 10MB.`);
        continue;
      }
      next.push(f);
    }
    setFiles(next.slice(0, 5));
  };

  const removeFile = (idx: number) => setFiles(files.filter((_, i) => i !== idx));

  const uploadFiles = async (ref: string): Promise<string[]> => {
    if (files.length === 0) return [];
    const urls: string[] = [];
    for (const f of files) {
      const safeName = f.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const path = `${ref}/${Date.now()}-${safeName}`;
      const { error } = await supabase.storage
        .from("consultation-uploads")
        .upload(path, f, { contentType: f.type, upsert: false });
      if (error) {
        console.error("Upload failed", error);
        toast.error(`Failed to upload ${f.name}`);
        continue;
      }
      const { data } = supabase.storage.from("consultation-uploads").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

    setUploading(true);
    let attachmentUrls: string[] = [];
    try {
      attachmentUrls = await uploadFiles(ref);
    } finally {
      setUploading(false);
    }

    const lines = [
      "Hello Dr. Oluwatomisin 🌿 I'd like to chat with you. I am from Healthy Life Essentials Official Website. Here is my Complain...",
      "",
      `Name: ${result.data.name}`,
      `Age: ${result.data.age}`,
      `Email: ${result.data.email}`,
      `Phone: ${result.data.phone}`,
      `Preferred contact time: ${result.data.preferredTime}`,
      "",
      `Concerns: ${result.data.concerns}`,
    ];
    if (result.data.medications) lines.push("", `Current medications / supplements: ${result.data.medications}`);
    if (result.data.message) lines.push("", `Additional message: ${result.data.message}`);
    if (attachmentUrls.length > 0) {
      lines.push("", "Test results:");
      attachmentUrls.forEach((u) => lines.push(u));
    }
    lines.push("", `Reference: ${ref}`);

    const body = lines.join("\n");
    const waLink = buildWhatsAppLink(body);
    const subject = `New consultation request — ${result.data.name} (${ref})`;
    const mailLink = `mailto:${DOCTOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open WhatsApp immediately so the message is delivered
    window.open(waLink, "_blank", "noopener,noreferrer");
    // Open mail client as a second channel
    setTimeout(() => {
      window.location.href = mailLink;
    }, 400);

    setSubmitted({ name: result.data.name.split(" ")[0], ref, waLink, mailLink });
    form.reset();
    setPreferredTime("");
    setPhoneLocal("");
    setDialCode("+234");
    setFiles([]);
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
          Your consultation request <span className="font-medium text-foreground">{submitted.ref}</span> has been prepared.
          We've opened WhatsApp and your email app so you can send it directly to Dr. Oluwatomisin.
        </p>
        <p className="mt-3 max-w-xl text-sm text-muted-foreground">
          If nothing opened, use one of the buttons below.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button asChild className="bg-[#25D366] text-white hover:bg-[#25D366]/90">
            <a href={submitted.waLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Send on WhatsApp
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={submitted.mailLink}>
              <Mail className="h-4 w-4" /> Send by Email
            </a>
          </Button>
        </div>
        <Button onClick={() => setSubmitted(null)} variant="ghost" className="mt-6">
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

          {/* Test results upload */}
          <div className="rounded-lg border border-moss/30 bg-cream/30 p-5">
            <Label className="text-sm font-medium text-moss-deep">
              Upload your test results (optional)
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Attach lab reports, scans or prescriptions as images or PDF. They'll be sent to Dr. Oluwatomisin together with your message. Max 5 files, 10MB each.
            </p>
            <div className="mt-3">
              <label
                htmlFor="testResults"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-md border border-dashed border-moss/40 bg-background/60 px-4 py-6 text-sm text-moss-deep transition hover:border-moss hover:bg-cream/40"
              >
                <Upload className="h-4 w-4" />
                <span>Click to add files (JPG, PNG, WEBP, HEIC, PDF)</span>
              </label>
              <input
                id="testResults"
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp,image/heic,application/pdf"
                className="sr-only"
                onChange={(e) => {
                  onPickFiles(e.target.files);
                  e.currentTarget.value = "";
                }}
              />
            </div>
            {files.length > 0 && (
              <ul className="mt-3 space-y-2">
                {files.map((f, i) => (
                  <li
                    key={`${f.name}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2 text-xs"
                  >
                    <span className="truncate">
                      {f.name} <span className="text-muted-foreground">({(f.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="shrink-0 text-muted-foreground transition hover:text-destructive"
                      aria-label={`Remove ${f.name}`}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <p className="text-xs italic text-muted-foreground">
            {t("consult_privacy")}
          </p>

          <Button
            type="submit"
            size="lg"
            disabled={uploading}
            className="w-full bg-moss text-primary-foreground hover:bg-moss-deep sm:w-auto"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Uploading…
              </>
            ) : (
              t("consult_submit")
            )}
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
