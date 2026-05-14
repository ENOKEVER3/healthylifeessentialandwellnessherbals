import { useEffect, useMemo, useState, useRef } from "react";
import { Star, Upload, Loader2, CheckCircle2, MessageSquarePlus, ImagePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Seo } from "@/components/Seo";
import { supabase } from "@/integrations/supabase/client";
import { countryCodes, flagFor } from "@/data/countryCodes";
import { toast } from "sonner";
import avatarMale from "@/assets/avatar-male.jpg";
import avatarFemale from "@/assets/avatar-female.jpg";

type ReviewRow = {
  id: string;
  display_name: string;
  is_anonymous: boolean;
  avatar_kind: "male" | "female" | null;
  photo_url: string | null;
  country_code: string;
  year: number;
  rating: number;
  body: string;
  created_at: string;
};

const YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);
const CURRENT_YEAR = new Date().getFullYear();

const StarPicker = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className="transition-transform hover:scale-110 focus:outline-none"
        aria-label={`${n} stars`}
      >
        <Star
          className={`h-7 w-7 ${n <= value ? "fill-ochre text-ochre" : "text-ochre/30"}`}
          strokeWidth={1.4}
        />
      </button>
    ))}
  </div>
);

const StarsRead = ({ value }: { value: number }) => (
  <div className="inline-flex gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <Star
        key={n}
        className={`h-3.5 w-3.5 ${n <= value ? "fill-ochre text-ochre" : "text-ochre/25"}`}
        strokeWidth={1.4}
      />
    ))}
  </div>
);

const avatarSrc = (r: ReviewRow) => {
  if (r.photo_url) return r.photo_url;
  if (r.avatar_kind === "male") return avatarMale;
  if (r.avatar_kind === "female") return avatarFemale;
  return avatarFemale;
};

