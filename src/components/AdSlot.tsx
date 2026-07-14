import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT_ID, getConsent, subscribeConsent, loadAdsScript } from "@/lib/consent";
import { trackAdEvent } from "@/lib/adAnalytics";
import { removeAdSlot, reportAdSlot } from "@/lib/adDebug";

type AdSlotProps = {
  /** AdSense ad slot ID (from your AdSense dashboard). */
  slot?: string;
  /** Ad format — "auto" for responsive display units. */
  format?: string;
  /** Enable full-width responsive behaviour. */
  responsive?: boolean;
  /** Extra wrapper classes for spacing/layout. */
  className?: string;
  /** Accessible label; screen readers announce this region. */
  label?: string;
  /** Fixed min height to reserve space and avoid CLS. */
  minHeight?: number;
  /** Placement key used for engagement analytics (e.g. "reviews-top"). */
  placement: string;
  /** In-feed layout key from AdSense (required when format="fluid"). */
  layoutKey?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Accessible, consent-gated, lazily loaded AdSense slot with engagement tracking.
 * - Mounts the ad only when the container scrolls into view (IntersectionObserver).
 * - Requires "accepted" cookie consent — otherwise renders nothing.
 * - Logs a "view" event on first in-view and a "click" event on pointerdown, per placement,
 *   so you can compare which section drives the most engagement. Never tracks anything
 *   inside the AdSense iframe itself (Google policy) — only the outer container region.
 * - aria-hidden on the ad container prevents keyboard focus traps for screen reader users.
 */
export const AdSlot = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  label = "Advertisement",
  minHeight = 120,
  placement,
  layoutKey,
}: AdSlotProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pushedRef = useRef(false);
  const viewLoggedRef = useRef(false);
  const clickLoggedRef = useRef(false);
  const [consent, setConsentState] = useState(getConsent());
  const [inView, setInView] = useState(false);

  useEffect(() => subscribeConsent(setConsentState), []);

  // Register with the admin debug store on mount; clean up on unmount.
  useEffect(() => {
    reportAdSlot(placement, { slot, inView: false, pushed: false, filled: false });
    return () => removeAdSlot(placement);
  }, [placement, slot]);

  // Lazy reveal + one-time "view" event when the slot enters the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            reportAdSlot(placement, { inView: true });
            if (!viewLoggedRef.current && consent === "accepted") {
              viewLoggedRef.current = true;
              trackAdEvent(placement, "view");
            }
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, consent, placement]);

  // Push the ad request once script + consent + in-view are all true.
  useEffect(() => {
    if (consent !== "accepted" || !inView || pushedRef.current) return;
    let cancelled = false;
    loadAdsScript().then(() => {
      if (cancelled || pushedRef.current) return;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
        reportAdSlot(placement, { pushed: true });

        // Watch for Google to actually fill the slot (iframe appears).
        const wrap = wrapRef.current;
        if (wrap) {
          const check = () => {
            const filled = !!wrap.querySelector("ins.adsbygoogle iframe");
            if (filled) {
              reportAdSlot(placement, { filled: true });
              return true;
            }
            return false;
          };
          if (!check()) {
            const started = Date.now();
            const iv = window.setInterval(() => {
              if (check() || Date.now() - started > 8000) {
                window.clearInterval(iv);
              }
            }, 500);
          }
        }
      } catch (e) {
        reportAdSlot(placement, {
          error: e instanceof Error ? e.message : String(e),
        });
      }
    });
    return () => { cancelled = true; };
  }, [consent, inView, placement]);

  // Track clicks on the outer container (never the iframe itself).
  // De-duped per mount so a user rage-click doesn't inflate numbers.
  const handlePointerDown = () => {
    if (clickLoggedRef.current || consent !== "accepted") return;
    clickLoggedRef.current = true;
    trackAdEvent(placement, "click");
    // allow re-tracking after a cool-down so a return visit can log again
    window.setTimeout(() => { clickLoggedRef.current = false; }, 30_000);
  };

  if (consent !== "accepted") return null;

  return (
    <aside
      ref={wrapRef}
      role="complementary"
      aria-label={label}
      data-ad-placement={placement}
      className={`my-8 flex w-full justify-center ${className}`}
      style={{ minHeight }}
      onPointerDown={handlePointerDown}
    >
      <div
        aria-hidden="true"
        className="w-full max-w-3xl overflow-hidden rounded-lg border border-dashed border-border/60 bg-cream/20"
      >
        {inView && slot ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slot}
            data-ad-format={format}
            {...(layoutKey ? { "data-ad-layout-key": layoutKey } : {})}
            data-full-width-responsive={responsive ? "true" : "false"}
          />
        ) : (
          <div
            className="flex items-center justify-center text-xs uppercase tracking-[0.24em] text-muted-foreground/60"
            style={{ minHeight }}
          >
            Advertisement
          </div>
        )}
      </div>
    </aside>
  );
};
