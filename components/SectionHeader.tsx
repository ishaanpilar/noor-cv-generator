export default function SectionHeader({
  index,
  label,
  title,
  subtitle,
}: {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <span className="section-label tabular-nums">{index}</span>
        <span className="h-px w-8 bg-[var(--border-strong)]" />
        <span className="section-label">{label}</span>
      </div>
      <h2 className="text-[2rem] sm:text-[2.4rem] leading-tight font-semibold">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-[15.5px] leading-relaxed text-[var(--muted)] max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
