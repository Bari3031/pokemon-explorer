import type { Pokemon } from '../types/pokemon'

// Keeps only the Pokemon whose name contains the search text.
// Upper/lower case and spaces around the text don't matter.
// An empty search keeps the whole list.
export function filterPokemonByName(
  pokemonList: Pokemon[],
  search: string,
): Pokemon[] {
  const text = search.trim().toLowerCase()
  if (text === '') {
    return pokemonList
  }
  return pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(text),
  )
}
