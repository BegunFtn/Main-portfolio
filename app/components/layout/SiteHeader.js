"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageProvider";
import "./SiteHeader.css";

const navLinks = [
  { href: "/About", label: "About Me" },
  { href: "/Works", label: "Works" },
  { href: "/Vlog", label: "Vlog" },
  { href: "/ContactMe", label: "Contact Me" },
];

export default function SiteHeader() {
  const path = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const [openPath, setOpenPath] = useState(null);
  const menuOpen = openPath === path;
  const header = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    function dismiss(event) {
      if (event.type === "keydown" && event.key === "Escape") {
        setOpenPath(null);
        menuButton.current?.focus();
      } else if (event.type === "pointerdown" && !header.current?.contains(event.target)) setOpenPath(null);
    }
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", dismiss);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", dismiss);
    };
  }, [menuOpen]);

  return (
    <header ref={header} className="site-header">
      <div className="site-header-inner">
        <Link className="site-logo" href="/Home" aria-label={language === "mn" ? "Нүүр хуудас" : "Portfolio home"} onClick={() => setOpenPath(null)}>
          <Image src="/branding/begun-logo.svg" alt="Begun" width={150} height={90} priority />
        </Link>
        <nav id="site-navigation" aria-label={language === "mn" ? "Үндсэн цэс" : "Main navigation"} className={`site-nav ${menuOpen ? "is-open" : ""}`}>
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined} className={href === "/ContactMe" ? "site-nav-contact" : undefined} onClick={() => setOpenPath(null)}>{t(label)}</Link>
          ))}
        </nav>
        <div className="site-header-actions">
          <button type="button" role="switch" aria-checked={language === "mn"} aria-label={language === "mn" ? "Монгол хэл сонгосон. Англи хэл рүү солих" : "English selected. Switch to Mongolian"} className="language-toggle" data-language={language} onClick={() => setLanguage(language === "en" ? "mn" : "en")}>
            <span className="language-toggle-thumb" aria-hidden="true" />
            <span lang="en" aria-hidden="true">EN</span><span lang="mn" aria-hidden="true">MN</span>
          </button>
          <button ref={menuButton} type="button" className="site-menu-button" aria-label={language === "mn" ? (menuOpen ? "Цэс хаах" : "Цэс нээх") : (menuOpen ? "Close menu" : "Open menu")} aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setOpenPath(menuOpen ? null : path)}>
            <span className={menuOpen ? "is-open" : ""} aria-hidden="true"><i /><i /><i /></span>
          </button>
        </div>
      </div>
    </header>
  );
}
