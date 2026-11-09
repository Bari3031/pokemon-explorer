import { useEffect, useState } from 'react'
import { fetchPokemonList } from '../api/pokemonApi'
import PokemonCard from '../components/PokemonCard'
import SearchBox from '../components/SearchBox'
import type { Pokemon } from '../types/pokemon'
import { filterPokemonByName } from '../utils/filterPokemon'

function ListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    // If the page closes before the data arrives, ignore the late answer.
    let ignore = false

    fetchPokemonList()
      .then((list) => {
        if (!ignore) setPokemonList(list)
      })
      .catch(() => {
        if (!ignore) setError('Could not load the Pokemon. Please try again later.')
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  if (isLoading) {
    return (
      <main>
        <p className="message" role="status">Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <p className="message message-error" role="alert">{error}</p>
      </main>
    )
  }

  // Worked out on every render from the full list and the search text.
  const visiblePokemon = filterPokemonByName(pokemonList, search)

  return (
    <main>
      <h1>Pokemon Explorer</h1>
      <SearchBox value={search} onChange={setSearch} />

      {visiblePokemon.length === 0 ? (
        <p className="message">No Pokemon found</p>
      ) : (
        <ul className="pokemon-grid">
          {visiblePokemon.map((pokemon) => (
            <li key={pokemon.id}>
              <PokemonCard pokemon={pokemon} />
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default ListPage
