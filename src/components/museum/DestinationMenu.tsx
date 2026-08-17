import { X } from "lucide-react";

import { DESTINATIONS } from "@/data/destinations";
import { exhibitsInGallery } from "@/data/exhibits";
import { goToDestination } from "@/lib/museum-actions";
import { museumStore, useMuseum } from "@/lib/museum-store";

export function DestinationMenu() {
  const open = useMuseum((s) => s.navOpen);
  const active = useMuseum((s) => s.activeDestinationId);

  return (
    <>
      <div
        onClick={() => museumStore.set({ navOpen: false })}
        className={`fixed inset-0 z-30 bg-background/40 transition-opacity duration-400 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />
      <aside
        aria-label="Museum map and exhibitions"
        className={`panel-surface fixed z-40 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] inset-x-0 bottom-0 max-h-[82vh] rounded-t-md border-b-0 md:inset-y-0 md:right-0 md:left-auto md:w-[26rem] md:max-h-none md:rounded-none md:border-r-0 ${
          open
            ? "translate-y-0 md:translate-x-0"
            : "pointer-events-none translate-y-full md:translate-y-0 md:translate-x-full"
        }`}
      >
        <header className="flex items-start justify-between gap-4 px-6 pb-5 pt-6">
          <div>
            <p className="label-caps text-primary">Museum map / Explore</p>
            <h2 className="mt-2 font-display text-2xl">Destinations</h2>
          </div>
          <button
            onClick={() => museumStore.set({ navOpen: false })}
            aria-label="Close destinations"
            className="rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="hairline mx-6" />

        <div className="flex-1 overflow-y-auto overscroll-contain px-3 py-3">
          <ul className="space-y-1">
            {DESTINATIONS.map((d) => {
              const isActive = active === d.id;
              const count = exhibitsInGallery(d.galleryId).length;
              return (
                <li key={d.id}>
                  <button
                    onClick={() => goToDestination(d)}
                    className={`group flex w-full items-center gap-4 rounded-sm p-3 text-left transition-colors ${
                      isActive ? "bg-secondary" : "hover:bg-secondary/60"
                    }`}
                  >
                    <img
                      src={d.thumbnail}
                      alt=""
                      loading="lazy"
                      width={112}
                      height={80}
                      className="h-14 w-20 shrink-0 rounded-[2px] object-cover opacity-90 grayscale-[35%] transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="flex items-baseline gap-2">
                        <span className="label-caps text-primary">{d.index}</span>
                        <span className="truncate font-display text-lg leading-tight">{d.name}</span>
                      </span>
                      <span className="mt-1 block truncate text-xs text-muted-foreground">
                        {d.description}
                      </span>
                      <span className="label-caps mt-1 block text-[10px] text-muted-foreground/70">
                        {count} exhibit{count === 1 ? "" : "s"}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="hairline px-6 py-4 text-[11px] leading-relaxed text-muted-foreground">
          Selecting a destination guides you through the museum. Instant travel can be
          enabled from the help panel.
        </div>
      </aside>
    </>
  );
}
