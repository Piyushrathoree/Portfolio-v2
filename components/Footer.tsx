import React from "react";
import Link from "next/link";
import GithubIcon from "@/components/ui/github-icon";
import HeartIcon from "@/components/ui/heart-icon";
const Footer = () => {
  return (
    <footer className="site-footer w-full max-w-4xl mx-auto py-8 px-4 md:px-8 mt-10 border-t border-neutral-200 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
        <div className="flex items-center gap-1.5 transition-colors hover:text-black dark:hover:text-neutral-300 ">
          <span>Made with</span>
          <HeartIcon size={16} className="text-red-500 hover:scale-130" />
          <span>by Piyush</span>
        </div>

        <Link
          href="https://github.com/Piyushrathoree/portfolio-v2"
          target="_blank"
          className="group flex items-center gap-2 hover:text-black dark:hover:text-white/70 transition-colors duration-200"
        >
          <span>Liked my portfolio? Please leave a star</span>
          <div className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:rotate-12">
            <GithubIcon size={16} className="text-black dark:text-white" />
          </div>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
