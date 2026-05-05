export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--border)] bg-[var(--background-2)]">
      <div className="mx-auto max-w-5xl px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px] text-[var(--muted-2)]">
        <span>© {new Date().getFullYear()} Noorafshan Aftab · Bangalore, India</span>
        <span className="flex items-center gap-2">
          <span className="dot-live" aria-hidden></span>
          Available for remote senior CS / implementation roles
        </span>
      </div>
    </footer>
  );
}
