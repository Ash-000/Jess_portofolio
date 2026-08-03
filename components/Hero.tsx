"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroImage, setHeroImage] = useState<string>(
    "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=1000&auto=format&fit=crop"
  );

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings?.hero_image) {
          setHeroImage(data.settings.hero_image);
        }
      })
      .catch((err) => console.error("Error fetching hero image setting:", err));
  }, []);

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
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
        "-=0.4"
      );

      tl.fromTo(
        ".gsap-hero-image",
        { opacity: 0, scale: 0.95, filter: "blur(10px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" },
        "-=0.8"
      );
    },
    { scope: containerRef, dependencies: [lang] }
  );

  const titleWords = t.hero.title.split(" ");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-cream-50 text-stone-900 dark:bg-[#0C110E] dark:text-cream-50 transition-colors duration-500"
    >
      {/* Background Orbs */}
      <div className="orb w-96 h-96 bg-emerald-300/15 dark:bg-emerald-900/15 -top-20 -left-20" />
      <div className="orb w-96 h-96 bg-stone-300/20 dark:bg-emerald-950/20 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 space-y-6">
          {/* Clip Path Revealing Badge */}
          <div className="gsap-hero-badge inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-300/80 dark:border-emerald-700/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
            <Leaf className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.hero.badge}</span>
          </div>

          {/* GSAP Word-by-Word Reveal Title */}
          <h1 className="font-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-900 dark:text-cream-50 leading-[1.25] py-1.5 -my-1.5 flex flex-wrap gap-x-3 gap-y-1">
            {titleWords.map((word: string, idx: number) => (
              <span key={idx} className="inline-block overflow-hidden py-1 -my-1">
                <span
                  className={`gsap-word-inner inline-block ${
                    idx >= Math.floor(titleWords.length / 2)
                      ? "text-emerald-700 dark:text-emerald-400 font-extrabold"
                      : ""
                  }`}
                >
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
                src={heroImage}
                alt="Sustainable Agriculture Research"
                width={600}
                height={700}
                className="w-full h-[420px] lg:h-[520px] object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            </div>

            {/* Floating Glassmorphism Metric Card */}
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-stone-900/80 backdrop-blur-md border border-stone-700/60 p-4 rounded-xl text-cream-50 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-semibold">
                    {t.hero.liveBadge}
                  </h4>
                  <p className="font-serif text-sm font-medium mt-0.5 text-stone-200">
                    Stewardship Journal & Botani Seed
                  </p>
                </div>
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  85%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
