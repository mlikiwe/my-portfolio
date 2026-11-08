import { GithubIcon } from "@/components/icons/GithubIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { fetchProfile } from "@/lib/notion";

export async function ProfileSection() {
    const profile = await fetchProfile();

    if (!profile) {
        return (
            <div className="lg:col-span-2 md:col-span-1 flex items-start justify-start">
                <p className="text-neutral-500">Profile belum tersedia.</p>
            </div>
        );
    }

    return (
        <section className="lg:col-span-2 md:col-span-1 lg:sticky top-8 h-fit flex flex-col gap-4">
            <h2 className="font-mono font-bold text-xl">Profile</h2>

            <div className="avatar self-start">
                <div className="ring-primary ring-offset-base-100 w-25 rounded-full ring-3 ring-offset-2">
                    {profile.cover && <img src={profile.cover} alt={profile.name} />}
                </div>
            </div>

            <div className="text-left">
                <h1 className="text-lg">{profile.name}</h1>
                <h2 className="mt-1">{profile.role}</h2>
                <h2 className="text-sm text-base-content/60">{profile.region}</h2>
            </div>

            <div className="text-left">
                <h1 className="font-mono mb-1">About</h1>
                <p>{profile.about}</p>
            </div>

            <div className="text-left">
                <h1 className="font-mono mb-1">Skill</h1>
                <div className="flex flex-wrap justify-start gap-2 mt-2">
                    {profile.skills.map((skill, index) => (
                        <span key={index} className="badge badge-secondary">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-row gap-4 mt-3">
                <a target="_blank" href="https://github.com/mlikiwe" className="text-primary hover:text-secondary transition-colors tooltip tooltip-bottom" data-tip="Github">
                    <GithubIcon className="w-9 h-9" />
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/ivanadinata/" className="text-primary hover:text-secondary transition-colors tooltip tooltip-bottom" data-tip="Linkedin">
                    <LinkedinIcon className="w-9 h-9" />
                </a>
            </div>
        </section>
    );
}

export function ProfileSectionSkeleton() {
    return (
        <section className="lg:col-span-2 md:col-span-1 lg:sticky top-8 h-fit flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton shrink-0 w-28 h-28 rounded-full"></div>

            <div className="text-left">
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full mt-1"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>

            <div className="text-left">
                <div className="skeleton h-4 w-16 mb-1"></div>
                <div className="skeleton h-30 w-full"></div>
            </div>

            <div className="text-left">
                <div className="skeleton h-4 w-16 mb-1"></div>
                <div className="flex flex-wrap justify-start gap-2 mt-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <span key={index} className="skeleton h-6 w-20">
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-row gap-4 mt-3">
                <div className="skeleton h-11 w-11 rounded-full"></div>
                <div className="skeleton h-11 w-11 rounded-full"></div>
            </div>
        </section>
    );
}