import { Compass, HelpCircle, Map, RotateCcw, X } from "lucide-react";

import { destinationById } from "@/data/destinations";
import { resetCamera } from "@/lib/museum-actions";
import { museumStore, useMuseum } from "@/lib/museum-store";

function ControlButton({
  label,
  icon,
  onClick,
  primary = false,
}: {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`label-caps flex items-center gap-2 rounded-sm border px-3.5 py-3 backdrop-blur-[2px] transition-colors ${
        primary
          ? "border-primary/70 bg-background/85 text-primary hover:bg-primary hover:text-primary-foreground"
          : "border-border bg-background/70 text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className={primary ? "" : "hidden sm:inline"}>{label}</span>
    </button>
  );
}

export function MuseumControls({ isTouch }: { isTouch: boolean }) {
  const activeId = useMuseum((s) => s.activeDestinationId);
  const helpOpen = useMuseum((s) => s.helpOpen);
  const hintDismissed = useMuseum((s) => s.hintDismissed);
  const reduceMotion = useMuseum((s) => s.reduceMotion);
  const instantTravel = useMuseum((s) => s.instantTravel);
  const panelOpen = useMuseum((s) => s.panelExhibitId !== null);
  const active = destinationById(activeId);

  return (
    <>
      {/* Institutional mark */}
      <div className="pointer-events-none fixed left-5 top-5 z-20 sm:left-8 sm:top-7">
        <p className="label-caps text-bone/85">Bluewaves Technology</p>
        <p className="mt-1 text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          Digital Heritage Archive
        </p>
      </div>

      {/* Current location */}
      <div className="pointer-events-none fixed right-5 top-5 z-20 text-right sm:right-8 sm:top-7">
        <p className="label-caps text-primary">Now viewing</p>
        <p className="mt-1 font-display text-lg leading-tight text-bone">{active.name}</p>
      </div>

      {/* First-visit hint */}
      {!hintDismissed && !panelOpen && (
        <div className="pointer-events-none fixed inset-x-0 bottom-28 z-20 flex justify-center px-6 animate-fade sm:bottom-32">
          <p className="rounded-sm border border-border bg-background/70 px-4 py-2.5 text-center text-xs text-muted-foreground backdrop-blur-[2px]">
            {isTouch ? "Tap" : "Click"} an exhibit marker, or select a destination to be guided
            through the museum.
          </p>
        </div>
      )}

      {/* Control bar */}
      <nav
        aria-label="Museum controls"
        className="fixed inset-x-0 bottom-0 z-20 flex flex-wrap items-center justify-center gap-2 px-4 pb-5 pt-4 sm:justify-start sm:px-8 sm:pb-7"
      >
        <ControlButton
          label="Explore"
          primary
          icon={<Compass className="h-4 w-4" />}
          onClick={() => museumStore.set({ navOpen: true, hintDismissed: true })}
        />
        <ControlButton
          label="Map"
          icon={<Map className="h-4 w-4" />}
          onClick={() => museumStore.set({ mapOpen: true, hintDismissed: true })}
        />
        <ControlButton
          label="Reset view"
          icon={<RotateCcw className="h-4 w-4" />}
          onClick={resetCamera}
        />
        <ControlButton
          label="Help"
          icon={<HelpCircle className="h-4 w-4" />}
          onClick={() => museumStore.set({ helpOpen: true, hintDismissed: true })}
        />
      </nav>

      {/* Help & preferences */}
      {helpOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center p-3 animate-fade sm:items-center sm:p-8">
          <div
            className="absolute inset-0 bg-background/70"
            onClick={() => museumStore.set({ helpOpen: false })}
          />
          <div className="panel-surface relative w-full max-w-lg rounded-md">
            <header className="flex items-start justify-between gap-4 px-6 pb-4 pt-6">
              <div>
                <p className="label-caps text-primary">Visitor guide</p>
                <h2 className="mt-1.5 font-display text-2xl">Getting around</h2>
              </div>
              <button
                onClick={() => museumStore.set({ helpOpen: false })}
                aria-label="Close visitor guide"
                className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </header>
            <div className="hairline mx-6" />
            <div className="space-y-5 px-6 py-5">
              <dl className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <dt className="label-caps w-28 shrink-0 text-muted-foreground">Look</dt>
                  <dd className="text-foreground/90">
                    {isTouch ? "Drag one finger to look around" : "Drag with the mouse to look around"}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps w-28 shrink-0 text-muted-foreground">Zoom</dt>
                  <dd className="text-foreground/90">
                    {isTouch ? "Pinch to move closer or further" : "Scroll to move closer or further"}
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps w-28 shrink-0 text-muted-foreground">Explore</dt>
                  <dd className="text-foreground/90">
                    {isTouch ? "Tap" : "Click"} an exhibit marker to be guided to it
                  </dd>
                </div>
                <div className="flex gap-4">
                  <dt className="label-caps w-28 shrink-0 text-muted-foreground">Destinations</dt>
                  <dd className="text-foreground/90">
                    Use Explore or the Map to travel between galleries
                  </dd>
                </div>
              </dl>

              <div className="hairline space-y-3 pt-5">
                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="label-caps block text-foreground">Reduce motion</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Shorter, less cinematic camera transitions.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={reduceMotion}
                    onChange={(e) => museumStore.set({ reduceMotion: e.target.checked })}
                    className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  />
                </label>
                <label className="flex items-start justify-between gap-4">
                  <span>
                    <span className="label-caps block text-foreground">Instant travel</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      Arrive at destinations immediately, without guided movement.
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={instantTravel}
                    onChange={(e) => museumStore.set({ instantTravel: e.target.checked })}
                    className="mt-1 h-4 w-4 shrink-0 accent-primary"
                  />
                </label>
              </div>

              <p className="text-[11px] leading-relaxed text-muted-foreground/70">
                All artefacts, images and texts in this preview are demonstration content created
                for the proof of concept and do not represent authentic historical records.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
