import styles from "./JobBody.module.css";

export function JobBody({ content }: { content: string }) {
  return (
    <div
      className={`prose ${styles.body}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
