import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";

export function LoadingScreen({ onDone }: { onDone: () => void }) {
  const { progress, item, loaded, total } = useProgress();
  const [display, setDisplay] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const floor = Math.min(96, ((performance.now() - start) / 2600) * 100);
      setDisplay((prev) => Math.max(prev, Math.max(floor, progress)));
    }, 60);
    return () => clearInterval(id);
  }, [progress]);

  useEffect(() => {
    if (display < 96) return;
    const t = setTimeout(() => {
      setDisplay(100);
      setLeaving(true);
      setTimeout(onDone, 850);
    }, 500);
    return () => clearTimeout(t);
  }, [display, onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-background px-6 transition-opacity duration-700 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-md text-center">
        <p className="label-caps text-primary">Bluewaves Technology</p>
        <h1 className="mt-6 font-display text-3xl leading-tight text-foreground sm:text-4xl">
          Preparing your museum experience
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Digital Heritage Archive &amp; Interactive 3D Museum
        </p>

        <div className="mt-10 h-px w-full bg-border">
          <div
            className="h-px bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${Math.round(display)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="label-caps text-muted-foreground">
            {display < 45
              ? "Building galleries"
              : display < 80
                ? "Hanging exhibits"
                : "Adjusting gallery lighting"}
          </span>
          <span className="label-caps text-primary">{Math.round(display)}%</span>
        </div>
        <p className="mt-6 truncate text-[11px] text-muted-foreground/70">
          {total > 0 ? `${loaded} of ${total} assets · ${String(item ?? "")}` : "Loading assets"}
        </p>
      </div>
    </div>
  );
}
