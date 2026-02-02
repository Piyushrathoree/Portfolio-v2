import Graph from "@/components/Graph";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Skills from "@/components/Skills";
import { SocialLinks } from "@/components/SocialLinks";
import FadeIn from "@/components/ui/fade-in";
import { ContactFooter } from "@/components/ContactOptions";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <div className="flex flex-col justify-center items-center py-2 pt-30 w-full max-w-230 px-4 md:px-8 mx-auto">
        <FadeIn>
          <Hero />
        </FadeIn>
        <FadeIn delay={0.1}>
          <Projects />
        </FadeIn>
        <FadeIn delay={0.2}>
          <Graph />
        </FadeIn>
        <FadeIn delay={0.3}>
          <Blogs />
        </FadeIn>
        <FadeIn delay={0.4}>
          <Skills />
        </FadeIn>
        <FadeIn delay={0.6}>
          <ContactFooter />
        </FadeIn>
        {/* <SocialLinks /> */}
      </div>
    </main>
  );
}
