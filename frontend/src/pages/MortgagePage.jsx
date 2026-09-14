import { PageShell } from "@/components/layout/PageShell";
import { SectionHeader } from "@/components/home/SectionHeader";
import { EmiCalculator } from "@/components/property/EmiCalculator";
import { Reveal } from "@/components/home/motion";

export default function MortgagePage() {
  return (
    <PageShell
      testId="mortgage-page"
      title="Home Loan & EMI Calculator — LOKAGER Mortgage"
      description="Estimate an indicative home-loan EMI with LOKAGER's mortgage calculator. Figures are illustrative and not a loan approval or final bank offer."
      path="/mortgage"
      crumbs={[{ label: "Home", to: "/home" }, { label: "Mortgage" }]}
    >
      <div className="mx-auto max-w-[1600px] px-5 pb-16 pt-8 sm:px-8 sm:pb-20 lg:px-16 lg:pb-24 lg:pt-10">
        <SectionHeader
          eyebrow="Mortgage"
          title="Plan your property financing."
          description="Use the calculator below to explore an indicative monthly EMI. When LOKAGER Mortgage launches, you'll be able to compare lenders and check eligibility here."
          titleAs="h1"
          testId="mortgage-header"
        />

        <div className="mt-8 rounded-xl border border-gold/30 bg-gold/8 px-5 py-4">
          <p className="font-sans text-[13px] leading-relaxed text-charcoal-soft">
            <span className="font-semibold text-charcoal">Please note:</span> All calculations are illustrative and do not represent a loan approval, sanction, or final bank offer. Actual interest rates, eligibility and EMIs are determined by lenders.
          </p>
        </div>

        <Reveal className="mt-10">
          <EmiCalculator />
        </Reveal>

        <div className="mt-10 flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-soft">Lender comparison — Coming Soon</span>
          <span className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-charcoal-soft">Eligibility check — Coming Soon</span>
        </div>
      </div>
    </PageShell>
  );
}
