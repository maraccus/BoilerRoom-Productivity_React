# Produktivitetsapplikation

Enkel och snygg produktivitetsapp byggd med React och TypeScript.  
Tanken är att hjälpa dig hålla koll på arbetstid, logga hur du mår och se mönster över tid – allt i ett minimalistiskt gränssnitt som fungerar bra både på dator och mobil.

## Presentation

[Ladda ner presentationen här](./docs/PresentationReact_Malmö1.pdf)

## Vad kan man göra?

- **Timer & klocka**  
  Välj mellan anpassad timer (till exempel 25 minuter arbete samt paus) eller vanlig stopwatch.  
  Alla avslutade pass sparas automatiskt.

- **Humörlogg**  
  Logga kategori samt humör efter avslutat pass.  
  Se historiken och trender i grafer.

- **Kalender & historik**  
  Bläddra bland dina dagar och se vilka pass du körde.  
  Visa arbetsblock och sessioner per dag.

- **Grafer & statistik**  
  Veckoöversikt – vilka dagar är du som mest produktiv?  
  Humörtrender över tid.  
  Enkel dashboard med senaste aktiviteten.

## Tech vi använt

- React 19, TypeScript och React Native
- Vite
- React Router för navigation
- Recharts för alla grafer
- Tailwind + CSS Modules för styling
- Dark mode från start
- Jest för enhetstester
- ESLint

## Kom igång

1. Klona repot

   ```bash
   git clone https://github.com/maraccus/BoilerRoom-Productivity_React.git
   cd BoilerRoom-Productivity_React/productivity-app
   ```

2. Installera paket

   ```bash
   npm install
   ```

3. Starta utvecklingsservern
   ```bash
   npm run dev
   ```
   → Öppna http://localhost:5173 i webbläsaren

## Vanliga kommandon

```bash
npm run dev       # Starta och utveckla (med live-reload)
npm run build     # Bygg för produktion
npm run preview   # Testa byggen lokalt
npm run lint      # Kolla kodkvalitet
npm test          # Kör enhetstester
```

## Så funkar det (kort)

Appen använder React Context för timer och humör-state.  
De viktigaste delarna sitter i:

```
src/
├── components/       ← Alla återanvändbara bitar
│   ├── Timer.tsx
│   ├── MoodCheck.tsx
│   ├── CalendarHistory.tsx
│   └── ... (grafkomponenter, knappar, etc.)
├── contexts/         ← State som delas
│   └── TimerContext.tsx
├── pages/            ← Huvudsidorna
│   ├── TimerPage...
│   ├── Dashboard...
│   └── Graph...
├── hooks/            ← Smart logik
│   └── useTimerReducer.ts
└── utils/            ← Hjälpfunktioner
```

Timerlogiken styrs via `TimerContext` och olika lägen definieras i `timerModes.ts`.

Projektet är skapat av Marcus Johansson, Pontus Ingenius och Tomac Jansson.
