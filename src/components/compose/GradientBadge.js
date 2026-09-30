import { Sparkle } from './icons';

// Blue gradient circle with sparkles used on the "post is live" and
// "You're Registered" confirmations. `size` is in Figma pixels.
export function GradientBadge({ children, size = 137 }) {
  const u = (n) => `calc(${n} * var(--px))`;
  const scale = size / 137;
  return (
    <div style={{ position: 'relative', width: u(size), height: u(size) }}>
      <div
        className="flex items-center justify-center rounded-full text-white"
        style={{ width: '100%', height: '100%', background: 'var(--gradient-brand)' }}
      >
        <div style={{ width: u(66 * scale), height: u(66 * scale) }}>{children}</div>
      </div>
      <Sparkle aria-hidden style={{ position: 'absolute', color: '#4A8FE3', width: u(19 * scale), height: u(19 * scale), top: u(-12 * scale), right: u(-38 * scale) }} />
      <Sparkle aria-hidden style={{ position: 'absolute', color: '#4A8FE3', width: u(12 * scale), height: u(12 * scale), top: u(6 * scale), right: u(-18 * scale) }} />
      <Sparkle aria-hidden style={{ position: 'absolute', color: '#4A8FE3', width: u(12 * scale), height: u(12 * scale), bottom: u(-5 * scale), left: u(1 * scale) }} />
    </div>
  );
}
