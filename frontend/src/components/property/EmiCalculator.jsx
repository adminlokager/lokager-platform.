import { useMemo, useState } from "react";

const fmt = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

// Client-side, illustrative EMI calculator. Not a loan approval or bank offer.
export const EmiCalculator = () => {
  const [value, setValue] = useState(10000000);
  const [down, setDown] = useState(2000000);
  const [rate, setRate] = useState(8.5);
  const [years, setYears] = useState(20);

  const { emi, principal, totalInterest, totalPayable } = useMemo(() => {
    const p = Math.max(0, value - down);
    const r = rate / 12 / 100;
    const n = years * 12;
    const e = r === 0 ? p / n : (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const payable = e * n;
    return { emi: e || 0, principal: p, totalInterest: payable - p, totalPayable: payable };
  }, [value, down, rate, years]);

  const Field = ({ label, value: v, onChange, min, max, step, suffix, testId }) => (
    <div>
      <div className="flex items-center justify-between">
        <label className="font-sans text-sm font-medium text-charcoal">{label}</label>
        <span className="font-mono text-sm text-charcoal">{suffix === "%" ? `${v}%` : suffix === "yr" ? `${v} yrs` : fmt(v)}</span>
      </div>
      <input
        data-testid={testId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={v}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 w-full accent-gold"
      />
    </div>
  );

  return (
    <div data-testid="emi-calculator" className="grid grid-cols-1 gap-8 rounded-2xl border border-charcoal/10 bg-ivory-light p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="flex flex-col gap-7">
        <Field label="Property Value" value={value} onChange={setValue} min={1000000} max={200000000} step={500000} testId="emi-value" />
        <Field label="Down Payment" value={down} onChange={setDown} min={0} max={value} step={100000} testId="emi-down" />
        <Field label="Interest Rate" value={rate} onChange={setRate} min={5} max={15} step={0.1} suffix="%" testId="emi-rate" />
        <Field label="Tenure" value={years} onChange={setYears} min={1} max={30} step={1} suffix="yr" testId="emi-tenure" />
      </div>

      <div className="flex flex-col justify-center rounded-2xl bg-charcoal p-7 text-ivory">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-gold-champagne">Indicative Monthly EMI</p>
        <p data-testid="emi-result" className="mt-2 font-mono text-4xl font-medium">{fmt(emi)}</p>
        <div className="mt-6 space-y-3 border-t border-ivory/12 pt-5 font-sans text-sm">
          <div className="flex justify-between"><span className="text-ivory/60">Loan amount</span><span className="font-mono">{fmt(principal)}</span></div>
          <div className="flex justify-between"><span className="text-ivory/60">Total interest</span><span className="font-mono">{fmt(totalInterest)}</span></div>
          <div className="flex justify-between"><span className="text-ivory/60">Total payable</span><span className="font-mono">{fmt(totalPayable)}</span></div>
        </div>
        <p className="mt-6 font-sans text-[11px] leading-relaxed text-ivory/45">
          Illustrative only. This calculation is not a loan approval, sanction or final bank offer. Actual rates, eligibility and EMIs are determined by lenders.
        </p>
      </div>
    </div>
  );
};
