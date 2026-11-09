# Tasks · Pokemon Explorer

Build these one at a time, in order. After each task, check its "Done when" line, then commit the code together with `PROMPTS.md`.

## 1. List page from local data
Create a TypeScript type for a Pokemon and a local JSON file with 5 sample Pokemon (name, id, image URL). Show them on the list page. No API yet.
- **Done when:** I open the app and see the 5 sample Pokemon, each with its name and image.

## 2. Routing, nav bar, 404
Add React Router with these routes: the list page at `/`, a details page at `/pokemon/:id` that reads the id with `useParams` and shows that Pokemon from the local data, and a 404 page for unknown URLs. Add a nav bar with `NavLink`s to List, Favorites and Compare. Favorites and Compare are placeholder pages for now.
- **Done when:** clicking a Pokemon opens `/pokemon/<id>` with its name and image, the current page's link in the nav bar looks different from the others, and `/abc` shows the 404 page with a link back to the list.

## 3. Real data from PokeAPI
Replace the local JSON with `fetch` inside `useEffect`. The list loads `?limit=60` and builds each image URL from the id in the Pokemon's link. The details page loads `/pokemon/{id}` and shows types, abilities and stats. Both pages show a loading message and an error message.
- **Done when:** the list shows 60 Pokemon with images, a details page shows types, abilities and stats, "Loading..." appears briefly, and with DevTools → Network set to **Offline** I see an error message instead of a blank page.

## 4. First tests with Vitest
Install Vitest and `@vitest/ui`, and add `test` and `test:ui` scripts. Write tests for our own logic, such as getting the id from a PokeAPI link and building the image URL.
- **Done when:** `npm test` shows the tests passing in the terminal, and `npm run test:ui` opens a browser page where the same tests are green.

## 5. Search by name
Add a search box above the list that filters by name, ignoring upper and lower case. Add a test for the filter function.
- **Done when:** typing "char" shows only Pokemon with "char" in the name, clearing the box shows all 60 again, a name that matches nothing shows "No Pokemon found", and the new test passes.

## 6. Favorites with localStorage
Add a button on the details page that adds the Pokemon to favorites or removes it. Save favorites in `localStorage` and show them on `/favorites`, with a message when the list is empty.
- **Done when:** I favorite a Pokemon and see it on `/favorites`, it's still there after a refresh, removing it makes it disappear, and the empty message shows when nothing is favorited.

## 7. Compare page
On `/compare`, add two dropdowns that list the 60 Pokemon. When both are chosen, load their stats and show them side by side in a table. Show the loading and error messages here too.
- **Done when:** before choosing I see a prompt to choose two Pokemon, and after choosing two I see a table with each stat name and both Pokemon's values in the same row.

## 8. Styling and narrow screens
Add CSS: a grid of cards on the list, clear details and compare layouts, and a styled nav bar. Make every page fit narrow screens.
- **Done when:** the app looks consistent on a normal window, and in DevTools device mode at 375px wide every page is readable with no sideways scrolling.

## 9. README
Rewrite `README.md` for this project: what the app is, its pages, how to install and run it (`npm install`, `npm run dev`, `npm test`, `npm run test:ui`), and the tech used.
- **Done when:** the README describes Pokemon Explorer instead of the template, and following its commands in a fresh clone runs the app and the tests.
