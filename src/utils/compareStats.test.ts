import { describe, expect, it } from 'vitest'
import type { PokemonDetails, PokemonStat } from '../types/pokemon'
import { buildStatRows } from './compareStats'

function makePokemon(id: number, name: string, stats: PokemonStat[]): PokemonDetails {
  return { id, name, image: `${id}.png`, types: [], abilities: [], stats }
}

const pikachu = makePokemon(25, 'pikachu', [
  { name: 'hp', value: 35 },
  { name: 'attack', value: 55 },
  { name: 'speed', value: 90 },
])

const bulbasaur = makePokemon(1, 'bulbasaur', [
  { name: 'hp', value: 45 },
  { name: 'attack', value: 49 },
  { name: 'speed', value: 45 },
])

describe('buildStatRows', () => {
  it('makes one row per stat with both Pokemon values side by side', () => {
    expect(buildStatRows(pikachu, bulbasaur)).toEqual([
      { name: 'hp', first: 35, second: 45 },
      { name: 'attack', first: 55, second: 49 },
      { name: 'speed', first: 90, second: 45 },
    ])
  })

  it('matches stats by name, even when the second Pokemon lists them in another order', () => {
    const shuffled = makePokemon(1, 'bulbasaur', [
      { name: 'speed', value: 45 },
      { name: 'hp', value: 45 },
      { name: 'attack', value: 49 },
    ])
    expect(buildStatRows(pikachu, shuffled)).toEqual([
      { name: 'hp', first: 35, second: 45 },
      { name: 'attack', first: 55, second: 49 },
      { name: 'speed', first: 90, second: 45 },
    ])
  })

  it('swaps the columns when the Pokemon are swapped', () => {
    expect(buildStatRows(bulbasaur, pikachu)).toEqual([
      { name: 'hp', first: 45, second: 35 },
      { name: 'attack', first: 49, second: 55 },
      { name: 'speed', first: 45, second: 90 },
    ])
  })

  it('shows the same values on both sides when comparing a Pokemon with itself', () => {
    expect(buildStatRows(pikachu, pikachu)).toEqual([
      { name: 'hp', first: 35, second: 35 },
      { name: 'attack', first: 55, second: 55 },
      { name: 'speed', first: 90, second: 90 },
    ])
  })

  it('uses null for a stat that only one Pokemon has, and adds extra stats at the end', () => {
    const onlyHp = makePokemon(1, 'a', [{ name: 'hp', value: 10 }])
    const hpAndDefense = makePokemon(2, 'b', [
      { name: 'defense', value: 30 },
      { name: 'hp', value: 20 },
    ])
    expect(buildStatRows(onlyHp, hpAndDefense)).toEqual([
      { name: 'hp', first: 10, second: 20 },
      { name: 'defense', first: null, second: 30 },
    ])
  })

  it('keeps a stat value of 0 instead of treating it as missing', () => {
    const zero = makePokemon(1, 'a', [{ name: 'hp', value: 0 }])
    expect(buildStatRows(zero, pikachu)[0]).toEqual({ name: 'hp', first: 0, second: 35 })
  })

  it('gives no rows when neither Pokemon has stats', () => {
    expect(buildStatRows(makePokemon(1, 'a', []), makePokemon(2, 'b', []))).toEqual([])
  })
})
