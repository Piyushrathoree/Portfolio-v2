import Image from "next/image";
import { cn } from "@/lib/utils";

export type SocialLink = {
  icon: string;
  title: string;
  description?: string;
  href: string;
};

export function SocialLinkItem({ icon, title, href }: SocialLink) {
  return (
    <a
      className={cn(
        "group relative flex items-center justify-center p-2 transition-all duration-300 hover:scale-110"
      )}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
    >
      <div className="relative size-10 sm:size-12 shrink-0">
        <Image
          className="rounded-xl select-none grayscale transition-all duration-300 group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
          src={icon}
          alt={title}
          fill
          sizes="(max-width: 768px) 40px, 48px"
          quality={100}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </div>
    </a>
  );
}
