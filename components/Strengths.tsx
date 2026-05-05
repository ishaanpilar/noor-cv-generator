import { profile } from "@/lib/profile";
import SectionHeader from "./SectionHeader";

export default function Strengths() {
  return (
    <section id="strengths" className="py-16 sm:py-20 border-t border-[var(--border)]">
      <SectionHeader
        index="03"
        label="Strengths"
        title="How I work"
        subtitle="What I've consistently been told I'm good at, in language clients have used."
      />

      <div className="grid sm:grid-cols-2 gap-3.5">
        {profile.strengths.map((s, i) => (
          <div
            key={i}
            className="card p-5 transition hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-md group"
          >
            <div className="flex items-baseline gap-2.5 mb-2">
              <span className="text-[10.5px] font-semibold text-[var(--accent)] tabular-nums tracking-wider">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-[15.5px] font-semibold leading-tight group-hover:text-[var(--accent)] transition">
                {s.title}
              </h3>
            </div>
            <p className="text-[14px] leading-[1.6] text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-2 gap-x-12 gap-y-8 text-[14.5px]">
        <div>
          <h3 className="section-label mb-4">Core skills</h3>
          <ul className="space-y-2 text-slate-700">
            {profile.skills.hard.map((s, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed">
                <span className="text-[var(--accent)] mt-0.5 select-none text-xs">◆</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="section-label mb-4">Working style</h3>
          <ul className="space-y-2 text-slate-700">
            {profile.skills.soft.map((s, i) => (
              <li key={i} className="flex gap-2.5 leading-relaxed">
                <span className="text-[var(--accent)] mt-0.5 select-none text-xs">◆</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
          <h3 className="section-label mt-8 mb-3">Tools</h3>
          <div className="flex flex-wrap gap-1.5">
            {profile.skills.tools.map((t, i) => (
              <span
                key={i}
                className="text-[12.5px] px-2.5 py-1 rounded-md bg-[var(--background-2)] border border-[var(--border)] text-slate-700"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
