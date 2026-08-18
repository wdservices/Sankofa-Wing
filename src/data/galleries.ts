export type Rect = { x1: number; z1: number; x2: number; z2: number };

export type Gallery = {
  id: string;
  name: string;
  rect: Rect;
  /** Accent tone used for gallery lighting */
  tone: string;
};

/**
 * Museum floor plan. These rectangles drive the procedural architecture,
 * the museum map overlay and the camera containment logic. If a real
 * GLB museum is supplied later, only these rects + destination/exhibit
 * anchors need to be re-surveyed.
 */
export const GALLERIES: Gallery[] = [
  { id: "hall", name: "Grand Hall", rect: { x1: -10, z1: -20, x2: 10, z2: 28 }, tone: "#f3e3c8" },
  { id: "origins", name: "Origins Gallery", rect: { x1: -28, z1: 2, x2: -10, z2: 14 }, tone: "#f0dfc0" },
  { id: "culture", name: "Culture & Identity", rect: { x1: 10, z1: 2, x2: 28, z2: 14 }, tone: "#efdcc0" },
  { id: "heritage", name: "Sankofa Wing", rect: { x1: -20, z1: -32, x2: 20, z2: -20 }, tone: "#eeddc4" },
];

export const WALL_HEIGHT = 7;

/** Wall segments: [x1, z1, x2, z2]. Gaps are doorways / openings. */
export const WALLS: [number, number, number, number][] = [
  // Grand hall
  [-10, 28, 10, 28],
  [-10, 14, -10, 28],
  [-10, -20, -10, 2],
  [10, 14, 10, 28],
  [10, -20, 10, 2],
  [-10, -20, -3.5, -20],
  [3.5, -20, 10, -20],
  // Origins gallery (west wing)
  [-28, 2, -28, 14],
  [-28, 2, -10, 2],
  [-28, 14, -10, 14],
  // Culture gallery (east wing)
  [28, 2, 28, 14],
  [10, 2, 28, 2],
  [10, 14, 28, 14],
  // Heritage gallery (north)
  [-20, -32, 20, -32],
  [-20, -32, -20, -20],
  [20, -32, 20, -20],
  [-20, -20, -10, -20],
  [10, -20, 20, -20],
];
