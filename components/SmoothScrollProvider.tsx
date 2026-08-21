"use client";

import { ReactLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();

  // The redesigned homepage has a fixed, layered background. Native scrolling
  // keeps it composited to the viewport instead of transforming the root and
  // prevents the flicker visible with a smooth-scroll root.
  if (pathname === "/") {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1, // Lower = smoother but slower (0.05-0.15 is good)
        duration: 1.2, // Duration of scroll animation
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
