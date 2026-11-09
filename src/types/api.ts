// The shapes of the JSON that PokeAPI sends back.
// Only the fields we use are listed here.

// A name plus a link to more data, used all over PokeAPI.
export type NamedApiResource = {
  name: string
  url: string
}

// GET https://pokeapi.co/api/v2/pokemon?limit=60
export type PokemonListResponse = {
  count: number
  next: string | null
  previous: string | null
  results: NamedApiResource[]
}

// GET https://pokeapi.co/api/v2/pokemon/{id}
export type PokemonApiResponse = {
  id: number
  name: string
  types: {
    slot: number
    type: NamedApiResource
  }[]
  abilities: {
    slot: number
    is_hidden: boolean
    ability: NamedApiResource
  }[]
  stats: {
    base_stat: number
    effort: number
    stat: NamedApiResource
  }[]
}
