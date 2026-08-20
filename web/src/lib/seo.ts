import type { Metadata } from "next";
import type { Job } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://aionex-web-one.vercel.app";
const siteName = "AIONEX";
const defaultDescription =
  "AIONEX is a recruiting agency for career openings and hard-to-find talent. Browse careers or hire through the agency.";

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const fullTitle = title === siteName ? title : `${title} · ${siteName}`;
  const url = absoluteUrl(path);

  return {
    metadataBase: new URL(siteUrl),
    title: fullTitle,
    description,
    icons: {
      icon: [{ url: "/brand/favicon.svg", type: "image/svg+xml" }],
      shortcut: ["/brand/favicon.svg"],
      apple: [{ url: "/brand/favicon.svg" }],
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: "/opengraph-image?v=6",
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/twitter-image?v=6"],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function jobPostingJsonLd(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.excerpt || job.content,
    datePosted: job.posted_at,
    employmentType: job.work_mode?.name || "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "AIONEX",
      sameAs: absoluteUrl("/"),
    },
    jobLocation: job.location
      ? {
          "@type": "Place",
          address: {
            "@type": "PostalAddress",
            addressLocality: job.location.name,
          },
        }
      : undefined,
    url: absoluteUrl(`/jobs/${job.slug}`),
  };
}

export { defaultDescription, siteName, siteUrl };
