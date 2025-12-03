import React from "react";
import Tech from "./Tech";
import Avatar from "./Avatar";
import { RippleButton } from "./ui/ripple-button";
import Socials from "./Socials";

const Hero = () => {
  return (
    <div className="relative mb-10 md:mb-15 w-full">
      <div className="flex flex-col md:flex-row gap-4 md:gap-3 justify-start items-center md:items-start">
        <div className="mb-6 md:mr-5 md:mb-10 md:mt-2  ">
          <Avatar />
        </div>

        <div className="w-full overflow-hidden">
          <p className="text-2xl sm:text-3xl md:text-[45px] leading-tight font-serif font-bold flex flex-col md:flex-row md:items-center gap-1 md:gap-2 mt-3">
            <span className="wrap-break-word">Hi, I'm Piyush</span>
            <span className="text-xl sm:text-2xl md:text-[45px] wrap-break-word">
              — A Full Stack Developer!
            </span>
          </p>

          <div className="font-sans text-neutral-400 text-sm sm:text-base md:text-lg mt-4 max-w-full overflow-hidden">
            <span className="flex flex-wrap items-center gap-2">
              I build interactive web apps using{" "}
              <Tech
                logo="/icons/ts.svg"
                name="Typescript"
                className="w-20 sm:w-24 md:w-27"
              />
              ,
              <Tech
                logo="/icons/node.svg"
                name="Node.js"
                className="w-18 sm:w-20 md:w-22"
              />{" "}
              ,
              <Tech
                logo="/icons/nextjslight.svg"
                name="Next.js"
                className="w-18 sm:w-20 md:w-22"
              />{" "}
              ,
            </span>
            <span className="flex flex-wrap items-center gap-2 mt-2 mb-2">
              <Tech
                logo="/icons/python.svg"
                name="Python"
                className="w-18 sm:w-20 md:w-22"
              />
              <span>
                with the focus on{" "}
                <span className="dark:text-white font-semibold text-neutral-500">
                  Backend
                </span>{" "}
                side.
              </span>
            </span>
            <span className="block">
              Enthusiastic about{" "}
              <span className="font-semibold text-black/50 dark:text-neutral-100">
                Artificial Intelligence
              </span>{" "}
              and{" "}
              <span className="font-semibold text-black/50 dark:text-neutral-100">
                Open Source Contribution
              </span>
              .
            </span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 sm:gap-5 md:ml-48 mt-6 font-sans">
        <RippleButton
          rippleColor="#fafafa"
          className="rounded-none dark:border-white/60 border-neutral-700 border-dashed  dark:bg-neutral-800 bg-neutral-100/70 hover:bg-neutral-200 dark:hover:bg-transparent duration-300 py-1 px-2 text-black/70 dark:text-white/70 "
        >
          {" "}
          <a
            className="flex items-center gap-1"
            href="https://drive.google.com/file/d/1HbPyx_dw6osV4-jZA0Xfm1Xkyu_4eq63/view?usp=sharing"
          >
            Resume/CV
            <svg
              className="size-5"
              fill="currentColor"
              viewBox="0 0 846.66 846.66"
              style={{
                shapeRendering: "geometricPrecision",
                textRendering: "geometricPrecision",
                fillRule: "evenodd",
                clipRule: "evenodd",
              }}
              version="1.1"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <defs>
                  {" "}
                  <style type="text/css">{`.fil0 {}`}</style>{" "}
                </defs>{" "}
                <g id="Layer_x0020_1">
                  {" "}
                  <path
                    className="fil0"
                    d="M539.75 794.68c27.15,0 27.15,41.29 0,41.29l-497.47 0c-11.4,0 -20.64,-9.25 -20.64,-20.65l0 -621.69c0,-5.7 2.31,-10.87 6.04,-14.6l162.3 -162.29c4.03,-4.03 9.31,-6.05 14.59,-6.05l466.89 0c11.4,0 20.65,9.25 20.65,20.65l0 361.36c0,27.16 -41.29,27.16 -41.29,0l0 -340.72 -437.7 0 -150.19 150.2 0 592.5 476.82 0zm-351.21 -181.98c-27.16,0 -27.16,-41.29 0,-41.29l306.67 0c27.16,0 27.16,41.29 0,41.29l-306.67 0zm0 -274.68c-27.16,0 -27.16,-41.29 0,-41.29l306.67 0c27.16,0 27.16,41.29 0,41.29l-306.67 0zm0 91.56c-27.16,0 -27.16,-41.29 0,-41.29l306.67 0c27.16,0 27.16,41.29 0,41.29l-306.67 0zm0 91.56c-27.16,0 -27.16,-41.29 0,-41.29l306.67 0c27.16,0 27.16,41.29 0,41.29l-306.67 0zm0 -274.68c-27.16,0 -27.16,-41.29 0,-41.29l306.67 0c27.16,0 27.16,41.29 0,41.29l-306.67 0zm496.57 238.25c49.84,0 90.24,40.4 90.24,90.24 0,18.1 -5.33,34.95 -14.5,49.07 37.57,24.93 61.47,66.08 64.13,111.2 1.59,27.06 -39.55,29.47 -41.13,2.42 -2.11,-35.69 -22.61,-67.48 -54.13,-84.24 -13.16,7.5 -28.38,11.78 -44.61,11.78 -17.56,0 -33.95,-5.01 -47.81,-13.69 -33.44,16.12 -55.6,49.04 -57.79,86.15 -1.59,27.05 -42.72,24.64 -41.13,-2.42 2.79,-47.18 28.75,-89.88 69.08,-114.28 -7.99,-13.47 -12.58,-29.19 -12.58,-45.99 0,-49.83 40.4,-90.24 90.23,-90.24zm0 41.29c-27.03,0 -48.94,21.92 -48.94,48.95 0,27.03 21.91,48.94 48.94,48.94 27.03,0 48.95,-21.91 48.95,-48.94 0,-27.03 -21.91,-48.95 -48.95,-48.95z"
                  ></path>{" "}
                </g>{" "}
              </g>
            </svg>
          </a>
        </RippleButton>
        <RippleButton
          rippleColor="#fafafa"
          className="rounded-none dark:border-white/60 border-neutral-700 border-dashed  dark:bg-neutral-800 bg-neutral-100/70 hover:bg-neutral-200 dark:hover:bg-transparent duration-300 py-1 px-2 text-black/70 dark:text-white/70 "
        >
          {" "}
          <a href="/contact" className="flex gap-1 items-center">
            Get in touch
            <svg
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              className="size-5 "
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier"></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M10.4995 13.5002L20.9995 3.00017M10.6271 13.8282L13.2552 20.5862C13.4867 21.1816 13.6025 21.4793 13.7693 21.5662C13.9139 21.6415 14.0862 21.6416 14.2308 21.5664C14.3977 21.4797 14.5139 21.1822 14.7461 20.5871L21.3364 3.69937C21.5461 3.16219 21.6509 2.8936 21.5935 2.72197C21.5437 2.57292 21.4268 2.45596 21.2777 2.40616C21.1061 2.34883 20.8375 2.45364 20.3003 2.66327L3.41258 9.25361C2.8175 9.48584 2.51997 9.60195 2.43326 9.76886C2.35809 9.91354 2.35819 10.0858 2.43353 10.2304C2.52043 10.3972 2.81811 10.513 3.41345 10.7445L10.1715 13.3726C10.2923 13.4196 10.3527 13.4431 10.4036 13.4794C10.4487 13.5115 10.4881 13.551 10.5203 13.5961C10.5566 13.647 10.5801 13.7074 10.6271 13.8282Z"
                  stroke="#000000"
                  stroke-width=""
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </a>
        </RippleButton>
      </div>
      <Socials />
      <span className="flex items-center mt-20">
        <span className="h-px flex-1 bg-linear-to-r from-transparent to-neutral-400"></span>
        <span className="h-px flex-1 bg-linear-to-l from-transparent to-neutral-400"></span>
      </span>
    </div>
  );
};

export default Hero;
