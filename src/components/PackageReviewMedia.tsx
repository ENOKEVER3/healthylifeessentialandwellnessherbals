import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ImagePlus, Loader2, MapPin, Play, Send, X } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { countryCodes, flagFor } from "@/data/countryCodes";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const featuredReviewVideo = "/patient-package-review.mp4";
const featuredReviewPoster = "/patient-package-review-poster.jpg";

type MediaReview = {
  id: string;
  display_name: string;
  media_path: string;
  media_type: "image" | "video";
  country_code: string;
  state_region: string;
  caption: string | null;
  created_at: string;
  media_url: string;
};

const uploadSchema = z.object({
  displayName: z.string().trim().max(80).default("Anonymous"),
  country: z.string().regex(/^[A-Z]{2}$/),
  stateRegion: z.string().trim().min(1, "Add your state, region, or city.").max(120),
  caption: z.string().trim().max(600),
});

const safeFileName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-100) || "review-media";

const locationLabel = (countryCode: string, stateRegion: string) => {
  const country = countryCodes.find((item) => item.iso === countryCode);
  return `${flagFor(countryCode)} ${stateRegion}, ${country?.name ?? countryCode}`;
};

const PackageReviewMedia = () => {
  const [reviews, setReviews] = useState<MediaReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [country, setCountry] = useState("NG");
  const [stateRegion, setStateRegion] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const loadApprovedReviews = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("package_reviews")
      .select("id, display_name, media_path, media_type, country_code, state_region, caption, created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(24);

    if (error || !data || data.length === 0) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const paths = data.map((review) => review.media_path);
    const { data: signed, error: signError } = await supabase.functions.invoke("sign-package-review-media", {
      body: { paths },
    });
    if (signError || !signed?.urls) {
      setReviews([]);
      setLoading(false);
      return;
    }

    const urlByPath = signed.urls as Record<string, string>;
    setReviews(
      data
        .map((review) => ({ ...review, media_url: urlByPath[review.media_path] }))
        .filter((review): review is MediaReview => Boolean(review.media_url)),
    );
    setLoading(false);
  };

  useEffect(() => {
    void loadApprovedReviews();
  }, []);

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const clearFile = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    setFile(null);
    if (fileInput.current) fileInput.current.value = "";
  };

  const chooseFile = (nextFile: File | null) => {
    if (!nextFile) return;
    const isImage = nextFile.type.startsWith("image/");
    const isVideo = nextFile.type.startsWith("video/");
    const allowedVideo = ["video/mp4", "video/webm", "video/quicktime"].includes(nextFile.type);
    const allowedImage = ["image/jpeg", "image/png", "image/webp"].includes(nextFile.type);
    if ((!isImage && !isVideo) || (isImage && !allowedImage) || (isVideo && !allowedVideo)) {
      toast.error("Please choose a JPG, PNG, WebP, MP4, WebM, or MOV file.");
      return;
    }
    const maxBytes = isVideo ? 50 * 1024 * 1024 : 8 * 1024 * 1024;
    if (nextFile.size > maxBytes) {
      toast.error(isVideo ? "Videos must be 50 MB or smaller." : "Images must be 8 MB or smaller.");
      return;
    }
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
  };

  const resetForm = () => {
    setDisplayName("");
    setCountry("NG");
    setStateRegion("");
    setCaption("");
    clearFile();
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return toast.error("Add a photo or video of your package first.");
    const parsed = uploadSchema.safeParse({ displayName: displayName || "Anonymous", country, stateRegion, caption });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Check the location details.");
      return;
    }

    setUploading(true);
    try {
      const mediaType = file.type.startsWith("video/") ? "video" : "image";
      const path = `submissions/${crypto.randomUUID()}-${safeFileName(file.name)}`;
      const upload = await supabase.storage.from("review-media").upload(path, file, {
        contentType: file.type,
        upsert: false,
      });
      if (upload.error) throw upload.error;

      const { error } = await supabase.from("package_reviews").insert({
        display_name: parsed.data.displayName || "Anonymous",
        media_type: mediaType,
        media_path: path,
        country_code: parsed.data.country,
        state_region: parsed.data.stateRegion,
        caption: parsed.data.caption || null,
        status: "pending",
      });
      if (error) throw error;

      setSubmitted(true);
      resetForm();
    } catch (error) {
      console.error("Package review upload failed", error);
      toast.error("We couldn’t send your review. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="border-y border-border/60 bg-secondary/20">
      <div className="container-narrow py-14 md:py-20">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.28em] text-ochre">Package moments</p>
          <h2 className="mt-3 font-display text-3xl leading-tight text-moss-deep md:text-5xl">Real parcels. Real places.</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            See customers sharing what arrived at their door, then add your own photo or video with your country and state.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr,0.85fr]">
          <article className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className="relative aspect-[9/14] max-h-[680px] bg-foreground/5 sm:aspect-video lg:aspect-[9/12]">
              <video
                className="h-full w-full object-cover"
                controls
                playsInline
                preload="metadata"
                poster={featuredReviewPoster}
                src={featuredReviewVideo}
              />
              <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/85 px-3 py-1.5 text-xs font-medium text-foreground backdrop-blur">
                <Play className="h-3.5 w-3.5 fill-current text-moss" /> Featured video review
              </div>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-xl text-moss-deep">Package received in the UK</p>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 text-moss" /> {locationLabel("GB", "Hendon, Sunderland")}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-moss/10 px-2.5 py-1 text-xs font-medium text-moss-deep">Customer video</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">A customer shared their Healthy Life Essentials package after delivery.</p>
            </div>
          </article>

          <div className="rounded-2xl border border-border bg-background p-5 md:p-7">
            {submitted ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-moss/10">
                  <CheckCircle2 className="h-8 w-8 text-moss" />
                </div>
                <h3 className="mt-5 font-display text-3xl text-moss-deep">Thank you for sharing.</h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">Your photo or video is waiting for a quick review before it appears publicly.</p>
                <Button type="button" variant="outline" className="mt-7" onClick={() => setSubmitted(false)}>Share another</Button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <p className="font-display text-2xl text-moss-deep">Show what arrived</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Uploads are checked before publication. Please avoid showing private addresses or personal documents.</p>
                </div>

                <input
                  ref={fileInput}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm,video/quicktime"
                  className="hidden"
                  onChange={(event) => chooseFile(event.target.files?.[0] ?? null)}
                />
                {file && previewUrl ? (
                  <div className="relative overflow-hidden rounded-xl border border-border bg-secondary/20">
                    {file.type.startsWith("video/") ? (
                      <video className="max-h-56 w-full object-cover" controls playsInline src={previewUrl} />
                    ) : (
                      <img className="max-h-56 w-full object-cover" src={previewUrl} alt="Selected package review" />
                    )}
                    <Button type="button" variant="outline" size="icon" className="absolute right-2 top-2 bg-background/90" onClick={clearFile} aria-label="Remove selected media">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <button type="button" onClick={() => fileInput.current?.click()} className="flex min-h-36 w-full flex-col items-center justify-center rounded-xl border border-dashed border-moss/40 bg-moss/5 px-5 text-center transition-colors hover:border-moss hover:bg-moss/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background text-moss shadow-sm"><ImagePlus className="h-5 w-5" /></div>
                    <span className="mt-3 text-sm font-medium text-moss-deep">Add a package photo or video</span>
                    <span className="mt-1 text-xs text-muted-foreground">Images up to 8 MB · videos up to 50 MB</span>
                  </button>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="package-review-name" className="text-xs uppercase tracking-[0.18em] text-moss">Name (optional)</Label>
                    <Input id="package-review-name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} placeholder="Anonymous" maxLength={80} className="mt-2" />
                  </div>
                  <div>
                    <Label htmlFor="package-review-country" className="text-xs uppercase tracking-[0.18em] text-moss">Country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger id="package-review-country" className="mt-2"><SelectValue /></SelectTrigger>
                      <SelectContent className="max-h-72">
                        {countryCodes.map((item) => <SelectItem key={item.iso} value={item.iso}><span className="mr-2">{flagFor(item.iso)}</span>{item.name}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="package-review-region" className="text-xs uppercase tracking-[0.18em] text-moss">State, region, or city</Label>
                  <Input id="package-review-region" value={stateRegion} onChange={(event) => setStateRegion(event.target.value)} placeholder="e.g. Lagos or Sunderland" maxLength={120} className="mt-2" required />
                </div>

                <div>
                  <Label htmlFor="package-review-caption" className="text-xs uppercase tracking-[0.18em] text-moss">Short note (optional)</Label>
                  <Textarea id="package-review-caption" value={caption} onChange={(event) => setCaption(event.target.value)} placeholder="What did you receive?" maxLength={600} rows={3} className="mt-2" />
                </div>

                <Button type="submit" size="lg" disabled={uploading} className="w-full bg-moss text-primary-foreground hover:bg-moss-deep">
                  {uploading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…</> : <><Send className="mr-2 h-4 w-4" /> Submit package review</>}
                </Button>
              </form>
            )}
          </div>
        </div>

        {!loading && reviews.length > 0 && (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="overflow-hidden rounded-2xl border border-border bg-background">
                <div className="aspect-[4/3] bg-secondary/20">
                  {review.media_type === "video" ? <video className="h-full w-full object-cover" controls playsInline preload="metadata" src={review.media_url} /> : <img className="h-full w-full object-cover" src={review.media_url} alt={`${review.display_name}'s package review`} loading="lazy" />}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-moss-deep">{review.display_name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{locationLabel(review.country_code, review.state_region)}</p>
                  {review.caption && <p className="mt-3 text-sm leading-relaxed text-foreground/80">{review.caption}</p>}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PackageReviewMedia;