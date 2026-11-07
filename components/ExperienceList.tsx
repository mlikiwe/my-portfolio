import { fetchExperiences } from "@/lib/notion";

function formatDateRange(startDateStr?: string, endDateStr?: string): string {
  if (!startDateStr) return "";
  const options: Intl.DateTimeFormatOptions = { month: "short", year: "numeric" };
  const start = new Date(startDateStr).toLocaleDateString("en-US", options);
  const end = endDateStr ? new Date(endDateStr).toLocaleDateString("en-US", options) : "Present";
  return `${start} - ${end}`;
}

export async function ExperienceList() {
  const experiences = await fetchExperiences();
  return (
    <div className="flex flex-col">
      {experiences.map((experience) => (
          <div key={experience.id} className="py-3 bg-white rounded-xl text-black">
            <div className="text-bold">{experience.role}</div>
            <div className="text-[15px] text-neutral-700">{experience.company}</div>
            <div className="text-sm text-black/60">{formatDateRange(experience.start_date, experience.end_date ?? "Present")}</div>
          </div>
      ))}
    </div>
  );
}