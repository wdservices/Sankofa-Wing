import type { Vec3 } from "@/lib/museum-store";

import img01 from "@/assets/exhibit-01.jpg";
import img02 from "@/assets/exhibit-02.jpg";
import img03 from "@/assets/exhibit-03.jpg";
import img04 from "@/assets/exhibit-04.jpg";
import img05 from "@/assets/exhibit-05.jpg";
import img06 from "@/assets/exhibit-06.jpg";
import img07 from "@/assets/exhibit-07.jpg";
import img08 from "@/assets/exhibit-08.jpg";

export type ExhibitKind = "painting" | "photograph" | "document" | "textile" | "object";

/** Procedural stand-in geometry keys used until real GLB artifacts are supplied. */
export type ArtifactShape =
  | "vessel"
  | "mask"
  | "figure"
  | "head"
  | "ring"
  | "drum"
  | "stool"
  | "plaque";

export type Exhibit = {
  id: string;
  index: string;
  name: string;
  collection: string;
  period: string;
  galleryId: string;
  locationLabel: string;
  description: string;
  detail: string;
  kind: ExhibitKind;
  image?: string;
  
  images?: string[];
  /** Replace with a GLB url when real artifact scans exist. */
  modelUrl?: string;
  shape?: ArtifactShape;
  audio?: boolean;
  video?: boolean;
  /** World anchor of the artefact inside the museum. */
  anchor: Vec3;
  /** Y rotation of a wall-mounted work, radians. */
  rotationY?: number;
  /** Wall work size in metres [width, height]. */
  size?: [number, number];
  /** Predefined viewing position + look-at target. */
  camera: Vec3;
  target: Vec3;
  duration?: number;
};

