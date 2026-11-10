import { NextResponse } from "next/server"
import { fetchProfile } from "@/lib/notion"

export async function GET() {
    const profile = await fetchProfile()

    if (!profile?.cv) {
        return new NextResponse("CV not found", { status: 404 })
    }

    const fileRes = await fetch(profile.cv.url)
    if (!fileRes.ok) {
        return new NextResponse("Failed to fetch CV from Notion", { status: 502 })
    }

    return new NextResponse(fileRes.body, {
        headers: {
            "Content-Type": fileRes.headers.get("content-type") ?? "application/pdf",
            "Content-Disposition": `attachment; filename="${profile.cv.filename}"`,
            "Cache-Control": "no-store",
        },
    })
}