import { Suspense } from "react";
import { ResumeForm } from "@/components/forms/ResumeForm";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobList } from "@/components/jobs/JobList";
import { getJobFilters, getJobs } from "@/lib/api";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Career",
  description:
    "Ignite your career with AIONEX. Browse openings, apply with your resume, and join a team where every role is a chance to grow.",
  path: "/jobs",
});

type SearchParams = Promise<{
  q?: string;
  location?: string;
  department?: string;
  seniority?: string;
  work_mode?: string;
  page?: string;
}>;

function CareerIcon() {
  return (
    <svg className={styles.icon} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3.5 13.8 8l4.7.4-3.6 3.1 1.1 4.6L12 13.8 7.99 16.1 9.1 11.5 5.5 8.4 10.2 8 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M5 19.5h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default async function JobsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const [jobsResponse, filters] = await Promise.all([
    getJobs({
      q: params.q,
      location: params.location,
      department: params.department,
      seniority: params.seniority,
      work_mode: params.work_mode,
      page: params.page ? Number(params.page) : 1,
    }),
    getJobFilters(),
  ]);

  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={styles.intro} aria-labelledby="career-heading">
        <div className="container">
          <p className={`eyebrow ${styles.eyebrowRow}`}>
            <CareerIcon />
            Career
          </p>
          <h1 id="career-heading" className={styles.title}>
            Ignite Your Career with AIONEX
          </h1>
          <p className={styles.lead}>
            Join a dynamic team where every role is a chance to grow. Discover opportunities that
            align with your aspirations. Your career journey begins here.
          </p>
          <p className={styles.note}>
            Browse openings below, or post your resume at the bottom of this page. Your future
            awaits — let’s build it together.
          </p>
          <div className={styles.actions}>
            <a href="#openings" className="btn btn-dark">
              View openings
            </a>
            <a href="#resume" className="btn btn-accent">
              Post your resume
            </a>
          </div>
        </div>
      </section>

      <div id="openings" className={`container ${styles.openings}`}>
        <Suspense fallback={<div>Loading filters…</div>}>
          <JobFilters filters={filters} />
        </Suspense>
        <JobList jobs={jobsResponse.jobs} total={jobsResponse.total} />
      </div>

      <ResumeForm />
    </div>
  );
}
