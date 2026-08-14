import { Suspense } from "react";
import { JobFilters } from "@/components/jobs/JobFilters";
import { JobList } from "@/components/jobs/JobList";
import { getJobFilters, getJobs } from "@/lib/api";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Open roles",
  description: "Browse open jobs at AIONEX. Search and filter current opportunities.",
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
    <div className="page page-light">
      <div className="container">
        <p className="eyebrow">Careers</p>
        <h1 className="page-title">Open roles</h1>
        <p className="page-lead">
          Search current openings. Apply with your resume — AIONEX HR reviews every application.
        </p>
        <Suspense fallback={<div>Loading filters…</div>}>
          <JobFilters filters={filters} />
        </Suspense>
        <JobList jobs={jobsResponse.jobs} total={jobsResponse.total} />
      </div>
    </div>
  );
}
