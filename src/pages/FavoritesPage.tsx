import { Link } from 'react-router-dom'
import PokemonCard from '../components/PokemonCard'
import { loadFavorites } from '../utils/favoritesStorage'

function FavoritesPage() {
  // Read the saved favorites each time this page is shown.
  const favorites = loadFavorites()

  if (favorites.length === 0) {
    return (
      <main>
        <h1>Favorites</h1>
        <p>You have no favorites yet. Open a Pokemon and click "Add to favorites".</p>
        <Link to="/">Go to the list</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((pokemon) => (
          <li key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default FavoritesPage
