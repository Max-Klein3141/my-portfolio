/**
 * GLOBAL LOADING STATE
 * Shown by Next.js Suspense while a page segment loads.
 * Intentionally minimal — a single breathing ring, nothing more.
 */

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      aria-label="Loading"
      role="status"
    >
      <div className="relative w-7 h-7">
        {/* Static base ring */}
        <div className="absolute inset-0 rounded-full border border-white/[0.08]" />
        {/* Spinning arc */}
        <div
          className="absolute inset-0 rounded-full border border-transparent
                     border-t-white/35 animate-spin"
          style={{ animationDuration: "900ms", animationTimingFunction: "linear" }}
        />
      </div>
    </div>
  );
}
