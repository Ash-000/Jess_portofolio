"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [heroMedia, setHeroMedia] = useState<string>("/uploads/clip_ipb.mp4");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.settings?.hero_image) {
          setHeroMedia(data.settings.hero_image);
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
        ".gsap-hero-image",
        { opacity: 0, scale: 0.95, filter: "blur(10px)", y: 20 },
        { opacity: 1, scale: 1, filter: "blur(0px)", y: 0, duration: 1.1, ease: "power3.out" }
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
        "-=0.5"
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
    },
    { scope: containerRef, dependencies: [lang] }
  );

  const titleWords = t.hero.title.split(" ");
  const isVideo = heroMedia.toLowerCase().endsWith(".mp4") || heroMedia.toLowerCase().endsWith(".webm");

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-cream-50 text-stone-900 dark:bg-[#0C110E] dark:text-cream-50 transition-colors duration-500"
    >
      {/* Background Orbs */}
      <div className="orb w-96 h-96 bg-emerald-300/15 dark:bg-emerald-900/15 -top-20 -left-20" />
      <div className="orb w-96 h-96 bg-stone-300/20 dark:bg-emerald-950/20 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 relative z-10">
        {/* TOP SECTION: Video / Media Showcase (100% Bright & Unobstructed) */}
        <div className="gsap-hero-image w-full max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group border border-stone-200/80 dark:border-stone-800/80">
            <div className="relative z-10 rounded-3xl overflow-hidden">
              {isVideo ? (
                <video
                  key={heroMedia}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-[360px] sm:h-[460px] lg:h-[540px] object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                >
                  <source src={heroMedia} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <Image
                  src={heroMedia}
                  alt="Sustainable Agriculture Research"
                  width={1200}
                  height={675}
                  className="w-full h-[360px] sm:h-[460px] lg:h-[540px] object-cover group-hover:scale-105 transition-transform duration-[1.2s] ease-out"
                  priority
                />
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Text Content Centered Below Video */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
          {/* Title */}
          <h1 className="font-title text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-900 dark:text-cream-50 leading-[1.25] py-1.5 -my-1.5 flex flex-wrap justify-center gap-x-3 gap-y-1">
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

          {/* Separator line */}
          <div className="gsap-hero-line h-[2px] w-24 bg-gradient-to-r from-emerald-600 to-emerald-400 dark:from-emerald-400 dark:to-emerald-600 mx-auto" />

          {/* Description */}
          <p className="gsap-hero-desc text-base sm:text-lg text-stone-600 dark:text-stone-400 leading-relaxed font-sans max-w-2xl mx-auto">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
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
      </div>
    </section>
  );
}
