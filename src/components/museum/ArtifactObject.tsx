import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { ArtifactShape } from "@/data/exhibits";

/**
 * Stand-in artefact geometry. Swap for a GLB scan by setting
 * `modelUrl` on the exhibit record — the anchor/camera data stays the same.
 */
export function ArtifactGeometry({ shape }: { shape: ArtifactShape }) {
  const points = useMemo(() => {
    if (shape === "vessel") {
      return new Array(14).fill(0).map((_, i) => {
        const t = i / 13;
        const r = 0.12 + Math.sin(t * Math.PI * 0.92) * 0.34;
        return new THREE.Vector2(r, t * 0.85);
      });
    }
    if (shape === "head") {
      return new Array(12).fill(0).map((_, i) => {
        const t = i / 11;
        const r = 0.3 + Math.sin(t * Math.PI) * 0.18;
        return new THREE.Vector2(r, t * 0.9);
      });
    }
    return null;
  }, [shape]);

  if (shape === "vessel" || shape === "head")
    return <latheGeometry args={[points!, shape === "vessel" ? 32 : 24]} />;
  if (shape === "ring") return <torusGeometry args={[0.22, 0.06, 20, 40]} />;
  if (shape === "mask") return <capsuleGeometry args={[0.26, 0.4, 6, 20]} />;
  if (shape === "drum") return <cylinderGeometry args={[0.3, 0.2, 0.85, 28]} />;
  if (shape === "stool") return <cylinderGeometry args={[0.42, 0.42, 0.34, 8]} />;
  if (shape === "plaque") return <boxGeometry args={[0.6, 0.8, 0.08]} />;
  return <capsuleGeometry args={[0.22, 0.5, 6, 16]} />;
}

const MATERIALS: Record<ArtifactShape, { color: string; metalness: number; roughness: number }> = {
  vessel: { color: "#b0653c", metalness: 0.05, roughness: 0.8 },
  mask: { color: "#5a3c26", metalness: 0.12, roughness: 0.55 },
  figure: { color: "#7b5a34", metalness: 0.72, roughness: 0.36 },
  head: { color: "#9a9284", metalness: 0.05, roughness: 0.9 },
  ring: { color: "#b98a3f", metalness: 0.85, roughness: 0.28 },
  drum: { color: "#6b4527", metalness: 0.08, roughness: 0.7 },
  stool: { color: "#8a6338", metalness: 0.06, roughness: 0.75 },
  plaque: { color: "#8c7a44", metalness: 0.78, roughness: 0.35 },
};

export function ArtifactObject({
  shape,
  focused,
}: {
  shape: ArtifactShape;
  focused: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const mat = MATERIALS[shape];

  useFrame((_, dt) => {
    if (!group.current) return;
    group.current.rotation.y += dt * (focused ? 0.16 : 0.05);
  });

  return (
    <group ref={group}>
      <mesh position={[0, shape === "ring" ? 0.3 : 0.05, 0]} castShadow>
        <ArtifactGeometry shape={shape} />
        <meshStandardMaterial
          color={shape === "vessel" ? "#b0653c" : mat.color}
          metalness={mat.metalness}
          roughness={mat.roughness}
        />
      </mesh>
    </group>
  );
}

/** Museum plinth with a subtle contact shadow. */
export function Pedestal({
  height = 1.05,
  width = 0.9,
  cased = false,
}: {
  height?: number;
  width?: number;
  cased?: boolean;
}) {
  return (
    <group>
      <mesh position={[0, height / 2, 0]}>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial color="#efeae0" roughness={0.85} />
      </mesh>
      <mesh position={[0, height + 0.015, 0]}>
        <boxGeometry args={[width + 0.08, 0.03, width + 0.08]} />
        <meshStandardMaterial color="#6d604e" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[width, 24]} />
        <meshBasicMaterial color="#2a241c" transparent opacity={0.22} />
      </mesh>
      {cased && (
        <mesh position={[0, height + 0.62, 0]}>
          <boxGeometry args={[width + 0.06, 1.2, width + 0.06]} />
          <meshPhysicalMaterial
            color="#dfe6e6"
            transparent
            opacity={0.12}
            roughness={0.05}
            metalness={0}
          />
        </mesh>
      )}
    </group>
  );
}
