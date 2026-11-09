import type { PokemonDetails } from '../types/pokemon'
import { buildStatRows } from '../utils/compareStats'

type StatsTableProps = {
  first: PokemonDetails
  second: PokemonDetails
}

function StatsTable({ first, second }: StatsTableProps) {
  const rows = buildStatRows(first, second)

  return (
    <table className="data-table">
      <thead>
        <tr>
          <th scope="col">Stat</th>
          <th scope="col">{first.name}</th>
          <th scope="col">{second.name}</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <th scope="row">{row.name}</th>
            <td>{row.first ?? '—'}</td>
            <td>{row.second ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default StatsTable
