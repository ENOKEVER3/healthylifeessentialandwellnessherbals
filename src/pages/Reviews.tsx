import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import { Star, Upload, Loader2, CheckCircle2, MessageSquarePlus, ImagePlus, Filter, X, Pencil, Heart } from "lucide-react";
import { AnimatedAvatar } from "@/components/AnimatedAvatar";
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
import { Slider } from "@/components/ui/slider";
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
  edited: boolean;
};

const PAGE_SIZE = 24;
const YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);
const CURRENT_YEAR = new Date().getFullYear();
const THUMB_SIZE = 512;
const OWNED_KEY = "owned_reviews_v1";

type OwnedMap = Record<string, string>; // reviewId -> edit_token

const readOwned = (): OwnedMap => {
  try {
    return JSON.parse(localStorage.getItem(OWNED_KEY) || "{}");
  } catch {
    return {};
  }
};
const writeOwned = (m: OwnedMap) => {
  try { localStorage.setItem(OWNED_KEY, JSON.stringify(m)); } catch { /* ignore */ }
};

/* ---------- helpers ---------- */

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

/** Render an HTMLImageElement to a square JPEG Blob using a center crop + zoom. */
const cropToSquareBlob = (
  img: HTMLImageElement,
  zoom: number,
  offsetX: number,
  offsetY: number,
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = THUMB_SIZE;
    canvas.height = THUMB_SIZE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Canvas not supported"));

    // Source square = min(width, height) / zoom
    const baseSide = Math.min(img.width, img.height);
    const srcSide = baseSide / zoom;
    const cx = img.width / 2 + offsetX * (img.width - srcSide) * 0.5;
    const cy = img.height / 2 + offsetY * (img.height - srcSide) * 0.5;
    const sx = Math.max(0, Math.min(img.width - srcSide, cx - srcSide / 2));
    const sy = Math.max(0, Math.min(img.height - srcSide, cy - srcSide / 2));

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, THUMB_SIZE, THUMB_SIZE);
    ctx.drawImage(img, sx, sy, srcSide, srcSide, 0, 0, THUMB_SIZE, THUMB_SIZE);
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Failed to encode image"))),
      "image/jpeg",
      0.88,
    );
  });

/* ---------- page ---------- */

