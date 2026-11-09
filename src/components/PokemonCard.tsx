import { Link } from 'react-router-dom'
import type { Pokemon } from '../types/pokemon'

type PokemonCardProps = {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <article>
        <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
        <h2>{pokemon.name}</h2>
      </article>
    </Link>
  )
}

export default PokemonCard
