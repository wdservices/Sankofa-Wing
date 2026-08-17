import { X } from "lucide-react";

import { GALLERIES } from "@/data/galleries";
import { DESTINATIONS, destinationById } from "@/data/destinations";
import { EXHIBITS } from "@/data/exhibits";
import { goToDestination, goToExhibit } from "@/lib/museum-actions";
import { museumStore, useMuseum } from "@/lib/museum-store";

// Floor-plan bounds derived from the gallery rectangles.
const PAD = 3;
const bounds = GALLERIES.reduce(
  (acc, g) => ({
    x1: Math.min(acc.x1, g.rect.x1),
    z1: Math.min(acc.z1, g.rect.z1),
    x2: Math.max(acc.x2, g.rect.x2),
    z2: Math.max(acc.z2, g.rect.z2),
  }),
  { x1: Infinity, z1: Infinity, x2: -Infinity, z2: -Infinity },
);
const VIEW = {
  x: bounds.x1 - PAD,
  y: bounds.z1 - PAD,
  w: bounds.x2 - bounds.x1 + PAD * 2,
  h: bounds.z2 - bounds.z1 + PAD * 2,
};

export function MuseumMap() {
  const open = useMuseum((s) => s.mapOpen);
  const activeId = useMuseum((s) => s.activeDestinationId);
  const focusedId = useMuseum((s) => s.focusedExhibitId);
  const active = destinationById(activeId);

  return (
    <div
      className={`fixed inset-0 z-40 flex items-end justify-center p-3 transition-opacity duration-400 sm:items-center sm:p-8 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-label="Museum floor plan"
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-background/70"
        onClick={() => museumStore.set({ mapOpen: false })}
      />
      <div className="panel-surface relative w-full max-w-3xl rounded-md">
        <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-7">
          <div>
            <p className="label-caps text-primary">Floor plan</p>
            <h2 className="mt-1.5 font-display text-2xl">Museum Map</h2>
          </div>
          <button
            onClick={() => museumStore.set({ mapOpen: false })}
            aria-label="Close map"
            className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>
        <div className="hairline mx-5 sm:mx-7" />

        <div className="px-3 pb-3 pt-4 sm:px-7 sm:pb-6">
          <svg
            viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
            className="h-[46vh] w-full sm:h-[52vh]"
            role="img"
            aria-label="Museum galleries floor plan"
          >
            {GALLERIES.map((g) => {
              const isActive = active.galleryId === g.id;
              return (
                <g key={g.id}>
                  <rect
                    x={g.rect.x1}
                    y={g.rect.z1}
                    width={g.rect.x2 - g.rect.x1}
                    height={g.rect.z2 - g.rect.z1}
                    fill={isActive ? "oklch(0.32 0.03 72 / 0.85)" : "oklch(0.26 0.01 62 / 0.7)"}
                    stroke="oklch(0.72 0.09 76 / 0.55)"
                    strokeWidth={0.35}
                  />
                  <text
                    x={(g.rect.x1 + g.rect.x2) / 2}
                    y={(g.rect.z1 + g.rect.z2) / 2 - 0.6}
                    textAnchor="middle"
                    fill="oklch(0.93 0.016 88)"
                    style={{ fontSize: 1.9, letterSpacing: 0.1 }}
                  >
                    {g.name}
                  </text>
                </g>
              );
            })}

            {/* Exhibits */}
            {EXHIBITS.map((e) => (
              <g
                key={e.id}
                onClick={() => {
                  museumStore.set({ mapOpen: false });
                  goToExhibit(e);
                }}
                className="cursor-pointer"
              >
                <circle
                  cx={e.anchor[0]}
                  cy={e.anchor[2]}
                  r={focusedId === e.id ? 1.1 : 0.7}
                  fill={focusedId === e.id ? "oklch(0.82 0.12 80)" : "oklch(0.72 0.09 76 / 0.8)"}
                />
                <title>{`${e.index} — ${e.name}`}</title>
              </g>
            ))}

            {/* Destination markers */}
            {DESTINATIONS.map((d) => (
              <g
                key={d.id}
                onClick={() => goToDestination(d)}
                className="cursor-pointer"
              >
                <circle
                  cx={d.position[0]}
                  cy={d.position[2]}
                  r={1.5}
                  fill="none"
                  stroke={activeId === d.id ? "oklch(0.9 0.1 82)" : "oklch(0.86 0.02 85 / 0.5)"}
                  strokeWidth={0.35}
                />
                <text
                  x={d.position[0]}
                  y={d.position[2] + 0.55}
                  textAnchor="middle"
                  fill={activeId === d.id ? "oklch(0.92 0.09 82)" : "oklch(0.86 0.02 85 / 0.7)"}
                  style={{ fontSize: 1.4 }}
                >
                  {d.index}
                </text>
                <title>{d.name}</title>
              </g>
            ))}
          </svg>

          <div className="hairline mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary" /> Exhibit
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border border-bone/60" /> Destination
            </span>
            <span>
              You are in <span className="text-foreground">{active.name}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
