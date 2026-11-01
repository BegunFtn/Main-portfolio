"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { translate } from "../../i18n/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "begun-portfolio-language";

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "mn" || saved === "en") setLanguageState(saved);
    } catch { /* Language selection still works when storage is unavailable. */ }
  }, []);

  useEffect(() => { document.documentElement.lang = language; }, [language]);

  const setLanguage = useCallback((next) => {
    if (next !== "en" && next !== "mn") return;
    setLanguageState(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch { /* Keep the in-memory preference. */ }
  }, []);
  const t = useCallback((text) => translate(text, language), [language]);
  const value = useMemo(() => ({ language, setLanguage, t }), [language, setLanguage, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}

export function T({ children }) {
  const { t } = useLanguage();
  return t(children);
}
