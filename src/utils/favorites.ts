import type { Pokemon } from '../types/pokemon'

// These functions never change the list they get. They return a new list,
// which is what React state needs.

export function isFavorite(favorites: Pokemon[], id: number): boolean {
  return favorites.some((pokemon) => pokemon.id === id)
}

// Adds a Pokemon at the end. If it's already there, nothing changes.
// Only id, name and image are kept, which is all the favorites page needs.
export function addFavorite(favorites: Pokemon[], pokemon: Pokemon): Pokemon[] {
  if (isFavorite(favorites, pokemon.id)) {
    return favorites
  }
  const { id, name, image } = pokemon
  return [...favorites, { id, name, image }]
}

export function removeFavorite(favorites: Pokemon[], id: number): Pokemon[] {
  return favorites.filter((pokemon) => pokemon.id !== id)
}

function isPokemon(value: unknown): value is Pokemon {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    typeof value.id === 'number' &&
    Number.isInteger(value.id) &&
    value.id > 0 &&
    'name' in value &&
    typeof value.name === 'string' &&
    'image' in value &&
    typeof value.image === 'string'
  )
}

// Turns the text saved in localStorage back into a list of Pokemon.
// Anything broken (not JSON, not a list, bad items, repeated ids) is dropped,
// so bad saved data can never crash the app.
export function parseFavorites(text: string | null): Pokemon[] {
  if (text === null) {
    return []
  }

  let data: unknown
  try {
    data = JSON.parse(text)
  } catch {
    return []
  }

  if (!Array.isArray(data)) {
    return []
  }

  return data
    .filter(isPokemon)
    .filter((pokemon, index, list) => list.findIndex((p) => p.id === pokemon.id) === index)
}
