import Link from "next/link";
import { profile } from "@/lib/profile";

export default function Contact() {
  return (
    <section id="contact" className="py-20 border-t border-[var(--border)]">
      <div className="card p-8 sm:p-12 relative overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--accent-soft)] blur-3xl"
        />
        <div className="relative">
          <p className="eyebrow mb-4">Get in touch</p>
          <h2 className="text-[2rem] sm:text-[2.4rem] font-semibold leading-tight max-w-2xl">
            Hiring for a CS, implementation, or compliance-adjacent role?
          </h2>
          <p className="mt-4 text-[16.5px] leading-relaxed text-[var(--muted)] max-w-2xl">
            Paste your job description into the customizer — I&apos;ll send back a CV tailored
            to your spec, a JD–CV match score, and a one-paragraph pitch on why I&apos;m a fit.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/customize" className="btn-accent">
              Customize CV for your role
              <span aria-hidden>→</span>
            </Link>
            <a href={`mailto:${profile.email}`} className="btn-secondary">
              Email me directly
            </a>
          </div>
          <div className="mt-10 pt-6 border-t border-[var(--border)] grid sm:grid-cols-3 gap-y-3 gap-x-6 text-[13.5px]">
            <ContactRow label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactRow label="Phone" value={profile.phone} href={`tel:${profile.phone.replace(/\s/g, "")}`} />
            <ContactRow label="LinkedIn" value="noorafshan-aftab" href={profile.linkedin} external />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <div>
      <div className="section-label mb-1">{label}</div>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="text-slate-700 hover:text-[var(--accent)] transition"
      >
        {value}
      </a>
    </div>
  );
}
