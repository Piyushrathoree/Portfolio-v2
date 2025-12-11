import React from "react";
import { Github, Heart, HeartCrack, HeartHandshake, HeartIcon, LucideHeart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="sm:w-230 mx-auto w-screen overflow-x-hidden bg-transparent  border-zinc-200 dark:border-white/10 py-6 px-4 md:px-8 mt-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-1">
          <span>Made by Piyush with</span>
          <LucideHeart className="w-4 h-4 text-red-500 " />
        </div>

        <Link
          href="https://github.com/Piyushrathoree/portfolio-v2"
          target="_blank"
          className="flex items-center gap-2  transition-colors duration-200"
        >
          <span>Liked my portfolio? Please leave a star</span>
          <Github className="w- h-4 dark:text-white  text-black" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
