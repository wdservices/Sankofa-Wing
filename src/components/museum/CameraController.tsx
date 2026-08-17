import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";

import { useMuseum } from "@/lib/museum-store";
import {
  TRAVEL_HEIGHT,
  clampToMuseum,
  easeInOutCubic,
  routeWaypoints,
  smoothstep,
} from "@/lib/museum-geometry";

type Flight = {
  curve: THREE.CatmullRomCurve3;
  fromTarget: THREE.Vector3;
  toTarget: THREE.Vector3;
  start: number;
  duration: number;
};

export function CameraController() {
  const controls = useRef<OrbitControlsImpl | null>(null);
  const flight = useRef<Flight | null>(null);
  const { camera } = useThree();
  const move = useMuseum((s) => s.move);

  useEffect(() => {
    if (!move) return;
    const to = new THREE.Vector3(...move.position);
    const toTarget = new THREE.Vector3(...move.target);
    const ctl = controls.current;

    if (move.duration <= 0 || !ctl) {
      camera.position.copy(to);
      if (ctl) {
        ctl.target.copy(toTarget);
        ctl.update();
      }
      flight.current = null;
      return;
    }

    const from = camera.position.clone();
    const waypoints = routeWaypoints(
      [from.x, from.y, from.z],
      [to.x, to.y, to.z],
    ).map((p) => new THREE.Vector3(p[0], TRAVEL_HEIGHT, p[2]));

    const points = [from, ...waypoints, to];
    const curve = new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.35);
    const legs = Math.max(1, waypoints.length);

    flight.current = {
      curve,
      fromTarget: ctl.target.clone(),
      toTarget,
      start: performance.now(),
      duration: move.duration * (waypoints.length ? 1 + legs * 0.28 : 1),
    };
  }, [move, camera]);

  useFrame(() => {
    const ctl = controls.current;
    if (!ctl) return;
    const f = flight.current;

    if (f) {
      const raw = Math.min(1, (performance.now() - f.start) / f.duration);
      const e = easeInOutCubic(raw);
      camera.position.copy(f.curve.getPoint(e));

      // Look along the path first, then settle onto the exhibit target.
      const ahead = f.curve.getPoint(Math.min(1, e + 0.07));
      const settle = smoothstep((e - 0.5) / 0.5);
      ctl.target.copy(ahead.lerp(f.toTarget, Math.max(settle, e >= 1 ? 1 : 0)));
      ctl.update();
      if (raw >= 1) {
        ctl.target.copy(f.toTarget);
        ctl.update();
        flight.current = null;
      }
      return;
    }

    clampToMuseum(camera.position);
    clampToMuseum(ctl.target, 0.4);
  });

  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      enablePan={false}
      minDistance={0.6}
      maxDistance={16}
      minPolarAngle={Math.PI * 0.22}
      maxPolarAngle={Math.PI * 0.62}
      rotateSpeed={0.5}
      zoomSpeed={0.6}
      touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE }}
    />
  );
}
