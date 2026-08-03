"use client";

import { useRef } from "react";
import { GraduationCap, Award, Compass, Sprout, Cpu, Users, Quote } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-about-header",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".gsap-about-header",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".gsap-journey-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: ".gsap-journey-grid",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".gsap-story-block",
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: ".gsap-story-block",
            start: "top 80%",
          },
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".gsap-vision-card",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: ".gsap-vision-list",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef }
  );

  const visionIcons = [Sprout, Cpu, Users];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 md:py-32 bg-stone-100/70 dark:bg-stone-900/40 border-y border-stone-200/80 dark:border-stone-800/80 overflow-hidden relative"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16 relative z-10">
        {/* Section Header: Academic Journey */}
        <div className="gsap-about-header space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-forest-600 dark:text-emerald-400 font-serif text-xl font-bold">
            <span className="w-8 h-[2px] bg-forest-600 dark:bg-emerald-400 inline-block" />
            <h2>{t.about.headerBadge}</h2>
          </div>
          <p className="text-stone-600 dark:text-stone-300 font-sans text-base sm:text-lg">
            {t.about.headerDesc}
          </p>
        </div>

        {/* Journey Cards Grid */}
        <div className="gsap-journey-grid grid grid-cols-1 md:grid-cols-2 gap-8">
          {t.about.journeys.map((item, index) => (
            <div
              key={index}
              className={`gsap-journey-card group p-8 rounded-2xl border transition-all duration-500 ${
                item.active
                  ? "bg-white dark:bg-stone-950 border-emerald-500/50 dark:border-emerald-700/60 shadow-xl ring-1 ring-emerald-500/20 hover:shadow-2xl hover:-translate-y-1"
                  : "bg-white/80 dark:bg-stone-900/80 border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-500/30"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors ${
                    item.active
                      ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300/40 dark:border-emerald-800/40"
                      : "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300"
                  }`}
                >
                  {item.year}
                </span>
                {item.active ? (
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                ) : (
                  <GraduationCap className="w-5 h-5 text-stone-500 group-hover:scale-110 transition-transform duration-300" />
                )}
              </div>

              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-cream-50 mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                {item.degree}
              </h3>
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-4">
                {item.institution}
              </p>
              <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Story & Vision Section */}
        <div className="pt-12 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Blockquote Story */}
          <div className="gsap-story-block lg:col-span-6 space-y-6">
            <h3 className="font-serif text-3xl font-bold text-stone-900 dark:text-cream-50 leading-tight">
              {t.about.storyTitle}
            </h3>

            <div className="p-6 rounded-2xl bg-white/90 dark:bg-stone-950/80 border-l-4 border-emerald-600 dark:border-emerald-400 border border-stone-200/60 dark:border-stone-800/60 italic font-serif text-stone-800 dark:text-stone-200 relative shadow-sm">
              <Quote className="w-8 h-8 text-emerald-600/20 dark:text-emerald-400/20 absolute top-4 right-4" />
              &ldquo;{t.about.quote}&rdquo;
              <span className="block mt-4 text-xs font-sans not-italic font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                — {t.about.philosophy}
              </span>
            </div>

            <p className="text-stone-600 dark:text-stone-300 text-base leading-relaxed first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:mr-2 first-letter:float-left first-letter:text-emerald-700 dark:first-letter:text-emerald-400">
              {t.about.storyBody}
            </p>
          </div>

          {/* Right Vision Points */}
          <div className="gsap-vision-list lg:col-span-6 space-y-6">
            <h4 className="font-serif text-xl font-bold text-stone-900 dark:text-cream-50 flex items-center space-x-2">
              <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>{t.about.visionTitle}</span>
            </h4>

            <div className="space-y-4">
              {t.about.visions.map((v, i) => {
                const IconComp = visionIcons[i % visionIcons.length];
                return (
                  <div
                    key={i}
                    className="gsap-vision-card group p-5 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800/80 flex items-start space-x-4 shadow-sm hover:border-emerald-500/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="p-3 rounded-xl bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-stone-900 dark:text-cream-50 text-base mb-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {v.title}
                      </h5>
                      <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
