import Avatar from "@/components/Avatar";
import { Card } from "@/components/Card";
import Image from "next/image";
import Graph from "@/components/Graph";
import Tech from "@/components/Tech";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  const techStack = [
    { name: "Node.js", path: "/icons/node.svg" },
    { name: "Typescript", path: "/icons/ts.svg" },
    {
      name: "Next.js",
      path: "/icons/nextjslight.svg",
    },
    { name: "Digital Ocean", path: "/icons/ocean.svg" },
    { name: "Docker", path: "/icons/docker.svg" },
    { name: "Redis", path: "/icons/redis.svg" },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 ">
      <Graph />
      <ThemeToggle />
      <div className="flex gap-3 ">
        <div className="abosolute left-0 top-0 mr-10 mb-10 mt-2">
          <Avatar />
        </div>

        <div>
          <p className="text-[45px] leading-tight font-serif tracking-wide font-bold flex items-center gap-4">
            Hi , I'm Piyush{" "}
            <span className="mx -3 "> — A Full Stack Developer!</span>
          </p>

          <div className="font-sans text-neutral-400 text-lg  ">
            <span className="flex items-center gap-2">
              I build interactive web apps using{" "}
              <Tech logo="/icons/ts.svg" name="Typescript" className="w-27 " />
              ,
              <Tech
                logo="/icons/node.svg"
                name="Node.js"
                className=" w-22 "
              />{" "}
              ,
              <Tech
                logo="/icons/nextjslight.svg"
                name="Next.js"
                className=" w-22 "
              />{" "}
              ,
            </span>
            <span className="flex items-center gap-2 mt-1 mb-1">
              <Tech logo="/icons/python.svg" name="Python" className=" w-22 " />
              <span>
                with the focus on{" "}
                <span className="dark:text-white font-semibold text-neutral-500">Backend</span> side.
              </span>
            </span>
            Enthusiastic about AI and Open Source Contribution.
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 mt-10">
        <Card
          title="Project 1"
          description="A brief description of Project 1."
          status="Ready"
          githubLink="#"
          imageSrc="/image.png"
          techStack={techStack}
          siteLink="#"
        />
        <Card
          title="Project 2"
          description="A brief description of Project 2."
          status="In Production"
          githubLink="#"
          imageSrc="/image.png"
          techStack={techStack}
        />
        <Card
          title="Project 3"
          description="A brief description of Project 3."
          status="Ready"
          githubLink="#"
          imageSrc="/image.png"
          techStack={techStack}
        />
        <Card
          title="Project 4"
          description="A brief description of Project 4."
          status="In Production"
          githubLink="#"
          imageSrc="/image.png"
          techStack={techStack}
        />
      </div>

      <Image
        src="/icons/nextdark.svg"
        alt="Sample Image"
        width={200}
        height={200}
        className="my-100 "
      />
    </div>
  );
}
