import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag) {
    return Response.json(
      { success: false, message: "Tag not exists" },
      { status: 404 },
    );
  }

  const encodedTag = encodeURIComponent(tag);
  revalidateTag(encodedTag);
  return Response.json({ revalidated: encodedTag, now: Date.now() });
}
