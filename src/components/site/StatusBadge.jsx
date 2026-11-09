const STYLES = {
  Completed: "border-emerald-400/30 bg-emerald-400/5 text-emerald-200/90",
  "Nearing Completion": "border-amber-300/30 bg-amber-300/5 text-amber-200/90",
  "In Progress": "border-cobalt/40 bg-cobalt/5 text-cobalt",
  Draft: "border-line bg-white/[0.02] text-steel",
};

const DOTS = {
  Completed: "bg-emerald-300",
  "Nearing Completion": "bg-amber-200",
  "In Progress": "bg-cobalt",
  Draft: "bg-steel",
};

export default function StatusBadge({ status, className = "" }) {
  const style = STYLES[status] || STYLES.Draft;
  const dot = DOTS[status] || DOTS.Draft;
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 type-meta ${style} ${className}`}
    >
      <span className={`h-1 w-1 rounded-full ${dot}`} />
      {status}
    </span>
  );
}