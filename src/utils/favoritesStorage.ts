import type { Pokemon } from '../types/pokemon'
import { parseFavorites } from './favorites'

const STORAGE_KEY = 'pokemon-explorer:favorites'

export function loadFavorites(): Pokemon[] {
  try {
    return parseFavorites(localStorage.getItem(STORAGE_KEY))
  } catch {
    // The browser blocked localStorage (for example, some private modes).
    return []
  }
}

export function saveFavorites(favorites: Pokemon[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  } catch {
    // Storage is full or blocked. The change still shows now,
    // it just won't be there after a refresh.
  }
}
