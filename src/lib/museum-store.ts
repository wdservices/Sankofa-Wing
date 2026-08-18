import { useSyncExternalStore } from "react";

export type Vec3 = [number, number, number];

export type CameraMove = {
  position: Vec3;
  target: Vec3;
  duration: number;
  token: number;
};

export type MuseumState = {
  ready: boolean;
  progress: number;
  entered: boolean;
  activeDestinationId: string;
  focusedExhibitId: string | null;
  panelExhibitId: string | null;
  viewerExhibitId: string | null;
  lightboxExhibitId: string | null;
  navOpen: boolean;
  mapOpen: boolean;
  helpOpen: boolean;
  reduceMotion: boolean;
  instantTravel: boolean;
  travelPace: number;
  hintDismissed: boolean;
  move: CameraMove | null;
};

const initial: MuseumState = {
  ready: false,
  progress: 0,
  entered: false,
  activeDestinationId: "entrance",
  focusedExhibitId: null,
  panelExhibitId: null,
  viewerExhibitId: null,
  lightboxExhibitId: null,
  navOpen: false,
  mapOpen: false,
  helpOpen: false,
  reduceMotion: false,
  instantTravel: false,
  travelPace: 1,
  hintDismissed: false,
  move: null,
};

let state: MuseumState = initial;
const listeners = new Set<() => void>();
let token = 0;

function set(patch: Partial<MuseumState>) {
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export const museumStore = {
  getState: () => state,
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  set,
  travel(position: Vec3, target: Vec3, baseDuration = 2000) {
    const { reduceMotion, instantTravel, travelPace } = state;
    const paced = baseDuration / (travelPace || 1);
    const duration = instantTravel ? 0 : reduceMotion ? Math.min(600, paced * 0.35) : paced;
    token += 1;
    set({ move: { position, target, duration, token } });
  },
};

export function useMuseum<T>(selector: (s: MuseumState) => T): T {
  return useSyncExternalStore(
    museumStore.subscribe,
    () => selector(state),
    () => selector(initial),
  );
}
