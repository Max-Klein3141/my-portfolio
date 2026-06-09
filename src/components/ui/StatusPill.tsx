/**
 * StatusPill — the canonical status indicator.
 *
 * Replaces the two divergent status components that previously lived in
 * the Projects page (active/building/shipped/concept) and the Experience
 * page (ongoing/completed/forming). One config map, one visual language.
 *
 * "Live" statuses (active, ongoing) get an animated ping dot.
 */

export type Status =
  | "active"
  | "building"
  | "shipped"
  | "concept"
  | "ongoing"
  | "completed"
  | "forming";

interface StatusConfig {
  label: string;
  dot:   string;
  text:  string;
  live?: boolean;
}

const CONFIG: Record<Status, StatusConfig> = {
  // Projects vocabulary
  active:    { label: "Active",    dot: "bg-emerald-400",   text: "text-emerald-400/70",  live: true },
  building:  { label: "Building",  dot: "bg-amber-400",     text: "text-amber-400/70"  },
  shipped:   { label: "Shipped",   dot: "bg-white/30",      text: "text-white/30"      },
  concept:   { label: "Concept",   dot: "bg-indigo-400/60", text: "text-indigo-400/60" },
  // Experience vocabulary
  ongoing:   { label: "Ongoing",   dot: "bg-emerald-400/70", text: "text-emerald-400/50", live: true },
  completed: { label: "Completed", dot: "bg-white/15",       text: "text-white/[0.18]"  },
  forming:   { label: "Forming",   dot: "bg-amber-400/50",   text: "text-amber-400/40"  },
}; // (text-white/18 expressed as text-white/[0.18] for arbitrary-value support)

export default function StatusPill({ status }: { status: Status }) {
  const { label, dot, text, live } = CONFIG[status];

  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="relative flex h-[6px] w-[6px] flex-shrink-0">
        {live && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-40 ${dot}`}
          />
        )}
        <span className={`relative inline-flex h-[6px] w-[6px] rounded-full ${dot}`} />
      </span>
      <span className={`text-[9.5px] font-medium uppercase tracking-[0.22em] ${text}`}>
        {label}
      </span>
    </span>
  );
}
