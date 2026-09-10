import type { ReactNode } from "react";

export function Section({
  id,
  title,
  action,
  children,
  className = "mt-14",
}: {
  id?: string;
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="section-title mb-0">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
