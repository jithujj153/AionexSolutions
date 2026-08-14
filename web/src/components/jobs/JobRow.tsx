import Link from "next/link";
import type { Job } from "@/lib/types";
import styles from "./JobRow.module.css";

function formatDate(value: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function JobRow({ job, index = 0 }: { job: Job; index?: number }) {
  return (
    <li
      className={styles.row}
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <Link href={`/jobs/${job.slug}`} className={styles.link}>
        <div>
          <h2>{job.title}</h2>
          <p className={styles.meta}>
            {[
              job.location?.name,
              job.seniority?.name,
              job.work_mode?.name,
              job.department?.name,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <time dateTime={job.posted_at}>{formatDate(job.posted_at)}</time>
      </Link>
    </li>
  );
}
