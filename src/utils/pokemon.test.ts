import { describe, expect, it } from 'vitest'
import type { PokemonApiResponse } from '../types/api'
import {
  getIdFromUrl,
  getImageUrl,
  toPokemon,
  toPokemonDetails,
} from './pokemon'

const IMAGE_BASE_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

describe('getIdFromUrl', () => {
  it('gets the id from a PokeAPI link that ends with a slash', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })

  it('gets the id from a link without a slash at the end', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25')).toBe(25)
  })

  it('reads multi-digit ids as one number', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/151/')).toBe(151)
  })

  it.each([
    ['a link with no id', 'https://pokeapi.co/api/v2/pokemon/'],
    ['a name instead of an id', 'https://pokeapi.co/api/v2/pokemon/pikachu/'],
    ['id 0', 'https://pokeapi.co/api/v2/pokemon/0/'],
    ['a negative id', 'https://pokeapi.co/api/v2/pokemon/-3/'],
    ['a decimal id', 'https://pokeapi.co/api/v2/pokemon/2.5/'],
    ['an empty string', ''],
  ])('throws an error for %s', (_description, url) => {
    expect(() => getIdFromUrl(url)).toThrow('Could not find a Pokemon id')
  })
})

describe('getImageUrl', () => {
  it('builds the image link for an id', () => {
    expect(getImageUrl(25)).toBe(`${IMAGE_BASE_URL}/25.png`)
  })
})

describe('toPokemon', () => {
  it('turns a list item from the API into a Pokemon with id and image', () => {
    const item = { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' }

    expect(toPokemon(item)).toEqual({
      id: 25,
      name: 'pikachu',
      image: `${IMAGE_BASE_URL}/25.png`,
    })
  })
})

describe('toPokemonDetails', () => {
  const pikachu: PokemonApiResponse = {
    id: 25,
    name: 'pikachu',
    types: [{ slot: 1, type: { name: 'electric', url: '.../type/13/' } }],
    abilities: [
      { slot: 1, is_hidden: false, ability: { name: 'static', url: '.../ability/9/' } },
      { slot: 3, is_hidden: true, ability: { name: 'lightning-rod', url: '.../ability/31/' } },
    ],
    stats: [
      { base_stat: 35, effort: 0, stat: { name: 'hp', url: '.../stat/1/' } },
      { base_stat: 90, effort: 2, stat: { name: 'speed', url: '.../stat/6/' } },
    ],
  }

  it('keeps only the names and values our pages show, in the same order', () => {
    expect(toPokemonDetails(pikachu)).toEqual({
      id: 25,
      name: 'pikachu',
      image: `${IMAGE_BASE_URL}/25.png`,
      types: ['electric'],
      abilities: ['static', 'lightning-rod'],
      stats: [
        { name: 'hp', value: 35 },
        { name: 'speed', value: 90 },
      ],
    })
  })

  it('gives empty lists when the API sends no types, abilities or stats', () => {
    const empty = { ...pikachu, types: [], abilities: [], stats: [] }
    const details = toPokemonDetails(empty)

    expect(details.types).toEqual([])
    expect(details.abilities).toEqual([])
    expect(details.stats).toEqual([])
  })
})
