"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import type { JobFilters as JobFiltersType } from "@/lib/types";
import styles from "./JobFilters.module.css";

type Props = {
  filters: JobFiltersType;
};

export function JobFilters({ filters }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const values = useMemo(
    () => ({
      q: searchParams.get("q") || "",
      location: searchParams.get("location") || "",
      department: searchParams.get("department") || "",
      seniority: searchParams.get("seniority") || "",
      work_mode: searchParams.get("work_mode") || "",
    }),
    [searchParams],
  );

  function update(next: Partial<typeof values>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries({ ...values, ...next }).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });
    params.delete("page");
    const qs = params.toString();
    router.push(qs ? `/jobs?${qs}` : "/jobs");
  }

  return (
    <div className={styles.wrap}>
      <form
        className={styles.search}
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          update({ q: String(data.get("q") || "") });
        }}
      >
        <input
          name="q"
          defaultValue={values.q}
          placeholder="Search careers"
          aria-label="Search careers"
        />
        <button type="submit" className="btn btn-dark">
          Search
        </button>
      </form>

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Hide filters" : "Show filters"}
      </button>

      <div className={`${styles.filters} ${open ? styles.open : ""}`}>
        <label>
          Location
          <select
            value={values.location}
            onChange={(event) => update({ location: event.target.value })}
          >
            <option value="">All</option>
            {filters.locations.map((term) => (
              <option key={term.slug} value={term.slug}>
                {term.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Department
          <select
            value={values.department}
            onChange={(event) => update({ department: event.target.value })}
          >
            <option value="">All</option>
            {filters.departments.map((term) => (
              <option key={term.slug} value={term.slug}>
                {term.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Seniority
          <select
            value={values.seniority}
            onChange={(event) => update({ seniority: event.target.value })}
          >
            <option value="">All</option>
            {filters.seniorities.map((term) => (
              <option key={term.slug} value={term.slug}>
                {term.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Work mode
          <select
            value={values.work_mode}
            onChange={(event) => update({ work_mode: event.target.value })}
          >
            <option value="">All</option>
            {filters.work_modes.map((term) => (
              <option key={term.slug} value={term.slug}>
                {term.name}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
