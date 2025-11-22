import React from "react";
import Icons from "./Icons";

const Socials = () => {
  return (
    <div className="lg:w-138 flex gap-3 ml-[166px] ">
      <Icons
        path="/icons/githubdark.svg"
        name="GitHub"
        link="https://github.com/Piyushrathoree"
        className="dark:hidden"
      />
      <Icons
        path="/icons/githublight.svg"
        name="GitHub"
        link="https://github.com/Piyushrathoree"
        className="hidden dark:block"
      />
      <Icons
        path="/icons/linkedin.svg"
        name="Linkedin"
        link="https://linkedin.com/in/Piyushrathore--"
        className=""
      />

      <Icons
        path="/icons/githubdark.svg"
        name="GitHub"
        link="https://github.com/Piyushrathoree"
        className=""
      />
      <Icons
        path="/icons/githubdark.svg"
        name="GitHub"
        link="https://github.com/Piyushrathoree"
        className=""
      />
      <Icons
        path="/icons/githubdark.svg"
        name="GitHub"
        link="https://github.com/Piyushrathoree"
        className=""
      />
      <Icons
        path="/icons/githubdark.svg"
        name="GitHub"
        link="https://github.com/Piyushrathoree"
        className=""
      />
    </div>
  );
};

export default Socials;
