import { profile } from "@/lib/profile";
import SectionHeader from "./SectionHeader";

export default function Education() {
  return (
    <section id="education" className="py-16 sm:py-20 border-t border-[var(--border)]">
      <SectionHeader index="04" label="Education" title="Schooling" />
      <div className="space-y-8">
        {profile.education.map((e, i) => (
          <div key={i} className="grid sm:grid-cols-[1fr_auto] gap-2 sm:gap-8 pb-6 border-b border-[var(--border)] last:border-0 last:pb-0">
            <div>
              <h3 className="text-[1.05rem] font-semibold leading-snug">{e.degree}</h3>
              <p className="text-[14.5px] text-[var(--muted)] mt-0.5">{e.school}</p>
              <ul className="mt-3 text-[13.5px] text-slate-700 space-y-1">
                {e.details.map((d, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-[var(--muted-3)] select-none">·</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
            <span className="text-[12.5px] text-[var(--muted-2)] tabular-nums whitespace-nowrap font-medium tracking-wide uppercase">
              {e.period}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
