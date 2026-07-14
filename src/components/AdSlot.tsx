import { useEffect, useRef, useState } from "react";
import { ADSENSE_CLIENT_ID, getConsent, subscribeConsent, loadAdsScript } from "@/lib/consent";

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
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Accessible, consent-gated, lazily loaded AdSense slot.
 * - Only mounts the ad when the container scrolls into view (IntersectionObserver).
 * - Requires "accepted" cookie consent — otherwise renders nothing (no focus trap, no aria noise).
 * - Uses aria-label + role="complementary" so screen reader users can skip past it.
 * - Marks the ad container aria-hidden so keyboard/screen-reader focus is never trapped inside third-party iframes.
 */
export const AdSlot = ({
  slot,
  format = "auto",
  responsive = true,
  className = "",
  label = "Advertisement",
  minHeight = 120,
}: AdSlotProps) => {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const pushedRef = useRef(false);
  const [consent, setConsentState] = useState(getConsent());
  const [inView, setInView] = useState(false);

  useEffect(() => subscribeConsent(setConsentState), []);

  // Lazy: only reveal when the placeholder enters the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // Push the ad request once script + consent + in-view are all true.
  useEffect(() => {
    if (consent !== "accepted" || !inView || pushedRef.current) return;
    let cancelled = false;
    loadAdsScript().then(() => {
      if (cancelled || pushedRef.current) return;
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushedRef.current = true;
      } catch {
        /* ignore adsbygoogle errors — fail silently, don't break the page */
      }
    });
    return () => { cancelled = true; };
  }, [consent, inView]);

  if (consent !== "accepted") {
    // Render nothing until consent is granted — no placeholder, no iframe, no tracker.
    return null;
  }

  return (
    <aside
      ref={wrapRef}
      role="complementary"
      aria-label={label}
      className={`my-8 flex w-full justify-center ${className}`}
      style={{ minHeight }}
    >
      <div
        aria-hidden="true"
        className="w-full max-w-3xl overflow-hidden rounded-lg border border-dashed border-border/60 bg-cream/20"
        // aria-hidden + tabIndex removed = ad iframe cannot receive keyboard focus from tab order,
        // preventing focus traps for screen reader users.
      >
        {inView && slot ? (
          <ins
            className="adsbygoogle"
            style={{ display: "block", minHeight }}
            data-ad-client={ADSENSE_CLIENT_ID}
            data-ad-slot={slot}
            data-ad-format={format}
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