export const EXHIBITS: Exhibit[] = [
  {
    id: "harbour-dawn",
    index: "01",
    name: "Harbour at First Light",
    collection: "Origins Collection",
    period: "c. 1908",
    galleryId: "origins",
    locationLabel: "Origins Gallery — West Wall",
    description:
      "An oil study of a working harbour at dawn, painted from the pier by an unrecorded coastal artist.",
    detail:
      "The composition places the viewer at water level, among the moored boats. Pigment analysis of comparable works from the region suggests a locally milled ochre. This is demonstration content prepared for the Bluewaves Virtual Museum.",
    kind: "painting",
    image: img01,
    images: [img01, img08],
    audio: true,
    anchor: [-27.75, 3.3, 6],
    rotationY: Math.PI / 2,
    size: [3.1, 4],
    camera: [-22.6, 2.7, 6],
    target: [-27.75, 3.2, 6],
  },
  {
    index: "02",
    id: "market-day",
    name: "Market Day",
    collection: "Origins Collection",
    period: "late 19th century",
    galleryId: "origins",
    locationLabel: "Origins Gallery — North Wall",
    description:
      "An archival photographic print recording a weekly trading market and its basket makers.",
    detail:
      "Contact-printed from a glass plate negative. The basket forms in the foreground remain in production today, making the print a reference point for continuity of craft. Demonstration content.",
    kind: "photograph",
    image: img02,
    images: [img02],
    anchor: [-19, 3.2, 13.75],
    rotationY: Math.PI,
    size: [4.4, 3.4],
    camera: [-19, 2.6, 8.6],
    target: [-19, 3.1, 13.75],
  },
  {
    id: "ceremonial-mask",
    index: "03",
    name: "Ceremonial Mask",
    collection: "Culture & Identity",
    period: "attributed 1840–1880",
    galleryId: "culture",
    locationLabel: "Culture & Identity — Pedestal I",
    description:
      "A carved hardwood mask with inlaid bronze crest, used in seasonal ceremony.",
    detail:
      "Carved from a single block, with a bronze disc set into the brow. Surface wear along the lower edge indicates repeated ceremonial handling. Demonstration content.",
    kind: "object",
    image: img03,
    shape: "mask",
    audio: true,
    video: true,
    anchor: [14, 0, 8],
    camera: [14, 2.3, 11.4],
    target: [14, 1.75, 8],
  },
  {
    id: "terracotta-vessel",
    index: "04",
    name: "Incised Terracotta Vessel",
    collection: "Historical Collection",
    period: "c. 15th century",
    galleryId: "culture",
    locationLabel: "Culture & Identity — Display Case",
    description:
      "A storage vessel with banded geometric incision, recovered from a domestic site.",
    detail:
      "The banded decoration was cut before firing with a shaped reed. The vessel's profile suggests grain storage rather than water carriage. Demonstration content.",
    kind: "object",
    image: img04,
    shape: "vessel",
    anchor: [20.5, 0, 10],
    camera: [20.5, 2.2, 13.2],
    target: [20.5, 1.5, 10],
  },
  {
    id: "guild-charter",
    index: "05",
    name: "Charter of the River Guild",
    collection: "Documents & Records",
    period: "1871",
    galleryId: "culture",
    locationLabel: "Culture & Identity — East Wall",
    description: "A sealed charter setting out the obligations of a river traders' guild.",
    detail:
      "Iron gall ink on laid paper with an intact wax seal. Conservation notes record a stabilised tear along the lower fold. Demonstration content.",
    kind: "document",
    image: img05,
    images: [img05],
    anchor: [27.75, 3.3, 6],
    rotationY: -Math.PI / 2,
    size: [2.9, 3.7],
    camera: [22.6, 2.7, 6],
    target: [27.75, 3.2, 6],
  },
  {
    id: "indigo-weave",
    index: "06",
    name: "Indigo Weave Panel",
    collection: "Historical Collection",
    period: "early 20th century",
    galleryId: "hall",
    locationLabel: "Grand Hall — West Wall",
    description:
      "A narrow-loom cloth of indigo and gold, assembled from six woven strips.",
    detail:
      "Strip-woven and hand stitched, with a repeating lozenge motif that identifies the weaving house. Dye saturation varies between strips, a signature of open-vat indigo. Demonstration content.",
    kind: "textile",
    image: img06,
    images: [img06],
    audio: true,
    anchor: [-9.75, 3.3, -3.5],
    rotationY: Math.PI / 2,
    size: [4.6, 3.6],
    camera: [-5, 2.6, -3.5],
    target: [-9.75, 3.2, -3.5],
  },
  {
    id: "seated-figure",
    index: "07",
    name: "Seated Figure in Bronze",
    collection: "Featured Exhibition",
    period: "cast 1962",
    galleryId: "hall",
    locationLabel: "Grand Hall — Central Plinth",
    description:
      "A lost-wax bronze of a seated figure, the centrepiece of the current exhibition.",
    detail:
      "Cast in a single pour with a chased and waxed patina. The lowered gaze and folded cloth are recurring devices in the sculptor's late work. Demonstration content.",
    kind: "object",
    image: img07,
    shape: "figure",
    audio: true,
    video: true,
    anchor: [0, 0, -10],
    camera: [0, 2.5, -5.2],
    target: [0, 1.9, -10],
    duration: 2400,
  },
  {
    id: "strata",
    index: "08",
    name: "Strata (Study VII)",
    collection: "Featured Exhibition",
    period: "2018",
    galleryId: "hall",
    locationLabel: "Grand Hall — East Wall",
    description:
      "A large canvas in earth pigment and charcoal, part of a seven-work sequence.",
    detail:
      "Layered pigment washes are interrupted by a single horizon of charcoal, a motif the artist described as \"the line the land remembers\". Demonstration content.",
    kind: "painting",
    image: img08,
    images: [img08, img01],
    anchor: [9.75, 3.3, -3.5],
    rotationY: -Math.PI / 2,
    size: [4.8, 3.7],
    camera: [5, 2.6, -3.5],
    target: [9.75, 3.2, -3.5],
  },
  {
    id: "guardian-head",
    index: "09",
    name: "Guardian Head",
    collection: "Sankofa Wing",
    period: "undated",
    galleryId: "heritage",
    locationLabel: "Sankofa Wing — Pedestal II",
    description: "A carved stone head recovered from a boundary shrine.",
    detail:
      "Weathering on the left side indicates long outdoor exposure. Comparable heads mark thresholds and river crossings. Demonstration content.",
    kind: "object",
    shape: "head",
    image: img03,
    anchor: [-12, 0, -27],
    camera: [-12, 2.2, -23.4],
    target: [-12, 1.7, -27],
  },
  {
    id: "legacy-panel",
    index: "10",
    name: "Legacy Panel",
    collection: "Sankofa Wing",
    period: "1893 / 2024",
    galleryId: "heritage",
    locationLabel: "Sankofa Wing — North Wall",
    description:
      "A paired presentation of an archival print and its contemporary re-photograph.",
    detail:
      "Displayed together to show a century of change on one street. The pairing model is intended for client archives holding both historic and current imagery. Demonstration content.",
    kind: "photograph",
    image: img02,
    images: [img02, img06],
    anchor: [0, 3.2, -31.75],
    rotationY: 0,
    size: [5.2, 3.6],
    camera: [0, 2.6, -26.6],
    target: [0, 3.1, -31.75],
  },
  {
    id: "ring-of-office",
    index: "11",
    name: "Ring of Office",
    collection: "Sankofa Wing",
    period: "c. 1910",
    galleryId: "heritage",
    locationLabel: "Sankofa Wing — Display Case",
    description: "A cast ring worn as an emblem of civic office.",
    detail:
      "Hollow-cast with a raised bezel that once carried an inset stone. Records list it among regalia transferred on appointment. Demonstration content.",
    kind: "object",
    shape: "ring",
    image: img04,
    anchor: [12, 0, -27],
    camera: [12, 2.1, -23.6],
    target: [12, 1.5, -27],
  },
  {
    id: "talking-drum",
    index: "12",
    name: "Talking Drum",
    collection: "Sankofa Wing",
    period: "c. 1930",
    galleryId: "heritage",
    locationLabel: "Sankofa Wing — Pedestal III",
    description: "An hourglass drum whose tension cords let a player imitate speech tones.",
    detail:
      "Carved from a single length of hardwood with a laced hide membrane at each end. Squeezing the cords raises the pitch, allowing the drum to carry spoken phrases across distance. Demonstration content.",
    kind: "object",
    shape: "drum",
    image: img03,
    audio: true,
    anchor: [-5, 0, -24.5],
    camera: [-5, 2.2, -21.2],
    target: [-5, 1.7, -24.5],
  },
  {
    id: "royal-stool",
    index: "13",
    name: "Royal Stool",
    collection: "Sankofa Wing",
    period: "attributed 19th century",
    galleryId: "heritage",
    locationLabel: "Sankofa Wing — Pedestal IV",
    description: "A carved wooden stool held as the seat of a lineage's authority.",
    detail:
      "Cut from one block, with a crescent seat above a pierced central column. Stools of this type are kept as the spiritual seat of a family line rather than everyday furniture. Demonstration content.",
    kind: "object",
    shape: "stool",
    image: img04,
    anchor: [5, 0, -24.5],
    camera: [5, 2.2, -21.2],
    target: [5, 1.6, -24.5],
  },
  {
    id: "bronze-plaque",
    index: "14",
    name: "Court Bronze Plaque",
    collection: "Sankofa Wing",
    period: "attributed 17th century",
    galleryId: "heritage",
    locationLabel: "Sankofa Wing — Display Case II",
    description: "A relief plaque in cast brass showing an attendant of the royal court.",
    detail:
      "Cast by the lost-wax method and once fixed to a timber pillar of a palace hall. The patterned ground and beaded collar mark the figure's rank. Demonstration content.",
    kind: "object",
    shape: "plaque",
    image: img07,
    video: true,
    anchor: [-17, 0, -23],
    camera: [-14.2, 2.2, -22],
    target: [-17, 1.6, -23],
  },
  {
    id: "nok-figure",
    index: "15",
    name: "Terracotta Standing Figure",
    collection: "Origins Collection",
    period: "attributed 500 BCE – 200 CE",
    galleryId: "origins",
    locationLabel: "Origins Gallery — Pedestal I",
    description: "A modelled terracotta figure with elaborate coiffure and beadwork.",
    detail:
      "Coil-built and burnished before firing. The pierced pupils and triangular eyes are diagnostic of the tradition. Demonstration content.",
    kind: "object",
    shape: "figure",
    image: img03,
    anchor: [-24, 0, 10],
    camera: [-24, 2.2, 6.9],
    target: [-24, 1.8, 10],
  },
  {
    id: "river-passage",
    index: "16",
    name: "River Passage",
    collection: "Culture & Identity",
    period: "1954",
    galleryId: "culture",
    locationLabel: "Culture & Identity — North Wall",
    description: "A painted study of canoes crossing a wide river at dusk.",
    detail:
      "Broad palette-knife strokes describe the current, with figures reduced to silhouettes against the last light. Demonstration content.",
    kind: "painting",
    image: img01,
    images: [img01, img06],
    anchor: [19, 3.2, 13.75],
    rotationY: Math.PI,
    size: [4.2, 3.3],
    camera: [19, 2.6, 8.8],
    target: [19, 3.1, 13.75],
  },
];

export const exhibitById = (id: string | null) =>
  (id ? EXHIBITS.find((e) => e.id === id) : undefined) ?? undefined;

export const exhibitsInGallery = (galleryId: string) =>
  EXHIBITS.filter((e) => e.galleryId === galleryId);
