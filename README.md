# Ynbeweging — Activiteiten (Mockup)

Een *GitHub Pages*-klare, statische mockup van de activiteitenpagina (zoals in je screenshot), met klikbare knoppen, filters en voorbeelddata. Geen backend nodig.

## Live draaien (GitHub Pages)

1. Maak een nieuwe repo, bijvoorbeeld `ynbeweging-activiteiten-mockup`.
2. Upload **alle** bestanden uit deze map (of gebruik het ZIP-bestand).
3. Zet GitHub Pages aan op de `main` branch (Settings → Pages → **Build and deployment** → Source: *Deploy from a branch*).
4. Open je Pages-URL (bv. `https://jouw-naam.github.io/ynbeweging-activiteiten-mockup/`).

## Techniek

- **Vanilla HTML/CSS/JS** — geen frameworks, alles werkt direct op GitHub Pages.
- **Icons** via een inline **SVG sprite** (dus 100% offline/zelfvoorzienend).
- **Branding** (mock): Archivo (Google Fonts), donkerblauw `#212945`, lichtblauw `#52E8E8`.
- **Voorbeelddata** staat in `app.js` (11 activiteiten). Aanpasbaar naar wens.

## Wat doet elke knop? (functionele inschatting)

### Bovenbalk
- **Activiteiten / Producten / Locaties / Aanbieders**: navigatielinks (placeholder). In productie: naar bijbehorende pagina’s.
- **Voor aanbieders**: link voor organisaties met aanbod (nu placeholder).
- **Beweegteam + account-icoon**: toont account/teaminformatie (placeholder).

### Filterbalk
- **Categorie / Afstand / Activiteit** *(dropdowns)*: filteren op gekozen waarde. De resultaten (links en teller) updaten live.
- **Datum**: kies `Vanaf` en `t/m`. Klik **Toepassen** om te filteren.
- **Extra filters**: 
  - **Alleen gratis**: toont alleen gratis activiteiten.
  - **Max 60 min**: filtert op duur ≤ 60 minuten.
  - **Leeftijd chips**: filtert op één of meer leeftijdslabels.
  - **Reset**: zet deze extra filters terug.
- **Zoeken**: full‑text op titel/aanbieder/plaats (enter of knop).

### Iconenrij (snelle categorieën)
- Past direct de **Categorie** filter toe. Actieve chip is visueel gemarkeerd.

### Kaarten (resultaten)
- **Details**: opent een **drawer** onderin met info, datum/tijd, prijs en een *Inschrijven (mockup)* knop.
- **Bewaar**: markeert de activiteit als bewaard (in productie: zou naar favorieten of profiel gaan).
- Badges tonen **datum**, **starttijd**, **duur**, en **Gratis/Betaald**.
- Chips tonen **leeftijd**, **categorie**, **plaats** en **afstand (km)**.

### Floating knoppen (rechts‑onder)
- **Kalenderweergave**: overlay met een tabel (datum, tijd, activiteit, aanbieder, plaats, prijs). In productie: export/subscribe.
- **Kaartweergave**: overlay met lijst (mock). In productie: Leaflet/OpenStreetMap met markers.

### Drawer
- Sluiten via het kruisje of klik op de schaduw.

### Footer
- **NL** taalindicator (placeholder).

## Aanpassen

- **Kleuren/typografie**: in `:root` (bovenaan `styles.css`).  
- **Data**: pas objecten in `state.events` aan in `app.js`.
- **Iconen**: voeg een nieuw `<symbol>` toe in `index.html` en gebruik `<svg><use href="#icon-..."/></svg>`.

## Bestanden

- `index.html` — markup + SVG sprite
- `styles.css` — layout en styling
- `app.js` — state, filters, rendering en simpele interactions
- `assets/` — map voor eventuele lokale afbeeldingen (nu niet vereist)

## To-do’s richting productie (suggestie)

- Echte afbeeldingen en toegankelijkheids-teksten per activiteit
- Kaartweergave met Leaflet + marker clustering
- Kalender-export (ICS) en inschrijf-flow
- Deep links (URL-query) voor filters en zoekopdrachten
- Back-end of CMS koppeling (bijv. Ynbeweging API)
