import { ArrowUpRight } from "lucide-react";
import type { Experience } from "@/data/experience";
import { Expandable } from "./Expandable";
import { Logo } from "./Logo";
import { TechChip } from "./TechIcon";

export function ExperienceCard({ item }: { item: Experience }) {
  const allTech = Array.from(new Set(item.products.flatMap((p) => p.tech)));

  return (
    <div className="card overflow-hidden">
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium text-primary">{item.role}</h3>
            <div className="mt-1.5 flex items-center gap-2 text-sm">
              {item.logo && <Logo src={item.logo} alt={item.company} size={20} />}
              {item.url ? (
                <a href={item.url} target="_blank" rel="noreferrer" className="text-secondary transition-colors hover:text-accent">
                  {item.company}
                </a>
              ) : (
                <span className="text-secondary">{item.company}</span>
              )}
            </div>
            {item.tagline && <p className="mt-1 text-xs text-muted">{item.tagline}</p>}
          </div>
          <span className="whitespace-nowrap font-mono text-xs text-muted">{item.period}</span>
        </div>

        <p className="mt-3 text-[13px] leading-relaxed text-dim">{item.summary}</p>

        <Expandable>
          <div className="mt-3 space-y-5 border-t pt-4">
            {item.products.map((product) => (
              <div key={product.name}>
                <div className="flex items-center gap-2">
                  {product.logo && <Logo src={product.logo} alt={product.name} size={20} />}
                  <h4 className="text-sm font-medium text-primary">{product.name}</h4>
                  {product.url && (
                    <a href={product.url} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-0.5 font-mono text-xs">
                      {product.url.replace(/^https?:\/\//, "")}
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted">{product.tagline}</p>
                <ul className="mt-2 space-y-2">
                  {product.bullets.map((b) => (
                    <li key={b} className="text-[13px] leading-relaxed text-dim">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {allTech.map((t) => (
                <TechChip key={t} name={t} />
              ))}
            </div>
          </div>
        </Expandable>
      </div>
    </div>
  );
}
