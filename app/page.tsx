import Graph from "@/components/Graph";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Skills from "@/components/Skills";
import { SocialLinks } from "@/components/SocialLinks";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <div className="flex flex-col justify-center items-center py-2 pt-30 w-full sm:w-230 px-4 md:px-8 mx-auto">
        <Hero />
        <Projects />
        <Graph />
        <Blogs />
        <Skills />
        {/* <SocialLinks /> */}
      </div>
    </main>
  );
}
