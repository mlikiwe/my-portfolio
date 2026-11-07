import { fetchProjectContent } from "@/lib/notion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github.css"

type Props = { params: Promise<{ slug: string }> }

export async function BlogContent({ params }: Props) {
  const { slug } = await params
  const content = await fetchProjectContent(slug)

  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
      {content}
    </ReactMarkdown>
  )
}