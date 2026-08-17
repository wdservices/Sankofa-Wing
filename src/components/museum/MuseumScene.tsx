import { Suspense } from "react";
import { Preload } from "@react-three/drei";

import { EXHIBITS, type Exhibit } from "@/data/exhibits";
import { useMuseum, type Vec3 } from "@/lib/museum-store";
import { goToExhibit } from "@/lib/museum-actions";

import { CameraController } from "./CameraController";
import { MuseumModel } from "./MuseumModel";
import { WallWork } from "./WallWork";
import { ArtifactObject, Pedestal } from "./ArtifactObject";
import { ExhibitHotspot } from "./ExhibitHotspot";

const WALL_KINDS = ["painting", "photograph", "document", "textile"];

function normalOf(rotationY = 0): Vec3 {
  return [Math.sin(rotationY), 0, Math.cos(rotationY)];
}

function hotspotFor(e: Exhibit): Vec3 {
  if (WALL_KINDS.includes(e.kind)) {
    const n = normalOf(e.rotationY);
    const h = e.size?.[1] ?? 3.6;
    return [
      e.anchor[0] + n[0] * 0.45,
      e.anchor[1] - h / 2 - 0.45,
      e.anchor[2] + n[2] * 0.45,
    ];
  }
  return [e.anchor[0], e.anchor[1] + 1.95, e.anchor[2]];
}

function ObjectExhibit({ exhibit, focused }: { exhibit: Exhibit; focused: boolean }) {
  const cased = exhibit.shape === "vessel" || exhibit.shape === "ring";
  const height = cased ? 0.95 : 1.15;
  return (
    <group position={exhibit.anchor}>
      <Pedestal height={height} width={cased ? 0.8 : 0.95} cased={cased} />
      <group position={[0, height + 0.35, 0]} scale={exhibit.shape === "ring" ? 0.9 : 1.15}>
        <ArtifactObject shape={exhibit.shape ?? "figure"} focused={focused} />
      </group>
      <pointLight
        position={[0, height + 2.4, 0.4]}
        distance={5.2}
        decay={2}
        intensity={focused ? 12 : 7}
        color="#fff2da"
      />
    </group>
  );
}

export function MuseumScene({
  quality,
  isTouch,
}: {
  quality: "low" | "high";
  isTouch: boolean;
}) {
  const focusedExhibitId = useMuseum((s) => s.focusedExhibitId);

  return (
    <>
      <CameraController />

      {/* Museum-style lighting: soft ambient fill plus focused exhibit light */}
      <ambientLight intensity={0.85} color="#fdf3e2" />
      <hemisphereLight args={["#fff6e6", "#4a4238", 0.55]} />
      <directionalLight position={[0, 12, 20]} intensity={0.35} color="#fff4e3" />
      {quality === "high" && (
        <directionalLight position={[-14, 10, -22]} intensity={0.22} color="#f6e7cf" />
      )}
      <fog attach="fog" args={["#1a1712", 34, 90]} />

      <Suspense fallback={null}>
        <MuseumModel quality={quality} />
      </Suspense>

      {EXHIBITS.map((e) => {
        const focused = focusedExhibitId === e.id;
        return (
          <group key={e.id}>
            {WALL_KINDS.includes(e.kind) ? (
              <WallWork exhibit={e} focused={focused} />
            ) : (
              <ObjectExhibit exhibit={e} focused={focused} />
            )}
            <ExhibitHotspot
              exhibit={e}
              position={hotspotFor(e)}
              isTouch={isTouch}
              focused={focused}
              onSelect={() => goToExhibit(e)}
            />
          </group>
        );
      })}

      <Preload all />
    </>
  );
}
