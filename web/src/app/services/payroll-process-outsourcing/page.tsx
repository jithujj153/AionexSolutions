import Image from "next/image";
import Link from "next/link";
import { ExpertForm } from "@/components/forms/ExpertForm";
import { pageMeta } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata = pageMeta({
  title: "Payroll Process Outsourcing",
  description:
    "Payroll process outsourcing with AIONEX — accurate, compliant payroll so your HR team can focus on people, not process.",
  path: "/services/payroll-process-outsourcing",
});

const benefits = [
  {
    title: "Reduce Transaction Costs",
    icon: "/media/payroll-icons/001-discount.png",
  },
  {
    title: "100% Timely Updates for Employee Data",
    icon: "/media/payroll-icons/002-real-time.png",
  },
  {
    title: "0% Delay in Employee Pay-outs",
    icon: "/media/payroll-icons/003-loan.png",
  },
  {
    title: "Data Confidentiality and Security",
    icon: "/media/payroll-icons/004-document.png",
  },
  {
    title: "Dedicated Professional Team",
    icon: "/media/payroll-icons/005-workforce.png",
  },
  {
    title: "Time-sensitive Functions Completed Within the Time Frame",
    icon: "/media/payroll-icons/006-clock.png",
  },
];

export default function PayrollOutsourcingPage() {
  return (
    <div className={`page page-light ${styles.page}`}>
      <section className={`container ${styles.hero}`}>
        <div className={styles.copy}>
          <p className="eyebrow">Payroll Process Outsourcing</p>
          <h1 className={styles.title}>Streamlined Payroll Excellence</h1>
          <p className={styles.lead}>
            Elevate your business efficiency with AIONEX’s Payroll Process Outsourcing. Our seasoned
            team, with over 6 years of experience, ensures accuracy, compliance, and cost reduction,
            allowing your HR staff to focus on enhancing employee satisfaction and retention.
          </p>
        </div>
        <div className={styles.formCol}>
          <ExpertForm topic="Payroll Process Outsourcing" />
        </div>
      </section>

      <section className={`container ${styles.story}`} aria-labelledby="approach-heading">
        <div className={styles.storyCopy}>
          <h2 id="approach-heading" className={styles.sectionTitle}>
            Payroll, handled.
          </h2>
          <p>
            Discover the transformative impact of AIONEX’s Payroll Process Outsourcing service. As
            companies recognize the significance of reducing operational costs for non-core
            activities, AIONEX emerges as a sought-after partner in payroll processing. Redirect your
            HR staff’s efforts towards enhancing employee satisfaction and retaining top talent while
            our dedicated payroll team takes care of the intricacies.
          </p>
          <p>
            AIONEX brings over 6 years of expertise to payroll services, understanding the crucial
            role it plays in maintaining a competitive edge and fostering employee retention. Our
            payroll experts, renowned for their deep domain knowledge, prioritize accuracy and
            quality in every aspect of the payroll process. This commitment not only safeguards
            client companies from penalties and fines but also streamlines the payroll management
            cost reduction process.
          </p>
        </div>
        <div className={styles.storyMedia}>
          <Image
            src="/media/payroll-outsourcing.png"
            alt="Outsourcing payroll benefits: save time, save money, accuracy, security, and accountability"
            fill
            sizes="(max-width: 960px) 100vw, 46vw"
            className={styles.storyImage}
            unoptimized
            priority
          />
        </div>
      </section>

      <section className={styles.benefits} aria-labelledby="benefits-heading">
        <div className={`container ${styles.benefitsInner}`}>
          <h2 id="benefits-heading" className={styles.benefitsTitle}>
            Benefits of choosing AIONEX
          </h2>
          <ul className={styles.benefitGrid}>
            {benefits.map((item) => (
              <li key={item.title}>
                <Image
                  src={item.icon}
                  alt=""
                  width={72}
                  height={72}
                  className={styles.benefitIcon}
                />
                <h3>{item.title}</h3>
              </li>
            ))}
          </ul>
          <p className={styles.benefitsLead}>
            By partnering with AIONEX for payroll processing, organizations streamline operations,
            enhance performance, and deliver accurate, compliant payroll services to their
            workforce. Our competent implementation, payroll processing, and support teams
            collectively minimize the complexity of payroll management, freeing your organization to
            focus on core business functions.
          </p>
          <p className={styles.benefitsLead}>
            With AIONEX as your payroll processing partner, embrace efficiency, accuracy, and a
            renewed focus on your core revenue-generating functions.
          </p>
          <Link href="/contact" className={`btn btn-accent ${styles.cta}`}>
            Talk to us
          </Link>
        </div>
      </section>
    </div>
  );
}
