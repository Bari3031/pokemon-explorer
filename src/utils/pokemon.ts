import type { NamedApiResource, PokemonApiResponse } from '../types/api'
import type { Pokemon, PokemonDetails } from '../types/pokemon'

const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// "https://pokeapi.co/api/v2/pokemon/25/" → 25
export function getIdFromUrl(url: string): number {
  const lastPart = url.split('/').filter((part) => part !== '').pop()
  const id = Number(lastPart)

  if (!Number.isInteger(id) || id <= 0) {
    throw new Error(`Could not find a Pokemon id in "${url}"`)
  }
  return id
}

// 25 → "https://raw.githubusercontent.com/.../pokemon/25.png"
export function getImageUrl(id: number): string {
  return `${IMAGE_BASE_URL}/${id}.png`
}

// { name: "pikachu", url: ".../pokemon/25/" } → { id: 25, name: "pikachu", image: "..." }
export function toPokemon(resource: NamedApiResource): Pokemon {
  const id = getIdFromUrl(resource.url)
  return { id, name: resource.name, image: getImageUrl(id) }
}

// The full API response → only the details our pages show.
export function toPokemonDetails(data: PokemonApiResponse): PokemonDetails {
  return {
    id: data.id,
    name: data.name,
    image: getImageUrl(data.id),
    types: data.types.map((item) => item.type.name),
    abilities: data.abilities.map((item) => item.ability.name),
    stats: data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
  }
}
