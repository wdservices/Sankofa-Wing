import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, X } from "lucide-react";

import { exhibitById } from "@/data/exhibits";
import { museumStore, useMuseum } from "@/lib/museum-store";

/** Elegant full-image study for photographic, painted and document exhibits. */
export function ImageLightbox() {
  const id = useMuseum((s) => s.lightboxExhibitId);
  const exhibit = exhibitById(id);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setIndex(0);
    setZoom(1);
  }, [id]);

  if (!exhibit) return null;
  const images = exhibit.images?.length ? exhibit.images : exhibit.image ? [exhibit.image] : [];
  if (!images.length) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/97 animate-fade">
      <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-8">
        <div>
          <p className="label-caps text-primary">Image study · {exhibit.index}</p>
          <h2 className="mt-1.5 font-display text-2xl">{exhibit.name}</h2>
        </div>
        <button
          onClick={() => museumStore.set({ lightboxExhibitId: null })}
          aria-label="Close image study"
          className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      <div className="hairline mx-5 sm:mx-8" />

      <div className="flex flex-1 items-center justify-center overflow-hidden p-4 sm:p-8">
        <img
          src={images[index]}
          alt={`${exhibit.name}, view ${index + 1}`}
          loading="lazy"
          className="max-h-full max-w-full object-contain shadow-2xl transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>

      <div className="hairline flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          {exhibit.description}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(1, z - 0.25))}
            aria-label="Zoom out"
            className="rounded-sm border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="label-caps w-10 text-center text-muted-foreground">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            aria-label="Zoom in"
            className="rounded-sm border border-border p-2 text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                aria-label="Previous image"
                className="ml-3 rounded-sm border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="label-caps text-muted-foreground">
                {index + 1}/{images.length}
              </span>
              <button
                onClick={() => setIndex((i) => (i + 1) % images.length)}
                aria-label="Next image"
                className="rounded-sm border border-border p-2 text-muted-foreground hover:text-foreground"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
