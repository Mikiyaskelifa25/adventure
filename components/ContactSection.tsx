"use client";

import { useState } from "react";
import AnimateOnScroll from "./AnimateOnScroll";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";
import { getGeoInfo, type GeoInfo } from "@/lib/geo";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactSection() {
  const { lang } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormState({ ...formState, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const geo = await getGeoInfo();

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, ...geo }),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || t("something_went_wrong", lang));
      }

      setStatus("success");
      setFormState({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : t("something_went_wrong", lang));
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  return (
    <section
      id="contact"
      className="py-20 md:py-32 px-6 md:px-12 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
        {/* ── Left info column ── */}
        <AnimateOnScroll animation="fade-right">
          <div>
            <span className="text-primary font-label uppercase tracking-[0.4em] mb-6 block text-xs">
              {t("contact_us", lang)}
            </span>
            <h2 className="font-headline text-4xl md:text-5xl text-on-surface leading-tight mb-8">
              {t("have_questions", lang)} <br />
              <span className="italic font-normal">{t("were_here_to_help", lang)}</span>
            </h2>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed mb-12 max-w-md">
              {t("contact_description", lang)}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    mail
                  </span>
                </div>
                <div>
                  <h4 className="font-headline text-xl text-on-surface mb-1">
                    {t("email_us", lang)}
                  </h4>
                  <p className="text-on-surface-variant font-body">
                    hello@aventure-abyssinie.com
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary">
                    call
                  </span>
                </div>
                <div>
                  <h4 className="font-headline text-xl text-on-surface mb-1">
                    {t("call_us", lang)}
                  </h4>
                  <p className="text-on-surface-variant font-body">
                    +251 91 160 3027
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* ── Right form column ── */}
        <AnimateOnScroll animation="fade-left" delay={0.2}>
          <div className="relative bg-surface/50 dark:bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 border border-outline dark:border-white/10 shadow-premium transition-all hover:border-primary/50 dark:hover:border-primary/30">
            {/* Success overlay */}
            {status === "success" && (
              <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[2.5rem] bg-surface/95 dark:bg-black/80 backdrop-blur-md z-10 p-10 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6 animate-[ping_0.6s_ease-out_1]">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    check_circle
                  </span>
                </div>
                <h3 className="font-headline text-2xl text-on-surface mb-3">
                  {t("message_sent", lang)}
                </h3>
                <p className="text-on-surface-variant font-body mb-8">
                  {t("message_sent_description", lang)}
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 rounded-2xl border border-primary text-primary font-bold text-sm transition-all hover:bg-primary hover:text-on-primary"
                >
                  {t("send_another", lang)}
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 ml-1">
                    {t("full_name", lang)} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-background/50 dark:bg-white/5 border border-outline dark:border-white/10 rounded-2xl px-5 py-3.5 text-on-surface focus:border-primary focus:bg-background transition-all outline-none disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 ml-1">
                    {t("email", lang)} <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-background/50 dark:bg-white/5 border border-outline dark:border-white/10 rounded-2xl px-5 py-3.5 text-on-surface focus:border-primary focus:bg-background transition-all outline-none disabled:opacity-50"
                    placeholder="hello@example.com"
                  />
                </div>
              </div>

              {/* Row 2: Phone + Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 ml-1">
                    {t("phone_number", lang)}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-background/50 dark:bg-white/5 border border-outline dark:border-white/10 rounded-2xl px-5 py-3.5 text-on-surface focus:border-primary focus:bg-background transition-all outline-none disabled:opacity-50"
                    placeholder="+1 234 567 8900"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 ml-1">
                    {t("subject", lang)}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="w-full bg-background/50 dark:bg-white/5 border border-outline dark:border-white/10 rounded-2xl px-5 py-3.5 text-on-surface focus:border-primary focus:bg-background transition-all outline-none disabled:opacity-50"
                    placeholder="Tour inquiry, Pricing…"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/60 ml-1">
                  {t("message", lang)} <span className="text-primary">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full bg-background/50 dark:bg-white/5 border border-outline dark:border-white/10 rounded-2xl px-5 py-4 text-on-surface focus:border-primary focus:bg-background transition-all outline-none resize-none disabled:opacity-50"
                  placeholder={t("need_help", lang)}
                />
              </div>

              {/* Error banner */}
              {status === "error" && (
                <div className="flex items-center gap-3 rounded-2xl bg-red-500/10 border border-red-500/30 px-5 py-3">
                  <span className="material-symbols-outlined text-red-400 text-lg">
                    error
                  </span>
                  <p className="text-red-400 text-sm font-body">
                    {errorMsg || t("failed_to_send", lang)}
                  </p>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full relative bg-primary text-on-primary font-bold py-5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-primary/30 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <span className="inline-block w-5 h-5 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin" />
                    {t("sending", lang)}…
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-xl">
                      send
                    </span>
                    {t("send_message", lang)}
                  </span>
                )}
              </button>

              <p className="text-center text-[10px] text-on-surface-variant/40 font-body">
                {t("encrypted_message", lang)}
              </p>
            </form>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
