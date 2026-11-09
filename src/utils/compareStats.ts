import type { PokemonDetails } from '../types/pokemon'

// One row of the compare table: a stat name and both Pokemon's values.
// A value is null when that Pokemon doesn't have this stat.
export type StatRow = {
  name: string
  first: number | null
  second: number | null
}

// Puts two Pokemon's stats together, one row per stat name.
// Rows follow the first Pokemon's stat order; stats only the second
// Pokemon has are added at the end.
export function buildStatRows(
  first: PokemonDetails,
  second: PokemonDetails,
): StatRow[] {
  const statNames = [...first.stats, ...second.stats]
    .map((stat) => stat.name)
    .filter((name, index, names) => names.indexOf(name) === index)

  return statNames.map((name) => ({
    name,
    first: first.stats.find((stat) => stat.name === name)?.value ?? null,
    second: second.stats.find((stat) => stat.name === name)?.value ?? null,
  }))
}
