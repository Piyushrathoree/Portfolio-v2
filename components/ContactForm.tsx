"use client";

import React from "react";

import { Send } from "lucide-react";

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
    <div className="flex flex-col gap-8">
      <h1 className="font-serif text-4xl  font-medium tracking-tighter text-neutral-900 dark:text-neutral-50 leading-[0.9]">
        Send me a message
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="What's your name?"
            className="w-full bg-neutral-100 dark:bg-neutral-800/50 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 px-6 py-4 text-lg text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 rounded-lg"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your email address"
            className="w-full bg-neutral-100 dark:bg-neutral-800/50 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 px-6 py-4 text-lg text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 rounded-lg"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            rows={6}
            placeholder="Tell me about your project..."
            className="w-full bg-neutral-100 dark:bg-neutral-800/50 border-transparent focus:border-neutral-300 dark:focus:border-neutral-700 px-6 py-4 text-lg text-neutral-900 dark:text-neutral-50 focus:outline-none focus:ring-0 transition-all placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none rounded-lg"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <button
          type="submit"
            className="flex gap-2 mt-1  items-center mx-auto text-md w-full border rounded-sm  dark:bg-neutral-900 bg-neutral-100/70 hover:bg-neutral-100 dark:hover:bg-neutral-950 duration-300 py-3 px-6 justify-center text-black/70 dark:text-white/70 shadow-inner shadow-neutral-300 dark:shadow-neutral-600"
          >
            {" "}
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-green-500"
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
                Send Message <Send size={20} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
