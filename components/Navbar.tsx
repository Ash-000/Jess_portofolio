"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Mobile menu animation state: "closed" | "opening" | "open" | "closing"
  const [mobileState, setMobileState] = useState<"closed" | "opening" | "open" | "closing">("closed");
  const [clickedLinkId, setClickedLinkId] = useState<string | null>(null);

  const isMenuVisible = mobileState !== "closed";
  const isOpen = mobileState === "open" || mobileState === "opening";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleHamburgerClick = () => {
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  const openMobileMenu = () => {
    setMobileState("opening");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setMobileState("open");
      });
    });
  };

  const closeMobileMenu = () => {
    setMobileState("closing");
    setTimeout(() => {
      setMobileState("closed");
      setClickedLinkId(null);
    }, 280);
  };

  const handleLinkClick = (id: string) => {
    setClickedLinkId(id);
    setTimeout(() => {
      closeMobileMenu();
    }, 150);
  };

  const navLinks = [
    { name: t.nav.home, href: "#home", id: "home" },
    { name: t.nav.about, href: "#about", id: "about" },
    { name: t.nav.projects, href: "#projects", id: "projects" },
    { name: t.nav.contact, href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/70 dark:bg-[#0C110E]/70 backdrop-blur-xl border-b border-stone-200/50 dark:border-emerald-950/60 py-3.5 shadow-lg shadow-black/5"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#home" className="group flex items-center space-x-2">
          <span className="font-serif text-2xl font-bold tracking-tight text-forest-900 dark:text-cream-50 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
            Stewardship <span className="font-sans font-light text-emerald-700 dark:text-emerald-400">Journal</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-1 bg-stone-100/80 dark:bg-stone-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-stone-200/60 dark:border-stone-800/80">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                  isActive
                    ? "text-stone-900 dark:text-cream-50 font-bold"
                    : "text-stone-600 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                }`}
              >
                {isActive && (
                  <span className="absolute inset-0 bg-white dark:bg-emerald-950/90 rounded-full shadow-sm border border-stone-200/80 dark:border-emerald-700/50 -z-10 animate-in fade-in zoom-in-95 duration-200" />
                )}
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Controls & CTA */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            aria-label="Switch Language"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-stone-300/80 dark:border-stone-800 bg-stone-100/60 dark:bg-stone-900/60 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all duration-300"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="uppercase">{lang}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="group p-2.5 rounded-full text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            <div className="transition-transform duration-500 group-hover:rotate-45">
              {isDark ? (
                <Sun className="w-4 h-4 text-emerald-400 transition-all duration-300" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700 transition-all duration-300" />
              )}
            </div>
          </button>

          {/* Connect Button */}
          <a
            href="#contact"
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest bg-forest-900 text-cream-50 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.nav.connect}
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleLang}
            className="flex items-center space-x-1 px-2.5 py-1 rounded-full border border-stone-300 dark:border-stone-800 text-xs font-bold uppercase text-stone-700 dark:text-stone-300"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            <span>{lang}</span>
          </button>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-full text-stone-700 dark:text-stone-300 active:scale-90 transition-transform"
          >
            {isDark ? <Sun className="w-5 h-5 text-emerald-400" /> : <Moon className="w-5 h-5 text-stone-700" />}
          </button>

          {/* Animated Morphing Hamburger Button */}
          <button
            onClick={handleHamburgerClick}
            aria-label="Toggle Navigation Menu"
            className="p-2.5 rounded-full text-stone-800 dark:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800/50 transition-colors relative w-10 h-10 flex items-center justify-center"
          >
            <div className="w-5 h-4 flex flex-col justify-between items-center relative">
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                  isOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-200 ease-out ${
                  isOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with Entrance & Exit Animations */}
      {isMenuVisible && (
        <div
          className={`md:hidden bg-white/95 dark:bg-[#0C110E]/95 backdrop-blur-2xl border-b border-stone-200 dark:border-stone-800 px-6 py-6 space-y-4 shadow-xl transition-all duration-300 ease-out origin-top ${
            isOpen
              ? "opacity-100 translate-y-0 scale-y-100"
              : "opacity-0 -translate-y-4 scale-y-95"
          }`}
        >
          <div className="space-y-2">
            {navLinks.map((link, index) => {
              const isSelected = clickedLinkId === link.id;
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => handleLinkClick(link.id)}
                  style={{
                    transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                  }}
                  className={`flex items-center justify-between text-base font-medium px-4 py-3 rounded-xl transition-all duration-300 transform ${
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                  } ${
                    isSelected
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 scale-[1.02] font-bold"
                      : isActive
                      ? "bg-stone-100 dark:bg-stone-900 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900/60"
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                </a>
              );
            })}
          </div>

          <div
            style={{
              transitionDelay: isOpen ? `${navLinks.length * 50}ms` : "0ms",
            }}
            className={`pt-2 transition-all duration-300 ${
              isOpen ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <a
              href="#contact"
              onClick={() => handleLinkClick("contact")}
              className="block text-center w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest bg-forest-900 text-cream-50 dark:bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md active:scale-95"
            >
              {t.nav.connect}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
