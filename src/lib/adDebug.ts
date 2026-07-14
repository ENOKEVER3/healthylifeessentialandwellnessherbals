/**
 * Tiny in-memory store used by the admin debug panel to observe AdSlot lifecycle.
 * Every AdSlot reports its state here; the panel subscribes and renders it live.
 */
export type AdSlotStatus = {
  placement: string;
  slot?: string;
  inView: boolean;
  /** true once adsbygoogle.push({}) has been called for this slot */
  pushed: boolean;
  /** true if the iframe rendered (Google filled the slot) */
  filled: boolean;
  /** last error message, if any */
  error?: string;
  updatedAt: number;
};

type Listener = (all: Record<string, AdSlotStatus>) => void;

const state: Record<string, AdSlotStatus> = {};
const listeners = new Set<Listener>();

const emit = () => {
  const snapshot = { ...state };
  listeners.forEach((l) => l(snapshot));
};

export const reportAdSlot = (
  placement: string,
  patch: Partial<Omit<AdSlotStatus, "placement" | "updatedAt">>,
) => {
  const prev = state[placement] ?? {
    placement,
    inView: false,
    pushed: false,
    filled: false,
  };
  state[placement] = { ...prev, ...patch, placement, updatedAt: Date.now() };
  emit();
};

export const removeAdSlot = (placement: string) => {
  delete state[placement];
  emit();
};

export const getAdSlotStatuses = () => ({ ...state });

export const subscribeAdSlots = (l: Listener) => {
  listeners.add(l);
  l({ ...state });
  return () => { listeners.delete(l); };
};

/** URL flag ?debug=1 flips a localStorage bit so the panel persists across nav. */
const DEBUG_KEY = "hle_admin_debug_v1";

export const isDebugEnabled = (): boolean => {
  if (typeof window === "undefined") return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") === "1") {
      localStorage.setItem(DEBUG_KEY, "1");
      return true;
    }
    if (params.get("debug") === "0") {
      localStorage.removeItem(DEBUG_KEY);
      return false;
    }
    return localStorage.getItem(DEBUG_KEY) === "1";
  } catch {
    return false;
  }
};
