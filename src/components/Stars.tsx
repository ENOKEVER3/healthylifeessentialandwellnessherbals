import { Star } from "lucide-react";

export const Stars = ({
  value,
  size = 14,
  className = "",
}: {
  value: number;
  size?: number;
  className?: string;
}) => {
  const full = Math.floor(value);
  const hasHalf = value - full >= 0.5;
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${value} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full;
        const half = !filled && i === full && hasHalf;
        return (
          <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
            <Star
              size={size}
              className="absolute inset-0 text-ochre/30"
              strokeWidth={1.4}
              fill="currentColor"
            />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: filled ? "100%" : "50%" }}
              >
                <Star size={size} className="text-ochre" strokeWidth={1.4} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
};
