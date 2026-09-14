import { useState } from "react";
import { onImgError } from "@/data/home";
import { cn } from "@/lib/utils";

export const ImageGallery = ({ images = [], alt = "Property image" }) => {
  const [active, setActive] = useState(0);
  const list = images.length ? images : [];
  if (!list.length) return null;

  return (
    <div data-testid="property-gallery">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-charcoal/10 bg-ivory-light">
        <img key={list[active]} src={list[active]} alt={`${alt} ${active + 1}`} onError={onImgError} className="h-full w-full object-cover" />
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {list.slice(0, 4).map((src, i) => (
            <button
              key={src + i}
              data-testid={`gallery-thumb-${i}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn("relative aspect-[4/3] overflow-hidden rounded-xl border transition-all duration-200", active === i ? "border-gold ring-2 ring-gold/30" : "border-charcoal/10 opacity-80 hover:opacity-100")}
            >
              <img src={src} alt={`${alt} thumbnail ${i + 1}`} onError={onImgError} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
