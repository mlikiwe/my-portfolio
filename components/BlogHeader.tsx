import { fetchProject } from "@/lib/notion"
import { ClockIcon } from "./icons/ClockIcon"

type Props = { params: Promise<{ slug: string }> }

export async function BlogHeader({ params }: Props) {
    const { slug } = await params
    const { title, date, techStack } = await fetchProject(slug)

    return (
        <div className="mb-4 pb-4 border-b border-[#f1e5da]">
            <h1 className="text-3xl font-semibold text-black font-sans">{title}</h1>
            {date && (
                <div className="flex flex-row mt-1">
                    <ClockIcon className="w-3 h-3 self-center mr-1 text-black/50"/>
                    <p className="text-sm text-black/50">
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