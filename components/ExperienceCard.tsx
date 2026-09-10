import { ArrowUpRight } from "lucide-react";
import type { Experience, Product } from "@/data/experience";
import { Expandable } from "./Expandable";
import { Logo } from "./Logo";
import { TechChip } from "./TechIcon";

function ProductBlock({ product }: { product: Product }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          {product.logo && <Logo src={product.logo} alt={product.name} size={24} />}
          <h4 className="truncate text-sm font-medium text-primary">{product.name}</h4>
        </div>
        {product.url && (
          <a
            href={product.url}
            target="_blank"
            rel="noreferrer"
            className="quiet-link inline-flex shrink-0 items-center gap-0.5 font-mono text-xs"
          >
            {product.url.replace(/^https?:\/\//, "")}
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>
      <p className="mt-1.5 text-[13px] text-dim">{product.tagline}</p>
      <ul className="mt-3 list-disc space-y-2 pl-4 marker:text-muted">
        {product.bullets.map((b) => (
          <li key={b} className="text-[13px] leading-relaxed text-dim">
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {product.tech.map((t) => (
          <TechChip key={t} name={t} />
        ))}
      </div>
    </div>
  );
}

export function ExperienceCard({ item }: { item: Experience }) {
  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {item.logo && <Logo src={item.logo} alt={item.company} size={40} className="mt-0.5" />}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-[15px] font-medium text-primary">
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 transition-colors hover:text-accent"
                  >
                    {item.company}
                    <ArrowUpRight size={13} className="text-muted" />
                  </a>
                ) : (
                  item.company
                )}
              </h3>
              <span className="whitespace-nowrap pt-0.5 font-mono text-xs text-muted">{item.period}</span>
            </div>
            <p className="mt-0.5 text-[13px] text-secondary">{item.role}</p>
            {item.tagline && <p className="mt-0.5 text-xs text-muted">{item.tagline}</p>}
          </div>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-dim">{item.summary}</p>

        <Expandable>
          <div className="mt-4 space-y-6 border-t pt-4">
            {item.products.map((product) => (
              <ProductBlock key={product.name} product={product} />
            ))}
          </div>
        </Expandable>
      </div>
    </div>
  );
}
