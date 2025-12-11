import React from "react";
import Icons from "./Icons";
import GithubIcon from "@/icons/GithubIcon";
import LinkedinIcon from "@/icons/LinkedinIcon";
import { Mail, X } from "lucide-react";

const Socials = () => {
  return (
    <div className="flex gap-3 mt-2 sm:mt-3 -mx-1">
      <Icons name="GitHub" link="https://github.com/Piyushrathoree">
        <GithubIcon />
      </Icons>
      <Icons name="X/twitter" link="https://X.com/__Piyushrathore">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-twitter-x h-5 w-5 mx-[3px]"
          viewBox="0 0 16 16"
          id="Twitter-X--Streamline-Bootstrap"
          height="16"
          width="16"
        >
          <desc>Twitter X Streamline Icon: https://streamlinehq.com</desc>
          <path
            d="M12.6 0.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867 -5.07 -4.425 5.07H0.316l5.733 -6.57L0 0.75h5.063l3.495 4.633L12.601 0.75Zm-0.86 13.028h1.36L4.323 2.145H2.865z"
            strokeWidth=""
            fill="currentColor"
          ></path>
        </svg>
      </Icons>{" "}
      <Icons name="Linkedin" link="https://Linkedin.com/in/piyushrathore--">
        <LinkedinIcon className="h-7 w-7" />
      </Icons>
      <Icons name="Mail" link="mailto:01piyush008@gmail.com">
        <Mail className="h-7 w-7" />
      </Icons>
    </div>
  );
};

export default Socials;
