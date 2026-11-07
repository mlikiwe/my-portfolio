import { cacheLife, cacheTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { notionClient } from '@/lib/notion'

type ImageSource = "cover" | "block";

async function fetchCoverImageUrl(pageId: string): Promise<string | null> {
  "use cache";
  cacheLife({ stale: 5, revalidate: 5, expire: 30 });
  cacheTag("notion-images");

  const page: any = await notionClient.pages.retrieve({ page_id: pageId });
  const file = page.properties?.["Cover Image"]?.files?.[0];
  return file?.file?.url ?? file?.external?.url ?? null;
}

async function fetchBlockImageUrl(blockId: string): Promise<string | null> {
  "use cache";
  cacheLife({ stale: 5, revalidate: 5, expire: 30 });
  cacheTag("notion-images");

  const block: any = await notionClient.blocks.retrieve({ block_id: blockId });
  if (block.type !== "image") return null;
  return block.image?.file?.url ?? block.image?.external?.url ?? null;
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type") as ImageSource | null;
  const id = searchParams.get("id");

  if (!type || !id) {
    return new NextResponse("Missing type or id", { status: 400 });
  }
  if (type !== "cover" && type !== "block") {
    return new NextResponse("Invalid type", { status: 400 });
  }

  try {
    const url =
      type === "cover" ? await fetchCoverImageUrl(id) : await fetchBlockImageUrl(id);

    if (!url) {
      return new NextResponse("Image not found", { status: 404 });
    }

    return NextResponse.redirect(url, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("Failed to resolve Notion image:", error);
    return new NextResponse("Failed to fetch from Notion", { status: 500 });
  }
}