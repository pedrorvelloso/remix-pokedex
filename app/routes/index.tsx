import { useState } from 'react'
import type { MetaFunction, LoaderFunction, HeadersFunction } from 'remix'
import { useLoaderData, json } from 'remix'
import PokemonCard from '~/components/pokemon-card'

import pokedex from '~/pokedex/pokemons.json'

export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  }
}

type Pokedex = typeof pokedex

type LoaderData = {
  name: string
  image: string
  id: number
  type: string[]
}[]

export const loader: LoaderFunction = async () => {
  console.log('hit')
  const pkdex = pokedex

  const pokemons = pkdex.map((pkm) => {
    const pokemonPaddedId = `00${pkm.id}`.slice(-3)

    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${pokemonPaddedId}.png`

    return { name: pkm.name.english, image, id: pkm.id, type: pkm.type }
  })

  return json(pokemons, {
    headers: {
      'cache-control': 'public, max-age=1200',
    },
  })
}

export const headers: HeadersFunction = ({ loaderHeaders }) => {
  return {
    'cache-control': loaderHeaders.get('cache-control') as string,
  }
}

const PAGE_SIZE = 12
const initialIndexToShow = PAGE_SIZE

const Index = () => {
  const data = useLoaderData<LoaderData>()
  const [indexToShow, setIndexToShow] = useState(initialIndexToShow)

  const pokemons = data.slice(0, indexToShow)

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <div className="grid justify-items-center grid-cols-4 gap-4">
        {pokemons.map((pkm) => (
          <PokemonCard
            key={pkm.name}
            id={pkm.id}
            type={pkm.type}
            name={pkm.name}
            image={pkm.image}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
      >
        Show more
      </button>
    </div>
  )
}

export default Index
