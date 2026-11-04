import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

// Locale-aware wrappers around Next.js' navigation APIs. Route-change progress
// is shown by `NextTopLoader` in the root layout: it handles `<Link>` clicks on
// its own, and `useRouter` (from ./useRouter) starts it for `router.push` and
// `router.replace` too.
export const { Link, redirect, usePathname, getPathname } =
  createNavigation(routing);

export { useRouter } from "./useRouter";
