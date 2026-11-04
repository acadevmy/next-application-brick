# {{applicationName.paramCase()}}

Next.js 16 (App Router) + React 19, TypeScript, Tailwind CSS v4 e shadcn.
Configurazione allineata a `create-next-app` 16.4 (Cache Components, Partial
Prefetching, Tailwind come loader Turbopack; Storybook usa `@tailwindcss/vite`).
Applicazione di partenza senza dominio: design system, i18n, SEO, form,
cache on-demand e Sentry già cablati, con due pagine d'esempio da sostituire.

```bash
pnpm --filter {{applicationName.paramCase()}} dev        # http://localhost:{{port}}
pnpm --filter {{applicationName.paramCase()}} storybook  # http://localhost:6006
pnpm --filter {{applicationName.paramCase()}} lint       # tsc + eslint
pnpm --filter {{applicationName.paramCase()}} test       # storie come test (vitest + Playwright)
```

Variabili d'ambiente: i valori vivono nel `.env` di **root** del monorepo
(`next.config.ts` li legge da `../..` e dalla cartella dell'app); questo
[`.env.example`](.env.example) li documenta. Le `{{applicationName.constantCase()}}_*` si leggono lato
server da `process.env` a runtime (segreti compresi); solo le
`NEXT_PUBLIC_{{applicationName.constantCase()}}_*` finiscono nel bundle del browser, quindi un segreto
non va mai chiamato con quel prefisso. L'opzione `env` di `next.config.ts`
contiene solo `{{applicationName.constantCase()}}_BUILT_AT`: tutto ciò che sta lì viene scritto nel build.

## Struttura

```
src/
  app/[locale]/(pages)/    pagine con header e footer (home, contact)
  app/api/revalidate/      invalidazione on-demand della cache
  components/App*          layer applicativo: legge copy e dati, compone la UI
  components/UI/**         design system: presentazionale puro, con storie
  lib/site/                configurazione del sito (nome, dominio, rotte)
  i18n/                    next-intl: lingue, routing, messaggi
messages/<locale>.json     tutte le copy
```

Due regole tengono in piedi lo schema:

1. **`components/UI/**` non conosce l'applicazione.** Riceve props semplici,
   niente fetch, niente next-intl, niente routing. È l'unico layer con storie.
2. **Il layer applicativo non contiene stile.** `AppHeader`, `AppFooter`,
   `FormContact` prendono copy e dati e li passano ai componenti UI.

## Routing

| Route | File | Ruolo |
|---|---|---|
| `/` | `src/app/[locale]/(pages)/page.tsx` | home d'esempio |
| `/contact` | `src/app/[locale]/(pages)/contact/page.tsx` | form contatti d'esempio |
| `/api/revalidate` | `src/app/api/revalidate/route.ts` | webhook: invalida cache tag e path |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` | metadata route |

**La lingua è sempre nell'URL** (`localePrefix: "always"`), con una lingua
come con più: `/it/contact`, `/en/contact`. Un URL senza prefisso (`/contact`)
viene rediretto alla lingua del visitatore (cookie, poi `Accept-Language`). Le
lingue supportate si dichiarano solo in `src/i18n/routing.ts`.

Ogni pagina è prerenderizzata per ciascuna lingua. Dove un URL si costruisce a
mano (canonical, sitemap) usa `localizePath` di `src/i18n/paths.ts`; `Link` e
`useRouter` di `src/i18n/navigation.ts` aggiungono il prefisso da soli.

Per aggiungere o togliere una lingua: aggiorna `locales` in
`src/i18n/routing.ts`, aggiungi o elimina `messages/<locale>.json` e la voce
in `zodLocales` di `src/lib/zod/ZodLocaleProvider.tsx` (il type check segnala
quella mancante o di troppo).

I tipi di next-intl stanno in `global.ts`, come nello starter: `Locale` è
`"it" | "en"` ovunque (`useLocale`, `getLocale`…) e `t("chiave")` accetta solo
chiavi di `messages/it.json`, con i loro argomenti ICU. Il plugin genera
`messages/it.d.json.ts` a ogni `dev`, `build` e `typegen` (è in `.gitignore`).
Per validare una lingua usa `hasLocale(routing.locales, value)` di next-intl.

Il middleware (`src/proxy.ts`) usa il matcher standard di next-intl: salta
`/api`, gli interni di Next e ogni path con un punto. Un path saltato che non è
un file reale (`/vecchio.png`, `/pagina.php/x`) arriva in `[locale]` con il
primo segmento come lingua: il layout lo rifiuta con `notFound()`. È l'unico
controllo sul parametro — con Cache Components `dynamicParams = false` non è
disponibile. Una pagina con un punto nel path va aggiunta al matcher.

**La lingua si legge da `next/root-params`.** `src/app/[locale]/layout.tsx` è
il root layout (non c'è un `src/app/layout.tsx` sopra), quindi `locale` è un
root param: `src/i18n/request.ts` lo legge da lì e `getTranslations()` funziona
in qualsiasi Server Component, senza `params` né `setRequestLocale` (deprecato).
In Route Handler e Server Action i root params non sono disponibili: lì passa la
lingua esplicitamente (`getTranslations({ locale })`).

La struttura segue lo starter di next-intl (`examples/example-app-router`):
`src/i18n/routing.ts` contiene solo `defineRouting`, le API di navigazione
(`Link`, `useRouter`, …) si importano da `src/i18n/navigation.ts`. `src/proxy.ts`
importa solo `routing.ts`: niente che tocchi `next-intl/server`, altrimenti
`request.ts` (e `next/root-params`) finisce nel bundle del middleware e il build
fallisce. Come nello starter, la catch-all `[locale]/[...rest]/page.tsx` manda
ogni URL sconosciuto (`/refuso`, `/a/b/c`) su `[locale]/not-found.tsx`, cioè la
404 tradotta; una lingua non valida (`/vecchio.png`) arriva invece sulla 404
neutra e bilingue `src/app/not-found.tsx`. Con Partial Prefetching l'HTML della
404 tradotta è una shell e il contenuto arriva via RSC: lo status è comunque 404.

**SEO multilingua.** Ogni lingua ha i suoi URL indicizzabili: il canonical
di ogni pagina punta alla sua versione nella lingua corrente, la sitemap
elenca ogni pagina in ogni lingua con i suoi `hreflang` (più `x-default`,
l'URL senza prefisso) e il middleware manda gli stessi alternates nell'header
`Link`.

## Aggiungere una pagina

1. Crea `src/app/[locale]/(pages)/<path>/page.tsx` con `generateMetadata`
   (via `getSeoMetadata`, con
   `canonicalUrl: localizePath(<PATH>, await getLocale())`), usando
   `getTranslations()` senza passare la lingua.
2. Aggiungi il path (`*_PATH`) e una voce a `SITE_ROUTES` in
   `src/lib/site/routes.ts`: navigazione e sitemap la leggono da lì.
3. Aggiungi le copy in **tutti** i `messages/<locale>.json`: `it.json` dà i
   tipi, le altre lingue devono avere le stesse chiavi.

Per contenuti dinamici (articoli, prodotti…) aggiungi la route di dettaglio con
`generateStaticParams`, dichiara i cache tag nei fetch
(`<collection>` per le liste, `<collection>-<key>` per il dettaglio) e accoda le
voci a `sitemap.ts`.

## Caching e invalidazione

`POST /api/revalidate` con `Authorization: Bearer ${{applicationName.constantCase()}}_REVALIDATE_SECRET`
accetta `{ collection, keys }`, `{ tag }` o `{ path }`, anche combinati. Il
contratto completo è nel commento in testa alla route.

## SEO

- `getGlobalMetadata` (layout) imposta `metadataBase` da `{{applicationName.constantCase()}}_DOMAIN` e il
  template del titolo con `{{applicationName.constantCase()}}_SITE_NAME`.
- `getSeoMetadata` (pagina) produce title, description, canonical, Open Graph
  (immagine dichiarata 1200×630), Twitter card e robots.
- La sitemap elenca `SITE_ROUTES` in ogni lingua, con gli `hreflang`;
  `robots.txt` esclude `/api/`.

## Form

`FormContact` usa react-hook-form + Zod. Lo schema sta in `contactSchema.ts` ed
è lo stesso che la server action `submitContactForm` riusa per validare: una
server action è un endpoint pubblico. Il punto in cui collegare la consegna
(email, CRM, CMS…) è segnato con un `TODO`. I messaggi di errore Zod sono
localizzati da `src/lib/zod/` tramite `ZodLocaleProvider`.

## Design system

Struttura in `src/components/UI/`, volutamente piccola: è la base da cui parte
ogni progetto, non il catalogo di un progetto.

- **Atoms** — Button, Badge, Alert, Input, Textarea, Select, Checkbox,
  RadioGroup, Form, Label, Typography, Icon, Avatar, NavItem, Dialog, Tooltip,
  Accordion, ToggleGroup, Carousel, ExpandableText, Separator, Skeleton, Spinner, Sonner
- **Molecules** — Header, Footer, PageHeader, SectionHeading, SearchInput,
  SegmentedControl, FormFields, ThemeToggle
- **Layout** — PageLayout, Container, Section, Surface, Stack, Inline, Grid,
  Prose, ButtonGroup, FormRow
- **Sections** — PageHeaderSection, ContentSection
- **Foundations** — token, tema chiaro/scuro (`ThemeScript`, `theme.ts`)
- **Patterns** — composizioni documentate che non sono componenti (la card, la
  info card, la pagina d'errore)

Gli atomi sono quelli di **shadcn**, adattati, e i token usano i nomi di shadcn
(`primary`, `muted`, `accent`, `destructive`, `card`, `popover`, `input`,
`ring`…): un componente in più si parte da `pnpm dlx shadcn add <nome>` e arriva
già con la palette del progetto. `components.json` lo scrive in
`src/components/UI/Atoms/<nome>.tsx`: va poi portato nella forma del progetto
(`Atoms/<Nome>/<Nome>.tsx` + `index.ts` + storia) e, se serve, nel layer giusto. Le primitive
Radix si importano dal pacchetto unico `radix-ui`.

**Un componente composto (`X` con `X.Parte`) si importa per parti quando è
client e chi lo usa è server.** Attraverso il confine server/client
sopravvivono gli *export*, non le proprietà: un componente server che scrive
`<X.Parte>` di un componente client riceve `undefined` e la pagina cade con
«Element type is invalid». Un componente composto client esporta quindi anche
le singole parti, ed è così che le pagine server le usano. La forma composta
resta valida dentro un altro componente client.

Non esiste un componente `Card`: una card è `Surface` + `Stack` + `Typography`,
da comporre una volta sola nel layer applicativo. Il criterio è nella pagina
*Patterns* di Storybook e in
[docs/design-system-contributing.md](./docs/design-system-contributing.md).

I token (colori, tipografia, spacing, radius) stanno in
`src/components/UI/Foundations/theme/theme.css`, dentro il design system;
`src/app/globals.css` lo importa e nient'altro. **I valori di partenza sono
neutri** (palette "neutral" di shadcn, font Geist, breakpoint di Tailwind): il
brand di un progetto si dà cambiando i ruoli semantici, `--radius` e i font,
senza toccare i componenti — vedi [docs/design-tokens.md](./docs/design-tokens.md).

Due regole ESLint custom tengono il perimetro:
`design-system/no-visual-overrides` blocca gli override visivi dal punto di
consumo, `design-system-domain/no-domain-vocabulary` tiene il vocabolario di
prodotto fuori da `components/UI` (l'elenco delle parole si adatta al dominio
del progetto). Dettagli in
[docs/component-style-governance.md](./docs/component-style-governance.md).

I font si caricano in `src/fonts/index.ts` con `next/font` (Geist e Geist Mono,
scaricati al build e serviti dall'app): per cambiarli basta sostituire lì la
famiglia mantenendo le `variable`.

**Tema chiaro e scuro.** L'header porta il `ThemeToggle`: scrive
`data-theme` su `<html>`, e i ruoli semantici — quindi tutta la pagina —
seguono. La scelta si ricorda nel browser; finché nessuno sceglie, comanda la
preferenza di sistema. Il meccanismo, e la regola per i componenti che devono
cambiare nei due temi, sono in
[docs/design-tokens.md](./docs/design-tokens.md#come-si-accende-la-dark-mode).

**Barra di caricamento.** `NextTopLoader` (root layout) mostra una barra nel
colore `primary` a ogni cambio di pagina: i click sui `<Link>` la avviano da
soli, e per la navigazione da codice va usato `useRouter` di
`@/i18n/navigation`, che è il router di next-intl con la barra.

## Test

`pnpm test` esegue due progetti vitest:

- **storybook**: ogni storia è un test in un browser reale (Playwright), con le
  sue `play` e i controlli axe (WCAG 2.1 AA) configurati in
  `.storybook/preview.tsx`. Una violazione **fa fallire il test**
  (`a11y.test: "error"`); i controlli girano sul tema chiaro;
- **eslint-rules**: le regole del design system in `eslint/` (`RuleTester`).

## Testi e i18n

Non esistono stringhe user-facing hardcoded: le copy stanno in
`messages/<locale>.json` e le serve next-intl (`src/i18n/request.ts`).
L'unica eccezione è `{{applicationName.constantCase()}}_SITE_NAME`, usata nei metadata e come logo
testuale.

| Dove | Chiavi |
|---|---|
| Navigazione | `navHome`, `navContact`, `navMainLabel`, `navFooterLabel`, `navMenuLabel` |
| Pagine d'esempio | `home*`, `contact*` |
| Errori e 404 | `errorNotFoundTitle`, `errorNotFound`, `goToHome`, `genericErrorTitle`, `genericError`, `genericErrorButton` |
| Form contatti | `formContact*` |
| Cambio tema | `themeSwitchToDark`, `themeSwitchToLight` |

## Osservabilità

Sentry è configurato per client, server ed edge
(`src/instrumentation-client.ts`, `sentry.server.config.ts`,
`sentry.edge.config.ts`) e si accende con
`NEXT_PUBLIC_{{applicationName.constantCase()}}_SENTRY_ENABLED=true`. Le regole condivise stanno in
`src/lib/sentry/config.ts`:

- **niente dati personali per default** (`SENTRY_DATA_COLLECTION`): né utente,
  né cookie, né body delle richieste, solo pochi header utili al debug. Il
  default dell'SDK v11 li raccoglierebbe tutti, compresi i dati del form;
  allargarlo è una scelta da fare per progetto, insieme all'informativa privacy;
- tracing server/edge al 10% in produzione, 100% in sviluppo; tracing client
  spento (pesa sul main thread a ogni caricamento);
- gli errori server vengono riportati una volta sola, da `onRequestError`: le
  pagine d'errore client segnalano solo quelli nati nel browser.

Vedi il commento in fondo a `next.config.ts` per il motivo per cui
`experimental.clientTraceMetadata` viene rimosso.

## Sicurezza

`next.config.ts` manda su ogni risposta una base di header (`nosniff`,
`Referrer-Policy`, `frame-ancestors 'none'`, `Permissions-Policy`, HSTS) e
spegne `X-Powered-By`. Una Content-Security-Policy completa dipende dai
servizi terzi del progetto (analytics, embed, Sentry) e da come si danno i
nonce alle pagine statiche: va definita per progetto.

Il form contatti è d'esempio ma non finge: la server action rivalida lo
schema (con limiti di lunghezza), scarta i bot con un honeypot e, **finché
l'invio non è collegato, in produzione risponde con un errore** invece di dire
"inviato" e perdere il messaggio. Collegare l'invio è il `TODO` in
`src/components/FormContact/submitContactForm.ts`.
