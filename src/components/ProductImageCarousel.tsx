import { useEffect, useState } from "react";
import { products } from "@/data/products";
import ceo1 from "@/assets/ceo-portrait.jpeg";
import ceo2 from "@/assets/ceo-2.jpeg";
import ceo3 from "@/assets/ceo-3.jpeg";
import ceo4 from "@/assets/ceo-4.jpeg";

const slides: { src: string; alt: string }[] = [
  ...products.map((p) => ({ src: p.image, alt: p.name })),
  { src: ceo1, alt: "Dr Tomisin — CEO" },
  { src: ceo2, alt: "Dr Tomisin" },
  { src: ceo3, alt: "Dr Tomisin" },
  { src: ceo4, alt: "Dr Tomisin" },
];

export const ProductImageCarousel = () => {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % slides.length), 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative mx-auto aspect-[16/7] w-full overflow-hidden rounded-2xl border border-border bg-muted">
      {slides.map((s, idx) => (
        <img
          key={idx}
          src={s.src}
          alt={s.alt}
          loading={idx === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            idx === i ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-4">
        <p className="text-xs uppercase tracking-[0.22em] text-white/90">
          {slides[i].alt}
        </p>
      </div>
    </div>
  );
};
