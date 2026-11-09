import type { Pokemon } from '../types/pokemon'

type PokemonCardProps = {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: PokemonCardProps) {
  return (
    <article>
      <img src={pokemon.image} alt={pokemon.name} width={96} height={96} />
      <h2>{pokemon.name}</h2>
    </article>
  )
}

export default PokemonCard
