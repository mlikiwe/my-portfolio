import { fetchProject } from "@/lib/notion"
import { ClockIcon } from "./icons/ClockIcon"

type Props = { params: Promise<{ slug: string }> }

export async function BlogHeader({ params }: Props) {
    const { slug } = await params
    const { title, date, techStack } = await fetchProject(slug)

    return (
        <div className="mb-4 pb-4 border-b">
            <h1 className="text-3xl font-semibold font-sans">{title}</h1>
            {date && (
                <div className="flex flex-row mt-1">
                    <ClockIcon className="w-3 h-3 self-center mr-1 text-base-content/60" />
                    <p className="text-sm text-base-content/60">
                        Published on {new Date(date).toLocaleDateString("en-UK", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>
            )}
            {techStack.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                    {techStack.map((tech: string) => (
                        <span key={tech} className="badge bg-[#f1e5da] text-[#688E8F] border-none text-xs">
                            {tech}
                        </span>
                    ))}
                </div>
            )}
        </div>
    )
}

export function BlogHeaderSkeleton() {
  return (
    <div className="mb-6 flex flex-col gap-2 pb-6 border-b border-base-300">
      <div className="skeleton h-7 w-2/3 rounded" />
      <div className="skeleton h-4 w-24 rounded" />
      <div className="flex gap-2 mt-1">
        {[64, 80, 72].map((w) => (
          <div key={w} className="skeleton h-6 rounded-full" style={{ width: w }} />
        ))}
      </div>
    </div>
  )
}