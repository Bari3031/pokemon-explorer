// The shapes our app works with, after we process the API data.

export type Pokemon = {
  id: number
  name: string
  image: string
}

export type PokemonStat = {
  name: string
  value: number
}

export type PokemonDetails = Pokemon & {
  types: string[]
  abilities: string[]
  stats: PokemonStat[]
}
