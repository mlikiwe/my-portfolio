import { Suspense } from "react"
import { BlogHeader, BlogHeaderSkeleton } from "@/components/BlogHeader"
import { BlogLinks, BlogLinksSkeleton } from "@/components/BlogLinks"
import { BlogContent } from "@/components/BlogContent"
import { ToTopButton } from "@/components/ToTopButton"
import Link from "next/link"
import { BackIcon } from "@/components/icons/BackIcon"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post",
  description: "Blog Post for selected project",
};

type Props = { params: Promise<{ slug: string }> }

export default function DetailProject({ params }: Props) {
  return (
    <div className="relative w-full min-h-screen bg-base-300 px-4 sm:px-8 py-10">
      <div className="relative z-10 lg:w-3/5 md:w-full mx-auto">
        <Link
          href="/"
          className="btn btn-neutral text-neutral-content rounded-3xl mb-3"
        >
          <BackIcon className="w-5 h-5" /> Back to Home
        </Link>

        <div className="bg-base-100 p-12 text-base-content">
          <Suspense fallback={<BlogHeaderSkeleton />}>
            <BlogHeader params={params} />
          </Suspense>

          <div className="typeset typeset-docs">
            <Suspense fallback={null}>
              <BlogContent params={params} />
            </Suspense>
          </div>

          <Suspense fallback={<BlogLinksSkeleton />}>
            <BlogLinks params={params} />
          </Suspense>

          <ToTopButton />
        </div>
      </div>
    </div>
  )
}