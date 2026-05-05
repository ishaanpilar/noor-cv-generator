"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { TailorResponse } from "@/lib/types";

type Step = "passcode" | "form" | "loading" | "result";

export default function CustomizeFlow() {
  const [step, setStep] = useState<Step>("passcode");
  const [passcode, setPasscode] = useState("");
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [jdText, setJdText] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [roleTitle, setRoleTitle] = useState("");
  const [result, setResult] = useState<TailorResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePasscode(e: React.FormEvent) {
    e.preventDefault();
    setPasscodeError(null);
    const res = await fetch("/api/passcode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode }),
    });
    if (!res.ok) {
      setPasscodeError("Wrong passcode. Ask Noor for the current one.");
      return;
    }
    setStep("form");
  }

  async function handleSubmitJD(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (jdText.trim().length < 50) {
      setError("Job description seems too short — paste the full posting.");
      return;
    }
    setStep("loading");
    try {
      const res = await fetch("/api/tailor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode, jdText, companyName, roleTitle }),
      });
      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || `Request failed (${res.status})`);
      }
      const data: TailorResponse = await res.json();
      setResult(data);
      setStep("result");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setStep("form");
    }
  }

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    setJdText(text);
  }

  function reset() {
    setResult(null);
    setStep("form");
  }

  if (step === "passcode") return <Passcode {...{ passcode, setPasscode, passcodeError, handlePasscode }} />;
  if (step === "form" || step === "loading")
    return (
      <JDForm
        {...{ jdText, setJdText, companyName, setCompanyName, roleTitle, setRoleTitle, error, handleSubmitJD, handleFile, isLoading: step === "loading" }}
      />
    );
  if (step === "result" && result) return <Result result={result} jdMeta={{ companyName, roleTitle }} onReset={reset} />;
  return null;
}

/* ------------ Passcode ------------ */

function Passcode({
  passcode,
  setPasscode,
  passcodeError,
  handlePasscode,
}: {
  passcode: string;
  setPasscode: (s: string) => void;
  passcodeError: string | null;
  handlePasscode: (e: React.FormEvent) => void;
}) {
  return (
    <div className="max-w-md mx-auto fade-up">
      <div className="text-center mb-10">
        <div className="inline-grid place-items-center w-14 h-14 rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)] mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <p className="eyebrow justify-center mb-3">Customize CV</p>
        <h1 className="text-[2rem] font-semibold leading-tight">Enter the passcode</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-[var(--muted)]">
          Noor shares the passcode in her outreach. Once you&apos;re in, paste a job description and you&apos;ll
          get a tailored CV, a JD–CV match score, and a one-paragraph pitch.
        </p>
      </div>

      <form onSubmit={handlePasscode} className="card p-6">
        <label className="block text-[13px] font-semibold mb-2 tracking-wide">Passcode</label>
        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          autoFocus
          required
          placeholder="••••••••"
          className="w-full rounded-md border border-[var(--border-strong)] bg-white px-3.5 py-2.5 text-[14.5px] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)] transition"
        />
        {passcodeError && <p className="mt-2.5 text-[13px] text-red-600">{passcodeError}</p>}
        <button type="submit" className="btn-accent mt-4 w-full justify-center">
          Unlock
          <span aria-hidden>→</span>
        </button>
      </form>
    </div>
  );
}

/* ------------ JD Form ------------ */

