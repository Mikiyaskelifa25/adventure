import { cookies } from "next/headers";
import { translations, type Language } from "./translations";

export async function getServerLang(): Promise<Language> {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value;
  if (lang === "en" || lang === "fr" || lang === "ru") return lang;
  return "en";
}

export function serverT(key: string, lang: Language): string {
  return translations[lang]?.[key] || translations["en"]?.[key] || key;
}
