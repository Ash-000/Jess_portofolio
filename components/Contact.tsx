"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

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

    const phoneNumber = "6285280983522";
    const waText = `Halo, saya *${formData.name}* (${formData.email})\n\n*Subjek/Topik*: ${formData.topic}\n\n*Pesan*:\n${formData.message}`;
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(waText)}`;

    window.open(waUrl, "_blank", "noopener,noreferrer");

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
          <div className="inline-flex items-center space-x-2 text-emerald-400 font-title text-xl font-bold">
            <span className="w-8 h-[2px] bg-emerald-400 inline-block" />
            <h2>{t.contact.badge}</h2>
          </div>
          <h3 className="font-title text-4xl sm:text-5xl font-bold tracking-tight text-white">
            {t.contact.title}
          </h3>
          <p className="text-stone-300 text-base sm:text-lg font-sans leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Quote Block */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-2xl bg-stone-900/80 border border-stone-800/80 space-y-4 shadow-lg">
              <p className="font-serif italic text-stone-200 text-base leading-relaxed">
                &ldquo;{t.contact.quote}&rdquo;
              </p>
              <span className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                — {t.contact.quoteAuthor}
              </span>
            </div>
          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-8 bg-white text-stone-900 dark:bg-stone-950 dark:text-cream-50 p-8 sm:p-10 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 relative z-10">
            {submitted ? (
              <div className="py-16 text-center space-y-4 animate-in fade-in zoom-in-95 duration-400">
                <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="font-title text-2xl font-bold">{t.contact.form.successTitle}</h3>
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

      {/* Floating Action Button with Official WhatsApp SVG Logo */}
      <a
        href="https://wa.me/6285280983522"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 p-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl z-40 transition-all hover:scale-110 active:scale-95 flex items-center justify-center"
        aria-label="Contact Us via WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </section>
  );
}
