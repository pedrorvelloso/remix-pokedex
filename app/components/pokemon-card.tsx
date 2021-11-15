import clsx from 'clsx'

interface PokemonCardProps {
  name: string
  id: number
  type: string[]
  image: string
}

const PokemonCard = ({ name, id, type, image }: PokemonCardProps) => {
  return (
    <div
      className={clsx(
        'border border-solid shadow-md rounded-lg p-5 w-48 h-48 flex flex-col items-center justify-center',
        `border-${type[0].toLocaleLowerCase()}`,
      )}
    >
      <img src={image} alt={`${name}`} className="w-28 h-28" />
      <p>
        {name} - #{id}
      </p>
    </div>
  )
}

export default PokemonCard
