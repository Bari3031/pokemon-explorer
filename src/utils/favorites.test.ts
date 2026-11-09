import { describe, expect, it } from 'vitest'
import type { Pokemon, PokemonDetails } from '../types/pokemon'
import { addFavorite, isFavorite, parseFavorites, removeFavorite } from './favorites'

const bulbasaur: Pokemon = { id: 1, name: 'bulbasaur', image: '1.png' }
const charmander: Pokemon = { id: 4, name: 'charmander', image: '4.png' }
const pikachu: Pokemon = { id: 25, name: 'pikachu', image: '25.png' }

describe('isFavorite', () => {
  it('is true when a Pokemon with this id is in the list', () => {
    expect(isFavorite([bulbasaur, pikachu], 25)).toBe(true)
  })

  it('is false when it is not in the list, or the list is empty', () => {
    expect(isFavorite([bulbasaur], 25)).toBe(false)
    expect(isFavorite([], 25)).toBe(false)
  })
})

describe('addFavorite', () => {
  it('adds a Pokemon to an empty list', () => {
    expect(addFavorite([], pikachu)).toEqual([pikachu])
  })

  it('adds the new Pokemon at the end', () => {
    expect(addFavorite([bulbasaur, charmander], pikachu)).toEqual([
      bulbasaur,
      charmander,
      pikachu,
    ])
  })

  it('does not add the same Pokemon twice', () => {
    expect(addFavorite([bulbasaur, pikachu], pikachu)).toEqual([bulbasaur, pikachu])
  })

  it('does not change the original list', () => {
    const favorites = [bulbasaur]
    addFavorite(favorites, pikachu)
    expect(favorites).toEqual([bulbasaur])
  })

  it('saves only id, name and image, even from a details object', () => {
    const details: PokemonDetails = {
      ...pikachu,
      types: ['electric'],
      abilities: ['static'],
      stats: [{ name: 'hp', value: 35 }],
    }
    expect(addFavorite([], details)).toEqual([pikachu])
  })
})

describe('removeFavorite', () => {
  it('removes the Pokemon with this id and keeps the rest in order', () => {
    expect(removeFavorite([bulbasaur, pikachu, charmander], 25)).toEqual([
      bulbasaur,
      charmander,
    ])
  })

  it('leaves the list the same when the id is not in it', () => {
    expect(removeFavorite([bulbasaur, charmander], 25)).toEqual([bulbasaur, charmander])
  })

  it('does not change the original list', () => {
    const favorites = [bulbasaur, pikachu]
    removeFavorite(favorites, 25)
    expect(favorites).toEqual([bulbasaur, pikachu])
  })

  it('removing the last favorite gives an empty list', () => {
    expect(removeFavorite([pikachu], 25)).toEqual([])
  })
})

describe('parseFavorites', () => {
  it('reads back a list that was saved with JSON.stringify', () => {
    const saved = JSON.stringify([bulbasaur, pikachu])
    expect(parseFavorites(saved)).toEqual([bulbasaur, pikachu])
  })

  it('gives an empty list when nothing was saved yet', () => {
    expect(parseFavorites(null)).toEqual([])
  })

  it.each([
    ['text that is not JSON', '{not json'],
    ['an empty string', ''],
    ['JSON that is not a list', '{"id":25,"name":"pikachu","image":"25.png"}'],
    ['JSON null', 'null'],
  ])('gives an empty list for %s', (_description, saved) => {
    expect(parseFavorites(saved)).toEqual([])
  })

  it('drops broken items and keeps the good ones', () => {
    const saved = JSON.stringify([
      bulbasaur,
      null,
      42,
      'pikachu',
      { id: '25', name: 'pikachu', image: '25.png' },
      { id: 0, name: 'nobody', image: '0.png' },
      { id: 7, name: 'squirtle' },
      pikachu,
    ])
    expect(parseFavorites(saved)).toEqual([bulbasaur, pikachu])
  })

  it('keeps only the first copy when the same id appears twice', () => {
    const saved = JSON.stringify([pikachu, bulbasaur, { ...pikachu, name: 'copy' }])
    expect(parseFavorites(saved)).toEqual([pikachu, bulbasaur])
  })
})
