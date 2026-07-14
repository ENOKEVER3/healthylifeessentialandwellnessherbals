/**
 * Lightweight cookie-consent store used to gate AdSense and analytics.
 * GDPR/CCPA-friendly: nothing loads until the visitor accepts.
 */
export type ConsentValue = "accepted" | "rejected" | "unset";

const KEY = "hle_cookie_consent_v1";
const ADSENSE_CLIENT = "ca-pub-8599744858382900";

type Listener = (v: ConsentValue) => void;
const listeners = new Set<Listener>();

export const getConsent = (): ConsentValue => {
  try {
    const v = localStorage.getItem(KEY);
    if (v === "accepted" || v === "rejected") return v;
  } catch { /* ignore */ }
  return "unset";
};

export const setConsent = (v: ConsentValue) => {
  try {
    if (v === "unset") localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, v);
  } catch { /* ignore */ }
  listeners.forEach((l) => l(v));
  if (v === "accepted") loadAdsScript();
};

export const subscribeConsent = (l: Listener) => {
  listeners.add(l);
  return () => { listeners.delete(l); };
};

let adsScriptPromise: Promise<void> | null = null;

export const loadAdsScript = (): Promise<void> => {
  if (typeof window === "undefined") return Promise.resolve();
  if (adsScriptPromise) return adsScriptPromise;

  adsScriptPromise = new Promise((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-adsense="hle"]',
    );
    if (existing) return resolve();
    const s = document.createElement("script");
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
    s.dataset.adsense = "hle";
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
  return adsScriptPromise;
};

export const ADSENSE_CLIENT_ID = ADSENSE_CLIENT;
