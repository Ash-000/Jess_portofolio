"use client";

import { Link001 } from "@/components/ui/skiper-ui/skiper40";
import { ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-14 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand */}
        <div className="space-y-1 text-center md:text-left">
          <span className="font-serif text-xl font-bold tracking-tight text-forest-900 dark:text-cream-50">
            Stewardship <span className="font-sans font-light text-emerald-700 dark:text-emerald-400">Journal</span>
          </span>
          <p className="text-xs text-stone-500">{t.footer.tagline}</p>
        </div>

        {/* Skiper40 Animated Links */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs font-semibold uppercase tracking-wider">
          <Link001 href="#home" className="hover:text-emerald-600 transition-colors">
            {t.nav.home}
          </Link001>
          <Link001 href="https://instagram.com" className="hover:text-emerald-600 transition-colors">
            Instagram
          </Link001>
          <Link001 href="https://github.com" className="hover:text-emerald-600 transition-colors">
            GitHub
          </Link001>
          <Link001 href="#contact" className="hover:text-emerald-600 transition-colors">
            {t.nav.contact}
          </Link001>
        </div>

        {/* Copyright & Scroll Back Top */}
        <div className="flex items-center space-x-6 text-xs text-stone-500">
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-full bg-stone-200/60 dark:bg-stone-800 hover:bg-emerald-500 hover:text-white transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
