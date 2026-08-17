"use client";

import Image from "next/image";
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

const BASE_TRANSFORM =
  "perspective(900px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";

export function MemojiMotion() {
  const frameRef = useRef<number | null>(null);
  const avatarRef = useRef<HTMLDivElement | null>(null);
  const haloRef = useRef<HTMLDivElement | null>(null);
  const dotsRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<PointerTarget>(INITIAL_TARGET);
  const currentRef = useRef<PointerTarget>(INITIAL_TARGET);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(media.matches);

    updatePreference();
    media.addEventListener("change", updatePreference);

    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const avatar = avatarRef.current;
    const halo = haloRef.current;
    const dots = dotsRef.current;

    if (reducedMotion) {
      targetRef.current = INITIAL_TARGET;
      currentRef.current = INITIAL_TARGET;

      if (avatar) avatar.style.transform = BASE_TRANSFORM;
      if (halo) halo.style.transform = "translate3d(0, 0, 0)";
      if (dots) dots.style.transform = "translate3d(0, 0, 0)";

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

      if (avatarRef.current) {
        avatarRef.current.style.transform = `perspective(900px) rotateX(${current.rotateX.toFixed(2)}deg) rotateY(${current.rotateY.toFixed(2)}deg) translate3d(${current.translateX.toFixed(2)}px, ${current.translateY.toFixed(2)}px, 0)`;
      }

      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${(current.translateX * 0.5).toFixed(2)}px, ${(current.translateY * 0.5).toFixed(2)}px, 0)`;
      }

      if (dotsRef.current) {
        dotsRef.current.style.transform = `translate3d(${(current.translateX * 0.2).toFixed(2)}px, ${(current.translateY * 0.2).toFixed(2)}px, 0)`;
      }

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
      <div
        ref={haloRef}
        className="pointer-events-none absolute inset-7 rounded-full bg-[radial-gradient(circle,rgba(108,92,231,0.18),rgba(108,92,231,0.06)_45%,transparent_72%)] blur-2xl will-change-transform motion-safe:animate-[pulse_6s_ease-in-out_infinite]"
        aria-hidden="true"
      />

      <div className="relative aspect-square w-full max-w-[430px] overflow-hidden rounded-[32px] border border-border bg-gradient-to-b from-white to-secondary-bg p-5 shadow-[0_18px_60px_rgba(17,19,24,0.06)]">
        <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[24px] border border-white bg-[radial-gradient(circle_at_50%_45%,rgba(108,92,231,0.13),transparent_58%)]">
          <div ref={dotsRef} className="absolute inset-0 will-change-transform" aria-hidden="true">
            <span className="absolute left-[14%] top-[20%] size-2 rounded-full bg-accent/25" />
            <span className="absolute right-[15%] top-[30%] size-3 rounded-full bg-accent/15" />
            <span className="absolute bottom-[18%] left-[22%] size-1.5 rounded-full bg-accent/30" />
          </div>

          <div
            ref={avatarRef}
            className="relative h-[82%] w-[82%] will-change-transform motion-safe:animate-[memojiIdle_6s_ease-in-out_infinite] sm:h-[86%] sm:w-[86%]"
            style={{ transform: BASE_TRANSFORM, transformStyle: "preserve-3d" }}
          >
            <Image
              src="/memoji/vicente-memoji.png"
              alt="Memoji de Vicente Carrasco"
              fill
              priority
              sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 390px"
              className="object-contain drop-shadow-[0_18px_28px_rgba(17,19,24,0.12)]"
            />
          </div>

          <div
            className="pointer-events-none absolute bottom-[8%] left-1/2 h-5 w-[42%] -translate-x-1/2 rounded-full bg-foreground/10 blur-xl"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
