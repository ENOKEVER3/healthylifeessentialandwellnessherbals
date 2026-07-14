import { useEffect, useState } from "react";
import { getConsent, subscribeConsent, ADSENSE_CLIENT_ID } from "@/lib/consent";
import {
  subscribeAdSlots,
  isDebugEnabled,
  type AdSlotStatus,
} from "@/lib/adDebug";

/**
 * Admin-only diagnostic overlay.
 * Enable by visiting any page with ?debug=1 (persists via localStorage).
 * Disable with ?debug=0.
 *
 * Shows:
 *  - Cookie consent state (drives whether ads can load at all)
 *  - Whether the AdSense script tag is present on the page
 *  - Each registered AdSlot: in-view, pushed to adsbygoogle, filled (iframe rendered), errors
 */
export const AdDebugPanel = () => {
  const [enabled, setEnabled] = useState(false);
  const [consent, setConsent] = useState(getConsent());
  const [slots, setSlots] = useState<Record<string, AdSlotStatus>>({});
  const [scriptPresent, setScriptPresent] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setEnabled(isDebugEnabled());
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const unsubConsent = subscribeConsent(setConsent);
    const unsubSlots = subscribeAdSlots(setSlots);
    const check = () => {
      setScriptPresent(!!document.querySelector('script[data-adsense="hle"]'));
    };
    check();
    const iv = window.setInterval(check, 1500);
    return () => {
      unsubConsent();
      unsubSlots();
      window.clearInterval(iv);
    };
  }, [enabled]);

  if (!enabled) return null;

  const rows = Object.values(slots).sort((a, b) =>
    a.placement.localeCompare(b.placement),
  );

  return (
    <div
      role="region"
      aria-label="Ad diagnostics (admin)"
      className="fixed bottom-4 right-4 z-[60] w-[320px] max-w-[calc(100vw-2rem)] rounded-lg border border-border/70 bg-background/95 p-3 text-xs shadow-lg backdrop-blur"
    >
      <div className="flex items-center justify-between gap-2">
        <strong className="text-sm">Ad diagnostics</strong>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide hover:bg-muted"
          >
            {collapsed ? "Show" : "Hide"}
          </button>
          <button
            type="button"
            onClick={() => {
              try { localStorage.removeItem("hle_admin_debug_v1"); } catch { /* noop */ }
              setEnabled(false);
            }}
            className="rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-wide hover:bg-muted"
            aria-label="Close debug panel"
          >
            Close
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="mt-2 space-y-2">
          <div className="grid grid-cols-2 gap-1">
            <span className="text-muted-foreground">Consent</span>
            <span className={consent === "accepted" ? "text-emerald-600" : "text-amber-600"}>
              {consent}
            </span>
            <span className="text-muted-foreground">AdSense script</span>
            <span className={scriptPresent ? "text-emerald-600" : "text-muted-foreground"}>
              {scriptPresent ? "loaded" : "not loaded"}
            </span>
            <span className="text-muted-foreground">Client</span>
            <span className="truncate font-mono">{ADSENSE_CLIENT_ID}</span>
          </div>

          <div className="border-t border-border/60 pt-2">
            <div className="mb-1 font-semibold">Slots ({rows.length})</div>
            {rows.length === 0 ? (
              <p className="text-muted-foreground">
                No AdSlots on this page.
              </p>
            ) : (
              <ul className="space-y-1.5">
                {rows.map((s) => {
                  const status = s.error
                    ? { label: "error", cls: "text-destructive" }
                    : s.filled
                      ? { label: "filled", cls: "text-emerald-600" }
                      : s.pushed
                        ? { label: "pushed", cls: "text-sky-600" }
                        : s.inView
                          ? { label: "in view", cls: "text-amber-600" }
                          : { label: "waiting", cls: "text-muted-foreground" };
                  return (
                    <li
                      key={s.placement}
                      className="rounded border border-border/60 bg-muted/30 p-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono">{s.placement}</span>
                        <span className={status.cls}>{status.label}</span>
                      </div>
                      <div className="mt-0.5 flex flex-wrap gap-x-2 text-[10px] text-muted-foreground">
                        <span>slot: {s.slot ?? "—"}</span>
                        <span>inView: {String(s.inView)}</span>
                        <span>pushed: {String(s.pushed)}</span>
                        <span>filled: {String(s.filled)}</span>
                      </div>
                      {s.error && (
                        <div className="mt-0.5 text-[10px] text-destructive">
                          {s.error}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <p className="text-[10px] text-muted-foreground">
            Toggle with <code>?debug=1</code> / <code>?debug=0</code>.
          </p>
        </div>
      )}
    </div>
  );
};
