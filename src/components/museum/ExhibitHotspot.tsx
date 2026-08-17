import { useState } from "react";
import { Html } from "@react-three/drei";

import type { Exhibit } from "@/data/exhibits";
import type { Vec3 } from "@/lib/museum-store";

export function ExhibitHotspot({
  exhibit,
  position,
  isTouch,
  focused,
  onSelect,
}: {
  exhibit: Exhibit;
  position: Vec3;
  isTouch: boolean;
  focused: boolean;
  onSelect: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const open = hovered || focused;

  return (
    <Html position={position} center distanceFactor={9} zIndexRange={[20, 0]} occlude>
      <button
        type="button"
        onClick={onSelect}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        aria-label={`Explore exhibit ${exhibit.name}`}
        className="group flex items-center gap-2 rounded-full border border-primary/60 bg-background/70 px-2 py-2 text-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary"
      >
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inset-0 rounded-full bg-primary" />
          <span className="absolute -inset-1.5 rounded-full border border-primary/40" />
        </span>
        <span
          className={`label-caps overflow-hidden whitespace-nowrap text-primary transition-all duration-300 ${
            open ? "max-w-[13rem] pr-1 opacity-100" : "max-w-0 opacity-0"
          }`}
        >
          {isTouch ? "Tap to explore" : "Explore exhibit"}
        </span>
      </button>
    </Html>
  );
}
