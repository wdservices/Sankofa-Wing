import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { RotateCcw, X } from "lucide-react";
import { useRef } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import { exhibitById } from "@/data/exhibits";
import { museumStore, useMuseum } from "@/lib/museum-store";

import { ArtifactObject } from "./ArtifactObject";

/** Full-object inspection view presented as a museum study room. */
export function ExhibitViewer() {
  const id = useMuseum((s) => s.viewerExhibitId);
  const exhibit = exhibitById(id);
  const controls = useRef<OrbitControlsImpl | null>(null);

  if (!exhibit) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/96 animate-fade">
      <header className="flex items-start justify-between gap-4 px-5 pb-4 pt-5 sm:px-8">
        <div>
          <p className="label-caps text-primary">Object study · {exhibit.index}</p>
          <h2 className="mt-1.5 font-display text-2xl">{exhibit.name}</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            {exhibit.period} · {exhibit.collection}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => controls.current?.reset()}
            aria-label="Reset view"
            className="flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span className="label-caps hidden sm:inline">Reset</span>
          </button>
          <button
            onClick={() => museumStore.set({ viewerExhibitId: null })}
            aria-label="Close object study"
            className="flex items-center gap-2 rounded-sm border border-border px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </header>
      <div className="hairline mx-5 sm:mx-8" />

      <div className="relative flex-1">
        <Canvas dpr={[1, 1.75]} camera={{ position: [0, 0.4, 2.6], fov: 40 }}>
          <Suspense fallback={null}>
            <Stage intensity={0.5} environment="city" shadows={false} adjustCamera={1.5}>
              <ArtifactObject shape={exhibit.shape ?? "figure"} focused />
            </Stage>
          </Suspense>
          <OrbitControls
            ref={controls}
            makeDefault
            enableDamping
            enablePan
            minDistance={0.9}
            maxDistance={5}
          />
        </Canvas>
        <p className="label-caps pointer-events-none absolute inset-x-0 bottom-5 text-center text-muted-foreground">
          Drag to rotate · Pinch or scroll to zoom
        </p>
      </div>
    </div>
  );
}
