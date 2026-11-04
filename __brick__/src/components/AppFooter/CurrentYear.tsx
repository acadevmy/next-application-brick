"use client";

import { useSyncExternalStore } from "react";

const BUILD_YEAR = Number(process.env.{{applicationName.constantCase()}}_BUILT_AT?.slice(0, 4));

// The year never changes while the page is open in a way worth re-rendering
// for, so there is nothing to subscribe to.
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();
const getBuildYear = () => BUILD_YEAR;

/**
 * The current year, without making the page dynamic or time-revalidated.
 *
 * The server and the hydration pass both use the build year (inlined by
 * next.config.ts), so the static HTML carries a year and hydration matches;
 * right after, the browser renders the real current year. Pages built before
 * New Year therefore still show the right year, with no regeneration.
 */
export const CurrentYear = () =>
  useSyncExternalStore(subscribe, getYear, getBuildYear);
