import { useState, useEffect, useCallback } from "react";

const FALLBACK = "https://placehold.co/1200x800/151e30/c9a24b?text=Dream+Builder";

const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK;
};

export default function ImageGallery({ images, title }) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const next = useCallback(
    () => setActive((i) => (i + 1) % images.length),
    [images.length]
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  // Keyboard controls + lock page scroll while the lightbox is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, next, prev]);

  return (
    <div>
      {/* Main image */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block aspect-[16/9] w-full overflow-hidden rounded-2xl bg-ink"
        aria-label="Open photo in full screen"
      >
        <img
          src={images[active]}
          alt={`${title} - photo ${active + 1}`}
          onError={onImgError}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-ink/80 px-3 py-1 text-xs text-white">
          {active + 1} / {images.length} · Click to enlarge
        </span>
      </button>

      {/* Thumbnails */}
      <div className="mt-3 grid grid-cols-4 gap-3">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-current={i === active}
            className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
              i === active ? "border-gold" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              onError={onImgError}
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            className="absolute right-4 top-4 text-3xl text-white hover:text-gold"
            onClick={() => setOpen(false)}
            aria-label="Close"
          >
            ✕
          </button>

          <button
            className="absolute left-3 text-4xl text-white hover:text-gold sm:left-6"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <img
            src={images[active]}
            alt={`${title} - photo ${active + 1}`}
            onError={onImgError}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain"
          />

          <button
            className="absolute right-3 text-4xl text-white hover:text-gold sm:right-6"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}