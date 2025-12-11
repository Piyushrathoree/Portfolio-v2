"use client";

import React from "react";
import Container from "@/components/containers";
import { ContactForm } from "@/components/ContactForm";
import { ContactOptions } from "@/components/ContactOptions";

const ContactPage = () => {
  return (
    <Container className="min-h-screen pt-35 pb-20 px-4 sm:px-10 sm:w-230 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column: Header & Options */}
        <div className="flex flex-col gap-10 lg:sticky lg:top-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex h-4 w-4 items-center justify-center cursor-pointer">
                <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                Available for work
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-7xl font-medium tracking-tighter text-neutral-900 dark:text-neutral-50 leading-[0.9]">
              Let's start a <br /> conversation.
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-sm leading-relaxed mt-2">
              Interested in working together? feel free to drop me a line.
            </p>
          </div>

          <ContactOptions />
        </div>

        {/* Right Column: Form */}
        <div className="w-full">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
};

export default ContactPage;
