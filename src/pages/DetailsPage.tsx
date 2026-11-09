import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPokemonDetails } from '../api/pokemonApi'
import type { PokemonDetails } from '../types/pokemon'

// The answer we got from the API, and which id it belongs to.
type LoadResult = {
  id: string
  pokemon: PokemonDetails | null
  error: string | null
}

function DetailsPage() {
  const { id = '' } = useParams()
  const [result, setResult] = useState<LoadResult | null>(null)

  useEffect(() => {
    // If the page closes or the id changes before the data arrives, ignore the late answer.
    let ignore = false

    fetchPokemonDetails(id)
      .then((pokemon) => {
        if (!ignore) setResult({ id, pokemon, error: null })
      })
      .catch(() => {
        if (!ignore) {
          setResult({
            id,
            pokemon: null,
            error: 'Could not load this Pokemon. Please try again later.',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [id])

  // Still loading while we have no answer for the id in the URL.
  const isLoading = result === null || result.id !== id
  const pokemon = result?.pokemon ?? null
  const error = result?.error ?? null

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
        <Link to="/">Back to the list</Link>
      </main>
    )
  }

  if (!pokemon) {
    return (
      <main>
        <h1>Pokemon not found</h1>
        <p>There is no Pokemon with id "{id}".</p>
        <Link to="/">Back to the list</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} width={192} height={192} />

      <h2>Types</h2>
      <p>{pokemon.types.join(', ')}</p>

      <h2>Abilities</h2>
      <p>{pokemon.abilities.join(', ')}</p>

      <h2>Stats</h2>
      <table>
        <tbody>
          {pokemon.stats.map((stat) => (
            <tr key={stat.name}>
              <th scope="row">{stat.name}</th>
              <td>{stat.value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <Link to="/">Back to the list</Link>
      </p>
    </main>
  )
}

export default DetailsPage
