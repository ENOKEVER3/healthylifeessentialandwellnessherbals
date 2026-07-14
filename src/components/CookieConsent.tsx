import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getConsent, setConsent, loadAdsScript, type ConsentValue } from "@/lib/consent";

/**
 * GDPR/CCPA-friendly cookie consent banner.
 * - Blocks AdSense (and any analytics) until the user accepts.
 * - Persists choice in localStorage; can be reopened via "Cookie preferences" in the footer.
 * - Keyboard accessible; announced to assistive tech via role="dialog".
 */
export const CookieConsent = () => {
  const [state, setState] = useState<ConsentValue>("unset");

  useEffect(() => {
    const v = getConsent();
    setState(v);
    if (v === "accepted") {
      // Reload ads script for returning visitors who already opted in.
      loadAdsScript();
    }
    const onReopen = () => setState("unset");
    window.addEventListener("hle:open-cookie-consent", onReopen);
    return () => window.removeEventListener("hle:open-cookie-consent", onReopen);
  }, []);

  if (state !== "unset") return null;

  const accept = () => { setConsent("accepted"); setState("accepted"); };
  const reject = () => { setConsent("rejected"); setState("rejected"); };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur md:inset-x-auto md:right-4 md:left-4 md:p-5"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <div className="flex-1">
          <p id="cookie-consent-title" className="font-display text-base text-moss-deep">
            We value your privacy
          </p>
          <p id="cookie-consent-desc" className="mt-1 text-sm text-muted-foreground">
            We use cookies to show relevant ads (Google AdSense) and understand site usage.
            You can accept, reject, or read our{" "}
            <Link to="/about" className="underline underline-offset-2">privacy notice</Link>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:flex-nowrap">
          <Button variant="outline" size="sm" onClick={reject} aria-label="Reject non-essential cookies">
            Reject
          </Button>
          <Button size="sm" onClick={accept} aria-label="Accept all cookies">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export const openCookieConsent = () => {
  try { localStorage.removeItem("hle_cookie_consent_v1"); } catch { /* ignore */ }
  window.dispatchEvent(new Event("hle:open-cookie-consent"));
};
