import { useEffect, useState } from "react";
import { Box, Film, Headphones, Images, X } from "lucide-react";

import { exhibitById } from "@/data/exhibits";
import { closeExhibit } from "@/lib/museum-actions";
import { museumStore, useMuseum } from "@/lib/museum-store";

import { AudioPlayer } from "./AudioPlayer";

export function ExhibitPanel() {
  const id = useMuseum((s) => s.panelExhibitId);
  const exhibit = exhibitById(id);
  const [expanded, setExpanded] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    setExpanded(false);
    setAudioOpen(false);
    setVideoOpen(false);
  }, [id]);

  if (!exhibit) return null;

  return (
    <section
      aria-label={`${exhibit.name} exhibit information`}
      className="panel-surface fixed z-30 flex flex-col rounded-t-md inset-x-0 bottom-0 max-h-[70vh] animate-rise md:inset-auto md:bottom-24 md:left-6 md:w-[24rem] md:rounded-md"
    >
      <div className="flex items-start justify-between gap-3 px-5 pt-5">
        <div className="min-w-0">
          <p className="label-caps text-primary">
            {exhibit.index} · {exhibit.collection}
          </p>
          <h2 className="mt-2 font-display text-2xl leading-tight">{exhibit.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {exhibit.period} · {exhibit.locationLabel}
          </p>
        </div>
        <button
          onClick={closeExhibit}
          aria-label="Close exhibit information"
          className="shrink-0 rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex-1 overflow-y-auto overscroll-contain px-5 pb-5">
        <p className="text-sm leading-relaxed text-foreground/90">{exhibit.description}</p>

        {expanded && (
          <div className="mt-3 animate-fade space-y-3">
            <p className="text-sm leading-relaxed text-muted-foreground">{exhibit.detail}</p>
            {exhibit.image && (
              <img
                src={exhibit.image}
                alt={exhibit.name}
                loading="lazy"
                className="w-full rounded-[2px] object-cover"
              />
            )}
          </div>
        )}

        {audioOpen && (
          <div className="mt-4 animate-fade">
            <AudioPlayer title={exhibit.name} />
          </div>
        )}

        {videoOpen && (
          <div className="mt-4 animate-fade rounded-sm border border-border bg-secondary/40 p-4 text-center">
            <div className="flex aspect-video items-center justify-center rounded-[2px] bg-background/70">
              <span className="label-caps text-muted-foreground">Video slot</span>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Reserved for the client's curator film for this exhibit.
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="label-caps rounded-sm border border-primary/70 px-3.5 py-2.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {expanded ? "Less information" : "Explore exhibit"}
          </button>

          {exhibit.kind === "object" && (
            <button
              onClick={() => museumStore.set({ viewerExhibitId: exhibit.id })}
              className="label-caps flex items-center gap-2 rounded-sm border border-border px-3.5 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Box className="h-3.5 w-3.5" /> View in 3D
            </button>
          )}

          {exhibit.kind !== "object" && (
            <button
              onClick={() => museumStore.set({ lightboxExhibitId: exhibit.id })}
              className="label-caps flex items-center gap-2 rounded-sm border border-border px-3.5 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Images className="h-3.5 w-3.5" /> View images
            </button>
          )}

          {exhibit.audio && (
            <button
              onClick={() => setAudioOpen((v) => !v)}
              className="label-caps flex items-center gap-2 rounded-sm border border-border px-3.5 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Headphones className="h-3.5 w-3.5" /> Listen
            </button>
          )}

          {exhibit.video && (
            <button
              onClick={() => setVideoOpen((v) => !v)}
              className="label-caps flex items-center gap-2 rounded-sm border border-border px-3.5 py-2.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Film className="h-3.5 w-3.5" /> Watch video
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