function JDForm({
  jdText,
  setJdText,
  companyName,
  setCompanyName,
  roleTitle,
  setRoleTitle,
  error,
  handleSubmitJD,
  handleFile,
  isLoading,
}: {
  jdText: string;
  setJdText: (s: string) => void;
  companyName: string;
  setCompanyName: (s: string) => void;
  roleTitle: string;
  setRoleTitle: (s: string) => void;
  error: string | null;
  handleSubmitJD: (e: React.FormEvent) => void;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
}) {
  return (
    <form onSubmit={handleSubmitJD} className="max-w-2xl mx-auto fade-up">
      <div className="mb-8">
        <p className="eyebrow mb-3">Step 2 of 3</p>
        <h1 className="text-[2rem] font-semibold leading-tight">Paste the job description</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--muted)] max-w-xl">
          The longer and more specific the JD, the better the tailoring. Optionally add company and role
          for a sharper output.
        </p>
      </div>

      <div className="card p-6 sm:p-7 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Company" optional>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="input"
              placeholder="e.g. Stripe"
            />
          </Field>
          <Field label="Role title" optional>
            <input
              type="text"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="input"
              placeholder="e.g. Implementation Manager"
            />
          </Field>
        </div>

        <Field label="Job description">
          <textarea
            value={jdText}
            onChange={(e) => setJdText(e.target.value)}
            rows={14}
            required
            className="input font-mono text-[13.5px] leading-relaxed resize-y"
            placeholder="Paste the full job posting here..."
          />
        </Field>

        <div className="flex items-center justify-between text-[12.5px] text-[var(--muted-2)]">
          <span className="tabular-nums">{jdText.length.toLocaleString()} characters</span>
          <label className="cursor-pointer hover:text-[var(--foreground)] transition flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            Or upload a .md file
            <input type="file" accept=".md,.txt" onChange={handleFile} className="hidden" />
          </label>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 px-3.5 py-2.5 text-[13.5px] text-red-700">
            {error}
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
        <p className="text-[12.5px] text-[var(--muted-2)] order-2 sm:order-1">
          {isLoading ? "Usually 8–15 seconds. Don't close the tab." : "Output: tailored CV · match score · cover letter."}
        </p>
        <button type="submit" disabled={isLoading} className="btn-accent disabled:opacity-60 disabled:cursor-not-allowed order-1 sm:order-2">
          {isLoading ? (
            <>
              <Spinner /> Tailoring CV…
            </>
          ) : (
            <>
              Generate tailored CV <span aria-hidden>→</span>
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          border-radius: 0.4rem;
          border: 1px solid var(--border-strong);
          background: #fff;
          padding: 0.6rem 0.85rem;
          font-size: 14px;
          transition: border 150ms ease, box-shadow 150ms ease;
        }
        .input:focus {
          outline: none;
          border-color: var(--accent);
          box-shadow: 0 0 0 3px var(--accent-soft);
        }
      `}</style>
    </form>
  );
}

function Field({ label, optional, children }: { label: string; optional?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-center gap-2 text-[13px] font-semibold mb-1.5 tracking-wide">
        {label}
        {optional && <span className="text-[11px] font-normal text-[var(--muted-3)] tracking-normal">optional</span>}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-spin">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" strokeLinecap="round" />
    </svg>
  );
}

/* ------------ Result ------------ */

function Result({
  result,
  jdMeta,
  onReset,
}: {
  result: TailorResponse;
  jdMeta: { companyName: string; roleTitle: string };
  onReset: () => void;
}) {
  const [tab, setTab] = useState<"cv" | "letter">("cv");
  const [copied, setCopied] = useState(false);

  function downloadMarkdown() {
    const blob = new Blob([result.tailoredCvMarkdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Noorafshan_Aftab_CV${jdMeta.companyName ? `_${slug(jdMeta.companyName)}` : ""}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function printPDF() {
    window.print();
  }

  async function copyLetter() {
    await navigator.clipboard.writeText(result.coverLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const score = Math.max(0, Math.min(100, result.matchScore));
  const scoreColor = score >= 80 ? "text-emerald-600" : score >= 60 ? "text-amber-600" : "text-rose-600";
  const scoreLabel = score >= 80 ? "Strong fit" : score >= 60 ? "Partial fit" : "Stretch fit";

  return (
    <div className="max-w-4xl mx-auto fade-up">
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <p className="eyebrow mb-2">Result</p>
          <h1 className="text-[2rem] font-semibold leading-tight">Your tailored CV</h1>
        </div>
        <button onClick={onReset} className="btn-secondary self-start sm:self-center">
          <span aria-hidden>←</span> Try another JD
        </button>
      </div>

      {/* Match score panel */}
      <div className="no-print card p-6 sm:p-7 mb-6">
        <div className="grid sm:grid-cols-[auto_1fr] gap-6 items-start">
          <div className="flex sm:flex-col items-baseline sm:items-start gap-3 sm:gap-1">
            <div className={`font-serif text-5xl sm:text-6xl font-semibold tabular-nums ${scoreColor}`}>
              {score}
              <span className="text-[var(--muted-3)] text-2xl ml-1">%</span>
            </div>
            <div>
              <div className={`text-[13px] font-semibold ${scoreColor}`}>{scoreLabel}</div>
              <div className="section-label mt-0.5">JD–CV match</div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <KeywordList color="emerald" title="Covered" items={result.keywordsCovered} />
            <KeywordList color="amber" title="Missing" items={result.keywordsMissing} />
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-[var(--border)] flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px]">
          <div>
            <span className="section-label mr-2">Angle</span>
            <span className="font-medium text-[var(--foreground)]">{angleLabel(result.angleUsed)}</span>
          </div>
          {result.notes && (
            <div className="flex-1 min-w-0">
              <span className="section-label mr-2">Note</span>
              <span className="italic text-[var(--muted)]">{result.notes}</span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="no-print flex items-center gap-1 mb-3 border-b border-[var(--border)]">
        <TabBtn active={tab === "cv"} onClick={() => setTab("cv")}>Tailored CV</TabBtn>
        <TabBtn active={tab === "letter"} onClick={() => setTab("letter")}>Cover letter pitch</TabBtn>
      </div>

      {tab === "cv" && (
        <div className="card p-6 sm:p-10">
          <div className="cv-print">
            <ReactMarkdown>{result.tailoredCvMarkdown}</ReactMarkdown>
          </div>
        </div>
      )}

      {tab === "letter" && (
        <div className="card p-6 sm:p-8">
          <p className="whitespace-pre-wrap text-[15.5px] leading-[1.7] text-slate-700 font-serif">
            {result.coverLetter}
          </p>
          <button onClick={copyLetter} className="no-print btn-secondary mt-5 text-[13px]">
            {copied ? "✓ Copied" : "Copy to clipboard"}
          </button>
        </div>
      )}

      {/* Downloads */}
      <div className="no-print mt-6 card p-5 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <h3 className="font-semibold text-[14.5px]">Download</h3>
          <p className="text-[12.5px] text-[var(--muted-2)] mt-0.5">PDF opens browser print dialog → Save as PDF.</p>
        </div>
        <div className="flex gap-2.5">
          <button onClick={printPDF} className="btn-primary text-[13px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            PDF
          </button>
          <button onClick={downloadMarkdown} className="btn-secondary text-[13px]">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Markdown
          </button>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 text-[13.5px] font-medium border-b-2 -mb-px transition ${
        active
          ? "border-[var(--accent)] text-[var(--foreground)]"
          : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
      }`}
    >
      {children}
    </button>
  );
}

