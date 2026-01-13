"use client";

import React from "react";

import { Send } from "lucide-react";
import { Button } from "./ui/button";
import SendIcon from "./ui/send-icon";

export function ContactForm() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });
      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      alert("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message");
    } finally {
      setLoading(false);
      setEmail("");
      setName("");
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-serif text-4xl font-medium tracking-tighter text-neutral-900 dark:text-neutral-50 leading-[0.9]">
        Send me a message
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-sm font-sans font-medium text-neutral-600 dark:text-neutral-400"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="What's your name?"
            className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 px-4 py-3 text-base text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 rounded-xl"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-sm font-sans font-medium text-neutral-600 dark:text-neutral-400"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 px-4 py-3 text-base text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 rounded-xl"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-sm font-sans font-medium text-neutral-600 dark:text-neutral-400"
          >
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            placeholder="Tell me about your project..."
            className="w-full bg-neutral-100 dark:bg-neutral-900 border border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 px-4 py-3 text-base text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none rounded-xl"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium gap-2 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </div>
            ) : (
              <>
                Send Message <SendIcon />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
