import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

export function Section({
  id,
  title,
  action,
  footer,
  children,
  className = "mt-14",
}: {
  id?: string;
  title: string;
  action?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={className}>
      <Reveal>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="section-title mb-0">{title}</h2>
          {action}
        </div>
        {children}
        {footer && <div className="mt-3 flex justify-end">{footer}</div>}
      </Reveal>
    </section>
  );
}
