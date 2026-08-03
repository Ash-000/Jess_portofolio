"use client";

import { ArrowUp, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 bg-stone-100 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        {/* Centered Controls: Instagram, Email, and Back-to-Top */}
        <div className="flex items-center justify-center space-x-4">
          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/jesikaars?igsh=MXkyMTY5NTFmcnlheQ=="
            target="_blank"
            rel="noopener noreferrer"
            className="p-3.5 rounded-full bg-stone-200/60 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Instagram"
          >
            <Instagram className="w-5 h-5" />
          </a>

          {/* Email Link */}
          <a
            href="mailto:inquiries@stewardshipjournal.org"
            className="p-3.5 rounded-full bg-stone-200/60 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-3.5 rounded-full bg-stone-200/60 dark:bg-stone-900 border border-stone-300/60 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-sm"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Row: Centered Copyright */}
        <div className="pt-6 border-t border-stone-200/60 dark:border-stone-900 text-center text-xs text-stone-500 font-medium">
          © {new Date().getFullYear()} {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
