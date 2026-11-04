# Token di design

I token vivono in `src/components/UI/Foundations/theme/theme.css`, **dentro** il
design system. `src/app/globals.css` è solo il punto d'ingresso: importa
Tailwind, le animazioni e il tema, e null'altro.

## Ruoli semantici

I componenti leggono solo **ruoli**, mai valori: `bg-primary`, `text-muted-foreground`,
`border-border`. I nomi sono quelli di shadcn, così un componente aggiunto con
`pnpm dlx shadcn add` funziona con questa palette senza adattamenti:

```
superfici   background, card, popover, muted, inverted (+ -foreground)
azioni      primary, secondary, accent, destructive (+ -foreground)
stati       success, warning, info (+ -foreground)          non in shadcn
controlli   border, input, ring
altro       chart-1…5, sidebar-*
componente  --radius-card, --radius-input, --radius-dialog
```

La dark mode rimappa gli stessi ruoli sotto `[data-theme="dark"]`: nessun
componente porta colori `dark:` propri.

## Dare l'identità a un progetto

I valori di partenza sono neutri (la palette "neutral" di shadcn in `oklch`,
font Geist). Per il brand di un progetto si cambiano, in quest'ordine:

1. i ruoli in `:root` e `[data-theme="dark"]` di `theme.css` — di solito
   `primary`, `ring` e, se serve, `accent`;
2. `--radius`, da cui deriva tutta la scala dei raggi;
3. i font in `src/fonts/index.ts`, e `--font-heading` in `theme.css` se i
   titoli hanno una famiglia propria.

Nessun componente va toccato: se per un colore serve modificarne uno, manca un
ruolo.

## Come si accende la dark mode

Un attributo su `<html>`: `data-theme="light" | "dark"`. Sotto quell'attributo
sta il blocco dei token scuri, e su quello compilano anche tutte le utility
`dark:` (`@custom-variant dark` in cima a `theme.css`). Non c'è stato React di
mezzo: cambiare l'attributo ricolora la pagina intera.

A scriverlo sono due cose sole:

- `ThemeScript` (`Foundations/theme/ThemeScript.tsx`), inline e bloccante come
  prima cosa dentro `<body>`: legge la scelta salvata in `localStorage`, o la
  preferenza di sistema quando non ce n'è una, e mette l'attributo **prima del
  primo paint** — nessun lampo del tema sbagliato, e nessun mismatch di
  idratazione, perché il markup del server non nomina mai il tema;
- `ThemeToggle` (`Molecules/ThemeToggle`), che lo capovolge e ricorda la scelta.

Un componente che deve apparire diverso nei due temi lo fa in CSS
(`dark:hidden` / `hidden dark:block`), non leggendo il tema in JavaScript: il
server non sa quale tema vedrà chi apre la pagina.

## Toni di superficie

Un tono ri-punta i ruoli per il proprio sottoalbero, e i figli lo seguono senza
che nessuno passi una prop di colore:

```tsx
<Surface tone="accent">
  <Typography variant="heading-4">…</Typography>   {/* nessuna prop tone */}
  <Button>CTA</Button>                              {/* nessuna prop variant */}
</Surface>
```

I toni sono `neutral`, `muted`, `info`, `accent`, `success`, `warning`,
`critical`, `inverted`. I toni scuri o saturi (`critical`, `inverted`)
ri-puntano anche `--primary`, così la CTA predefinita resta leggibile.

## Breakpoint

Quelli di Tailwind: `sm` (640), `md` (768), `lg` (1024), `xl` (1280), `2xl`
(1536). Il design system usa soprattutto `md` (il menu dell'header si apre in
riga, i form affiancano i campi) e `lg`. Se un design ne definisce altri, si
ridefiniscono in `@theme` in `theme.css`.

## Tipografia

Title e heading sono **fluidi**: interpolano con `clamp()` fra 375px e 1280px,
con il line-height come rapporto senza unità. I componenti non scrivono più
salti a mano tipo `heading-5 md:heading-4`: usano il livello grande, che
scende da solo alla dimensione che il livello piccolo aveva.

Body e caption restano fissi: il testo di lettura fluido peggiora la leggibilità.

## Radius

Derivata da un solo valore, `--radius` (0.625rem), come in shadcn: `sm` −4px,
`md` −2px, `lg` = base, `xl` +4px, `2xl` +8px, e così via. I componenti usano i
raggi di componente (`rounded-card`, `rounded-input`, `rounded-dialog`), che
puntano alla scala: cambiare `--radius` arrotonda o squadra tutto insieme.

## Font

Restano nell'applicazione (`src/fonts`, via `next/font`): il design system
dichiara solo i token `--font-sans`, `--font-heading`, `--font-body` e
`--font-mono` e lascia all'host il compito di caricarli. Lo starter usa Geist e
Geist Mono, come create-next-app.
