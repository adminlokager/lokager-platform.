import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/home/motion";
import { AD_SHOWCASE, onImgError } from "@/data/home";
import { cn } from "@/lib/utils";

// <AdShowcase /> — huge premium advertising slot.
// Architected for a future advertising backend (campaignId, advertiser, media,
// dates, targeting, impressions, clicks). Module 1 uses demo content only.
// Video never autoplays with sound; failures fall back silently to the poster.
export const AdShowcase = ({ campaign = AD_SHOWCASE, onCta }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => setFailed(true));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section data-testid="ad-video-showcase-section" className="bg-ivory">
      <div className="mx-auto w-[92vw] max-w-[1760px] pb-14 pt-2 sm:pb-16 lg:pb-20">
        <Reveal className="mx-auto w-full">
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-charcoal/10 bg-charcoal shadow-[0_40px_90px_-45px_rgba(17,17,17,0.55)] sm:aspect-[2/1] lg:aspect-[2.3/1]">
            {!failed && (
              <video
                ref={videoRef}
                data-testid="ad-video"
                className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", playing ? "opacity-100" : "opacity-0")}
                poster={campaign.poster}
                muted={muted}
                playsInline
                preload="none"
                loop
                onError={() => setFailed(true)}
                onEnded={() => setPlaying(false)}
              >
                <source src={campaign.videoMp4} type="video/mp4" />
              </video>
            )}
            <img
              src={campaign.poster}
              alt={campaign.headline}
              className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-500", playing ? "opacity-0" : "opacity-100")}
              loading="lazy"
              onError={onImgError}
              width="1280"
              height="720"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/45 to-charcoal/10" aria-hidden="true" />

            <span data-testid="ad-disclosure" className="absolute right-4 top-4 rounded-full border border-ivory/25 bg-charcoal/40 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory/80 backdrop-blur-sm">
              {campaign.disclosure}
            </span>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p data-testid="ad-advertiser" className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-gold-champagne">{campaign.advertiser}</p>
                <h3 data-testid="ad-headline" className="mt-2 font-display text-2xl font-medium leading-tight text-ivory sm:text-3xl lg:text-4xl">{campaign.headline}</h3>
                <p className="mt-2 max-w-xl font-sans text-sm text-ivory/75 sm:text-base">{campaign.subline}</p>
                <button
                  data-testid="ad-cta-button"
                  onClick={() => onCta?.(campaign)}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-ivory px-6 py-3 font-sans text-[12px] font-semibold uppercase tracking-[0.14em] text-charcoal transition-[transform,background-color] duration-200 hover:bg-gold-champagne active:scale-[0.98]"
                >
                  {campaign.ctaLabel} <ArrowUpRight size={16} aria-hidden="true" />
                </button>
              </div>

              {!failed && (
                <div data-testid="ad-controls" className="flex items-center gap-3">
                  <button data-testid="ad-play-toggle" onClick={togglePlay} aria-label={playing ? "Pause video" : "Play video"} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/40 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal/70">
                    {playing ? <Pause size={20} /> : <Play size={20} />}
                  </button>
                  <button data-testid="ad-mute-toggle" onClick={toggleMute} aria-label={muted ? "Unmute video" : "Mute video"} className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivory/30 bg-charcoal/40 text-ivory backdrop-blur-sm transition-colors hover:bg-charcoal/70">
                    {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
