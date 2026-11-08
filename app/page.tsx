import { Suspense } from "react";
import { fetchProjects } from "@/lib/notion";
import { fetchExperiences } from "@/lib/notion";
import { Metadata } from "next";
import { ProfileSection, ProfileSectionSkeleton } from "@/components/ProfileSection";
import { ExperienceCard, ExperienceListSkeleton } from "@/components/ExperienceCard";
import { ProjectCard, ProjectCardSkeleton } from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: "Ivan's Project",
  description: "Showcase of ivan's project",
};

async function ProjectGrid() {
  const projects = await fetchProjects();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}

async function ExperienceList() {
  const experiences = await fetchExperiences();
  return (
    <div className="flex flex-col">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} {...experience} />
      ))}
    </div>
  );
}


export default function Home() {
  return (
    <div className="min-h-screen w-full bg-base-200 relative">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 md:grid-cols-3 gap-16 top-8 px-4 items-start">
        <Suspense fallback={<ProfileSectionSkeleton />}>
          <ProfileSection />
        </Suspense>

        <section className="lg:col-span-3 md:col-span-2 flex flex-col gap-4">
          <div className="flex flex-col">
            <h2 className="font-mono font-bold text-xl">Working Experiences</h2>
            <Suspense fallback={<ExperienceListSkeleton experience_length={2} />}>
              <ExperienceList />
            </Suspense>
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="font-mono font-bold text-xl">Projects</h2>
            <Suspense fallback={<ProjectCardSkeleton project_length={2} />}>
              <ProjectGrid />
            </Suspense>
          </div>
        </section>
      </div>
    </div>
  );
}