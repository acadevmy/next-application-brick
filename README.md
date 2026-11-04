# nextjs_application_brick

[![Powered by Mason](https://img.shields.io/endpoint?url=https%3A%2F%2Ftinyurl.com%2Fmason-badge)](https://github.com/felangel/mason)

Brick [Mason](https://github.com/felangel/mason) che genera un'applicazione
Next.js 16 (App Router) + React 19, TypeScript, Tailwind CSS v4 e shadcn,
pensata per vivere in un monorepo pnpm (Nx). L'app generata non ha dominio:
design system con storie, i18n (next-intl), SEO, form, cache on-demand e
Sentry sono già cablati, con due pagine d'esempio da sostituire. Il README
dell'app generata ([`__brick__/README.md`](__brick__/README.md)) ne descrive
struttura e regole.

## Uso

```bash
mason add nextjs_application_brick \
  --git-url https://github.com/acadevmy/next-application-brick
mason make nextjs_application_brick -o apps/frontend
```

| Variabile | Default | Dove finisce |
|---|---|---|
| `applicationName` | `frontend` | nome del pacchetto (`param-case`) e prefisso delle variabili d'ambiente (`CONSTANT_CASE`: `FRONTEND_*`, `NEXT_PUBLIC_FRONTEND_*`) |
| `port` | `4000` | `dev`, `dev:https`, `start` e `<APP>_DOMAIN` d'esempio in `.env.example` |

`next.config.ts` legge il `.env` da `../..`: genera l'app due livelli sotto la
root del monorepo (es. `apps/<nome>`), dove vivono `.env` e lockfile.

## Configurazione del workspace ospite

Il brick non porta un `pnpm-workspace.yaml`: queste impostazioni non viaggiano
con il `package.json` dell'app e vanno aggiunte al `pnpm-workspace.yaml` di
root del monorepo, se non ci sono già.

```yaml
peerDependencyRules:
  allowedVersions:
    tsconfck>typescript: '6'

allowBuilds:
  '@parcel/watcher': true
  '@sentry/cli': true
  '@swc/core': true
  esbuild: true
  unrs-resolver: true
```

Il browser per i test delle storie (Vitest + Playwright) si installa con
`pnpm exec playwright install chromium`.

## Manutenzione del template

Mason renderizza con Mustache **solo** i file che contengono un `{{…}}` senza
`;`, `,` o `=` al suo interno; gli altri li copia così come sono. Un file con
graffe doppie letterali che Mason renderizzerebbe (es. `style={{ width: x }}`,
i placeholder `{{word}}` dei messaggi ESLint) perderebbe quel codice, quindi
cambia delimitatori in coda alla prima riga:

```tsx
"use client";{{=<% %>=}}
```

Il tag sparisce nell'output e da lì in poi `{{ }}` è testo. Il vecchio trucco
`{{{ … }}}` **non** funziona: Mason lo svuota. Un file che usa anche le
variabili del brick non può usare questo tag: le lambda (`.constantCase()`)
riconoscono solo `{{ }}`.

Per verificare una modifica, genera con i default e confronta con il sorgente
da cui arriva, poi genera con valori diversi e lancia i controlli:

```bash
mason add nextjs_application_brick --path .
mason make nextjs_application_brick -o /tmp/out \
  --applicationName frontend --port 4000
# nell'app generata
pnpm install && pnpm lint && pnpm test && pnpm build
```
