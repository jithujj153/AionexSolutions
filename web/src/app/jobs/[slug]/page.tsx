import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplyForm } from "@/components/jobs/ApplyForm";
import { JobBody } from "@/components/jobs/JobBody";
import { JobHeader } from "@/components/jobs/JobHeader";
import { getJob } from "@/lib/api";
import { jobPostingJsonLd, pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) {
    return pageMeta({
      title: "Role not found",
      description: "This career opening is no longer available.",
      path: `/jobs/${slug}`,
    });
  }
  return pageMeta({
    title: job.title,
    description: job.excerpt || `Apply for ${job.title} with AIONEX.`,
    path: `/jobs/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job || job.status !== "open") notFound();

  return (
    <div className="page page-light">
      <div className={`container ${styles.layout}`}>
        <div>
          <JobHeader job={job} />
          <JobBody content={job.content} />
        </div>
        <ApplyForm jobId={job.id} jobTitle={job.title} />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingJsonLd(job)) }}
      />
    </div>
  );
}
