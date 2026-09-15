type AionexMarkProps = {
  className?: string;
  title?: string;
};

/** Approved client mark. */
export function AionexMark({ className, title = "AIONEX" }: AionexMarkProps) {
  return (
    <img
      className={className}
      src="/brand/aionex-logo.png"
      alt={title}
      width={240}
      height={200}
    />
  );
}
