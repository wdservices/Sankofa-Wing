import { Suspense } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

import type { Exhibit } from "@/data/exhibits";

function Canvas2D({ url, size }: { url: string; size: [number, number] }) {
  const texture = useTexture(url);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return (
    <mesh position={[0, 0, 0.1]}>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial map={texture} roughness={0.75} />
    </mesh>
  );
}

/** A framed wall work: painting, photograph, document or textile panel. */
export function WallWork({
  exhibit,
  focused,
  onSelect,
}: {
  exhibit: Exhibit;
  focused: boolean;
  onSelect?: () => void;
}) {
  const [w, h] = exhibit.size ?? [3, 4];
  const frame = 0.16;

  return (
    <group
      position={exhibit.anchor}
      rotation={[0, exhibit.rotationY ?? 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        onSelect?.();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      {/* frame */}
      <mesh>
        <boxGeometry args={[w + frame * 2, h + frame * 2, 0.12]} />
        <meshStandardMaterial color="#4e3d2b" roughness={0.45} metalness={0.15} />
      </mesh>
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[w + frame * 0.7, h + frame * 0.7, 0.06]} />
        <meshStandardMaterial color="#b98a3f" roughness={0.4} metalness={0.5} />
      </mesh>
      <Suspense fallback={null}>
        <Canvas2D url={exhibit.image!} size={[w, h]} />
      </Suspense>

      {/* wall label */}
      <mesh position={[w / 2 + 0.55, -h / 2 + 0.2, 0.04]}>
        <planeGeometry args={[0.5, 0.32]} />
        <meshStandardMaterial color="#f2ece0" roughness={1} />
      </mesh>

      {/* picture light */}
      <pointLight
        position={[0, h / 2 + 0.9, 1.5]}
        distance={6}
        decay={2}
        intensity={focused ? 14 : 8}
        color="#fff1d8"
      />
    </group>
  );
}
