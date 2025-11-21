import Avatar from "@/components/Avatar";
import { Card } from "@/components/Card";

import Graph from "@/components/Graph";
import Tech from "@/components/Tech";
import ThemeToggle from "@/components/theme-toggle";

export default function Home() {
  const techStack = [
    { name: "Node.js", path: "/icons/node.svg" },
    { name: "Typescript", path: "/icons/ts.svg" },
    { name: "Next.js", path: "/icons/nextdark.svg" },
    { name: "Digital Ocean", path: "/icons/ocean.svg" },
    { name: "Docker", path: "/icons/docker.svg" },
    { name: "Redis", path: "/icons/redis.svg" },
  ];

  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2 ">
      <Graph />
      <ThemeToggle />
      <div className="flex gap-3">
        <Avatar />

        <div>
          <p className="text-2xl font-serif font-black flex items-center ">
            Hi , <span className="">I'm Piyush Rathore</span> , a Full Stack
            Developer!
          </p>

          <div className="font-mono ">
            specializing in building robust and scalable web applications using
            <br />
            <div className="flex items-center gap-3">
              <span>typescript and python & deploying them on</span>{" "}
              <Tech logo="/icons/vercel.svg" name="Vercel" className=" w-20" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-10 ">
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
    </div>
  );
}
