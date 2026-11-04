import { timingSafeEqual } from "node:crypto";

import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { hasLocale } from "next-intl";
import { z } from "zod";

import { routing } from "@/i18n/routing";

/**
 * Cache revalidation endpoint.
 *
 * Triggered by webhooks from a content source (CMS, back office) or by ops
 * tools to invalidate `"use cache"` entries on demand, no TTL polling involved.
 * Tags are revalidated with the `"max"` profile (stale-while-revalidate): the
 * first visitor after the call still gets the cached page while it regenerates
 * in the background, and everyone after that gets the fresh one.
 *
 * AUTH
 * ----
 * Bearer token in `Authorization` header, matched in constant time against
 * `{{applicationName.constantCase()}}_REVALIDATE_SECRET` env var. Without auth this endpoint is a DoS
 * vector: an attacker could repeatedly invalidate cache, forcing every
 * legitimate page view to hit the upstream data source.
 *
 * PAYLOAD MODES
 * -------------
 * Send POST with `Content-Type: application/json`. Three combinable modes:
 *
 * 1) WEBHOOK (primary use case)
 *    Body:  { "collection": "pages", "keys": ["uuid-1", "uuid-2"] }
 *    Invalidates: tag "pages" (for list views)
 *                 + tag "pages-uuid-1" (for the detail page of that item)
 *                 + tag "pages-uuid-2"
 *
 * 2) EXPLICIT TAG (manual ops/debug)
 *    Body:  { "tag": "dictionary" }
 *    Invalidates: tag "dictionary"
 *
 * 3) EXPLICIT PATH (manual ops/debug)
 *    Body:  { "path": "/chi-siamo" }
 *    Public URLs and cached pages both live under `/[locale]/…`.
 *    A path that starts with a locale (`/it/chi-siamo`) is revalidated as
 *    given. Any other path is revalidated once per locale (`/it/chi-siamo`,
 *    `/en/chi-siamo`) and once as given, which covers root routes such as
 *    `/sitemap.xml`.
 *
 * Modes can be combined in a single request:
 *    { "collection": "magazine", "keys": ["123"], "path": "/sitemap.xml" }
 *
 * TAG STRUCTURE CONVENTION
 * ------------------------
 * Two granularity levels, both must be set in the fetchers:
 *   - Collection-level: "<collection>"        → invalidates list views
 *   - Item-level:       "<collection>-<key>"  → invalidates a single detail
 *
 * Fetchers MUST include both tags when fetching a single
 * item. With Cache Components a fetcher is a `"use cache"` function that tags
 * its own entry, e.g.:
 *   const getPage = async (slug: string) => {
 *     "use cache";
 *     cacheTag("pages", `pages-${slug}`);
 *     return (await fetch(url)).json();
 *   };
 *
 * Otherwise modifying one item would either:
 *   - invalidate ALL items in the collection (wasteful), or
 *   - not invalidate the specific detail page (stale content).
 *
 * RESPONSES
 * ---------
 *   200  { "revalidated": ["tag:pages", "tag:pages-uuid-1"], "now": 1715... }
 *   400  Body not valid JSON, malformed, or no path/tag/collection provided
 *   401  Bearer secret missing or wrong
 *   503  {{applicationName.constantCase()}}_REVALIDATE_SECRET not configured on the server
 */

// Next ignores tags longer than 256 characters; reject them instead of
// reporting a revalidation that never happened.
const tagSchema = z.string().min(1).max(256);

const payloadSchema = z.object({
  collection: tagSchema.optional(),
  keys: z.array(z.union([z.string().min(1), z.number()])).optional(),
  tag: tagSchema.optional(),
  path: z.string().startsWith("/").optional(),
});

const safeCompare = (a: string, b: string): boolean => {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  return aBuf.length === bBuf.length && timingSafeEqual(aBuf, bBuf);
};

export async function POST(request: NextRequest) {
  const secret = process.env.{{applicationName.constantCase()}}_REVALIDATE_SECRET;

  if (!secret) {
    console.error("{{applicationName.constantCase()}}_REVALIDATE_SECRET not configured");
    return NextResponse.json({ error: "Service unavailable" }, { status: 503 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  if (!safeCompare(authHeader, `Bearer ${secret}`)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid payload", issues: z.flattenError(parsed.error) },
      { status: 400 },
    );
  }
  const payload = parsed.data;

  const revalidated: string[] = [];

  if (payload.path) {
    const { path } = payload;
    const targets = hasLocale(routing.locales, path.split("/")[1])
      ? [path]
      : [
          path,
          ...routing.locales.map(
            (locale) => `/${locale}${path === "/" ? "" : path}`,
          ),
        ];
    for (const target of targets) {
      revalidatePath(target);
      revalidated.push(`path:${target}`);
    }
  }

  if (payload.tag) {
    revalidateTag(payload.tag, "max");
    revalidated.push(`tag:${payload.tag}`);
  }

  if (payload.collection) {
    // Collection-level tag: covers list views (e.g. /magazine archive).
    revalidateTag(payload.collection, "max");
    revalidated.push(`tag:${payload.collection}`);

    // Item-level tags: cover detail pages of each modified record.
    // `keys` is the array of IDs touched by this event;
    // we only invalidate those, leaving siblings cached.
    if (payload.keys) {
      for (const key of payload.keys) {
        const itemTag = `${payload.collection}-${key}`;
        revalidateTag(itemTag, "max");
        revalidated.push(`tag:${itemTag}`);
      }
    }
  }

  if (revalidated.length === 0) {
    return NextResponse.json(
      { error: "Must provide path, tag, or collection" },
      { status: 400 },
    );
  }

  return NextResponse.json({ revalidated, now: Date.now() });
}
