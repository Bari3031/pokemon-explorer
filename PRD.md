# PRD · Pokemon Explorer

## What it is
A master-detail web app for browsing Pokemon, viewing their details, saving favorites, and comparing two Pokemon side by side.

## Who it's for
Pokemon fans and casual players who want a quick, simple way to look up a Pokemon's types, abilities, and stats, and compare them, without digging through a large wiki.

## Tech
- React + Vite + TypeScript + React Router
- Front-end only, no backend
- Data: PokeAPI (`https://pokeapi.co/api/v2/pokemon?limit=60` for the list, `https://pokeapi.co/api/v2/pokemon/{id}` for details)
- Favorites saved in `localStorage`

## Pages

| Route | Page | What it shows |
|---|---|---|
| `/` | List | The first 60 Pokemon, each with a name and image. A search box filters the list by name. Clicking a Pokemon opens its details page. |
| `/pokemon/:id` | Details | Name, image, types, abilities, and base stats. A button adds the Pokemon to favorites or removes it. |
| `/favorites` | Favorites | The Pokemon marked as favorite, kept after a page refresh. Shows a message when the list is empty. |
| `/compare` | Compare | Two selectors for choosing Pokemon, then their stats side by side. |
| `*` | 404 | A "page not found" message for unknown URLs, with a link back to the list. |

A navigation bar links to List, Favorites, and Compare on every page.

## Acceptance criteria
1. When I open `/`, I see 60 Pokemon, each with its name and image.
2. When I type "char" in the search box, I see only Pokemon whose names contain "char".
3. When I click a Pokemon, I see its details page with its types, abilities, and stats.
4. When I mark a Pokemon as favorite and refresh `/favorites`, I see it still in the list.
5. When I choose two Pokemon on `/compare`, I see their stats side by side.
6. When the data is loading, I see a loading message, and when the API fails, I see an error message.

## Out of scope
- User accounts, a backend, or a database
- Pokemon beyond the first 60
- Editing Pokemon data
