"use client";

import { useEffect, useRef, useState } from "react";

type PointerTarget = {
  rotateX: number;
  rotateY: number;
  translateX: number;
  translateY: number;
};

const INITIAL_TARGET: PointerTarget = {
  rotateX: 0,
  rotateY: 0,
  translateX: 0,
  translateY: 0,
};

export function MemojiMotion() {
  const frameRef = useRef<number | null>(null);
  const targetRef = useRef<PointerTarget>(INITIAL_TARGET);
  const currentRef = useRef<PointerTarget>(INITIAL_TARGET);
  const [transform, setTransform] = useState("perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      targetRef.current = INITIAL_TARGET;
      currentRef.current = INITIAL_TARGET;
      setTransform("perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)");
      return;
    }

    const tick = () => {
      const current = currentRef.current;
      const target = targetRef.current;
      const easing = 0.08;

      current.rotateX += (target.rotateX - current.rotateX) * easing;
      current.rotateY += (target.rotateY - current.rotateY) * easing;
      current.translateX += (target.translateX - current.translateX) * easing;
      current.translateY += (target.translateY - current.translateY) * easing;

      setTransform(
        `perspective(900px) rotateX(${current.rotateX.toFixed(2)}deg) rotateY(${current.rotateY.toFixed(2)}deg) translate3d(${current.translateX.toFixed(2)}px, ${current.translateY.toFixed(2)}px, 0)`,
      );

      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [reducedMotion]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reducedMotion) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    targetRef.current = {
      rotateX: 4 - y * 8,
      rotateY: -6 + x * 12,
      translateX: -3 + x * 6,
      translateY: -2 + y * 4,
    };
  };

  const resetPointer = () => {
    targetRef.current = INITIAL_TARGET;
  };

  return (
    <div
      className="relative mx-auto flex w-full max-w-[520px] items-center justify-center lg:justify-end"
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle,rgba(108,92,231,0.16),rgba(108,92,231,0.05)_45%,transparent_72%)] blur-2xl motion-safe:animate-[pulse_6s_ease-in-out_infinite]" />

      <div className="relative aspect-square w-full max-w-[430px] rounded-[32px] border border-border bg-gradient-to-b from-white to-secondary-bg p-5 shadow-[0_18px_60px_rgba(17,19,24,0.06)]">
        <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[24px] border border-white bg-[radial-gradient(circle_at_50%_45%,rgba(108,92,231,0.12),transparent_55%)]">
          <span className="absolute left-[14%] top-[20%] size-2 rounded-full bg-accent/25 transition-transform duration-300" style={{ transform: reducedMotion ? undefined : "translate3d(-2px, 1px, 0)" }} />
          <span className="absolute right-[15%] top-[30%] size-3 rounded-full bg-accent/15 transition-transform duration-300" style={{ transform: reducedMotion ? undefined : "translate3d(2px, -1px, 0)" }} />
          <span className="absolute bottom-[18%] left-[22%] size-1.5 rounded-full bg-accent/30" />

          <div
            className="will-change-transform"
            style={{ transform, transformStyle: "preserve-3d" }}
          >
            <div className="flex size-44 items-center justify-center rounded-full border border-accent/15 bg-white/90 text-center shadow-[0_12px_40px_rgba(108,92,231,0.12)] motion-safe:animate-[memojiIdle_6s_ease-in-out_infinite] sm:size-52">
              <div>
                <span className="block text-5xl font-bold tracking-[-0.06em] text-foreground sm:text-6xl">
                  <span className="text-accent">V</span>C
                </span>
                <span className="mt-2 block text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Memoji pendiente
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
