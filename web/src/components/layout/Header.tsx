"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { AionexMark } from "@/components/brand/AionexMark";
import { navServices, ourProducts } from "@/lib/services";
import styles from "./Header.module.css";

const nav = [
  { href: "/jobs", label: "Career" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact us" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuId = useId();
  const servicesMenuId = useId();

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
      if (window.matchMedia("(min-width: 768px)").matches) {
        setOpen(false);
        setServicesOpen(false);
      }
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
          <Link href="/jobs" className={styles.navLink}>
            Career
          </Link>

          <div
            className={styles.servicesWrap}
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className={`${styles.navLink} ${styles.servicesTrigger} ${servicesOpen ? styles.servicesTriggerOpen : ""}`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls={servicesMenuId}
              onFocus={() => setServicesOpen(true)}
            >
              Services
              <span className={styles.caret} aria-hidden />
            </Link>
            <div
              id={servicesMenuId}
              className={`${styles.servicesMenu} ${servicesOpen ? styles.servicesMenuOpen : ""}`}
              role="menu"
              aria-label="Services and products"
            >
              <div className={styles.servicesCols}>
                <div className={styles.servicesCol}>
                  <p className={styles.servicesColLabel}>Services</p>
                  {navServices.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href ?? `/services#${item.id}`}
                      className={styles.servicesItem}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    className={styles.servicesAll}
                    role="menuitem"
                    onClick={() => setServicesOpen(false)}
                  >
                    View all services
                  </Link>
                </div>
                <div className={styles.servicesCol}>
                  <p className={styles.servicesColLabel}>Products &amp; software</p>
                  <p className={styles.servicesColLead}>ERP and custom build.</p>
                  {ourProducts.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={styles.servicesItem}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {nav
            .filter((item) => item.href !== "/jobs")
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
        <Link href="/jobs" className={styles.mobileLink} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          Career
        </Link>
        <p className={styles.mobileGroupLabel}>Services</p>
        {navServices.map((item) => (
          <Link
            key={item.id}
            href={item.href ?? `/services#${item.id}`}
            className={styles.mobileSubLink}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        <Link href="/services" className={styles.mobileLink} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          All services
        </Link>
        <p className={styles.mobileGroupLabel}>Products &amp; software</p>
        {ourProducts.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            className={styles.mobileSubLink}
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            {item.title}
          </Link>
        ))}
        <Link href="/about" className={styles.mobileLink} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          About
        </Link>
        <Link href="/contact" className={styles.mobileLink} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
          Contact us
        </Link>
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
