import type { Vec3 } from "@/lib/museum-store";

import img01 from "@/assets/exhibit-01.jpg";
import img02 from "@/assets/exhibit-02.jpg";
import img03 from "@/assets/exhibit-03.jpg";
import img04 from "@/assets/exhibit-04.jpg";
import img05 from "@/assets/exhibit-05.jpg";
import img07 from "@/assets/exhibit-07.jpg";
import img08 from "@/assets/exhibit-08.jpg";

export type Destination = {
  id: string;
  index: string;
  name: string;
  description: string;
  galleryId: string;
  position: Vec3;
  target: Vec3;
  duration: number;
  thumbnail: string;
  /** Optional exhibit brought into focus on arrival. */
  exhibitId?: string;
};

export const DESTINATIONS: Destination[] = [
  {
    id: "entrance",
    index: "01",
    name: "Museum Entrance",
    description: "The atrium and orientation point of the archive.",
    galleryId: "hall",
    position: [0, 2.7, 24],
    target: [0, 2.5, 10],
    duration: 2200,
    thumbnail: img02,
  },
  {
    id: "origins",
    index: "02",
    name: "Origins Gallery",
    description: "Early coastal painting and photographic records.",
    galleryId: "origins",
    position: [-13.5, 2.8, 8],
    target: [-24, 2.7, 8],
    duration: 2600,
    thumbnail: img01,
  },
  {
    id: "culture",
    index: "03",
    name: "Culture & Identity",
    description: "Ceremonial objects, textiles and guild records.",
    galleryId: "culture",
    position: [13.5, 2.8, 8],
    target: [24, 2.7, 7],
    duration: 2600,
    thumbnail: img03,
  },
  {
    id: "historical",
    index: "04",
    name: "Historical Collection",
    description: "The west range of the Grand Hall.",
    galleryId: "hall",
    position: [0.5, 2.8, 0],
    target: [-9, 2.9, -6],
    duration: 2400,
    thumbnail: img05,
  },
  {
    id: "featured",
    index: "05",
    name: "Featured Exhibition",
    description: "The central plinth and its bronze centrepiece.",
    galleryId: "hall",
    position: [0, 2.9, -3.4],
    target: [0, 2.1, -11],
    duration: 2500,
    thumbnail: img07,
    exhibitId: "seated-figure",
  },
  {
    id: "artifacts",
    index: "06",
    name: "Artifacts Gallery",
    description: "Pedestals and display cases of the east wing.",
    galleryId: "culture",
    position: [17, 2.6, 5],
    target: [17.5, 1.8, 10],
    duration: 2400,
    thumbnail: img04,
  },
  {
    id: "heritage",
    index: "07",
    name: "Heritage & Legacy",
    description: "Closing gallery on continuity and change.",
    galleryId: "heritage",
    position: [0, 2.9, -22.5],
    target: [0, 2.8, -31],
    duration: 2800,
    thumbnail: img08,
  },
];

export const destinationById = (id: string) =>
  DESTINATIONS.find((d) => d.id === id) ?? DESTINATIONS[0];
