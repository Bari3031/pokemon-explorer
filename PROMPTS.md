# יומן פרומפטים

## 2026-11-09

**17:30 · claude**

> Read README.md and AGENTS.md and explain briefly what this template contains and what rules i need to follow. dont change any files.

**17:44 · claude**

> Create a PRD.md file for my final project. Don't write any code yet.
> The app: Pokemon Explorer, a master-detail app using PokeAPI (https://pokeapi.co/api/v2/pokemon?limit=60), React + Vite + TypeScript + React Router, front-end only.
> Pages:
> 1. List page (/) - Pokemon names and images, with search by name
> 2. Details page (/pokemon/:id) - types, abilities, stats
> 3. Favorites page (/favorites) - Pokemon I marked as favorite, saved in localStorage
> 4. Compare page (/compare) - choose two Pokemon and see their stats side by side
> Include: who the app is for, the pages, and 3-5 acceptance lines in the format "When I..., I see...". Keep it short and simple.

**17:47 · claude**

> In PRD.md, add one more acceptance line: "When the data is loading, I see a loading message, and when the API fails, I see an error message." Also add a 404 page for unknown URLs to the pages table. Change nothing else.

**17:50 · claude**

> Based on PRD.md, create tasks.md with up to 10 small tasks in build order, each with a "Done when:" line I can check by eye. Follow this order: 1) List page from a local JSON file with a few sample Pokemon and a TypeScript type for a Pokemon, no API yet. 2) React Router: list page, details page at /pokemon/:id using useParams, nav bar with NavLink, and 404 page. 3) Replace the local JSON with fetch in useEffect from PokeAPI, with loading and error states. 4) First Vitest tests on our own logic, plus @vitest/ui and a test:ui script. Then: search, favorites with localStorage, compare page, CSS and narrow screen, README. Don't write any code yet.
