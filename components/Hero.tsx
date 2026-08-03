"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        ".gsap-hero-badge",
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8 }
      );

      tl.fromTo(
        ".gsap-word-inner",
        { yPercent: 110, rotateX: -80 },
        {
          yPercent: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.07,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.fromTo(
        ".gsap-hero-line",
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: "power2.inOut" },
        "-=0.6"
      );

      tl.fromTo(
        ".gsap-hero-desc",
        { opacity: 0, y: 20, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8 },
        "-=0.5"
      );

      tl.fromTo(
        ".gsap-hero-btn",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        "-=0.4"
      );

      tl.fromTo(
        ".gsap-hero-image",
        { clipPath: "inset(8% 8% 8% 8%)", opacity: 0, scale: 1.05 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8"
      );

      tl.fromTo(
        ".gsap-hero-float-badge",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.3"
      );

      gsap.to(".gsap-particle", {
        y: "random(-30, 30)",
        x: "random(-20, 20)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.5, from: "random" },
      });
    },
    { scope: containerRef, dependencies: [lang] }
  );

  const titleWords = t.hero.title.split(" ");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Ambient particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="gsap-particle absolute rounded-full bg-emerald-500/10 dark:bg-emerald-400/10"
            style={{
              width: `${8 + i * 6}px`,
              height: `${8 + i * 6}px`,
              top: `${15 + i * 20}%`,
              left: `${10 + i * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Text Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="gsap-hero-badge inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/60 border border-emerald-300/50 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Leaf className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.hero.badge}</span>
          </div>

          {/* Word-by-word title reveal with comfortable padding and line-height */}
          <h1
            key={lang}
            className="font-title text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem] font-bold tracking-tight text-stone-900 dark:text-cream-50 leading-[1.25]"
            style={{ perspective: "600px" }}
          >
            {titleWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden py-1.5 -my-1.5 mr-[0.3em] last:mr-0 align-bottom">
                <span className="gsap-word-inner inline-block will-change-transform py-0.5">
                  {word}
                </span>
              </span>
            ))}
          </h1>

          {/* Animated separator line */}
          <div className="gsap-hero-line h-[2px] w-24 bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-600 origin-left" />

          <p className="gsap-hero-desc text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="gsap-hero-btn group inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-stone-900 text-cream-50 dark:bg-emerald-600 dark:hover:bg-emerald-500 hover:bg-stone-800 text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 duration-300"
            >
              <span>{t.hero.viewResearch}</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <a
              href="#about"
              className="gsap-hero-btn inline-flex items-center space-x-2 px-7 py-3.5 rounded-full border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800/60 text-xs font-semibold uppercase tracking-widest transition-all duration-300"
            >
              <span>{t.hero.academicJourney}</span>
            </a>
          </div>
        </div>

        {/* Right Visual Image Card */}
        <div className="gsap-hero-image lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl group">
            <div className="absolute -inset-[1px] bg-gradient-to-br from-emerald-500/30 via-transparent to-emerald-500/20 rounded-2xl z-0" />

            <div className="relative z-10 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1000&auto=format&fit=crop"
                alt="Sustainable Agriculture Research"
                width={600}
                height={700}
                className="w-full h-[420px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="gsap-hero-float-badge absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
                <div className="flex items-center space-x-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                  </span>
                  <p className="text-xs font-medium text-white/90">
                    {t.hero.liveBadge}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
