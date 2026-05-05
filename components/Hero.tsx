import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Hero() {
  return (
    <section className="pt-16 pb-20 sm:pt-24 sm:pb-28 relative">
      <div className="grid sm:grid-cols-[1fr_auto] gap-10 sm:gap-14 items-start">
        <div>
          <div className="fade-up flex items-center gap-2 mb-6 text-[12.5px] text-[var(--muted)]">
            <span className="dot-live" aria-hidden></span>
            <span className="font-medium tracking-wide">Open to senior CS / implementation roles</span>
            <span className="text-[var(--muted-3)]">·</span>
            <span>{profile.location.split(",")[0]}</span>
          </div>

          <h1 className="fade-up delay-1 text-[2.5rem] sm:text-[3.4rem] leading-[1.05] font-semibold">
            {profile.name}.
          </h1>

          <p className="fade-up delay-2 mt-6 text-[1.18rem] sm:text-[1.28rem] leading-[1.55] text-[var(--muted)] max-w-xl font-serif">
            Law graduate. SaaS operator.
            <br className="hidden sm:block" />
            <span className="text-[var(--foreground)]"> Three roles in twelve months.</span>
          </p>

          <p className="fade-up delay-3 mt-5 max-w-lg text-[15.5px] leading-relaxed text-[var(--muted)]">
            I run end-to-end implementation for US construction-payroll clients at Lumber —
            from configuration and go-live through the first weeks of live payroll. I got here
            from a B.A., LL.B. background, and I work with people who&apos;ve done payroll for
            five times as long as I have.
          </p>

          <div className="fade-up delay-3 mt-8 flex flex-wrap gap-3">
            <Link href="/customize" className="btn-accent">
              Customize CV for a role
              <span aria-hidden>→</span>
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Email me
            </a>
          </div>

          <div className="fade-up delay-4 mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat number="12mo" label="Three roles" />
            <Stat number="100%" label="Owned go-lives" />
            <Stat number="8.0" label="CGPA, LL.B." />
          </div>
        </div>

        <div className="fade-up delay-2 mx-auto sm:mx-0">
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-[var(--accent-soft)] blur-xl"></div>
            <div className="relative w-48 h-60 rounded-xl border border-[var(--border-strong)] overflow-hidden shadow-[0_8px_30px_-10px_rgba(15,23,42,0.25)] bg-[#ebebe6] mx-auto">
              <Image
                src="/noor.jpg"
                alt="Noorafshan Aftab"
                fill
                priority
                sizes="192px"
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-[var(--foreground)]/95 to-[var(--foreground)]/70 backdrop-blur-sm text-[#fafaf9] text-[10px] font-medium tracking-wider uppercase flex items-center justify-between">
                <span>Bangalore</span>
                <span>2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="font-serif text-2xl font-semibold tabular-nums">{number}</div>
      <div className="text-[11.5px] uppercase tracking-wider text-[var(--muted-2)] mt-0.5">{label}</div>
    </div>
  );
}
