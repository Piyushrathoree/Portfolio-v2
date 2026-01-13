"use client";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "./theme-toggle";
import { Menu01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cn } from "@/lib/utils";

import HomeIcon from "./ui/home-icon";

const Navbar = () => {
  const navItems = [
    {
      title: "Home",
      href: "/",
      icon: <HomeIcon />,
    },
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-215 pointer-events-none">
      <motion.nav
        layout
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          height: isOpen ? "auto" : "54px",
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto overflow-hidden bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 rounded-xl shadow-sm"
      >
        <div className="flex flex-col w-full">
          {/* Top Bar: Always Visible */}
          <div className="flex items-center justify-between px-4 py-2 h-[54px]">
            {/* Home/Logo */}
            <Link
              href="/"
              className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <HomeIcon />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {navItems
                .filter((i) => i.title !== "Home")
                .map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium transition-colors rounded-xl flex items-center gap-2",
                      "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    )}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {hovered === idx && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 bg-neutral-200/50 dark:bg-neutral-700/50 rounded-lg -z-10"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    {item.title}
                  </Link>
                ))}
              <div className="h-6 w-px bg-neutral-200 dark:bg-neutral-800 mx-2" />
              <ThemeToggle />
            </div>

            {/* Mobile Controls */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 transition-colors text-neutral-600 dark:text-neutral-400"
              >
                <HugeiconsIcon
                  icon={isOpen ? Cancel01Icon : Menu01Icon}
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-neutral-200/50 dark:border-neutral-800/50"
              >
                <div className="flex flex-col p-2 gap-1">
                  {navItems
                    .filter((i) => i.title !== "Home")
                    .map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-4 py-3 text-sm font-medium transition-colors rounded-xl flex items-center gap-3",
                          "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 hover:text-black dark:hover:text-white"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
