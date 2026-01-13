import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/data/Social-item";
import { Dock, DockIcon } from "@/components/ui/dock";

export function SocialLinks() {
  return (
    <div className="w-full flex justify-center py-10">
      <Dock
        magnification={60}
        distance={100}
        className="border-neutral-200 dark:border-white/10 bg-white/50 dark:bg-black/20"
      >
        {SOCIAL_LINKS.map((link, index) => (
          <DockIcon key={index}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-full w-full items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 transition-colors hover:bg-neutral-200 dark:hover:bg-neutral-700"
              title={link.title}
            >
              <div className="relative h-5 w-5">
                <Image
                  src={link.icon}
                  alt={link.title}
                  fill
                  className="object-contain dark:invert"
                />
              </div>
            </Link>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
