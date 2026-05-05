import { profile } from "@/lib/profile";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20 border-t border-[var(--border)]">
      <SectionHeader
        index="02"
        label="Experience"
        title="What I've done"
        subtitle="Three roles at Lumber, in order. Earlier legal internships are tucked away below."
      />

      <div className="relative">
        {/* vertical rail */}
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border-strong)] hidden sm:block" aria-hidden />

        <div className="space-y-12">
          {profile.experience.map((role, i) => (
            <article key={i} className="relative sm:pl-9">
              <div className="absolute left-0 top-2 hidden sm:block">
                <div className="w-[15px] h-[15px] rounded-full bg-[var(--background)] border-2 border-[var(--accent)] grid place-items-center">
                  {i === 0 && <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>}
                </div>
              </div>

              <header className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-4">
                <h3 className="text-[1.15rem] font-semibold leading-snug">
                  {role.role}
                  <span className="text-[var(--muted)] font-normal"> · {role.company}</span>
                </h3>
                <span className="text-[12.5px] text-[var(--muted-2)] tabular-nums whitespace-nowrap font-medium tracking-wide uppercase">
                  {role.period}
                </span>
              </header>

              <ul className="space-y-2.5 text-[15.5px] leading-[1.6] text-slate-700">
                {role.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3">
                    <span className="text-[var(--muted-3)] flex-shrink-0 select-none mt-1.5">—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <details className="mt-12 group sm:pl-9">
        <summary className="cursor-pointer text-[13px] font-medium text-[var(--accent)] hover:text-[var(--accent-hover)] transition list-none flex items-center gap-2">
          <span className="grid place-items-center w-5 h-5 rounded-full bg-[var(--accent-soft)]">
            <span className="group-open:rotate-90 inline-block transition-transform text-[10px]">▸</span>
          </span>
          Earlier — legal internships (2022–2024)
        </summary>
        <div className="mt-5 grid gap-2">
          {profile.earlierLegal.map((item, i) => (
            <div key={i} className="text-[13.5px] text-slate-700 grid sm:grid-cols-[200px_120px_1fr] gap-x-4 py-2 border-b border-[var(--border)] last:border-0">
              <span className="font-medium">{item.firm}</span>
              <span className="text-[var(--muted-2)] tabular-nums text-[12.5px]">{item.period}</span>
              <span className="text-[var(--muted)]">{item.area}</span>
            </div>
          ))}
        </div>
      </details>
    </section>
  );
}
