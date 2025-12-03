"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/containers";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { Home } from "lucide-react";

const Navbar = () => {
  const navItems = [
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      setIsDesktop(window.innerWidth >= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <Container className="">
      <motion.nav
        animate={{
          boxShadow: scrolled ? "var(--shadow-input)" : "none",
          width: isDesktop ? (scrolled ? "45%" : "100%") : "100%",

          borderRadius: "rem",
        }}
        transition={{
          duration: 0.3,
          ease: "easeOut",
        }}
        className="fixed left-1/2 -translate-x-1/2 top-0 z-50 flex w-[95%] md:w-full md:max-w-240 items-center justify-between 
        px-3 sm:px-4 py-3 bg-neutral-50/50 backdrop-blur-sm dark:bg-neutral-950/70 font-black text-neutral-900 dark:text-neutral-50 transition-all duration-300 backdrop-filter border border-dashed border-neutral-200 dark:border-neutral-700/50"
      >
        <Link
          href="/"
          className=" flex items-center justify-center dark:bg-neutral-800/60  "
        >
          <Home className="dark:text-neutral-300 text-neutral-500 dark:hover:text-neutral-50 hover:text-neutral-950 duration-200" />
        </Link>

        {/* Navigation links on the right */}
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-4 md:gap-6">
          {navItems.map((item, idx) => (
            <Link
              className="text-xs sm:text-sm relative px-2 sm:px-3 py-1.5 text-neutral-600 dark:text-neutral-300 font-medium transition-colors hover:text-neutral-900"
              href={item.href}
              key={idx}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="hovered-span"
                  className="h-full w-full absolute inset-0 rounded-md "
                />
              )}
              <span className="relative z-10 ">{item.title}</span>
            </Link>
          ))}

          <div className="pl-2 border-l border-neutral-300/40 dark:border-neutral-700/50">
            <motion.div
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
              className="mt-2 pl-1"
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </div>
      </motion.nav>
    </Container>
  );
};

export default Navbar;
