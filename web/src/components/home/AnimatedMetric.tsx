"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./HomeSections.module.css";

type Outcome = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
  durationMs?: number;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function useInView<T extends Element>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  return { ref, inView };
}

function CountUp({
  value,
  suffix = "",
  prefix = "",
  active,
  durationMs = 1600,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  active: boolean;
  durationMs?: number;
}) {
  const [display, setDisplay] = useState(0);
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (!active) return;
    if (reducedMotion.current) {
      setDisplay(value);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      setDisplay(Math.round(easeOutCubic(progress) * value));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value, durationMs]);

  return (
    <span className={styles.metricValue}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

export function OutcomesMetrics({ items }: { items: Outcome[] }) {
  const { ref, inView } = useInView<HTMLDListElement>();

  return (
    <dl className={styles.metrics} ref={ref}>
      {items.map((item, index) => (
        <div key={item.label} className={styles.metric}>
          <dt>
            <CountUp
              value={item.value}
              suffix={item.suffix}
              prefix={item.prefix}
              active={inView}
              durationMs={(item.durationMs ?? 1600) + index * 120}
            />
            <span className={styles.metricLabel}>{item.label}</span>
          </dt>
          <dd>{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
