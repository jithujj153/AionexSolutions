export type JobStatus = "open" | "closed";

export type JobTerm = {
  slug: string;
  name: string;
};

export type Job = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  status: JobStatus;
  featured: boolean;
  salary_range?: string;
  posted_at: string;
  location?: JobTerm | null;
  department?: JobTerm | null;
  seniority?: JobTerm | null;
  work_mode?: JobTerm | null;
};

export type JobFilters = {
  locations: JobTerm[];
  departments: JobTerm[];
  seniorities: JobTerm[];
  work_modes: JobTerm[];
};

export type JobsResponse = {
  jobs: Job[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
};

export type JobQuery = {
  q?: string;
  location?: string;
  department?: string;
  seniority?: string;
  work_mode?: string;
  page?: number;
  per_page?: number;
  featured?: boolean;
};

export type ApiMessage = {
  ok: boolean;
  message: string;
};
