"use client";

import React from "react";
import { Phone, Twitter, Send, X } from "lucide-react";

export function ContactOptions() {
  return (
    <div className="flex flex-col gap-6 mt-4">
      <div className="flex flex-col gap-5">
        <a
          href="mailto:01piyush008@gmail.com"
          className="group flex items-center justify-between p-4 px-6 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-all duration-300  border hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors">
              <Send className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                Email Me
              </h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                01piyush008@gmail.com
              </span>
            </div>
          </div>
          <div className="text-neutral-400 group-hover:translate-x-1 transition-transform">
            →
          </div>
        </a>

        <a
          href="#"
          className="group flex items-center justify-between p-4 px-6 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-all duration-300 border  hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors">
              <Phone className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                Book a Call
              </h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                Let's hop on a 15 min call
              </span>
            </div>
          </div>
          <div className="text-neutral-400 group-hover:translate-x-1 transition-transform">
            →
          </div>
        </a>

        <a
          href="https://x.com/__Piyushrathore"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between p-4 px-6 bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-md transition-all duration-300 border hover:border-neutral-200 dark:hover:border-neutral-700"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full group-hover:bg-white dark:group-hover:bg-neutral-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                id="Twitter-X--Streamline-Bootstrap"
                height="16"
                width="16"
                className="w-5 h-5 text-neutral-900 dark:text-neutral-100"
              >
                <desc>Twitter X Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
                  strokeWidth=""
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-50">
                DM on X
              </h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">
                @__Piyushrathore
              </span>
            </div>
          </div>
          <div className="text-neutral-400 group-hover:translate-x-1 transition-transform">
            →
          </div>
        </a>
      </div>
    </div>
  );
}
