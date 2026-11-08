import { fetchProject } from "@/lib/notion"
import { GithubIcon } from "./icons/GithubIcon"
import { DriveIcon } from "./icons/DriveIcon"
import { GlobeIcon } from "./icons/GlobeIcon"

type Props = { params: Promise<{ slug: string }> }

function KaggleMark() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v14.343l6.203-6.272c.165-.165.33-.246.495-.246h3.239c.144 0 .236.065.285.188.047.14.024.254-.074.351l-6.503 6.368 6.906 8.498c.097.148.117.279.047.258Z" />
        </svg>
    )
}

const LINK_CONFIG = {
    github: { label: "GitHub", icon: <GithubIcon className="w-5 h-5" /> },
    website: { label: "Website", icon: <GlobeIcon className="w-5 h-5" /> },
    drive: { label: "Drive", icon: <DriveIcon className="w-5 h-5" /> },
    kaggle: { label: "Kaggle", icon: <KaggleMark /> },
}

export async function BlogLinks({ params }: Props) {
    const { slug } = await params
    const { links } = await fetchProject(slug)

    if (links.length === 0) return null

    return (
        <div className="flex flex-wrap gap-3 mt-8 border-l-2 border-base-300 px-4">
            <span className="self-center text-[15px]">Explore more:</span>
            {links.map((link) => {
                const config = LINK_CONFIG[link.type]
                if (!config) return null
                return (
                    <a
                        key={link.type}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-primary rounded-3xl"
                    >
                        {config.icon}
                        {config.label}
                    </a>
                )
            })}
        </div>
    )
}