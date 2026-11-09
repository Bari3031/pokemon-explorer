import { Link } from 'react-router-dom'
import type { Pokemon } from '../types/pokemon'
import './PokemonCard.css'

type PokemonCardProps = {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <Link to={`/pokemon/${pokemon.id}`} className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
      <h2>{pokemon.name}</h2>
    </Link>
  )
}

export default PokemonCard
