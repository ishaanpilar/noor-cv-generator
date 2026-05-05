import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-30 backdrop-blur-md bg-[var(--background)]/75 border-b border-[var(--border)]">
      <div className="mx-auto max-w-5xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-md bg-[var(--foreground)] text-[#fafaf9] font-serif font-bold text-sm tracking-tight">
            N
          </span>
          <span className="font-serif text-[15px] font-semibold tracking-tight">
            Noorafshan Aftab
          </span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-5 text-sm text-[var(--muted)]">
          <a href="/#about" className="hidden sm:inline hover:text-[var(--foreground)] transition">About</a>
          <a href="/#experience" className="hidden sm:inline hover:text-[var(--foreground)] transition">Experience</a>
          <a href="/#strengths" className="hidden md:inline hover:text-[var(--foreground)] transition">Strengths</a>
          <Link href="/customize" className="btn-accent ml-2">
            Customize CV
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