const Reviews = () => {
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [open, setOpen] = useState(false);

  // Filters
  const [filterCountry, setFilterCountry] = useState<string>("all");
  const [filterYear, setFilterYear] = useState<string>("all");
  const [filterRating, setFilterRating] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Owned reviews (id -> edit_token) for one-time edit capability
  const [owned, setOwned] = useState<OwnedMap>(() => readOwned());

  // Background music (permanent while reading reviews, paused while leaving/editing a review)
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    const audio = new Audio("/audio/reviews-bgm.mp3");
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "auto";
    bgmRef.current = audio;
    const tryPlay = () => { audio.play().catch(() => {}); };
    // Autoplay attempt (will likely be blocked until first interaction)
    tryPlay();
    const events: Array<keyof WindowEventMap> = ["pointerdown", "touchstart", "keydown", "scroll", "click"];
    const onInteract = () => { tryPlay(); };
    events.forEach((e) => window.addEventListener(e, onInteract, { passive: true }));
    return () => {
      events.forEach((e) => window.removeEventListener(e, onInteract));
      audio.pause();
      audio.src = "";
      bgmRef.current = null;
    };
  }, []);

  // Edit dialog state
  const [editing, setEditing] = useState<ReviewRow | null>(null);

  // Pause music while a review form (create or edit) is open; resume when closed
  useEffect(() => {
    const audio = bgmRef.current;
    if (!audio) return;
    if (open || !!editing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }, [open, editing]);

  const [editBody, setEditBody] = useState("");
  const [editRating, setEditRating] = useState(5);
  const [editCountry, setEditCountry] = useState("NG");
  const [editYear, setEditYear] = useState<number>(CURRENT_YEAR);
  const [savingEdit, setSavingEdit] = useState(false);

  // Form state
  const [mode, setMode] = useState<"" | "name" | "anonymous">("");
  const [fullName, setFullName] = useState("");
  const [avatarKind, setAvatarKind] = useState<"male" | "female">("female");
  const [rawImage, setRawImage] = useState<HTMLImageElement | null>(null);
  const [rawImageUrl, setRawImageUrl] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [country, setCountry] = useState("NG");
  const [year, setYear] = useState<number>(CURRENT_YEAR);
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [thanksName, setThanksName] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const previewCanvas = useRef<HTMLCanvasElement>(null);

  const buildQuery = useCallback(
    (from: number, to: number) => {
      let q = supabase
        .from("site_reviews")
        .select(
          "id, display_name, is_anonymous, avatar_kind, photo_url, country_code, year, rating, body, created_at, edited",
          { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .range(from, to);
      if (filterCountry !== "all") q = q.eq("country_code", filterCountry);
      if (filterYear !== "all") q = q.eq("year", Number(filterYear));
      if (filterRating !== "all") q = q.eq("rating", Number(filterRating));
      return q;
    },
    [filterCountry, filterYear, filterRating],
  );

  const fetchFirstPage = useCallback(async () => {
    setLoading(true);
    const { data, error, count } = await buildQuery(0, PAGE_SIZE - 1);
    if (error) toast.error("Could not load reviews");
    const list = (data ?? []) as ReviewRow[];
    setRows(list);
    setHasMore((count ?? list.length) > list.length);
    setLoading(false);
  }, [buildQuery]);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    const { data, error, count } = await buildQuery(rows.length, rows.length + PAGE_SIZE - 1);
    if (error) toast.error("Could not load more");
    const list = (data ?? []) as ReviewRow[];
    const next = [...rows, ...list];
    setRows(next);
    setHasMore((count ?? next.length) > next.length);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchFirstPage();
  }, [fetchFirstPage]);

  // Live-update preview canvas while cropping
  useEffect(() => {
    if (!rawImage || !previewCanvas.current) return;
    const canvas = previewCanvas.current;
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const baseSide = Math.min(rawImage.width, rawImage.height);
    const srcSide = baseSide / zoom;
    const cx = rawImage.width / 2 + offsetX * (rawImage.width - srcSide) * 0.5;
    const cy = rawImage.height / 2 + offsetY * (rawImage.height - srcSide) * 0.5;
    const sx = Math.max(0, Math.min(rawImage.width - srcSide, cx - srcSide / 2));
    const sy = Math.max(0, Math.min(rawImage.height - srcSide, cy - srcSide / 2));
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 256, 256);
    ctx.drawImage(rawImage, sx, sy, srcSide, srcSide, 0, 0, 256, 256);
  }, [rawImage, zoom, offsetX, offsetY]);

  const summary = useMemo(() => {
    if (rows.length === 0) return { avg: 0, count: 0 };
    const avg = rows.reduce((a, r) => a + r.rating, 0) / rows.length;
    return { avg, count: rows.length };
  }, [rows]);

  const openEdit = (r: ReviewRow) => {
    setEditing(r);
    setEditBody(r.body);
    setEditRating(r.rating);
    setEditCountry(r.country_code);
    setEditYear(r.year);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;
    const token = owned[editing.id];
    if (!token) return toast.error("Edit link expired on this device");
    if (editBody.trim().length < 3) return toast.error("Please write a short review");
    setSavingEdit(true);
    try {
      const { data, error } = await supabase.rpc("update_review", {
        p_id: editing.id,
        p_token: token,
        p_body: editBody.trim().slice(0, 2000),
        p_rating: editRating,
        p_country: editCountry,
        p_year: editYear,
      });
      if (error) throw error;
      if (!data) {
        toast.error("This review has already been edited.");
      } else {
        toast.success("Review updated");
        setRows((prev) =>
          prev.map((r) =>
            r.id === editing.id
              ? { ...r, body: editBody.trim(), rating: editRating, country_code: editCountry, year: editYear, edited: true }
              : r,
          ),
        );
      }
      setEditing(null);
    } catch (err) {
      console.error(err);
      toast.error("Could not save changes");
    } finally {
      setSavingEdit(false);
    }
  };


  const resetForm = () => {
    setMode("");
    setFullName("");
    setAvatarKind("female");
    if (rawImageUrl) URL.revokeObjectURL(rawImageUrl);
    setRawImage(null);
    setRawImageUrl(null);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setCountry("NG");
    setYear(CURRENT_YEAR);
    setRating(5);
    setBody("");
    setThanksName(null);
  };

  const onPickFile = (f: File | null) => {
    if (rawImageUrl) URL.revokeObjectURL(rawImageUrl);
    if (!f) {
      setRawImage(null);
      setRawImageUrl(null);
      return;
    }
    if (f.size > 8 * 1024 * 1024) {
      toast.error("Image is too large (max 8 MB)");
      return;
    }
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      setRawImage(img);
      setRawImageUrl(url);
      setZoom(1);
      setOffsetX(0);
      setOffsetY(0);
    };
    img.onerror = () => toast.error("Could not read image");
    img.src = url;
  };

  const clearFilters = () => {
    setFilterCountry("all");
    setFilterYear("all");
    setFilterRating("all");
  };

  const filtersActive = filterCountry !== "all" || filterYear !== "all" || filterRating !== "all";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mode) return toast.error("Choose how you'd like to appear");
    if (mode === "name" && fullName.trim().length < 2) return toast.error("Please enter your full name");
    if (body.trim().length < 3) return toast.error("Please write a short review");
    if (!country) return toast.error("Pick your country");

    setSubmitting(true);
    try {
      let photo_url: string | null = null;
      if (mode === "name" && rawImage) {
        const blob = await cropToSquareBlob(rawImage, zoom, offsetX, offsetY);
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.jpg`;
        const up = await supabase.storage.from("review-photos").upload(path, blob, {
          contentType: "image/jpeg",
          upsert: false,
        });
        if (up.error) throw up.error;
        photo_url = supabase.storage.from("review-photos").getPublicUrl(up.data.path).data.publicUrl;
      }

      const display_name =
        mode === "anonymous" ? "Anonymous" : fullName.trim().slice(0, 80);

      const { data: inserted, error } = await supabase.rpc("create_review", {
        p_display_name: display_name,
        p_is_anonymous: mode === "anonymous",
        p_avatar_kind: mode === "anonymous" ? avatarKind : null,
        p_photo_url: photo_url,
        p_country: country,
        p_year: year,
        p_rating: rating,
        p_body: body.trim().slice(0, 2000),
      });
      if (error) throw error;
      const row = Array.isArray(inserted) ? inserted[0] : inserted;

      // Remember this review locally so the user can edit it once.
      if (row?.id && row?.edit_token) {
        const next = { ...readOwned(), [row.id as string]: row.edit_token as string };
        writeOwned(next);
        setOwned(next);
      }

      const first = mode === "anonymous" ? "friend" : fullName.trim().split(" ")[0];
      setThanksName(first);
      // Reset filters so the new review is visible
      clearFilters();
      fetchFirstPage();
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
        <div className="container-narrow py-12 md:py-24">
          <div className="grid gap-8 md:grid-cols-[1.4fr,1fr] md:items-end md:gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-ochre">Community voices</p>
              <h1 className="mt-3 font-display text-4xl leading-[1.05] text-moss-deep md:mt-4 md:text-6xl">
                Reviews from our wellness family.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Honest reflections from women and men around the world who've welcomed our herbal rituals into their daily life.
              </p>
              <Button
                size="lg"
                onClick={() => { resetForm(); setOpen(true); }}
                className="mt-7 bg-moss text-primary-foreground hover:bg-moss-deep"
              >
                <MessageSquarePlus className="mr-2 h-4 w-4" /> Leave a review
              </Button>
            </div>
            <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur md:p-8">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl text-moss-deep md:text-6xl">
                  {summary.count > 0 ? summary.avg.toFixed(1) : "—"}
                </span>
                <span className="text-sm text-muted-foreground">/ 5</span>
              </div>
              <div className="mt-2"><StarsRead value={Math.round(summary.avg)} /></div>
              <p className="mt-3 text-sm text-muted-foreground">
                Showing {rows.length} {rows.length === 1 ? "review" : "reviews"}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="container-narrow pt-10">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters((v) => !v)}
            className="gap-2"
          >
            <Filter className="h-3.5 w-3.5" /> Filters
            {filtersActive && (
              <span className="ml-1 rounded-full bg-moss px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                on
              </span>
            )}
          </Button>
          {filtersActive && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
              <X className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>

        {showFilters && (
          <div className="mt-4 grid gap-3 rounded-xl border border-border bg-cream/30 p-4 sm:grid-cols-3">
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-moss">Country</Label>
              <Select value={filterCountry} onValueChange={setFilterCountry}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent className="max-h-72">
                  <SelectItem value="all">All countries</SelectItem>
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
              <Select value={filterYear} onValueChange={setFilterYear}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All years</SelectItem>
                  {YEARS.map((y) => (<SelectItem key={y} value={String(y)}>{y}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-moss">Rating</Label>
              <Select value={filterRating} onValueChange={setFilterRating}>
                <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All ratings</SelectItem>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <SelectItem key={r} value={String(r)}>
                      {"★".repeat(r)}{"☆".repeat(5 - r)} ({r})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </section>

      {/* Reviews grid */}
      <section className="container-narrow py-10 md:py-16">
        {loading ? (
          <div className="flex items-center justify-center py-20 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading reviews…
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-cream/30 py-20 text-center">
            <p className="font-display text-2xl text-moss-deep">
              {filtersActive ? "No reviews match those filters." : "No reviews yet."}
            </p>
            <p className="mt-2 text-muted-foreground">
              {filtersActive ? "Try clearing filters." : "Be the first to share your experience."}
            </p>
            <Button
              onClick={() => { filtersActive ? clearFilters() : (resetForm(), setOpen(true)); }}
              className="mt-6 bg-moss text-primary-foreground hover:bg-moss-deep"
            >
              {filtersActive ? "Clear filters" : "Leave the first review"}
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map((r) => {
                const country = countryCodes.find((c) => c.iso === r.country_code);
                const canEdit = !!owned[r.id] && !r.edited;
                return (
                  <article
                    key={r.id}
                    className="group relative flex flex-col rounded-2xl border border-border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-moss/40 hover:shadow-lg"
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
                          <span className="truncate">{country?.name ?? r.country_code}</span>
                          <span className="opacity-50">·</span>
                          <span>{r.year}</span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <StarsRead value={r.rating} />
                      {r.edited && (
                        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          edited
                        </span>
                      )}
                    </div>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">{r.body}</p>
                    {canEdit && (
                      <button
                        type="button"
                        onClick={() => openEdit(r)}
                        className="mt-4 inline-flex items-center gap-1.5 self-start text-xs font-medium text-moss hover:text-moss-deep"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit your review
                      </button>
                    )}
                  </article>
                );
              })}
            </div>

            {hasMore && (
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="min-w-44"
                >
                  {loadingMore ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading…</>) : "Load more reviews"}
                </Button>
              </div>
            )}
          </>
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
                      {!rawImage ? (
                        <button
                          type="button"
                          onClick={() => fileInput.current?.click()}
                          className="mt-2 flex w-full items-center gap-3 rounded-md border border-dashed border-border bg-cream/30 p-3 text-left transition-colors hover:border-moss"
                        >
                          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                            <ImagePlus className="h-5 w-5 text-muted-foreground" />
                          </span>
                          <span className="flex-1 text-sm text-muted-foreground">
                            Tap to upload a photo (max 8 MB)
                          </span>
                          <Upload className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ) : (
                        <div className="mt-2 rounded-lg border border-border bg-cream/30 p-4">
                          <div className="flex items-start gap-4">
                            <canvas
                              ref={previewCanvas}
                              className="h-24 w-24 rounded-full border border-border bg-background object-cover"
                              style={{ imageRendering: "auto" }}
                            />
                            <div className="flex-1 space-y-3">
                              <div>
                                <Label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Zoom</Label>
                                <Slider
                                  value={[zoom]}
                                  min={1}
                                  max={3}
                                  step={0.05}
                                  onValueChange={(v) => setZoom(v[0])}
                                  className="mt-1.5"
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Horizontal</Label>
                                  <Slider
                                    value={[offsetX]}
                                    min={-1}
                                    max={1}
                                    step={0.02}
                                    onValueChange={(v) => setOffsetX(v[0])}
                                    className="mt-1.5"
                                  />
                                </div>
                                <div>
                                  <Label className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Vertical</Label>
                                  <Slider
                                    value={[offsetY]}
                                    min={-1}
                                    max={1}
                                    step={0.02}
                                    onValueChange={(v) => setOffsetY(v[0])}
                                    className="mt-1.5"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => fileInput.current?.click()}
                            >
                              Change photo
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => onPickFile(null)}
                            >
                              Remove
                            </Button>
                            <p className="ml-auto self-center text-[11px] text-muted-foreground">
                              Cropped to a square thumbnail
                            </p>
                          </div>
                        </div>
                      )}
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

      {/* Edit dialog (one-time edit) */}
      <Dialog open={!!editing} onOpenChange={(v) => { if (!v) setEditing(null); }}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-moss-deep">Edit your review</DialogTitle>
            <DialogDescription>
              You can update your review once. After saving, it can't be changed again.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={saveEdit} className="mt-2 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs uppercase tracking-[0.18em] text-moss">Country</Label>
                <Select value={editCountry} onValueChange={setEditCountry}>
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
                <Select value={String(editYear)} onValueChange={(v) => setEditYear(Number(v))}>
                  <SelectTrigger className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {YEARS.map((y) => (<SelectItem key={y} value={String(y)}>{y}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-moss">Rating</Label>
              <div className="mt-2"><StarPicker value={editRating} onChange={setEditRating} /></div>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-[0.18em] text-moss">Your review</Label>
              <Textarea
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                rows={5}
                maxLength={2000}
                className="mt-2"
              />
              <p className="mt-1 text-right text-xs text-muted-foreground">{editBody.length}/2000</p>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditing(null)} disabled={savingEdit}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={savingEdit}
                className="bg-moss text-primary-foreground hover:bg-moss-deep"
              >
                {savingEdit ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving…</>) : "Save changes"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Reviews;
