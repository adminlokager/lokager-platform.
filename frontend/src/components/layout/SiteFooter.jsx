import { Logo } from "@/components/brand/Logo";
import { FOOTER_LINKS } from "@/data/home";
import { Linkedin, Instagram, Twitter, Youtube } from "lucide-react";

const SOCIALS = [
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Instagram, label: "Instagram" },
  { icon: Twitter, label: "X" },
  { icon: Youtube, label: "YouTube" },
];

export const SiteFooter = ({ onNotify }) => (
  <footer data-testid="national-brand-footer" className="bg-charcoal text-ivory">
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:px-12 lg:py-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="[&_img]:brightness-0 [&_img]:invert">
            <Logo size="sm" testId="footer-logo" />
          </div>
          <p className="mt-6 max-w-xs font-display text-lg italic text-ivory/80">Where property meets trust.</p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ icon: I, label }) => (
              <button
                key={label}
                data-testid={`footer-social-${label.toLowerCase()}`}
                onClick={() => onNotify?.(`${label} is coming soon.`)}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ivory/20 text-ivory/70 transition-colors duration-200 hover:border-gold hover:text-gold"
              >
                <I size={17} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        {Object.entries(FOOTER_LINKS).map(([group, links]) => (
          <div key={group}>
            <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-champagne">{group}</h4>
            <ul className="mt-5 flex flex-col gap-3">
              {links.map((l) => (
                <li key={l}>
                  <button
                    data-testid={`footer-link-${l.toLowerCase().replace(/\s+|&/g, "-")}`}
                    onClick={() => onNotify?.("This section is coming soon to LOKAGER.")}
                    className="font-sans text-sm text-ivory/65 transition-colors duration-200 hover:text-ivory"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-ivory/12 pt-8">
        <p className="font-sans text-xs leading-relaxed text-ivory/45">
          Disclaimer: All property, project and locality information shown on this page is illustrative demo content for design purposes only and does not represent live, verified market data. RERA registration details, where applicable, will be published against individual listings.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p data-testid="footer-copyright" className="font-sans text-xs text-ivory/55">© {new Date().getFullYear()} LOKAGER Technologies Pvt. Ltd. All rights reserved.</p>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-ivory/40">Rooted in India · Built for the world</p>
        </div>
      </div>
    </div>
  </footer>
);
