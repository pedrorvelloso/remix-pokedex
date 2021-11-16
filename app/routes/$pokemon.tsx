import { useState, useEffect } from 'react'
import { LoaderFunction, useLoaderData, json } from 'remix'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

import { getPokemonDetail } from '~/lib/pokeApi'

type LoaderData = {
  name: string
  types: string[]
  sprite: string
  spriteMobile: string
  id: number
  description: string
}

export const loader: LoaderFunction = async ({ params }) => {
  const res = await getPokemonDetail(params.pokemon as string)

  return json({ ...res })
}

const IndexPokemon = () => {
  const data = useLoaderData<LoaderData>()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div
        className={clsx(
          'min-h-screen min-w-full flex flex-col justify-center items-center bg-contain-full',
          {
            'bg-normal': data.types[0] === 'normal',
            'bg-fire': data.types[0] === 'fire',
            'bg-water': data.types[0] === 'water',
            'bg-electric': data.types[0] === 'electric',
            'bg-grass': data.types[0] === 'grass',
            'bg-ice': data.types[0] === 'ice',
            'bg-fighting': data.types[0] === 'fighting',
            'bg-poison': data.types[0] === 'poison',
            'bg-ground': data.types[0] === 'ground',
            'bg-flying': data.types[0] === 'flying',
            'bg-psychic': data.types[0] === 'psychic',
            'bg-bug': data.types[0] === 'bug',
            'bg-rock': data.types[0] === 'rock',
            'bg-ghost': data.types[0] === 'ghost',
            'bg-dragon': data.types[0] === 'dragon',
            'bg-dark': data.types[0] === 'dark',
            'bg-steel': data.types[0] === 'steel',
            'bg-fairy': data.types[0] === 'fairy',
          },
        )}
      >
        <img
          src={data.spriteMobile}
          alt={data.name}
          className="inline md:hidden bg-gray-600 bg-opacity-20 rounded-full p-4"
        />
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 1 }}
          className="p-4 m-4 bg-white rounded-md flex justify-between w-auto md:w-pokemon-card h-auto md:h-96 shadow-4 relative"
        >
          <img
            src={data.sprite}
            alt={data.name}
            className="w-0 md:w-auto h-0 md:h-[450px] ml-0 md:-ml-36 -mt-16 z-10 invisible md:visible"
          />
          <div className="w-full md:w-1/2 m-8 mx-12 z-10">
            <h3 className="block md:hidden text-gray-300 font-bold">
              #{data.id}
            </h3>
            <h2 className="uppercase text-gray-700 text-2xl mb-4 font-bold">
              {data.name}
            </h2>
            <p className="text-gray-600">
              {data.description.replace('\f', ' ')}
            </p>
          </div>
          <h1 className="hidden md:block absolute text-16xl -bottom-24 mb-6 text-gray-100 font-bold select-none">
            {data.id}
          </h1>
        </motion.div>
      </div>
      <AnimatePresence>
        {!mounted && (
          <motion.div
            className="absolute min-h-screen min-w-full bg-white z-20 top-0 noscript-hidden"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default IndexPokemon
