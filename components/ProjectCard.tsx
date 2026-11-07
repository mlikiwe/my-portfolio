"use client"

import { useRouter } from "next/navigation";

export function ProjectCard(project: { id: string, title: string, description: string, category: string[], cover: string | null }) {
  const router = useRouter()

  return (
    <div key={project.id} className="card bg-white shadow-sm shadow-[#f1e5da]">
      <figure className="h-48 overflow-hidden">
        {project.cover && <img
          src={project.cover}
          alt={project.title}
          className="w-full h-full object-cover object-top" />}
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {project.title}
        </h2>
        <p>{project.description}</p>
        <div className="card-actions justify-start">
          {project.category.map((category: any, index: number) => (
            <div key={index} className={`badge bg-[#f1e5da] text-[#688E8F] border-none`}>
              {category}
            </div>
          ))}
        </div>
        <button onClick={() => router.push(`/${project.id}`)} className="mt-1 btn bg-[#688E8F] text-white border-none hover:bg-[#023E3B]">See the Blog Post</button>
      </div>
    </div>
  )
}

export function ProjectCardSkeleton({ project_length }: { project_length: number }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: project_length }).map((_, i) => (
        <div key={i} className="card bg-white shadow-sm shadow-[#f1e5da]">
          <figure className="h-48 overflow-hidden">
            <div className="skeleton w-full h-full" />
          </figure>
          <div className="card-body">
            <div className="skeleton h-6 w-3/4 rounded" />
            <div className="skeleton h-4 w-full rounded" />
            <div className="skeleton h-4 w-5/6 rounded" />
            <div className="card-actions justify-start">
              <div className="skeleton h-6 w-16 rounded-full" />
              <div className="skeleton h-6 w-20 rounded-full" />
            </div>
            <div className="skeleton btn w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}
