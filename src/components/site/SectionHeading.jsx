export default function SectionHeading({ index, label, title, intro, className = "" }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <span className="eyebrow">
          {index} / {label}
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>
      {title && (
        <h2 className="mt-7 max-w-3xl font-display text-[clamp(1.8rem,3.6vw,3.1rem)] font-medium leading-[1.03] tracking-[-0.035em] text-silver">
          {title}
        </h2>
      )}
      {intro && <p className="mt-5 max-w-xl text-base leading-relaxed text-steel">{intro}</p>}
    </div>
  );
}