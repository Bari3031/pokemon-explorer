import { useEffect, useState } from 'react'
import { fetchPokemonList } from '../api/pokemonApi'
import PokemonCard from '../components/PokemonCard'
import type { Pokemon } from '../types/pokemon'

function ListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
        <p>Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <p role="alert">{error}</p>
      </main>
    )
  }

  return (
    <main>
      <h1>Pokemon Explorer</h1>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default ListPage
