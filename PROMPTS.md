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

**17:53 · claude**

> Do task 1 from tasks.md only. Use a separate component file for a Pokemon card. When you're done, tell me which files you created and what each one does, in simple words.
**My note:** Task 1 done. Checked in the browser: 5 Pokemon with name and image, no errors in the console.

**18:00 · claude**

> Do task 2 from tasks.md only. Use react-router-dom. Put each page in a pages folder and each component in a components folder. When you're done, explain in simple words how routing works in this app: where the routes are defined and how clicking a Pokemon gets to its details page.
**My note:** Task 2 done. Checked: clicking a Pokemon opens /pokemon/<id>, nav bar highlights the current page, /abc shows 404, no console errors.
**18:09 · claude**

> Do task 3 from tasks.md only. Put the fetch logic and the data processing (like getting the id from the URL) in separate functions, so we can test them later. Add TypeScript types for the API responses, no "any". When you're done, explain in simple words what happens from the moment the list page opens until the Pokemon appear on screen.
**My note:** Task 3 done. Checked: 60 Pokemon from PokeAPI, details show types/abilities/stats, loading message appears, error message shows when Offline after the app loaded (refreshing while Offline just shows Chrome's offline page).