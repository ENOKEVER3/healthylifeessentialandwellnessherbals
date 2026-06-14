import { memo } from "react";

/**
 * SVG-based animated avatars used for anonymous reviews.
 * - Female: blinks, winks, and smiles bigger on a loop.
 * - Male: waves his hand, blinks, and winks.
 * Pure CSS keyframes — no JS timers, GPU-friendly.
 */

type Props = {
  kind: "male" | "female";
  className?: string;
  size?: number;
};

const styles = `
@keyframes hle-blink {
  0%, 92%, 100% { transform: scaleY(1); }
  94%, 98%    { transform: scaleY(0.08); }
}
@keyframes hle-wink-right {
  0%, 40%, 60%, 100% { transform: scaleY(1); }
  48%, 52%           { transform: scaleY(0.08); }
}
@keyframes hle-smile-grow {
  0%, 100% { transform: scaleX(1) scaleY(1); }
  50%      { transform: scaleX(1.08) scaleY(1.25); }
}
@keyframes hle-wave {
  0%, 70%, 100% { transform: rotate(0deg); }
  76%           { transform: rotate(-22deg); }
  82%           { transform: rotate(18deg); }
  88%           { transform: rotate(-14deg); }
  94%           { transform: rotate(10deg); }
}
@keyframes hle-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-1.2px); }
}
.hle-avatar { animation: hle-bob 3.6s ease-in-out infinite; transform-origin: center; }
.hle-eye-l  { transform-origin: center; animation: hle-blink 4.2s ease-in-out infinite; }
.hle-eye-r  { transform-origin: center; animation: hle-wink-right 4.2s ease-in-out infinite; animation-delay: 1.1s; }
.hle-mouth  { transform-origin: center; animation: hle-smile-grow 4.2s ease-in-out infinite; }
.hle-hand   { transform-origin: 78px 84px; animation: hle-wave 3.4s ease-in-out infinite; }
`;

const AvatarFemale = ({ size = 56 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size} className="hle-avatar block">
    <defs>
      <radialGradient id="bgF" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#fde6cf" />
        <stop offset="100%" stopColor="#e9a679" />
      </radialGradient>
    </defs>
    <circle cx="64" cy="64" r="62" fill="url(#bgF)" />
    {/* hair back */}
    <path d="M22 70 C22 30 106 30 106 70 L106 100 L22 100 Z" fill="#3a2418" />
    {/* face */}
    <ellipse cx="64" cy="66" rx="32" ry="36" fill="#f1c6a4" />
    {/* fringe */}
    <path d="M34 50 C46 30 86 30 96 52 C84 44 70 44 64 52 C58 44 44 44 34 50 Z" fill="#2b170f" />
    {/* eyes */}
    <g fill="#2b170f">
      <ellipse className="hle-eye-l" cx="52" cy="66" rx="3.2" ry="4" />
      <ellipse className="hle-eye-r" cx="76" cy="66" rx="3.2" ry="4" />
    </g>
    {/* blush */}
    <circle cx="46" cy="80" r="4" fill="#f08a8a" opacity="0.55" />
    <circle cx="82" cy="80" r="4" fill="#f08a8a" opacity="0.55" />
    {/* smile */}
    <path
      className="hle-mouth"
      d="M54 86 Q64 96 74 86"
      stroke="#a83e3e"
      strokeWidth="2.6"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

const AvatarMale = ({ size = 56 }: { size?: number }) => (
  <svg viewBox="0 0 128 128" width={size} height={size} className="hle-avatar block">
    <defs>
      <radialGradient id="bgM" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#d8ecff" />
        <stop offset="100%" stopColor="#7aa6d6" />
      </radialGradient>
    </defs>
    <circle cx="64" cy="64" r="62" fill="url(#bgM)" />
    {/* shoulders / shirt */}
    <path d="M16 110 C28 90 100 90 112 110 L112 128 L16 128 Z" fill="#2c4a6e" />
    {/* hair */}
    <path d="M34 54 C36 32 92 32 94 54 L94 60 C84 50 44 50 34 60 Z" fill="#2b1a10" />
    {/* face */}
    <ellipse cx="64" cy="66" rx="30" ry="34" fill="#e8b48a" />
    {/* brows */}
    <rect x="46" y="58" width="12" height="2.4" rx="1.2" fill="#2b1a10" />
    <rect x="70" y="58" width="12" height="2.4" rx="1.2" fill="#2b1a10" />
    {/* eyes */}
    <g fill="#1f140a">
      <ellipse className="hle-eye-l" cx="52" cy="68" rx="3" ry="3.6" />
      <ellipse className="hle-eye-r" cx="76" cy="68" rx="3" ry="3.6" />
    </g>
    {/* smile */}
    <path
      className="hle-mouth"
      d="M54 86 Q64 94 74 86"
      stroke="#6b3a2a"
      strokeWidth="2.4"
      strokeLinecap="round"
      fill="none"
    />
    {/* waving hand */}
    <g className="hle-hand">
      <rect x="74" y="84" width="6" height="18" rx="3" fill="#e8b48a" />
      <circle cx="84" cy="80" r="9" fill="#e8b48a" />
      <path
        d="M80 76 Q84 70 88 76 M82 74 Q86 68 90 74 M84 74 Q88 68 92 74"
        stroke="#a8754a"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </g>
  </svg>
);

export const AnimatedAvatar = memo(({ kind, className, size = 56 }: Props) => {
  return (
    <span
      className={`inline-block overflow-hidden rounded-full ring-2 ring-cream ${className ?? ""}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <style>{styles}</style>
      {kind === "male" ? <AvatarMale size={size} /> : <AvatarFemale size={size} />}
    </span>
  );
});

AnimatedAvatar.displayName = "AnimatedAvatar";
