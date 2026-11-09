import { describe, expect, it } from 'vitest'
import type { Pokemon } from '../types/pokemon'
import { filterPokemonByName } from './filterPokemon'

function makePokemon(id: number, name: string): Pokemon {
  return { id, name, image: `${id}.png` }
}

const pokemonList: Pokemon[] = [
  makePokemon(4, 'charmander'),
  makePokemon(5, 'charmeleon'),
  makePokemon(6, 'charizard'),
  makePokemon(25, 'pikachu'),
  makePokemon(26, 'raichu'),
]

function names(list: Pokemon[]): string[] {
  return list.map((pokemon) => pokemon.name)
}

describe('filterPokemonByName', () => {
  it('keeps only Pokemon whose name contains the search text', () => {
    expect(names(filterPokemonByName(pokemonList, 'char'))).toEqual([
      'charmander',
      'charmeleon',
      'charizard',
    ])
  })

  it('finds text in the middle or end of a name, not just the start', () => {
    expect(names(filterPokemonByName(pokemonList, 'chu'))).toEqual([
      'pikachu',
      'raichu',
    ])
  })

  it('ignores upper and lower case', () => {
    expect(names(filterPokemonByName(pokemonList, 'PiKa'))).toEqual(['pikachu'])
  })

  it('ignores spaces before and after the search text', () => {
    expect(names(filterPokemonByName(pokemonList, '  pika  '))).toEqual([
      'pikachu',
    ])
  })

  it.each([
    ['an empty search', ''],
    ['a search with only spaces', '   '],
  ])('returns the whole list for %s', (_description, search) => {
    expect(filterPokemonByName(pokemonList, search)).toEqual(pokemonList)
  })

  it('returns an empty list when no name matches', () => {
    expect(filterPokemonByName(pokemonList, 'mewtwo')).toEqual([])
  })

  it('does not change the original list', () => {
    const copy = [...pokemonList]
    filterPokemonByName(pokemonList, 'char')
    expect(pokemonList).toEqual(copy)
  })
})
