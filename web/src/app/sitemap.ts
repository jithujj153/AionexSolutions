import type { MetadataRoute } from "next";
import { getJobs } from "@/lib/api";
import { absoluteUrl } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/jobs",
    "/services",
    "/hire",
    "/alerts",
    "/about",
    "/contact",
    "/privacy",
  ].map(
    (path) => ({
      url: absoluteUrl(path || "/"),
      lastModified: new Date(),
    }),
  );

  const { jobs } = await getJobs({ per_page: 100 });
  const jobRoutes = jobs.map((job) => ({
    url: absoluteUrl(`/jobs/${job.slug}`),
    lastModified: new Date(job.posted_at),
  }));

  return [...staticRoutes, ...jobRoutes];
}
