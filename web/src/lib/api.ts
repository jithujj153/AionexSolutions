import type { ApiMessage, Job, JobFilters, JobQuery, JobsResponse } from "./types";

const WP_API_URL =
  process.env.WP_API_URL ||
  process.env.NEXT_PUBLIC_WP_API_URL ||
  "https://cms.aionexoutsourcing.com/wp-json";

function buildQuery(params: Record<string, string | number | boolean | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === "" || value === false) return;
    search.set(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : "";
}

async function wpFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${WP_API_URL}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    next: init?.method && init.method !== "GET" ? undefined : { revalidate: 30 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `WordPress API error (${res.status})`);
  }

  return res.json() as Promise<T>;
}

export async function getJobs(query: JobQuery = {}): Promise<JobsResponse> {
  try {
    return await wpFetch<JobsResponse>(
      `/aionex/v1/jobs${buildQuery({
        q: query.q,
        location: query.location,
        department: query.department,
        seniority: query.seniority,
        work_mode: query.work_mode,
        page: query.page || 1,
        per_page: query.per_page || 20,
        featured: query.featured ? 1 : undefined,
      })}`,
    );
  } catch {
    return { jobs: [], total: 0, page: 1, per_page: query.per_page || 20, total_pages: 0 };
  }
}

export async function getJob(slug: string): Promise<Job | null> {
  try {
    return await wpFetch<Job>(`/aionex/v1/jobs/${encodeURIComponent(slug)}`);
  } catch {
    return null;
  }
}

export async function getJobFilters(): Promise<JobFilters> {
  try {
    return await wpFetch<JobFilters>("/aionex/v1/job-filters");
  } catch {
    return {
      locations: [],
      departments: [],
      seniorities: [],
      work_modes: [],
    };
  }
}

export function getPublicApiUrl(path: string) {
  const base =
    process.env.NEXT_PUBLIC_WP_API_URL ||
    "https://cms.aionexoutsourcing.com/wp-json";
  return `${base}${path}`;
}

export async function postJson<T extends ApiMessage>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(getPublicApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T;
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}

export async function postMultipart<T extends ApiMessage>(
  path: string,
  formData: FormData,
): Promise<T> {
  const res = await fetch(getPublicApiUrl(path), {
    method: "POST",
    body: formData,
  });
  const data = (await res.json().catch(() => ({}))) as T;
  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }
  return data;
}
