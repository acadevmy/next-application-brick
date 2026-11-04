# Governance dello stile dei componenti{{=<% %>=}}

Due regole ESLint custom tengono il design system dentro il suo perimetro.
Vivono in `eslint/`, sono registrate in `eslint.config.mjs` e girano in `pnpm lint`.

## `design-system/no-visual-overrides`

Vieta di ridipingere un componente del design system dal punto in cui lo si usa.
Se serve un aspetto diverso, serve una variante — non una classe.

La regola ispeziona due cose:

- l'attributo `className` in JSX;
- la proprietà `className` dentro un **oggetto passato come prop**, per esempio
  `buttonProps={{ className: "w-full" }}`, che prima passava indisturbata.

Funziona su **due livelli**:

| Livello | Dove | Pattern vietati |
|---|---|---|
| normale | dentro `src/components/UI/**` | `text-`, `bg-`, `font-`, `p*-`, `rounded`, `border`, `shadow` |
| `strict` | tutto il resto di `src/**` | i precedenti più `w-`, `max-w-`, `min-w-`, `grid-cols-`, `gap-` |

La distinzione non è arbitraria: **dentro** il design system, dare una larghezza
a un componente figlio è composizione — una sezione dimensiona il componente
che avvolge. **Fuori**, la stessa classe è un call site che allunga la mano dentro
il componente, ed è quasi sempre la richiesta di una prop che non esiste ancora.

Durante il refactor questa regola ha respinto un override cinque volte, e ogni
volta la risposta corretta è stata aggiungere una prop a `Surface`: prima
`radius`, poi `spacing`, `elevation` e `padding`. È il comportamento voluto.

**Quando disabilitarla.** Solo quando il componente possiede davvero quello
spazio: `SearchInput` riserva il posto per la propria icona, e lo dichiara con
un `eslint-disable-next-line` e una riga di commento che spiega perché.

## `design-system-domain/no-domain-vocabulary`

Vieta il vocabolario di prodotto dentro `src/components/UI/**` — nomi di prop,
stringhe, identificatori e **commenti**, stories incluse.

Il motivo è che un tipo non intercetta questa fuga. `dateFilter` come nome di
prop, `"all"` come stringa magica concordata col backend, «e.g. event title» in
un JSDoc: nessuno di questi rompe la compilazione, e tutti legano il design
system a questo prodotto.

Due parole sono **escluse di proposito**:

- `event`, che in una libreria di interfaccia appartiene al DOM
  (`addEventListener`, `pointer-events`) molto più che al prodotto;
- `article`, che è un elemento HTML.

Segnalarle costerebbe più di quanto intercetta. Le altre parole dell'elenco di partenza — `shop`, `cart`, `customer`,
`newsletter` e i corrispettivi italiani — non hanno un secondo significato in
questo layer.

L'elenco è solo un punto di partenza: **ogni progetto lo sostituisce con il
proprio dominio** tramite l'opzione `terms` in `eslint.config.mjs` (e lo
allarga con `allow` se una parola ha anche un significato di interfaccia),
senza toccare il codice della regola.
