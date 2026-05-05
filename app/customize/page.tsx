import Nav from "@/components/Nav";
import CustomizeFlow from "@/components/CustomizeFlow";

export const metadata = {
  title: "Customize CV — Noorafshan Aftab",
  description: "Paste a job description; get a tailored CV, JD–CV match score, and pitch.",
};

export default function CustomizePage() {
  return (
    <>
      <div className="no-print">
        <Nav />
      </div>
      <main className="mx-auto max-w-5xl w-full px-6 py-16 sm:py-20">
        <CustomizeFlow />
      </main>
    </>
  );
}
