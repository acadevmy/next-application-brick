# 0.2.0

- Template riallineato all'applicazione di riferimento: Next.js 16.4 (Cache
  Components, Partial Prefetching), React 19.3, TypeScript 6, Tailwind CSS v4
  (Turbopack loader, `@tailwindcss/vite` per Storybook), shadcn su `radix-ui`.
- Design system in `components/UI` (Foundations, Atoms, Molecules, Layout,
  Sections) con storie usate come test (Vitest + Playwright) e regole ESLint
  dedicate (`design-system-no-visual-overrides`, `design-system-no-domain-vocabulary`).
- Layer applicativo (`AppHeader`, `AppFooter`, `FormContact`), pagine d'esempio
  home e contact, `/api/revalidate` con secret, sitemap e robots.
- i18n con lingua sempre nell'URL e `next/root-params`; SEO in `lib/seo`,
  configurazione del sito in `lib/site`, Sentry in `lib/sentry`.
- Rimossi gli esempi precedenti: pagine `react-query` e `static-data`,
  `DialogWithParams`, `ExampleReactRouter`, `sitemap-index.xml`, SCSS e
  Tailwind v3.
- Node.js forzato a 24.22.2 con `devEngines.runtime` (`onFail: download`),
  allineato allo scaffold devmy.
- Vincolo Mason allargato a `>=0.1.0-dev.57 <0.2.0`: resta compatibile con la devmy CLI (mason 0.1.0-dev.57) e accetta mason_cli 0.1.x.
- Corretto l'escape delle graffe letterali (`{{=<% %>=}}` al posto di `{{{ }}}`,
  che Mason svuotava).

# 0.1.0+1

- Prima release.
