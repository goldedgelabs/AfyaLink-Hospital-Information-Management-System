// src/components/GlassCard.js
export default function GlassCard({ children, className = "" }) {
  return (
    <div
      className={
        "backdrop-blur-md bg-white/5 border border-white/5 rounded-2xl p-4 shadow-lg " +
        className
      }
      role="region"
    >
      {children}
    </div>
  );
}
