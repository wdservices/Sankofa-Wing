import { DESTINATIONS, destinationById, type Destination } from "@/data/destinations";
import { EXHIBITS, type Exhibit } from "@/data/exhibits";
import { museumStore } from "@/lib/museum-store";

let panelTimer: ReturnType<typeof setTimeout> | null = null;

function schedulePanel(exhibitId: string | null, delay: number) {
  if (panelTimer) clearTimeout(panelTimer);
  if (!exhibitId) {
    museumStore.set({ panelExhibitId: null });
    return;
  }
  panelTimer = setTimeout(() => museumStore.set({ panelExhibitId: exhibitId }), delay);
}

export function goToDestination(destination: Destination | string) {
  const d = typeof destination === "string" ? destinationById(destination) : destination;
  const { instantTravel, reduceMotion } = museumStore.getState();
  museumStore.set({
    activeDestinationId: d.id,
    focusedExhibitId: d.exhibitId ?? null,
    panelExhibitId: null,
    navOpen: false,
    mapOpen: false,
  });
  museumStore.travel(d.position, d.target, d.duration);
  const wait = instantTravel ? 120 : reduceMotion ? 500 : d.duration * 0.9;
  schedulePanel(d.exhibitId ?? null, wait);
}

export function goToExhibit(exhibit: Exhibit | string) {
  const e = typeof exhibit === "string" ? EXHIBITS.find((x) => x.id === exhibit) : exhibit;
  if (!e) return;
  const { instantTravel, reduceMotion } = museumStore.getState();
  const duration = e.duration ?? 2000;
  const destination = DESTINATIONS.find((d) => d.galleryId === e.galleryId);
  museumStore.set({
    focusedExhibitId: e.id,
    panelExhibitId: null,
    navOpen: false,
    mapOpen: false,
    ...(destination ? { activeDestinationId: destination.id } : {}),
  });
  museumStore.travel(e.camera, e.target, duration);
  schedulePanel(e.id, instantTravel ? 120 : reduceMotion ? 500 : duration * 0.85);
}

export function closeExhibit() {
  if (panelTimer) clearTimeout(panelTimer);
  museumStore.set({ panelExhibitId: null, focusedExhibitId: null, viewerExhibitId: null, lightboxExhibitId: null });
}

/** Returns the visitor to the overview position of the current gallery. */
export function resetCamera() {
  const { activeDestinationId } = museumStore.getState();
  closeExhibit();
  const d = destinationById(activeDestinationId);
  museumStore.travel(d.position, d.target, Math.round(d.duration * 0.7));
}
