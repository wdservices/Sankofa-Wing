import { Suspense, useEffect, useState } from "react";
import { useGLTF } from "@react-three/drei";

import { ProceduralMuseum } from "./ProceduralMuseum";

const MODEL_URL = "/models/museum.glb";

function RealMuseum({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

/**
 * Integration point for the real museum building.
 *
 * Drop a surveyed model at /public/models/museum.glb and it is used
 * automatically; destinations and exhibit anchors in /src/data stay the
 * single source of truth for camera placement. Until then the procedural
 * architecture stands in.
 */
export function MuseumModel({ quality }: { quality: "low" | "high" }) {
  const [hasModel, setHasModel] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(MODEL_URL, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (alive) setHasModel(r.ok && !type.includes("text/html"));
      })
      .catch(() => alive && setHasModel(false));
    return () => {
      alive = false;
    };
  }, []);

  if (hasModel) {
    return (
      <Suspense fallback={<ProceduralMuseum quality={quality} />}>
        <RealMuseum url={MODEL_URL} />
      </Suspense>
    );
  }
  return <ProceduralMuseum quality={quality} />;
}
