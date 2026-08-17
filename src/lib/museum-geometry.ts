import * as THREE from "three";
import { GALLERIES, type Rect } from "@/data/galleries";
import type { Vec3 } from "@/lib/museum-store";

export const TRAVEL_HEIGHT = 2.7;
export const MIN_EYE = 1.5;
export const MAX_EYE = 4.6;

const inside = (r: Rect, x: number, z: number, inset = 0) =>
  x > r.x1 + inset && x < r.x2 - inset && z > r.z1 + inset && z < r.z2 - inset;

export function roomOf(x: number, z: number, inset = 0) {
  return GALLERIES.find((g) => inside(g.rect, x, z, inset)) ?? null;
}

export function rectCenter(r: Rect): [number, number] {
  return [(r.x1 + r.x2) / 2, (r.z1 + r.z2) / 2];
}

/** Doorway/opening centre that connects each wing to the Grand Hall. */
const DOORWAYS: Record<string, [number, number]> = {
  origins: [-10, 8],
  culture: [10, 8],
  heritage: [0, -20],
};

/** Interior hall waypoints used to route the camera without clipping walls. */
const HALL_STOPS: Record<string, [number, number]> = {
  origins: [-4, 8],
  culture: [4, 8],
  heritage: [0, -14],
};

/**
 * Produces intermediate waypoints so camera transitions travel through
 * doorways instead of straight through walls.
 */
export function routeWaypoints(from: Vec3, to: Vec3): Vec3[] {
  const a = roomOf(from[0], from[2])?.id ?? "hall";
  const b = roomOf(to[0], to[2])?.id ?? "hall";
  const y = TRAVEL_HEIGHT;
  if (a === b) return [];

  const points: Vec3[] = [];
  const exitWing = (id: string) => {
    const d = DOORWAYS[id];
    const s = HALL_STOPS[id];
    if (d) points.push([d[0], y, d[1]]);
    if (s) points.push([s[0], y, s[1]]);
  };
  const enterWing = (id: string) => {
    const s = HALL_STOPS[id];
    const d = DOORWAYS[id];
    if (s) points.push([s[0], y, s[1]]);
    if (d) points.push([d[0], y, d[1]]);
  };

  if (a !== "hall") exitWing(a);
  if (a !== "hall" && b !== "hall") points.push([0, y, 2]);
  if (b !== "hall") enterWing(b);
  return points;
}

/** Keeps the visitor inside the building with a comfortable eye height. */
export function clampToMuseum(v: THREE.Vector3, inset = 1.1) {
  v.y = THREE.MathUtils.clamp(v.y, MIN_EYE, MAX_EYE);
  if (roomOf(v.x, v.z, inset)) return v;

  let best: { d: number; x: number; z: number } | null = null;
  for (const g of GALLERIES) {
    const r = g.rect;
    const x = THREE.MathUtils.clamp(v.x, r.x1 + inset, r.x2 - inset);
    const z = THREE.MathUtils.clamp(v.z, r.z1 + inset, r.z2 - inset);
    const d = (x - v.x) ** 2 + (z - v.z) ** 2;
    if (!best || d < best.d) best = { d, x, z };
  }
  if (best) {
    v.x = best.x;
    v.z = best.z;
  }
  return v;
}

export function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

export function smoothstep(t: number) {
  const x = THREE.MathUtils.clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
}
