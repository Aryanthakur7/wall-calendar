# Wall Calendar — Interactive React Component

A polished, interactive wall calendar component built with React + Vite. Inspired by physical wall calendars, with dynamic theming, date range selection, notes, and dark mode.

## Features

- **Wall Calendar Aesthetic** — spiral binding, full-bleed hero image per month, diagonal month badge
- **Dynamic Theming** — every month has a unique color accent and hero photo (seasonal)
- **Day Range Selector** — click a start date, click an end date; in-between days are highlighted with live hover preview
- **Notes Panel** — write notes per month or per selection; auto-saved to `localStorage`
- **Holiday Markers** — red dots on holidays with legend tags (includes Indian + international holidays)
- **Dark / Light Mode** — toggle via the moon/sun button (top-right)
- **Year Picker** — click the month name to jump to any year
- **Smooth Animations** — slide transition when navigating months
- **Fully Responsive** — stacks vertically on mobile, full side-by-side on desktop

## Tech Stack

- React 18
- Vite 5
- Pure CSS-in-JS (no external UI library)
- `localStorage` for note persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build for Production

```bash
npm run build
npm run preview
```

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Project Structure

```
src/
├── components/
│   ├── InteractiveCalendar.jsx  # Root calendar component
│   ├── HeroPanel.jsx            # Left panel: image + notes
│   ├── NotesPanel.jsx           # Notes textarea + tabs
│   ├── Navigation.jsx           # Month nav + year picker
│   ├── CalendarGrid.jsx         # Date grid with selection logic
│   ├── CalendarExtras.jsx       # RangeBar + HolidayTags
│   └── SpiralBinding.jsx        # Decorative spiral rings
├── hooks/
│   └── useCalendar.js           # All state + logic (custom hook)
├── constants/
│   └── data.js                  # MONTHS, DAYS, HOLIDAYS, MONTH_THEMES
├── utils/
│   └── dateUtils.js             # Pure date helper functions
├── App.jsx
├── main.jsx
└── index.css
```

## Design Decisions

- All state is managed in a single custom hook (`useCalendar`) to keep components pure and focused on rendering.
- No backend or database — persistence is handled entirely via `localStorage`.
- Each month has its own Unsplash hero image and a matching accent color to give the calendar a living, seasonal feel.
- The component architecture is intentionally flat — each file has a single responsibility and can be tested or swapped independently.
