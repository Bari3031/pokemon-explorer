import type { Pokemon } from '../types/pokemon'

type PokemonSelectProps = {
  label: string
  pokemonList: Pokemon[]
  value: string
  onChange: (value: string) => void
}

// A dropdown of Pokemon. The value is the chosen Pokemon's id,
// or '' when nothing is chosen yet.
function PokemonSelect({ label, pokemonList, value, onChange }: PokemonSelectProps) {
  return (
    <label>
      {label}{' '}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        <option value="">Choose a Pokemon</option>
        {pokemonList.map((pokemon) => (
          <option key={pokemon.id} value={String(pokemon.id)}>
            {pokemon.name}
          </option>
        ))}
      </select>
    </label>
  )
}

export default PokemonSelect
