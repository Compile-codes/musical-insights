# Sonic Insight

A portfolio-grade **React JS music intelligence project** built to demonstrate frontend architecture, algorithmic thinking, data visualization, state management, UX polish, and clean component design.

## Why this project is strong for Google-style applications

Instead of being only a basic music player, Sonic Insight shows:

- Search, filtering, sorting, favorites, and playlist building
- A recommendation engine using weighted similarity scoring
- Mood and audio-feature analysis
- Data-driven UI with visual analytics
- Clean React component architecture
- Local persistence with a reusable hook
- Unit-testable business logic
- Responsive, polished product design

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build

```bash
npm run build
npm run preview
```

## Test recommendation logic

```bash
npm test
```

## Project structure

```txt
sonic-insight/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── components/
    │   ├── AudioRadar.jsx
    │   ├── DashboardStats.jsx
    │   ├── EmptyState.jsx
    │   ├── Header.jsx
    │   ├── MoodExplorer.jsx
    │   ├── PlaylistPanel.jsx
    │   ├── RecommendationPanel.jsx
    │   ├── SearchControls.jsx
    │   └── TrackCard.jsx
    ├── data/
    │   └── tracks.js
    ├── hooks/
    │   └── useLocalStorage.js
    └── lib/
        ├── analytics.js
        ├── recommendation.js
        └── recommendation.test.js
```

## Suggested resume bullet

Built Sonic Insight, a React music intelligence dashboard with a custom weighted recommendation algorithm, mood analysis, reusable hooks, local persistence, responsive UI, and testable business logic using Vite and Vitest.
