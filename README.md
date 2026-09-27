# Nestora

Find your place. Feel at home.

Live demo: https://nestora-ashen.vercel.app

Nestora is a student accommodation discovery app for India — a clean, trustworthy way to find PGs, hostels and shared flats near campus. It focuses on the things students actually care about: honest pricing, verified listings, distance to college, food, and finding the right person to share a place with.

This is a front-end project built with React and Vite. All data is local mock data, and demo interactions (enquiries, visits, sign-in) are simulated on the device — no backend required.

## Highlights

- Natural-language search — type "PG near IIT Roorkee under ₹8,000, vegetarian, Wi-Fi" and Nestora turns it into filters.
- Nestora Match — a transparent 0–100 score that weighs budget, distance, food, amenities, rating and verification, with reasons shown.
- Roommate matching — a short lifestyle quiz scores compatibility with other students in your city.
- Map view — an interactive Leaflet map with live price markers alongside the list.
- Side-by-side compare — put up to four stays in one table and see the cheapest, nearest and top-rated at a glance.
- Owner tools — a dashboard with listing performance and a five-step "list your property" wizard.
- Shareable searches — filters live in the URL, so any search can be copied and shared.
- Considered mobile UX — bottom navigation, a filter bottom drawer and a map toggle on small screens.
- Verification badges, toasts, skeleton loaders, empty and error states throughout.
- Saved shortlist, recently viewed and enquiry history persist locally between visits.

## Tech stack

- React 18 with plain JavaScript (JSX) — no TypeScript
- Vite build tooling
- React Router for routing
- Context API for state, persisted to localStorage
- Leaflet and React Leaflet for maps
- Lucide React for icons
- Hand-written CSS with a custom-property design system — no CSS framework

## Getting started

Requirements: Node.js 18 or newer.

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  components/    Reusable UI (cards, map, filters, modal, navbar, toasts)
  pages/         One file per route (Home, Explore, PropertyDetails, ...)
  context/       AppContext — global state and localStorage persistence
  data/          Mock data (properties, reviews, roommates, locations)
  utils/         Search parser, match scoring, filters, formatters
  styles/        variables, global, components and pages CSS
```

## Routes

| Path | Page |
| --- | --- |
| `/` | Home and search |
| `/explore` | Browse, filter, sort, map view |
| `/property/:id` | Listing detail, gallery, booking |
| `/compare` | Side-by-side comparison |
| `/saved` | Saved shortlist |
| `/roommates` | Roommate quiz and matches |
| `/profile` | Profile, activity, preferences |
| `/bookings` | Enquiry and visit history |
| `/owner` | Owner dashboard |
| `/owner/add-property` | List a property wizard |
| `/report/:id` | Report a listing |
| `/login`, `/signup` | Authentication (demo) |

## Notes

Nestora runs entirely in the browser as a demo. Sign-in accepts any details, and enquiries or visit requests are simulated locally rather than sent to a real owner. The listings, reviews and roommate profiles are illustrative sample data.