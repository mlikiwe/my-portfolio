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