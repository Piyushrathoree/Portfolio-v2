import React from "react";

import GithubIcon from "./ui/github-icon";
import LinkedinIcon from "./ui/linkedin-icon";
import TwitterXIcon from "./ui/twitter-x-icon";
import GmailIcon from "./ui/gmail-icon";

const Socials = () => {
  const links = [
    {
      name: "GitHub",
      icon: <GithubIcon className="h-6 w-6" />,
      href: "https://github.com/Piyushrathoree",
    },
    {
      name: "Twitter",
      icon: <TwitterXIcon className="h-6 w-6" />,
      href: "https://X.com/__Piyushrathore",
    },
    {
      name: "LinkedIn",
      icon: <LinkedinIcon className="h-6 w-6" />,
      href: "https://Linkedin.com/in/piyushrathore--",
    },
    {
      name: "Mail",
      icon: <GmailIcon className="h-6 w-6" />,
      href: "mailto:01piyush008@gmail.com",
    },
  ];

  return (
    <div className="flex items-center gap-4 mt-6">
      {links.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
          aria-label={item.name}
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
};

export default Socials;
