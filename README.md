# Pokemon Explorer

A small web app for browsing the first 60 Pokemon. Search them by name, open one to see its types, abilities and stats, save your favorites, and compare two Pokemon side by side.

It runs fully in the browser (no backend). Data comes from [PokeAPI](https://pokeapi.co), and favorites are saved in `localStorage`.

## Pages

| URL | Page | What you can do |
|---|---|---|
| `/` | List | See 60 Pokemon with names and images, and search by name. |
| `/pokemon/:id` | Details | See a Pokemon's types, abilities and stats, and add it to favorites or remove it. Example: `/pokemon/25` |
| `/favorites` | Favorites | See the Pokemon you saved. They stay after a page refresh. |
| `/compare` | Compare | Choose two Pokemon and see their stats side by side. |
| any other URL | 404 | A "page not found" message with a link back to the list. |

## API

[PokeAPI](https://pokeapi.co) is free and needs no key.

| What | URL |
|---|---|
| List of 60 Pokemon (names and links only) | `https://pokeapi.co/api/v2/pokemon?limit=60` |
| One Pokemon's details | `https://pokeapi.co/api/v2/pokemon/{id}` |
| Pokemon image | `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png` |

The list doesn't include images, so each image link is built from the id in the Pokemon's link, with no extra request.

## Getting started

You need [Node.js](https://nodejs.org) 20.19+ or 22.12+ (what Vite requires). Check with `node -v`.

```bash
npm install
npm run dev
```

Then open the address it prints (usually http://localhost:5173).

| Command | What it does |
|---|---|
| `npm install` | Installs the packages. Run it once after cloning. |
| `npm run dev` | Starts the app locally. The page updates when you save a file. |
| `npm run build` | Checks the TypeScript types and builds the app into `dist/`. |
| `npm test` | Runs all tests once in the terminal. |
| `npm run test:ui` | Opens the tests in a browser page and re-runs them when you save. |

## Tech

React, TypeScript, Vite, React Router, Vitest, and plain CSS with CSS variables.

## Project structure

```
src/
  pages/        One file per page: ListPage, DetailsPage, FavoritesPage, ComparePage, NotFoundPage
  components/   Reusable pieces: NavBar, PokemonCard, SearchBox, FavoriteButton, PokemonSelect, StatsTable
  api/          pokemonApi.ts, the only code that calls PokeAPI
  utils/        Our own logic: processing API data, search filter, favorites, compare table rows
  types/        TypeScript types for the API responses and for our app's data
  App.tsx       The routes
  main.tsx      Starts the app
  index.css     Colors (CSS variables) and shared styles
```

**Tests** live next to the code they test, in `src/utils/*.test.ts`. They check our own functions (for example, getting the id from a link, filtering by name, adding and removing favorites) and never call the real API.

## Project docs

- [PRD.md](PRD.md): what the app is, who it's for, and the acceptance criteria
- [tasks.md](tasks.md): the build steps, in order
- [PROMPTS.md](PROMPTS.md): the log of prompts sent to the AI agent (written automatically)
