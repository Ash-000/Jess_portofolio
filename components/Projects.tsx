"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Filter, ArrowUpRight, CheckCircle2, Clock, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

interface ProjectData {
  id: number;
  titleEn: string;
  titleId: string;
  category: string;
  statusEn: string;
  statusId: string;
  descriptionEn: string;
  descriptionId: string;
  metaEn: string;
  metaId: string;
  tags: string;
  image: string;
}

export default function Projects() {
  const { t, lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [dbProjects, setDbProjects] = useState<ProjectData[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((r) => r.json())
      .then((data) => {
        if (data.projects && data.projects.length > 0) {
          setDbProjects(data.projects);
        }
      })
      .catch((err) => console.error("Error fetching projects from API:", err));
  }, []);

  useGSAP(
    () => {
      gsap.fromTo(
        ".gsap-project-card",
        { opacity: 0, y: 40, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: ".gsap-project-grid-container",
            start: "top 85%",
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef, dependencies: [activeCategory, dbProjects] }
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

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
  const statusIcons = [CheckCircle2, Clock, Sparkles, CheckCircle2, Clock, CheckCircle2];

  // Map API projects or fallback to dictionary items
  const sourceItems =
    dbProjects.length > 0
      ? dbProjects.map((p) => ({
          id: p.id,
          title: lang === "id" ? p.titleId : p.titleEn,
          category: p.category,
          status: lang === "id" ? p.statusId : p.statusEn,
          description: lang === "id" ? p.descriptionId : p.descriptionEn,
          meta: lang === "id" ? p.metaId : p.metaEn,
          tags: p.tags ? p.tags.split(",").map((s) => s.trim()) : [],
          image: p.image,
        }))
      : t.projects.items.map((p) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          status: p.status,
          description: p.description,
          meta: p.meta,
          tags: p.tags,
          image: [
            "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800&auto=format&fit=crop",
          ][(p.id - 1) % 6],
        }));

  const filteredProjects =
    activeCategory === "All"
      ? sourceItems
      : sourceItems.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  const isLooping = filteredProjects.length > 3;

  // Duplicated list for seamless infinite marquee loop when > 3 items
  const loopList = isLooping ? [...filteredProjects, ...filteredProjects] : filteredProjects;

  const renderCard = (project: (typeof sourceItems)[0], idx: number) => {
    const StatusIconComponent = statusIcons[(project.id - 1) % statusIcons.length];

    return (
      <div
        key={`${project.id}-${idx}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`gsap-project-card group bg-white dark:bg-stone-950 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-2xl hover:border-emerald-500/50 flex flex-col justify-between cursor-pointer will-change-transform ${
          isLooping ? "w-[320px] sm:w-[370px] lg:w-[390px] shrink-0" : "w-full"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div>
          {/* Image Container */}
          <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Category Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-stone-900/80 text-cream-50 dark:bg-emerald-950/90 dark:text-emerald-300 border border-stone-700/50 dark:border-emerald-700/50 backdrop-blur-md">
                {project.category}
              </span>
            </div>

            {/* Status Badge */}
            <div className="absolute top-4 right-4 z-10">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-medium bg-emerald-500/90 text-white backdrop-blur-md shadow-sm">
                <StatusIconComponent className="w-3 h-3" />
                <span>{project.status}</span>
              </span>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-title text-xl font-bold text-forest-900 dark:text-cream-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                {project.title}
              </h3>
              <div className="p-2 rounded-full bg-stone-100 dark:bg-stone-900 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3 font-sans">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200/80 dark:border-stone-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-900/80 bg-stone-50/50 dark:bg-stone-950/50 flex items-center justify-between text-xs text-stone-500 font-mono">
          <span>{project.meta}</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider group-hover:underline">
            {t.projects.readWork} →
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-24 md:py-32 bg-stone-50 dark:bg-[#080C0A] text-stone-900 dark:text-cream-50 transition-colors duration-500 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-emerald-600 dark:text-emerald-400 font-title text-xl font-bold">
              <span className="w-8 h-[2px] bg-emerald-500 inline-block" />
              <h2>{t.projects.headerBadge}</h2>
            </div>
            <h3 className="font-title text-4xl sm:text-5xl font-bold tracking-tight text-forest-900 dark:text-cream-50">
              {t.projects.headerDesc}
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center space-x-2 bg-white dark:bg-stone-900 p-1.5 rounded-full border border-stone-200 dark:border-stone-800 shadow-sm self-start md:self-auto">
            <Filter className="w-4 h-4 ml-3 text-stone-400" />
            {categoryKeys.map((catKey) => {
              const label = t.projects.categories[catKey];
              const isSelected = activeCategory === catKey;
              return (
                <button
                  key={catKey}
                  onClick={() => setActiveCategory(catKey)}
                  className={`px-4 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-all duration-300 ${
                    isSelected
                      ? "bg-forest-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm"
                      : "text-stone-600 dark:text-stone-400 hover:text-emerald-600"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Project Display: Static Grid when <= 3, Infinite Marquee Loop when > 3 */}
        <div className="gsap-project-grid-container relative">
          {isLooping ? (
            /* Infinite Auto-Scrolling Marquee Loop for > 3 Items */
            <div className="relative w-full overflow-hidden group py-4">
              {/* Gradient edge masks for smooth fade */}
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-stone-50 dark:from-[#080C0A] to-transparent z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-stone-50 dark:from-[#080C0A] to-transparent z-20 pointer-events-none" />

              <div className="flex space-x-6 sm:space-x-8 animate-marquee group-hover:[animation-play-state:paused] w-max">
                {loopList.map((project, idx) => renderCard(project, idx))}
              </div>
            </div>
          ) : (
            /* Static 3-Column Grid for <= 3 Items */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => renderCard(project, idx))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
