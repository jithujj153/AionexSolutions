import Link from "next/link";
import type { Job } from "@/lib/types";
import { JobRow } from "./JobRow";
import styles from "./JobList.module.css";

export function JobList({ jobs, total }: { jobs: Job[]; total: number }) {
  if (!jobs.length) {
    return (
      <div className={styles.empty}>
        <h2>No career openings match these filters.</h2>
        <p>
          Get notified when new openings go live.{" "}
          <Link href="/alerts">Subscribe to career alerts</Link>.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.count}>
        {total} career opening{total === 1 ? "" : "s"}
      </p>
      <ul className={styles.list}>
        {jobs.map((job, index) => (
          <JobRow key={job.id} job={job} index={index} />
        ))}
      </ul>
    </div>
  );
}
