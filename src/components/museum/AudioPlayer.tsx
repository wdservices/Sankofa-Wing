import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";

/**
 * Narration player. No audio autoplays. When real narration files exist,
 * pass `src` and swap the simulated timeline for an <audio> element.
 */
export function AudioPlayer({ title, duration = 96 }: { title: string; duration?: number }) {
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    setPlaying(false);
    setTime(0);
  }, [title]);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = () => {
      const now = performance.now();
      setTime((t) => {
        const next = t + (now - last) / 1000;
        last = now;
        if (next >= duration) {
          setPlaying(false);
          return duration;
        }
        return next;
      });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [playing, duration]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="rounded-sm border border-border bg-secondary/40 p-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause narration" : "Play narration"}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/70 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
        <div className="min-w-0 flex-1">
          <p className="label-caps text-muted-foreground">Curator narration</p>
          <div className="mt-2 h-px w-full bg-border">
            <div
              className="h-px bg-primary transition-[width] duration-200"
              style={{ width: `${(time / duration) * 100}%` }}
            />
          </div>
        </div>
        <span className="label-caps shrink-0 text-muted-foreground">
          {fmt(time)} / {fmt(duration)}
        </span>
      </div>
      <label className="mt-3 flex items-center gap-2 text-muted-foreground">
        <Volume2 className="h-3.5 w-3.5" />
        <span className="sr-only">Narration volume</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="h-1 w-full accent-primary"
        />
      </label>
      <p className="mt-2 text-[10px] text-muted-foreground/70">
        Demonstration narration track — replaced by client audio in production.
      </p>
    </div>
  );
}
