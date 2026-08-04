import { PageEntrance } from "@/components/effects/PageEntrance";
import { Hero } from "@/components/sections/Hero";
import { Academics } from "@/components/sections/Academics";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Certificates } from "@/components/sections/Certificates";
import { Skills } from "@/components/sections/Skills";
import { Resume } from "@/components/sections/Resume";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <PageEntrance>
      <Hero />
      <Academics />
      <Projects />
      <Experience />
      <Certificates />
      <Skills />
      <Resume />
      <Contact />
    </PageEntrance>
  );
}
