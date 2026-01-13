"use client";

import React from "react";
import { Phone, Send } from "lucide-react";
import SendIcon from "./ui/send-icon";
import PhoneVolume from "./ui/phone-volume";
import TwitterXIcon from "./ui/twitter-x-icon";

export function ContactOptions() {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="flex flex-col gap-4">
        <a
          href="mailto:01piyush008@gmail.com"
          className="group flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl transition-all duration-300 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <SendIcon className="w-5 h-5 text-neutral-900 dark:text-neutral-100" />
            </div>
            <div>
              <h4 className="font-semibold font-sans text-neutral-900 dark:text-neutral-50 mb-0.5">
                Email Me
              </h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-sans">
                01piyush008@gmail.com
              </span>
            </div>
          </div>
          <div className="text-neutral-400 group-hover:translate-x-1 transition-transform group-hover:text-black dark:group-hover:text-white">
            →
          </div>
        </a>

        <a
          href="#"
          className="group flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl transition-all duration-300 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm flex items-center justify-center font-bold">
              <PhoneVolume className="w-5 h-5 text-neutral-900 font-bold dark:text-neutral-100" />
            </div>
            <a href="https://cal.com/piyush-nkthix/15min" target="_blank" rel="noopener noreferrer">
              <h4 className="font-semibold font-sans text-neutral-900 dark:text-neutral-50 mb-0.5">
                Book a Call
              </h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-sans">
                Let's hop on a 15 min call
              </span>
            </a>
          </div>
          <div className="text-neutral-400 group-hover:translate-x-1 transition-transform group-hover:text-black dark:group-hover:text-white">
            →
          </div>
        </a>

        <a
          href="https://x.com/__Piyushrathore"
          target="_blank"
          rel="noreferrer"
          className="group flex items-center justify-between p-4 bg-neutral-100 dark:bg-neutral-900 rounded-xl transition-all duration-300 border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
              <TwitterXIcon />
            </div>
            <div>
              <h4 className="font-semibold font-sans text-neutral-900 dark:text-neutral-50 mb-0.5">
                DM on X
              </h4>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-sans">
                @__Piyushrathore
              </span>
            </div>
          </div>
          <div className="text-neutral-400 group-hover:translate-x-1 transition-transform group-hover:text-black dark:group-hover:text-white">
            →
          </div>
        </a>
      </div>
    </div>
  );
}
