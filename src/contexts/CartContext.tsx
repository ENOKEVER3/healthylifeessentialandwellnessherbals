import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { products, type Product } from "@/data/products";

export type CartItem = { productId: string; quantity: number };

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  setOpen: (v: boolean) => void;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, quantity: number) => void;
  clear: () => void;
  detailedItems: { product: Product; quantity: number; lineTotal: number }[];
  subtotal: number;
  count: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "verda-cart-v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartContextValue["add"] = (productId, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    setOpen(true);
  };

  const remove: CartContextValue["remove"] = (productId) =>
    setItems((prev) => prev.filter((i) => i.productId !== productId));

  const setQty: CartContextValue["setQty"] = (productId, quantity) => {
    if (quantity <= 0) return remove(productId);
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  };

  const clear = () => setItems([]);

  const detailedItems = useMemo(() => {
    return items
      .map((i) => {
        const product = products.find((p) => p.id === i.productId);
        if (!product) return null;
        return { product, quantity: i.quantity, lineTotal: product.price * i.quantity };
      })
      .filter(Boolean) as CartContextValue["detailedItems"];
  }, [items]);

  const subtotal = detailedItems.reduce((s, l) => s + l.lineTotal, 0);
  const count = items.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, isOpen, setOpen, add, remove, setQty, clear, detailedItems, subtotal, count }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
