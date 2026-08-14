import type { Job } from "@/lib/types";
import styles from "./JobHeader.module.css";

export function JobHeader({ job }: { job: Job }) {
  const meta = [
    job.location?.name,
    job.seniority?.name,
    job.work_mode?.name,
    job.department?.name,
  ].filter(Boolean);

  return (
    <header className={styles.header}>
      <p className="eyebrow">Open role</p>
      <h1>{job.title}</h1>
      {meta.length > 0 && <p className={styles.meta}>{meta.join(" · ")}</p>}
      {job.salary_range ? <p className={styles.salary}>{job.salary_range}</p> : null}
    </header>
  );
}
