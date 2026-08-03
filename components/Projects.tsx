"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Filter, ArrowUpRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-project-card",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          scrollTrigger: {
            trigger: ".gsap-project-grid",
            start: "top 80%",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef, dependencies: [activeCategory] }
  );

  // Buttery-smooth mouse-tracking card tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Subtle & soft tilt angle (max ±5 degrees)
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transition = "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.35s ease-out";
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px) translateY(-6px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease-out";
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0px)`;
  };

  const categoryKeys = ["All", "Agronomy", "Field Study", "Engineering"] as const;

  const projectImages = [
    "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
  ];

  const statusIcons = [CheckCircle2, Clock, Sparkles, CheckCircle2];

  const filteredProjects =
    activeCategory === "All"
      ? t.projects.items
      : t.projects.items.filter((p) => p.category === activeCategory);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-forest-600 dark:text-emerald-400 font-title text-xl font-bold">
              <span className="w-8 h-[2px] bg-forest-600 dark:bg-emerald-400 inline-block" />
              <h2>{t.projects.headerBadge}</h2>
            </div>
            <p className="text-stone-600 dark:text-stone-300 font-sans text-base sm:text-lg">
              {t.projects.headerDesc}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 shrink-0">
            <Filter className="w-4 h-4 text-stone-400 mr-1 hidden sm:inline" />
            {categoryKeys.map((catKey) => {
              const label = t.projects.categories[catKey] || catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeCategory === catKey
                      ? "bg-forest-900 text-cream-50 dark:bg-emerald-600 shadow-md scale-105"
                      : "bg-stone-200/60 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Projects */}
        <div className="gsap-project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const StatusIconComponent = statusIcons[idx % statusIcons.length];
            const imageSrc = projectImages[idx % projectImages.length];

            return (
              <div
                key={project.id}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="gsap-project-card group bg-white dark:bg-stone-950 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl hover:border-emerald-500/50 flex flex-col justify-between cursor-pointer will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <Image
                      src={imageSrc}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-stone-900/90 text-forest-900 dark:text-emerald-300 backdrop-blur-md shadow">
                        {t.projects.categories[project.category as keyof typeof t.projects.categories] || project.category}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-stone-900/80 text-emerald-300 backdrop-blur-md border border-emerald-500/30">
                        <StatusIconComponent className="w-3 h-3 text-emerald-400" />
                        <span>{project.status}</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="font-title text-xl font-bold text-stone-900 dark:text-cream-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-stone-600 dark:text-stone-300 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200/50 dark:border-stone-800/50"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                  <span className="text-stone-500 font-medium">{project.meta}</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center space-x-1 font-semibold text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform"
                  >
                    <span>{t.projects.readWork}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
