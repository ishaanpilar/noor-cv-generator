import { profile } from "@/lib/profile";
import SectionHeader from "./SectionHeader";

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 border-t border-[var(--border)]">
      <SectionHeader
        index="01"
        label="The pivot"
        title={profile.pivot.headline}
        subtitle="The single most important thing about how I got here."
      />
      <div className="grid sm:grid-cols-[1fr_auto] gap-10">
        <div className="space-y-5 text-[17px] leading-[1.65] text-slate-700 max-w-2xl">
          {profile.pivot.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <aside className="hidden sm:block">
          <div className="card p-5 w-56">
            <p className="section-label mb-4">Trajectory</p>
            <ol className="space-y-4 text-sm">
              <TrajectoryStep year="2025" role="Legal Intern" muted />
              <TrajectoryStep year="2025" role="Payroll Compliance" muted />
              <TrajectoryStep year="2026" role="Customer Success" current />
            </ol>
          </div>
        </aside>
      </div>
    </section>
  );
}

function TrajectoryStep({ year, role, muted, current }: { year: string; role: string; muted?: boolean; current?: boolean }) {
  return (
    <li className="flex items-start gap-3">
      <div className="flex flex-col items-center pt-1">
        <span
          className={`w-2 h-2 rounded-full ${
            current ? "bg-[var(--accent)] ring-4 ring-[var(--accent-soft)]" : "bg-[var(--muted-3)]"
          }`}
        />
      </div>
      <div className="flex-1">
        <div className={`text-[10.5px] uppercase tracking-wider tabular-nums ${muted ? "text-[var(--muted-3)]" : "text-[var(--muted)]"}`}>
          {year}
        </div>
        <div className={`text-[13.5px] font-medium leading-tight ${current ? "text-[var(--foreground)]" : "text-slate-600"}`}>
          {role}
        </div>
      </div>
    </li>
  );
}