function KeywordList({ color, title, items }: { color: "emerald" | "amber"; title: string; items: string[] }) {
  const palette =
    color === "emerald"
      ? { dot: "bg-emerald-500", chip: "bg-emerald-50 text-emerald-800 border-emerald-100", label: "text-emerald-700" }
      : { dot: "bg-amber-500", chip: "bg-amber-50 text-amber-900 border-amber-100", label: "text-amber-700" };
  return (
    <div>
      <h4 className={`text-[12px] font-semibold uppercase tracking-wider ${palette.label} mb-2.5 flex items-center gap-2`}>
        <span className={`w-1.5 h-1.5 rounded-full ${palette.dot}`} />
        {title} ({items.length})
      </h4>
      <div className="flex flex-wrap gap-1.5">
        {items.length === 0 && <span className="text-[var(--muted-2)] text-[12.5px] italic">Nothing flagged.</span>}
        {items.map((k, i) => (
          <span key={i} className={`rounded-md border px-2 py-0.5 text-[12px] ${palette.chip}`}>
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function angleLabel(a: TailorResponse["angleUsed"]) {
  return {
    "customer-success": "Customer Success",
    compliance: "Compliance / RegTech",
    "product-ops": "Product Ops",
    story: "Story / Pivot",
  }[a];
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
