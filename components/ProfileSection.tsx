import Link from "next/link";
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
                <div className="ring-[#688E8F] ring-offset-base-100 w-25 rounded-full ring-3 ring-offset-2">
                    {profile.cover && <img src={profile.cover} alt={profile.name} />}
                </div>
            </div>

            <div className="text-left">
                <h1 className="text-lg">{profile.name}</h1>
                <h2 className="mt-1">{profile.role}</h2>
                <h2 className="text-sm text-black/60">{profile.region}</h2>
            </div>

            <div className="text-left">
                <h1 className="font-mono mb-1">About</h1>
                <p>{profile.about}</p>
            </div>

            <div className="text-left">
                <h1 className="font-mono mb-1">Skill</h1>
                <div className="flex flex-wrap justify-start gap-2 mt-2">
                    {profile.skills.map((skill, index) => (
                        <span key={index} className="badge bg-[#f1e5da] text-[#688E8F] border-none">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-row gap-4 mt-3">
                <a target="_blank" href="https://github.com/mlikiwe" className="text-[#688E8F] hover:text-[#023E3B] transition-colors">
                    <GithubIcon className="w-9 h-9" />
                </a>
                <a target="_blank" href="https://www.linkedin.com/in/ivanadinata/" className="text-[#688E8F] hover:text-[#023E3B] transition-colors">
                    <LinkedinIcon className="w-9 h-9" />
                </a>
            </div>
        </section>
    );
}