import type { PokemonApiResponse, PokemonListResponse } from '../types/api'
import type { Pokemon, PokemonDetails } from '../types/pokemon'
import { toPokemon, toPokemonDetails } from '../utils/pokemon'

const API_BASE_URL = 'https://pokeapi.co/api/v2'

export async function fetchPokemonList(limit = 60): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}`)
  if (!response.ok) {
    throw new Error(`PokeAPI answered with status ${response.status}`)
  }

  const data: PokemonListResponse = await response.json()
  return data.results.map(toPokemon)
}

// Returns null when PokeAPI has no Pokemon with this id.
export async function fetchPokemonDetails(
  id: string,
): Promise<PokemonDetails | null> {
  const response = await fetch(`${API_BASE_URL}/pokemon/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error(`PokeAPI answered with status ${response.status}`)
  }

  const data: PokemonApiResponse = await response.json()
  return toPokemonDetails(data)
}
