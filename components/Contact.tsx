"use client";

import { useState } from "react";
import { Mail, MapPin, Globe, Send, MessageSquare, CheckCircle } from "lucide-react";
import { Link001 } from "@/components/ui/skiper-ui/skiper40";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "Research Collaboration",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", topic: "Research Collaboration", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#0C110E] text-cream-50 relative overflow-hidden">
      {/* Background Floating Orbs */}
      <div className="orb w-96 h-96 bg-emerald-500/10 -top-20 -right-20" />
      <div className="orb w-96 h-96 bg-emerald-800/15 -bottom-20 -left-20" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-serif text-xl font-bold">
            <span className="w-8 h-[2px] bg-emerald-400 inline-block" />
            <h2>{t.contact.badge}</h2>
          </div>
          <h3 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {t.contact.title}
          </h3>
          <p className="text-stone-300 text-base sm:text-lg font-sans leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Contact Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="p-3 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">{t.contact.emailLabel}</h4>
                  <div className="mt-1">
                    <Link001 href="mailto:inquiries@stewardshipjournal.org" className="text-stone-100 font-medium text-sm sm:text-base">
                      inquiries@stewardshipjournal.org
                    </Link001>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="p-3 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">{t.contact.locationLabel}</h4>
                  <p className="text-stone-100 font-medium text-sm sm:text-base mt-0.5">
                    {t.contact.locationValue}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-xl bg-stone-900/60 border border-stone-800/80">
                <div className="p-3 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50 shrink-0">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-widest text-stone-400 font-semibold">{t.contact.networkLabel}</h4>
                  <p className="text-stone-100 font-medium text-sm sm:text-base mt-0.5">
                    {t.contact.networkValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800/80 space-y-3">
              <p className="font-serif italic text-stone-200 text-sm sm:text-base leading-relaxed">
                &ldquo;{t.contact.quote}&rdquo;
              </p>
              <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                — {t.contact.quoteAuthor}
              </span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7 bg-white text-stone-900 dark:bg-stone-950 dark:text-cream-50 p-8 sm:p-10 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 relative z-10">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="font-serif text-2xl font-bold">{t.contact.form.successTitle}</h3>
                <p className="text-stone-600 dark:text-stone-300 text-sm max-w-sm mx-auto">
                  {t.contact.form.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                      {t.contact.form.nameLabel}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={t.contact.form.namePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                      {t.contact.form.emailLabel}
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={t.contact.form.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    {t.contact.form.subjectLabel}
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all duration-300"
                  >
                    <option value="Research Collaboration">{t.contact.form.topics.collab}</option>
                    <option value="General Inquiry">{t.contact.form.topics.general}</option>
                    <option value="Speaking Request">{t.contact.form.topics.speaking}</option>
                    <option value="Technology Licensing">{t.contact.form.topics.licensing}</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                    {t.contact.form.messageLabel}
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder={t.contact.form.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm transition-all duration-300"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2"
                >
                  <span>{t.contact.form.sendButton}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => {
          const el = document.getElementById("contact");
          el?.scrollIntoView({ behavior: "smooth" });
        }}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl z-40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Contact Us"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </section>
  );
}
