"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { T, useLanguage } from "./components/i18n/LanguageProvider";
import PortfolioBackground from "./components/backgrounds/PortfolioBackground";
import "./styles/intro.css";

function Typewriter({ text, speed = 18, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval;
    let index = 0;
    if (motion.matches) {
      setDisplayed(text);
      return;
    }
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));
        if (index >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text, speed, delay]);

  return (
    <span className="intro-typewriter">
      <span className="intro-typewriter-measure" aria-hidden="true">{text}</span>
      <span className="intro-typewriter-visible" aria-hidden="true">{displayed}{displayed.length < text.length && <span className="intro-cursor" />}</span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

export default function IntroPage() {
  const { t, language } = useLanguage();
  return (
    <main id="main-content" className="intro-page">
      <PortfolioBackground />
      <div className="intro-layout">
        <div className="intro-greeting-block">
          <p className="intro-eyebrow"><span aria-hidden="true" /> BEGUN / PORTFOLIO</p>
          <h1 className="intro-greeting" aria-label={t("HI!")}>
            {language === "mn" ? <><span>Сайн</span><br /><span>уу!</span></> : "HI!"}
          </h1>
          <span className="intro-greeting-line" aria-hidden="true" />
        </div>
        <section className="intro-copy" aria-labelledby="intro-welcome">
          <p className="intro-chapter"><T>{"01 / INTRODUCTION"}</T></p>
          <h2 id="intro-welcome" className="intro-welcome">
            <Typewriter key={language} text={t("WELCOME TO BEGUN'S PORTFOLIO")} speed={24} delay={150} />
          </h2>
          <p className="intro-description">
            <Typewriter key={language} text={t("This website is where I share the projects I've built and the technologies I'm learning.")} speed={14} delay={550} />
          </p>
          <p className="intro-description intro-description-secondary">
            <Typewriter key={language} text={t("It represents my journey of becoming a better developer.")} speed={14} delay={1100} />
          </p>
          <Link href="/Home" className="intro-enter">
            <T>{"ENTER"}</T>
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" /></svg>
          </Link>
        </section>
      </div>
    </main>
  );
}
