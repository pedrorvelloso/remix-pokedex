import { useState } from 'react'
import type { MetaFunction, LoaderFunction, HeadersFunction } from 'remix'
import { useLoaderData, json } from 'remix'
import { motion } from 'framer-motion'
import { debounce } from 'debounce'

import PokemonCard from '~/components/pokemon-card'

import pokedex from '~/pokedex/pokemons.json'

export const meta: MetaFunction = () => {
  return {
    title: 'Pokedex - Remix',
  }
}

type LoaderData = {
  name: string
  image: string
  id: number
  type: string[]
}[]

export const loader: LoaderFunction = async () => {
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

const variants = {
  visible: {
    opacity: 1,
  },
  hidden: { opacity: 0 },
}

const Index = () => {
  const data = useLoaderData<LoaderData>()
  const [indexToShow, setIndexToShow] = useState(initialIndexToShow)
  const [search, setSearch] = useState('')

  const handleSearch = debounce((input: string) => {
    setIndexToShow(initialIndexToShow)
    setSearch(input)
  }, 400)

  const pokemonSearch = data.filter((pkm) =>
    pkm.name.toLowerCase().includes(search.toLowerCase()),
  )

  const pokemons = search
    ? pokemonSearch.slice(0, indexToShow)
    : data.slice(0, indexToShow)

  const hasMorePkm = search
    ? indexToShow < pokemonSearch.length
    : indexToShow < data.length - 1

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <input
        type="text"
        onChange={(e) => {
          handleSearch(e.target.value)
        }}
        className="border border-solid border-black"
      />
      <div className="grid justify-items-center grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10 mb-5">
        {pokemons.map((pkm, i) => {
          return (
            <motion.div
              className="w-full"
              animate="visible"
              initial="hidden"
              transition={{
                delay: Math.abs(indexToShow - PAGE_SIZE - i) * 0.1,
              }}
              variants={variants}
              key={pkm.name}
            >
              <PokemonCard
                id={pkm.id}
                type={pkm.type}
                name={pkm.name}
                image={pkm.image}
              />
            </motion.div>
          )
        })}
      </div>

      {hasMorePkm && (
        <button
          type="button"
          onClick={() => setIndexToShow((i) => i + PAGE_SIZE)}
        >
          Show more
        </button>
      )}
    </div>
  )
}

export default Index
