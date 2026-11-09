import { Link, useParams } from 'react-router-dom'
import pokemonData from '../data/pokemon.json'
import type { Pokemon } from '../types/pokemon'

const pokemonList: Pokemon[] = pokemonData

function DetailsPage() {
  const { id } = useParams()
  const pokemon = pokemonList.find((p) => p.id === Number(id))

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
      <p>
        <Link to="/">Back to the list</Link>
      </p>
    </main>
  )
}

export default DetailsPage
