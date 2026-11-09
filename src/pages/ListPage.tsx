import PokemonCard from '../components/PokemonCard'
import pokemonData from '../data/pokemon.json'
import type { Pokemon } from '../types/pokemon'

const pokemonList: Pokemon[] = pokemonData

function ListPage() {
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
