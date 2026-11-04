import { notFound } from "next/navigation";

// The middleware rewrites every unmatched URL into `[locale]` (e.g. `/typo` →
// `/it/typo`). Without this catch-all those would skip the locale layout and
// get the bare root `not-found`; matching them here renders the localized
// `[locale]/not-found.tsx`, with header, footer and translations.
const CatchAllPage = () => notFound();

export default CatchAllPage;
