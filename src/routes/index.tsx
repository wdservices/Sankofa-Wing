import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { MuseumScene } from "@/components/museum/MuseumScene";
import { LoadingScreen } from "@/components/museum/LoadingScreen";
import { MuseumControls } from "@/components/museum/MuseumControls";
import { DestinationMenu } from "@/components/museum/DestinationMenu";
import { MuseumMap } from "@/components/museum/MuseumMap";
import { ExhibitPanel } from "@/components/museum/ExhibitPanel";
import { ExhibitViewer } from "@/components/museum/ExhibitViewer";
import { ImageLightbox } from "@/components/museum/ImageLightbox";
import { museumStore, useMuseum } from "@/lib/museum-store";

const TITLE = "Virtual Museum — Bluewaves Digital Heritage Archive";
const DESCRIPTION =
  "Step inside an interactive 3D museum: choose a gallery and be guided cinematically to artefacts, paintings and archival images.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MuseumExperience,
});

function MuseumExperience() {
  const entered = useMuseum((s) => s.entered);
  const [isTouch, setIsTouch] = useState(false);
  const [quality, setQuality] = useState<"low" | "high">("high");

  useEffect(() => {
    const touch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(touch);
    const smallOrTouch = touch || window.innerWidth < 900;
    setQuality(smallOrTouch ? "low" : "high");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      museumStore.set({ reduceMotion: true });
    }
  }, []);

  const onLoaded = useCallback(() => museumStore.set({ entered: true, ready: true }), []);

  const dpr = useMemo<[number, number]>(
    () => (quality === "low" ? [1, 1.5] : [1, 2]),
    [quality],
  );

  return (
    <main className="fixed inset-0 overflow-hidden bg-background">
      <h1 className="sr-only">{TITLE}</h1>

      <Canvas
        dpr={dpr}
        shadows={false}
        gl={{ antialias: quality === "high", powerPreference: "high-performance" }}
        camera={{ position: [0, 2.7, 30], fov: isTouch ? 68 : 58, near: 0.1, far: 200 }}
        className="touch-none"
      >
        <color attach="background" args={["#12100c"]} />
        <Suspense fallback={null}>
          <MuseumScene quality={quality} isTouch={isTouch} />
        </Suspense>
      </Canvas>

      {entered && (
        <div className="animate-fade">
          <MuseumControls isTouch={isTouch} />
          <ExhibitPanel />
          <DestinationMenu />
          <MuseumMap />
        </div>
      )}

      <ExhibitViewer />
      <ImageLightbox />

      {!entered && <LoadingScreen onDone={onLoaded} />}
    </main>
  );
}
