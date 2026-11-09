import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchPokemonDetails } from '../api/pokemonApi'
import FavoriteButton from '../components/FavoriteButton'
import type { Pokemon, PokemonDetails } from '../types/pokemon'
import { addFavorite, isFavorite, removeFavorite } from '../utils/favorites'
import { loadFavorites, saveFavorites } from '../utils/favoritesStorage'
import './DetailsPage.css'

// The answer we got from the API, and which id it belongs to.
type LoadResult = {
  id: string
  pokemon: PokemonDetails | null
  error: string | null
}

function DetailsPage() {
  const { id = '' } = useParams()
  const [result, setResult] = useState<LoadResult | null>(null)
  // Read the saved favorites once, when the page opens.
  const [favorites, setFavorites] = useState<Pokemon[]>(loadFavorites)

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
        <p className="message" role="status">Loading...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main>
        <p className="message message-error" role="alert">{error}</p>
        <Link to="/" className="back-link">
          ← Back to the list
        </Link>
      </main>
    )
  }

  if (!pokemon) {
    return (
      <main>
        <h1>Pokemon not found</h1>
        <p className="message">There is no Pokemon with id "{id}".</p>
        <Link to="/" className="back-link">
          ← Back to the list
        </Link>
      </main>
    )
  }

  const pokemonIsFavorite = isFavorite(favorites, pokemon.id)

  const handleToggleFavorite = () => {
    const nextFavorites = pokemonIsFavorite
      ? removeFavorite(favorites, pokemon.id)
      : addFavorite(favorites, pokemon)
    setFavorites(nextFavorites)
    saveFavorites(nextFavorites)
  }

  return (
    <main>
      <div className="details-header">
        <img
          className="details-image"
          src={pokemon.image}
          alt={pokemon.name}
          width={160}
          height={160}
        />
        <div>
          <h1 className="details-name">{pokemon.name}</h1>
          <FavoriteButton isFavorite={pokemonIsFavorite} onToggle={handleToggleFavorite} />
        </div>
      </div>

      <div className="details-sections">
        <section>
          <h2>Types</h2>
          <ul className="tag-list">
            {pokemon.types.map((type) => (
              <li key={type} className="tag">
                {type}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Abilities</h2>
          <ul className="tag-list">
            {pokemon.abilities.map((ability) => (
              <li key={ability} className="tag">
                {ability}
              </li>
            ))}
          </ul>
        </section>

        <section className="details-stats">
          <h2>Stats</h2>
          <table className="data-table">
            <tbody>
              {pokemon.stats.map((stat) => (
                <tr key={stat.name}>
                  <th scope="row">{stat.name}</th>
                  <td>{stat.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      <Link to="/" className="back-link">
        ← Back to the list
      </Link>
    </main>
  )
}

export default DetailsPage
