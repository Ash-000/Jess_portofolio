"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type ThemeTransitionProps = {
  isAnimating: boolean;
  targetTheme: "dark" | "light";
  clickPos: { x: number; y: number } | null;
  onAnimationEnd: () => void;
};

export default function ThemeTransition({
  isAnimating,
  targetTheme,
  clickPos,
  onAnimationEnd,
}: ThemeTransitionProps) {
  const [stage, setStage] = useState<"idle" | "expanding" | "fading">("idle");

  useEffect(() => {
    if (isAnimating) {
      setStage("expanding");

      const timer1 = setTimeout(() => {
        setStage("fading");
      }, 500);

      const timer2 = setTimeout(() => {
        setStage("idle");
        onAnimationEnd();
      }, 850);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [isAnimating, onAnimationEnd]);

  if (!isAnimating && stage === "idle") return null;

  const originX = clickPos ? `${clickPos.x}px` : "50%";
  const originY = clickPos ? `${clickPos.y}px` : "50%";

  const isDarkTarget = targetTheme === "dark";

  return (
    <div
      className={`fixed inset-0 z-[99999] pointer-events-none overflow-hidden transition-opacity duration-350 ${
        stage === "fading" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Expanding Colored Background Circle */}
      <div
        className={`absolute rounded-full transition-transform duration-600 ease-in-out ${
          isDarkTarget ? "bg-[#0C110E]" : "bg-[#FAF9F6]"
        }`}
        style={{
          left: originX,
          top: originY,
          width: "300vmax",
          height: "300vmax",
          marginLeft: "-150vmax",
          marginTop: "-150vmax",
          transform: stage === "expanding" || stage === "fading" ? "scale(1)" : "scale(0)",
          transition: "transform 600ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />

      {/* Center Icon Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`p-6 rounded-full shadow-2xl backdrop-blur-md transition-all duration-500 transform ${
            stage === "expanding" ? "scale-100 opacity-100 rotate-0" : "scale-50 opacity-0 -rotate-45"
          } ${
            isDarkTarget
              ? "bg-emerald-950/90 text-emerald-400 border border-emerald-700/50 shadow-emerald-500/20"
              : "bg-white/90 text-amber-500 border border-amber-200/80 shadow-amber-500/20"
          }`}
        >
          {isDarkTarget ? (
            <Moon className="w-12 h-12 animate-pulse" />
          ) : (
            <Sun className="w-12 h-12 animate-spin-slow" />
          )}
        </div>
      </div>
    </div>
  );
}
