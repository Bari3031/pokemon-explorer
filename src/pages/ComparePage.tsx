import { useEffect, useState } from 'react'
import { fetchPokemonDetails, fetchPokemonList } from '../api/pokemonApi'
import PokemonSelect from '../components/PokemonSelect'
import StatsTable from '../components/StatsTable'
import type { Pokemon, PokemonDetails } from '../types/pokemon'

// The answer for one pair of choices, and which pair it belongs to.
type CompareResult = {
  pairKey: string
  first: PokemonDetails | null
  second: PokemonDetails | null
  error: string | null
}

function ComparePage() {
  // The 60 Pokemon for the dropdowns.
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [isListLoading, setIsListLoading] = useState(true)
  const [listError, setListError] = useState<string | null>(null)

  // The chosen ids ('' means not chosen yet) and the loaded details.
  const [firstId, setFirstId] = useState('')
  const [secondId, setSecondId] = useState('')
  const [result, setResult] = useState<CompareResult | null>(null)

  const bothChosen = firstId !== '' && secondId !== ''
  const pairKey = `${firstId}-${secondId}`

  // Load the list once, when the page opens.
  useEffect(() => {
    let ignore = false

    fetchPokemonList()
      .then((list) => {
        if (!ignore) setPokemonList(list)
      })
      .catch(() => {
        if (!ignore) setListError('Could not load the Pokemon. Please try again later.')
      })
      .finally(() => {
        if (!ignore) setIsListLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [])

  // Load both Pokemon's details each time the chosen pair changes.
  useEffect(() => {
    if (firstId === '' || secondId === '') {
      return
    }
    // If the choice changes before the data arrives, ignore the late answer.
    let ignore = false
    const key = `${firstId}-${secondId}`

    Promise.all([fetchPokemonDetails(firstId), fetchPokemonDetails(secondId)])
      .then(([first, second]) => {
        if (ignore) return
        if (first === null || second === null) {
          setResult({ pairKey: key, first: null, second: null, error: 'Could not find one of these Pokemon.' })
        } else {
          setResult({ pairKey: key, first, second, error: null })
        }
      })
      .catch(() => {
        if (!ignore) {
          setResult({
            pairKey: key,
            first: null,
            second: null,
            error: 'Could not load these Pokemon. Please try again later.',
          })
        }
      })

    return () => {
      ignore = true
    }
  }, [firstId, secondId])

  if (isListLoading) {
    return (
      <main>
        <h1>Compare</h1>
        <p>Loading...</p>
      </main>
    )
  }

  if (listError) {
    return (
      <main>
        <h1>Compare</h1>
        <p role="alert">{listError}</p>
      </main>
    )
  }

  // The answer for the pair chosen right now, or null while it's still loading.
  const current = bothChosen && result?.pairKey === pairKey ? result : null

  return (
    <main>
      <h1>Compare</h1>
      <PokemonSelect
        label="First Pokemon"
        pokemonList={pokemonList}
        value={firstId}
        onChange={setFirstId}
      />{' '}
      <PokemonSelect
        label="Second Pokemon"
        pokemonList={pokemonList}
        value={secondId}
        onChange={setSecondId}
      />

      {!bothChosen && <p>Choose two Pokemon to compare their stats.</p>}
      {bothChosen && current === null && <p>Loading...</p>}
      {current?.error && <p role="alert">{current.error}</p>}
      {current?.first && current.second && (
        <StatsTable first={current.first} second={current.second} />
      )}
    </main>
  )
}

export default ComparePage
