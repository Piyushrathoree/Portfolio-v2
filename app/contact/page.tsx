import Container from "@/components/containers";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Piyush Rathore",
  description: "Get in touch with me",
};

export default function ContactPage() {
  return (
    <Container className="min-h-screen px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-sm font-mono text-neutral-600 dark:text-neutral-400 mb-2">
            Get in touch
          </p>
          <h1 className="text-4xl md:text-5xl font-black font-serif text-neutral-900 dark:text-neutral-50 border-b border-black dark:border-white/40 w-fit border-dashed pb-2">
            Contact
          </h1>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
            I'm always interested in hearing about new projects, opportunities,
            or just having a chat about technology and development.
          </p>

          {/* Contact Methods */}
          <div className="grid gap-6 mt-12">
            {/* Email */}
            <Link
              href="mailto:your.email@example.com"
              className="group flex items-start gap-4 p-6 border border-black/20 dark:border-white/20 border-dashed hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Email
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                  your.email@example.com
                </p>
              </div>
            </Link>

            {/* GitHub */}
            <Link
              href="https://github.com/Piyushrathoree"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 border border-black/20 dark:border-white/20 border-dashed hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Github className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  GitHub
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                  @Piyushrathoree
                </p>
              </div>
            </Link>

            {/* LinkedIn */}
            <Link
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 border border-black/20 dark:border-white/20 border-dashed hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Linkedin className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  LinkedIn
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                  Connect with me
                </p>
              </div>
            </Link>

            {/* Twitter */}
            <Link
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 border border-black/20 dark:border-white/20 border-dashed hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all duration-300"
            >
              <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Twitter className="w-6 h-6 text-neutral-700 dark:text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-1">
                  Twitter
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 font-mono">
                  @yourhandle
                </p>
              </div>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-900 border border-dashed border-neutral-300 dark:border-neutral-700">
            <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 mb-3">
              Response Time
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              I typically respond within 24-48 hours. For urgent matters, please
              mention it in the subject line.
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
