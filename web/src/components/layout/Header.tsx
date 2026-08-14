"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AionexMark } from "@/components/brand/AionexMark";
import styles from "./Header.module.css";

const nav = [
  { href: "/jobs", label: "Jobs" },
  { href: "/services", label: "Services" },
  { href: "/hire", label: "Hire" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.island}>
        <Link href="/" className={styles.brand} aria-label="AIONEX home" onClick={() => setOpen(false)}>
          <AionexMark className={styles.mark} />
          <span className={styles.wordmark}>AIONEX</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {nav
            .filter((item) => item.href !== "/contact")
            .map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}
        </nav>

        <Link href="/hire" className={styles.cta} onClick={() => setOpen(false)}>
          Hire talent
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={`${styles.menuIcon} ${open ? styles.menuIconOpen : ""}`} aria-hidden />
        </button>
      </div>

      <div
        className={`${styles.backdrop} ${open ? styles.backdropOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />

      <nav
        id={menuId}
        className={`${styles.mobilePanel} ${open ? styles.mobilePanelOpen : ""}`}
        aria-label="Mobile"
        aria-hidden={!open}
      >
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={styles.mobileLink}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="/hire"
          className={styles.mobileCta}
          tabIndex={open ? 0 : -1}
          onClick={() => setOpen(false)}
        >
          Hire talent
        </Link>
      </nav>
    </header>
  );
}