const Reviews = () => {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  // Form state
  const [mode, setMode] = useState<"" | "name" | "anonymous">("");
  const [fullName, setFullName] = useState("");
  const [avatarKind, setAvatarKind] = useState<"male" | "female">("female");
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [country, setCountry] = useState("NG");
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [thanksName, setThanksName] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const fetchReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("site_reviews")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) toast.error("Could not load reviews");
    setRows((data ?? []) as ReviewRow[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const summary = useMemo(() => {
    if (rows.length === 0) return { avg: 0, count: 0 };
    const avg = rows.reduce((a, r) => a + r.rating, 0) / rows.length;
    return { avg, count: rows.length };
  }, [rows]);

  const resetForm = () => {
    setMode("");
    setFullName("");
    setAvatarKind("female");
    setFile(null);
    setFilePreview(null);
    setCountry("NG");
    setYear(CURRENT_YEAR);
    setRating(5);
    setBody("");
    setThanksName(null);
  };

  const onPickFile = (f: File | null) => {
    setFile(f);
    if (filePreview) URL.revokeObjectURL(filePreview);
    setFilePreview(f ? URL.createObjectURL(f) : null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mode) return toast.error("Choose how you'd like to appear");
    if (mode === "name" && fullName.trim().length < 2) return toast.error("Please enter your full name");
    if (body.trim().length < 3) return toast.error("Please write a short review");
    if (!country) return toast.error("Pick your country");

    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (mode === "name" && file) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const up = await supabase.storage.from("review-photos").upload(path, file, {
          contentType: file.type,
          upsert: false,
        });
        if (up.error) throw up.error;
        photo_url = supabase.storage.from("review-photos").getPublicUrl(up.data.path).data.publicUrl;
      }

      const display_name =
        mode === "anonymous" ? "Anonymous" : fullName.trim().slice(0, 80);

      const { error } = await supabase.from("site_reviews").insert({
        display_name,
        is_anonymous: mode === "anonymous",
        avatar_kind: mode === "anonymous" ? avatarKind : null,
        photo_url,
        country_code: country,
        year,
        rating,
        body: body.trim().slice(0, 2000),
      });
      if (error) throw error;

      const first = mode === "anonymous" ? "friend" : fullName.trim().split(" ")[0];
      setThanksName(first);
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-background">
      <Seo
        title="Customer Reviews — Healthy Life Essentials"
        description="Real stories from people who trust Healthy Life Essentials & Wellness Herbals. Read reviews and share your own."
        path="/reviews"
      />

      {/* Hero */}
      <section className="border-b border-border/60 bg-cream/40">
        <div className="container-narrow py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-ochre">Community voices</p>
              <h1 className="mt-4 font-display text-5xl leading-[1.05] text-moss-deep md:text-6xl">
                Reviews from our wellness family.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                Honest reflections from women and men around the world who've welcomed our herbal rituals into their daily life.
              </p>
              <Button
                size="lg"
                onClick={() => { resetForm(); setOpen(true); }}
                className="mt-8 bg-moss text-primary-foreground hover:bg-moss-deep"
              >
                <MessageSquarePlus className="mr-2 h-4 w-4" /> Leave a review
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-8 backdrop-blur">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-6xl text-moss-deep">
                  {summary.count > 0 ? summary.avg.toFixed(1) : "—"}
                </span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <div className="mt-2"><StarsRead value={Math.round(summary.avg)} /></div>
              <p className="mt-3 text-sm text-muted-foreground">
                Based on {summary.count} {summary.count === 1 ? "review" : "reviews"} from our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="container-narrow py-16 md:py-20">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading reviews…
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-cream/30 py-20 text-center">
            <p className="font-display text-2xl text-moss-deep">No reviews yet.</p>
            <p className="mt-2 text-muted-foreground">Be the first to share your experience.</p>
            <Button
              onClick={() => { resetForm(); setOpen(true); }}
              className="mt-6 bg-moss text-primary-foreground hover:bg-moss-deep"
            >
              Leave the first review
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rows.map((r) => {
              const country = countryCodes.find((c) => c.iso === r.country_code);
              return (
                <article
                  key={r.id}
                  className="group flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-moss/40 hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={avatarSrc(r)}
                      alt={r.display_name}
                      width={56}
                      height={56}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover ring-2 ring-cream"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-lg text-moss-deep">{r.display_name}</p>
                      <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <span className="text-base leading-none">{flagFor(r.country_code)}</span>
                        <span>{country?.name ?? r.country_code}</span>
                        <span className="opacity-50">·</span>
                        <span>{r.year}</span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4"><StarsRead value={r.rating} /></div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{r.body}</p>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Form / Thanks dialog */}
      <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
          {thanksName ? (
            <div className="py-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
                <CheckCircle2 className="h-8 w-8 text-moss" strokeWidth={1.6} />
              </div>
              <h2 className="mt-5 font-display text-3xl text-moss-deep">
                Thanks for your review, {thanksName}!
              </h2>
              <p className="mt-3 text-muted-foreground">
                Your feedback now lives on our reviews page — and helps others on their wellness journey.
              </p>
              <div className="mt-7 flex justify-center gap-3">
                <Button variant="outline" onClick={() => { resetForm(); }}>
                  Write another
                </Button>
                <Button
                  onClick={() => { setOpen(false); resetForm(); }}
                  className="bg-moss text-primary-foreground hover:bg-moss-deep"
                >
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-moss-deep">
                  Share your experience
                </DialogTitle>
                <DialogDescription>
                  Tell us how our herbs have supported you. Takes under a minute.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={submit} className="mt-2 space-y-5">
                <div>
                  <Label className="text-xs uppercase tracking-[0.18em] text-moss">Appear as</Label>
                  <Select value={mode} onValueChange={(v) => setMode(v as "name" | "anonymous")}>
                    <SelectTrigger className="mt-2"><SelectValue placeholder="Choose how to appear" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="name">Use my name</SelectItem>
                      <SelectItem value="anonymous">Stay anonymous</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {mode === "name" && (
                  <>
                    <div>
                      <Label htmlFor="fullName" className="text-xs uppercase tracking-[0.18em] text-moss">Full name</Label>
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Adaeze Okafor"
                        maxLength={80}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label className="text-xs uppercase tracking-[0.18em] text-moss">Profile picture (optional)</Label>
                      <input
                        ref={fileInput}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                        className="hidden"
                        onChange={(e) => onPickFile(e.target.files?.[0] ?? null)}
                      />
                      <button
                        type="button"
                        onClick={() => fileInput.current?.click()}
                        className="mt-2 flex w-full items-center gap-3 rounded-md border border-dashed border-border bg-cream/30 p-3 text-left transition-colors hover:border-moss"
                      >
                        {filePreview ? (
                          <img src={filePreview} alt="" className="h-14 w-14 rounded-full object-cover" />
                        ) : (
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                            <ImagePlus className="h-5 w-5 text-muted-foreground" />
                          </span>
                        )}
                        <span className="flex-1 text-sm text-muted-foreground">
                          {file ? file.name : "Tap to upload a photo (max 5 MB)"}
                        </span>
                        <Upload className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                  </>
                )}

                {mode === "anonymous" && (
                  <div>
                    <Label className="text-xs uppercase tracking-[0.18em] text-moss">Pick an avatar</Label>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {(["female", "male"] as const).map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => setAvatarKind(k)}
                          className={`flex items-center gap-3 rounded-md border p-3 text-left transition-all ${
                            avatarKind === k ? "border-moss bg-moss/5" : "border-border hover:border-moss/40"
                          }`}
                        >
                          <img
                            src={k === "male" ? avatarMale : avatarFemale}
                            alt={k}
                            className="h-12 w-12 rounded-full object-cover"
                          />
                          <span className="text-sm capitalize">{k}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {mode && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-xs uppercase tracking-[0.18em] text-moss">Country</Label>
                        <Select value={country} onValueChange={setCountry}>
                          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                          <SelectContent className="max-h-72">
                            {countryCodes.map((c) => (
                              <SelectItem key={c.iso} value={c.iso}>
                                <span className="mr-2">{flagFor(c.iso)}</span>{c.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs uppercase tracking-[0.18em] text-moss">Year</Label>
                        <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
                          <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            {YEARS.map((y) => (<SelectItem key={y} value={String(y)}>{y}</SelectItem>))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs uppercase tracking-[0.18em] text-moss">Rating</Label>
                      <div className="mt-2"><StarPicker value={rating} onChange={setRating} /></div>
                    </div>

                    <div>
                      <Label htmlFor="body" className="text-xs uppercase tracking-[0.18em] text-moss">Your review</Label>
                      <Textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Share what changed for you…"
                        rows={5}
                        maxLength={2000}
                        className="mt-2"
                      />
                      <p className="mt-1 text-right text-xs text-muted-foreground">{body.length}/2000</p>
                    </div>

                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-moss text-primary-foreground hover:bg-moss-deep"
                      size="lg"
                    >
                      {submitting ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Posting…</>) : "Post review"}
                    </Button>
                  </>
                )}
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
