import { supabase } from "@/integrations/supabase/client";

const DEVICE_KEY = "hle_device_id_v1";

const getDeviceId = (): string => {
  try {
    let id = localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
      localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return "anon-" + Math.random().toString(36).slice(2, 14);
  }
};

/**
 * Log an ad engagement event (view or click) for a given placement.
 * Fire-and-forget: never throws, never blocks the UI.
 */
export const trackAdEvent = (
  placement: string,
  event_type: "view" | "click",
) => {
  try {
    const payload = {
      placement,
      event_type,
      device_id: getDeviceId(),
      path: typeof window !== "undefined" ? window.location.pathname.slice(0, 200) : null,
    };
    // Insert asynchronously; ignore errors to keep the page snappy.
    void supabase.from("ad_events").insert(payload).then(() => undefined);
  } catch {
    /* ignore */
  }
};
