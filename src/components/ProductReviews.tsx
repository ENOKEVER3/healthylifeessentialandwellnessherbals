import { CheckCircle2 } from "lucide-react";
import { Stars } from "@/components/Stars";
import { getReviews, getReviewSummary } from "@/data/reviews";
import { useLanguage } from "@/i18n/LanguageContext";

export const ProductReviews = ({ slug }: { slug: string }) => {
  const { t } = useLanguage();
  const reviews = getReviews(slug);
  const summary = getReviewSummary(slug);

  if (reviews.length === 0) {
    return (
      <section className="mt-20 border-t border-border pt-14">
        <h2 className="font-display text-3xl text-moss-deep">{t("reviews_title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("reviews_none")}</p>
      </section>
    );
  }

  const maxBar = Math.max(...summary.distribution);

  return (
    <section className="mt-20 border-t border-border pt-14">
      <div className="mb-12 grid gap-10 md:grid-cols-[1fr,1.4fr] md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-ochre">{t("reviews_from_community")}</p>
          <h2 className="mt-3 font-display text-4xl text-moss-deep">{t("reviews_title")}</h2>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-5xl text-moss-deep">{summary.average.toFixed(1)}</span>
            <span className="text-sm text-muted-foreground">{t("reviews_out_of")}</span>
          </div>
          <Stars value={summary.average} size={18} className="mt-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            {t("reviews_based_on")} {summary.count} {summary.count === 1 ? t("reviews_verified_ritual") : t("reviews_verified_rituals")}
          </p>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star, idx) => {
            const count = summary.distribution[idx];
            const width = maxBar > 0 ? (count / maxBar) * 100 : 0;
            return (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-6 text-muted-foreground tabular-nums">{star}★</span>
                <div className="h-1.5 flex-1 overflow-hidden bg-muted">
                  <div className="h-full bg-moss transition-all" style={{ width: `${width}%` }} />
                </div>
                <span className="w-6 text-right text-muted-foreground tabular-nums">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <ul className="space-y-10">
        {reviews.map((r) => (
          <li key={r.id} className="grid gap-4 border-t border-border pt-8 md:grid-cols-[180px,1fr] md:gap-10">
            <div className="text-sm">
              <p className="font-display text-lg text-moss-deep">{r.author}</p>
              <p className="text-muted-foreground">{r.location}</p>
              <p className="mt-1 text-xs text-muted-foreground">{r.date}</p>
              {r.verified && (
                <p className="mt-2 inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.16em] text-moss">
                  <CheckCircle2 className="h-3 w-3" strokeWidth={1.6} /> {t("reviews_verified")}
                </p>
              )}
            </div>
            <div>
              <Stars value={r.rating} />
              <h3 className="mt-3 font-display text-xl text-moss-deep">{r.title}</h3>
              <p className="mt-2 leading-relaxed text-foreground/80">{r.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
