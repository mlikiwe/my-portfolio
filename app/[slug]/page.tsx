import { Suspense } from "react"
import { BlogHeader } from "@/components/BlogHeader"
import { BlogLinks } from "@/components/BlogLinks"
import { BlogContent } from "@/components/BlogContent"

import Link from "next/link"
import { BackIcon } from "@/components/icons/BackIcon"

type Props = { params: Promise<{ slug: string }> }

export default function DetailProject({ params }: Props) {
  return (
    <div className="relative w-full min-h-screen bg-white px-4 sm:px-8 py-10">
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f1e5daff 1px, transparent 1px),
            linear-gradient(to bottom, #f1e5daff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 lg:w-3/5 md:w-full mx-auto">
        <Link
          href="/"
          className="inline-flex py-2.5 px-4 mb-3 items-center gap-1.5 rounded-3xl text-sm border bg-[#688E8F] text-white border-none hover:bg-[#023E3B]"
        >
            <BackIcon className="w-5 h-5"/> Back to Home
        </Link>

        <div className="bg-white p-12">
          <Suspense fallback={<ProjectHeaderSkeleton />}>
            <BlogHeader params={params} />
          </Suspense>

          <div className="typeset typeset-docs">
            <Suspense fallback={null}>
              <BlogContent params={params} />
            </Suspense>
          </div>

          <Suspense fallback={<ProjectLinksSkeleton />}>
            <BlogLinks params={params} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function ProjectHeaderSkeleton() {
  return (
    <div className="mb-6 flex flex-col gap-2 pb-6 border-b border-[#f1e5da]">
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

function ProjectLinksSkeleton() {
  return (
    <div className="flex gap-2 mb-8 pb-8 border-b border-[#f1e5da]">
      <div className="skeleton h-8 w-24 rounded-full" />
      <div className="skeleton h-8 w-24 rounded-full" />
    </div>
  )
}