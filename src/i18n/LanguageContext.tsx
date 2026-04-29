import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { translations, TranslationKey } from "./translations";

export type LanguageCode = "en" | "fr" | "de" | "zh" | "pt";

export const languages: { code: LanguageCode; label: string; iso: string; native: string }[] = [
  { code: "en", label: "English", iso: "GB", native: "English" },
  { code: "fr", label: "French", iso: "FR", native: "Français" },
  { code: "de", label: "German", iso: "DE", native: "Deutsch" },
  { code: "zh", label: "Chinese", iso: "CN", native: "中文" },
  { code: "pt", label: "Portuguese", iso: "PT", native: "Português" },
];

export const flagEmoji = (iso: string) =>
  iso
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

interface LanguageContextValue {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = "hle.lang";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") return "en";
    const stored = window.localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    return stored && languages.some((l) => l.code === stored) ? stored : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: setLangState,
      t: (key) => translations[lang]?.[key] ?? translations.en[key] ?? key,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
