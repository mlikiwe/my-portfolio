import "server-only"
import { Client } from "@notionhq/client"
import { NotionToMarkdown } from "notion-to-md"
import { cacheLife, cacheTag } from "next/cache"

export type Project = {
  id: string
  title: string
  description: string
  category: string[]
  cover: string | null
}

export type ProjectDetail = {
  title: string
  date: string | null
  techStack: string[]
  links: { type: "github" | "website" | "drive" | "kaggle"; url: string }[]
}

export type Experience = {
  id: string
  company: string
  role: string
  start_date: string
  end_date: string | null
}

export type Profile = {
  id: string
  name: string
  role: string
  region: string
  about: string
  skills: string[]
  cover: string
}

const notionSecret = process.env.NOTION_SECRET

export const notionClient = new Client({ auth: notionSecret })
export const n2m = new NotionToMarkdown({ notionClient })

n2m.setCustomTransformer("image", async (block: any) => {
  return `![](/api/notion-image?type=block&id=${block.id})`
})

type QueryDataSourceParams = Parameters<typeof notionClient.dataSources.query>[0]
type QueryOptions = Pick<QueryDataSourceParams, "sorts" | "filter">

const isDev = process.env.NODE_ENV === "development"
const cacheConfig = isDev
  ? { stale: 5, revalidate: 5, expire: 30 }
  : { stale: 3600, revalidate: 3600, expire: 86400 }

async function queryDataSource(
  dataSourceId: string | undefined,
  tag: string,
  options: QueryOptions = {}
) {
  "use cache"
  cacheLife(cacheConfig)
  cacheTag(tag)

  if (!notionSecret || !dataSourceId) {
    throw new Error(`Notion secret or data source not found for tag "${tag}"`)
  }

  return notionClient.dataSources.query({
    data_source_id: dataSourceId,
    ...options,
  })
}

function mapProject(page: any): Project {
  const p = page.properties
  return {
    id: page.id,
    title: p.title?.title?.[0]?.plain_text ?? "Untitled",
    description: p.description?.rich_text?.[0]?.plain_text ?? "",
    category: (p.category?.multi_select ?? []).map((c: any) => c.name),
    cover: p["Cover Image"]?.files?.[0]
      ? `/api/notion-image?type=cover&id=${page.id}`
      : null,
  }
}

function mapExperience(page: any): Experience {
  const p = page.properties
  return {
    id: page.id,
    company: p.company?.title?.[0]?.plain_text ?? "Untitled",
    role: p.role?.rich_text?.[0]?.plain_text ?? "",
    start_date: p.start_date?.date?.start ?? "",
    end_date: p.end_date?.date?.start ?? null,
  }
}

function mapProfile(page: any): Profile {
  const p = page.properties
  return {
    id: page.id,
    name: p.Name?.title?.[0]?.plain_text ?? "",
    role: p.role?.rich_text?.[0]?.plain_text ?? "",
    region: p.region?.rich_text?.[0]?.plain_text ?? "",
    about: p.about?.rich_text?.[0]?.plain_text ?? "",
    skills: (p.skills?.multi_select ?? []).map((s: any) => s.name),
    cover:
      p.cover?.files?.[0]?.file?.url ??
      "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp",
  }
}

export const fetchProjects = async (): Promise<Project[]> => {
  const query = await queryDataSource(
    process.env.NOTION_PORTFOLIO_DATASOURCE_ID,
    "notion-projects",
    {
      sorts: [{ property: "ID", direction: "ascending" }],
      filter: { property: "Status", status: { equals: "Published" } },
    }
  )
  return query.results.map(mapProject)
}

export const fetchProject = async (pageId: string): Promise<ProjectDetail> => {
  "use cache"
  cacheLife(cacheConfig)
  cacheTag("notion-project-detail")

  const page: any = await notionClient.pages.retrieve({ page_id: pageId })
  const p = page.properties

  const links = (
    [
      { type: "github", prop: "Github" },
      { type: "website", prop: "Website" },
      { type: "drive", prop: "Drive" },
      { type: "kaggle", prop: "Kaggle" },
    ] as const
  )
    .map(({ type, prop }) => ({ type, url: p[prop]?.url ?? null }))
    .filter((l): l is ProjectDetail["links"][number] => Boolean(l.url))

  return {
    title: p.title?.title?.[0]?.plain_text ?? "",
    date: p.published_date?.date?.start ?? null,
    techStack: (p["Tech Stack"]?.multi_select ?? []).map((t: any) => t.name),
    links,
  }
}

export const fetchProjectContent = async (pageId: string): Promise<string> => {
  "use cache"
  cacheLife(cacheConfig)
  cacheTag("notion-project-detail")

  const mdblocks = await n2m.pageToMarkdown(pageId)
  const { parent } = n2m.toMarkdownString(mdblocks)
  return parent
}

export const fetchExperiences = async (): Promise<Experience[]> => {
  const query = await queryDataSource(
    process.env.NOTION_EXPERIENCE_DATASOURCE_ID,
    "notion-experiences",
    { sorts: [{ property: "start_date", direction: "descending" }] }
  )
  return query.results.map(mapExperience)
}

export const fetchProfile = async (): Promise<Profile | null> => {
  const query = await queryDataSource(
    process.env.NOTION_PROFILE_DATASOURCE_ID,
    "notion-profile"
  )
  return query.results.length ? mapProfile(query.results[0]) : null
}