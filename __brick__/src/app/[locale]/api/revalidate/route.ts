import { revalidatePath, revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");
  const path = request.nextUrl.searchParams.get("path");

  if (path) {
    revalidatePath(path);
    return Response.json({ revalidated: path, now: Date.now() });
  } else if (tag) {
    const encodedTag = encodeURIComponent(tag);
    revalidateTag(encodedTag, "max");
    return Response.json({ revalidated: encodedTag, now: Date.now() });
  }
  return Response.json(
    { success: false, message: "Path or tag not exists" },
    { status: 404 },
  );
}
