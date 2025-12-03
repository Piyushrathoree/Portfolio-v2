import Image from "next/image";
import Graph from "@/components/Graph";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Skills from "@/components/Skills";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen py-2 pt-20 md:pt-30 bg-accent/10 w-full  max-w-240 mx-auto px-4 md:px-6">
      <Hero />
      <Projects />
      <Graph />
      <Blogs />
      <Skills />
      <SocialLinks />
    </div>
  );
}
