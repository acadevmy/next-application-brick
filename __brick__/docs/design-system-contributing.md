# Contribuire al design system

## Un componente guadagna il posto?

> Entra nel design system se incapsula **comportamento** (stato, accessibilità,
> interazione) o una **decisione di token che non deve derivare**.
> Layout e stile puri sono una **ricetta**, non un componente.

Applicato a questo progetto:

| Resta componente | È diventato ricetta |
|---|---|
| `Dialog`, `Tooltip`, `Accordion`, `ToggleGroup`, `Carousel`, `ExpandableText`, `Select`, `Checkbox`, `RadioGroup`, `Form` e i field wrapper, `Header` (menu mobile), `ThemeToggle` | la card (`Surface` + `Stack` + `Typography`) |
| `Typography`, `Badge`, `Button`, `Icon`, `Separator`, `Alert` | l'info card, la pagina d'errore |

Le ricette sono documentate nella pagina **Design System/Patterns** di Storybook
e composte in un solo punto dell'applicazione, che è ciò che impedisce a tre
versioni leggermente diverse di comparire nei blocchi.

### Partire da shadcn

Un atomo nuovo (un `DropdownMenu`, un `Tabs`, una `Sheet`) si parte da
`pnpm dlx shadcn add <nome>`: i token hanno i nomi di shadcn, quindi il
componente arriva già con la palette del progetto. Poi lo si porta nella
cartella del layer giusto (`Atoms/<Nome>/`) con `index.ts`, storia e
`data-slot`, seguendo la definition of done qui sotto. Le primitive Radix si
importano dal pacchetto unico `radix-ui`.

### Le sezioni

Una **sezione** è l'eccezione dichiarata alla regola «layout puro è una ricetta».
Entra in `Sections/` se la disposizione si ripete in più di una pagina o
composizione — oppure se porta con sé un accordo che a
occhio non si ricostruisce (una proporzione fra colonne, una cella in evidenza
che occupa la riga intera).

Il metro è lo stesso di sempre, letto al contrario: se la disposizione non si
vede in Storybook, nessuno la rivede, e la seconda copia nasce senza che nessuno
se ne accorga.

Lo starter ne ha due, `PageHeaderSection` e `ContentSection`: le altre nascono
nel progetto, quando una disposizione si ripete davvero.

## Definition of done

1. Cartella + `index.ts` + `Component.tsx`
2. Guadagna il posto (criterio sopra)
3. Varianti via `cva`; `tone` semantico e `size` su scala, mai nomi di contesto
   (`hero`, `chip` sono nomi di contesto, non dimensioni)
4. `asChild` dove ha senso, `data-slot` sul root
5. Solo token semantici: nessun colore letterale, nessun valore in px arbitrario
6. Solo i breakpoint del tema (quelli di Tailwind, salvo ridefinizione)
7. Nessun vocabolario di prodotto, nemmeno negli esempi JSDoc
8. Stories con tutte le varianti, e per una Section **due contenuti diversi
   nella stessa struttura** — è la prova che è generica
9. Nessuna prop `*ClassName` senza una motivazione scritta nel JSDoc
10. `pnpm lint` e `pnpm test` verdi

## Un componente, una responsabilità

Gli assi di layout sono ortogonali e si compongono; nessuno fa il mestiere di un
altro. `Surface` è il materiale (tono, radius, ombra, padding), `Stack`/`Inline`
il rapporto fra i figli, `Container` la larghezza di lettura, `Section` la banda
di pagina.

Quando un componente comincia ad accettare props che appartengono a un altro
asse, il confine si sfuma: `Section` aveva `tone` e `contentWrapperTone`, nessuna
delle due usata, ed entrambe sono state rimosse. Una banda colorata è
`Section` → `Surface`, che dice quale componente fa cosa.

La gerarchia completa, con esempi, è nella pagina **Design System/Layout** di
Storybook.

## Composizione, non configurazione

Le props descrivono la struttura; il contenuto entra come slot.

```tsx
// No: ogni esigenza editoriale diventa una prop nuova
<PageHeader title="Articoli" showSearch searchPlaceholder="Cerca…" ctaLabel="Nuovo" />

// Sì: una ricerca o una seconda azione non richiedono di toccare il componente
<PageHeader>
  <PageHeader.Title>Articoli</PageHeader.Title>
  <PageHeader.Toolbar>
    <SearchInput placeholder="Cerca…" />
    <Button>Nuovo</Button>
  </PageHeader.Toolbar>
</PageHeader>
```

Niente coppie «prop dato + prop slot»: se esiste lo slot, la versione a dati non
serve.

## Deprecazioni

Il consumatore è una sola applicazione e TypeScript trova ogni call site: le
rinomine si fanno subito, senza alias. Se un giorno i consumatori saranno più di
uno, la regola diventa: alias marcato `@deprecated` per una release, poi rimosso.

## Documenti collegati

- [Token di design](./design-tokens.md)
- [Governance dello stile](./component-style-governance.md)
