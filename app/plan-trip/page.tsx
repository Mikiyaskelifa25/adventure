"use client";

import { useState } from "react";
import TopNavBar from "@/components/TopNavBar";
import Footer from "@/components/Footer";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { useLanguage } from "@/lib/i18n/context";
import { t } from "@/lib/i18n/translations";
import { getGeoInfo } from "@/lib/geo";

const destinations = ["Danakil Depression", "Omo Valley", "Lalibela", "Simien Mountains", "Bale Mountains", "Historical North", "Other"];
const tripTypes = ["Adventure", "Cultural", "Photography", "Trekking", "Family", "Other"];

type Status = "idle" | "loading" | "success" | "error";

export default function PlanTripPage() {
  const { lang } = useLanguage();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    travelers: "1",
    selectedDestinations: [] as string[],
    selectedType: "",
    customType: "",
    customDest: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const toggleDestination = (dest: string) => {
    setFormState(prev => ({
      ...prev,
      selectedDestinations: prev.selectedDestinations.includes(dest)
        ? prev.selectedDestinations.filter(d => d !== dest)
        : [...prev.selectedDestinations, dest]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const geo = await getGeoInfo();
      const typeToSend = formState.selectedType === "Other" ? formState.customType : formState.selectedType;
      const destsToSend = formState.selectedDestinations.includes("Other")
        ? [...formState.selectedDestinations.filter(d => d !== "Other"), formState.customDest || "Custom"]
        : formState.selectedDestinations;
      const res = await fetch("/api/plan-trip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formState, selectedType: typeToSend, selectedDestinations: destsToSend, ...geo }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || t("failed_to_submit", lang));

      setStatus("success");
      setFormState({ 
        name: "", 
        email: "", 
        travelers: "1", 
        selectedDestinations: [], 
        selectedType: "", 
        customType: "",
        customDest: "",
        message: "" 
      });
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : t("submission_failed", lang));
      setStatus("error");
    }
  };

  const isLoading = status === "loading";

  return (
    <>
      <TopNavBar />
      <main className="min-h-screen pt-28 md:pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          {/* Left Column */}
          <AnimateOnScroll animation="fade-right">
            <div>
              <span className="text-primary font-label uppercase tracking-[0.4em] mb-6 block text-xs">
                {t("customized_travel", lang)}
              </span>
              <h1 className="font-headline text-4xl md:text-7xl text-on-surface leading-tight mb-6 md:mb-8 font-bold">
                {t("planning_trip", lang)}<br />
                <span className="italic font-normal text-primary text-3xl md:text-6xl">{t("lets_make_unforgettable", lang)}</span>
              </h1>
              <p className="text-on-surface-variant font-body text-lg md:text-xl leading-relaxed mb-8 md:mb-12 max-w-md">
                {t("tell_us_vision", lang)}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50/80 dark:bg-white/5 border border-outline dark:border-white/5">
                  <span className="material-symbols-outlined text-primary">verified</span>
                  <p className="text-sm">{t("curated_by_locals", lang)}</p>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50/80 dark:bg-white/5 border border-outline dark:border-white/5">
                  <span className="material-symbols-outlined text-primary">schedule</span>
                  <p className="text-sm">{t("response_24h", lang)}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right Column: Form */}
          <AnimateOnScroll animation="fade-left" delay={0.2}>
            <div className="relative bg-stone-50 dark:bg-stone-900 rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-stone-200 dark:border-white/10 transition-colors">
              {/* Success overlay */}
              {status === "success" && (
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[2.5rem] bg-stone-50/95 dark:bg-stone-900/95 backdrop-blur-md z-10 p-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <span className="material-symbols-outlined text-primary text-4xl">check_circle</span>
                  </div>
                  <h3 className="font-headline text-2xl text-on-surface mb-3">{t("plan_received", lang)}</h3>
                  <p className="text-on-surface-variant font-body mb-8">
                    {t("plan_received_description", lang)}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-8 py-3 rounded-2xl border border-primary text-primary font-bold text-sm transition-all hover:bg-primary hover:text-on-primary"
                  >
                    {t("create_another_plan", lang)}
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface/60 font-bold ml-1">{t("name", lang)}</label>
                    <input
                      type="text" required value={formState.name}
                      disabled={isLoading}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-5 py-4 text-stone-900 dark:text-on-surface focus:border-primary outline-none transition-all placeholder:text-stone-400 dark:placeholder:text-on-surface/30 shadow-sm disabled:opacity-50"
                      placeholder={t("your_name", lang)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface/60 font-bold ml-1">{t("email", lang)}</label>
                    <input
                      type="email" required value={formState.email}
                      disabled={isLoading}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-5 py-4 text-stone-900 dark:text-on-surface focus:border-primary outline-none transition-all placeholder:text-stone-400 dark:placeholder:text-on-surface/30 shadow-sm disabled:opacity-50"
                      placeholder={t("email_placeholder", lang)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface/60 font-bold ml-1">{t("travelers", lang)}</label>
                    <select
                      value={formState.travelers}
                      disabled={isLoading}
                      onChange={(e) => setFormState({...formState, travelers: e.target.value})}
                      className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-5 py-4 text-stone-900 dark:text-on-surface focus:border-primary outline-none appearance-none shadow-sm disabled:opacity-50"
                    >
                      {[1,2,3,4,5,6,7,8,9, "10+"].map(n => (
                        <option key={n} value={n} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white">{n} {n === 1 ? t("person", lang) : t("people", lang)}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-on-surface/60 font-bold ml-1">{t("trip_style", lang)}</label>
                    <div className="flex flex-wrap gap-2">
                      {tripTypes.map(type => (
                        <button
                          key={type} type="button"
                          disabled={isLoading}
                          onClick={() => setFormState({...formState, selectedType: type})}
                          className={`px-3 py-1.5 rounded-full text-[9px] uppercase tracking-widest border transition-all ${
                            formState.selectedType === type
                              ? "bg-primary border-primary text-on-primary font-bold shadow-md shadow-primary/20"
                              : "bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-600 dark:text-on-surface/60 hover:bg-stone-100 dark:hover:bg-white/10 shadow-sm"
                          } disabled:opacity-50`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    {formState.selectedType === "Other" && (
                      <input
                        type="text" value={formState.customType}
                        disabled={isLoading}
                        onChange={(e) => setFormState({ ...formState, customType: e.target.value })}
                        placeholder={t("describe_trip_style", lang)}
                        className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-on-surface focus:border-primary outline-none transition-all placeholder:text-stone-400 dark:placeholder:text-on-surface/30 shadow-sm disabled:opacity-50 mt-2"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface/60 font-bold ml-1">{t("destinations_caps", lang)}</label>
                  <div className="flex flex-wrap gap-2">
                    {destinations.map(dest => (
                      <button
                        key={dest} type="button"
                        disabled={isLoading}
                        onClick={() => toggleDestination(dest)}
                        className={`px-4 py-2 rounded-xl text-[10px] border transition-all ${
                          formState.selectedDestinations.includes(dest)
                            ? "bg-primary/10 border-primary text-primary font-bold shadow-sm"
                            : "bg-white dark:bg-white/5 border-stone-200 dark:border-white/10 text-stone-600 dark:text-on-surface/70 hover:bg-stone-100 shadow-sm"
                        } disabled:opacity-50`}
                      >
                        {dest}
                      </button>
                    ))}
                  </div>
                  {formState.selectedDestinations.includes("Other") && (
                    <input
                      type="text" value={formState.customDest}
                      disabled={isLoading}
                      onChange={(e) => setFormState({ ...formState, customDest: e.target.value })}
                      placeholder={t("enter_destination", lang)}
                      className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm text-stone-900 dark:text-on-surface focus:border-primary outline-none transition-all placeholder:text-stone-400 dark:placeholder:text-on-surface/30 shadow-sm disabled:opacity-50"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface/60 font-bold ml-1">{t("additional_notes", lang)}</label>
                  <textarea
                    rows={3} value={formState.message}
                    disabled={isLoading}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 rounded-xl px-5 py-4 text-stone-900 dark:text-on-surface focus:border-primary outline-none resize-none placeholder:text-stone-400 dark:placeholder:text-on-surface/30 shadow-sm disabled:opacity-50"
                    placeholder={t("tell_us_preferences", lang)}
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-500 text-xs font-bold text-center">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-on-primary font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? t("delivering_plan", lang) : t("request_itinerary", lang)}
                  {!isLoading && <span className="material-symbols-outlined">arrow_forward</span>}
                </button>
              </form>
            </div>
          </AnimateOnScroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
