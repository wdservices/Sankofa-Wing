import { useMemo } from "react";
import * as THREE from "three";

import { GALLERIES, WALLS, WALL_HEIGHT } from "@/data/galleries";

const THICKNESS = 0.36;

/**
 * Temporary museum architecture used until a surveyed GLB/GLTF building is
 * supplied. Geometry is intentionally low-poly and instanced-friendly so the
 * experience stays smooth on phones.
 */
export function ProceduralMuseum({ quality }: { quality: "low" | "high" }) {
  const materials = useMemo(() => {
    const floor = new THREE.MeshStandardMaterial({
      color: "#a9a294",
      roughness: 0.55,
      metalness: 0.04,
    });
    const wall = new THREE.MeshStandardMaterial({ color: "#ddd6c8", roughness: 0.9 });
    const trim = new THREE.MeshStandardMaterial({ color: "#5b4f41", roughness: 0.6 });
    const ceiling = new THREE.MeshStandardMaterial({ color: "#efe9dd", roughness: 1 });
    const cove = new THREE.MeshStandardMaterial({
      color: "#fff4dc",
      emissive: new THREE.Color("#ffe9c2"),
      emissiveIntensity: 0.9,
      roughness: 1,
    });
    const stone = new THREE.MeshStandardMaterial({ color: "#cfc7b6", roughness: 0.7 });
    const wood = new THREE.MeshStandardMaterial({ color: "#4a3a2c", roughness: 0.5 });
    return { floor, wall, trim, ceiling, cove, stone, wood };
  }, []);

  const wallPieces = useMemo(
    () =>
      WALLS.map(([x1, z1, x2, z2], i) => {
        const dx = x2 - x1;
        const dz = z2 - z1;
        const length = Math.hypot(dx, dz) + THICKNESS;
        const angle = Math.atan2(dz, dx);
        return {
          key: i,
          position: [(x1 + x2) / 2, WALL_HEIGHT / 2, (z1 + z2) / 2] as [number, number, number],
          rotation: [0, -angle, 0] as [number, number, number],
          length,
        };
      }),
    [],
  );

  return (
    <group>
      {/* Floors + ceilings + light coves per room */}
      {GALLERIES.map((g) => {
        const w = g.rect.x2 - g.rect.x1;
        const d = g.rect.z2 - g.rect.z1;
        const cx = (g.rect.x1 + g.rect.x2) / 2;
        const cz = (g.rect.z1 + g.rect.z2) / 2;
        return (
          <group key={g.id}>
            <mesh
              position={[cx, -0.06, cz]}
              rotation={[-Math.PI / 2, 0, 0]}
              material={materials.floor}
            >
              <planeGeometry args={[w, d]} />
            </mesh>
            {/* inlaid stone border */}
            <mesh position={[cx, -0.04, cz]} rotation={[-Math.PI / 2, 0, 0]} material={materials.stone}>
              <ringGeometry args={[Math.min(w, d) / 2 - 1.6, Math.min(w, d) / 2 - 1.4, 4, 1]} />
            </mesh>
            <mesh
              position={[cx, WALL_HEIGHT, cz]}
              rotation={[Math.PI / 2, 0, 0]}
              material={materials.ceiling}
            >
              <planeGeometry args={[w, d]} />
            </mesh>
            {[-1, 1].map((s) => (
              <mesh
                key={s}
                position={[cx + (w > d ? 0 : s * w * 0.22), WALL_HEIGHT - 0.12, cz + (w > d ? s * d * 0.22 : 0)]}
                material={materials.cove}
              >
                <boxGeometry
                  args={w > d ? [w - 4, 0.16, 0.7] : [0.7, 0.16, d - 4]}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Walls with baseboard and cornice */}
      {wallPieces.map((p) => (
        <group key={p.key} position={p.position} rotation={p.rotation}>
          <mesh material={materials.wall}>
            <boxGeometry args={[p.length, WALL_HEIGHT, THICKNESS]} />
          </mesh>
          <mesh position={[0, -WALL_HEIGHT / 2 + 0.18, 0]} material={materials.trim}>
            <boxGeometry args={[p.length, 0.36, THICKNESS + 0.08]} />
          </mesh>
          <mesh position={[0, WALL_HEIGHT / 2 - 0.3, 0]} material={materials.stone}>
            <boxGeometry args={[p.length, 0.22, THICKNESS + 0.1]} />
          </mesh>
        </group>
      ))}

      {/* Hall pilasters */}
      {quality === "high" &&
        [-8, 0, 8, 16, 24, -16].map((z) =>
          [-9.4, 9.4].map((x) => (
            <mesh key={`${x}-${z}`} position={[x, WALL_HEIGHT / 2, z]} material={materials.stone}>
              <boxGeometry args={[0.5, WALL_HEIGHT, 1.1]} />
            </mesh>
          )),
        )}

      {/* Entrance threshold + runner */}
      <mesh position={[0, 0.01, 20]} rotation={[-Math.PI / 2, 0, 0]} material={materials.wood}>
        <planeGeometry args={[6, 9]} />
      </mesh>

      {/* Benches in the hall */}
      {[6, -2, -14].map((z) => (
        <group key={z} position={[0, 0, z]}>
          <mesh position={[0, 0.42, 0]} material={materials.wood}>
            <boxGeometry args={[3.4, 0.16, 0.8]} />
          </mesh>
          {[-1.4, 1.4].map((x) => (
            <mesh key={x} position={[x, 0.19, 0]} material={materials.stone}>
              <boxGeometry args={[0.3, 0.42, 0.7]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
