import clsx from 'clsx'
import IconType from '~/components/icon-type'

interface PokemonCardProps {
  name: string
  id: number
  type: string[]
  image: string
}

interface NumberBadgeProps {
  type: string
}

const NumberBadge: React.FC<NumberBadgeProps> = ({ type, children }) => (
  <div
    className={clsx(
      'flex items-center justify-center rounded-full w-4 h-4 p-4 absolute -top-3 text-xs font-bold text-white',
      {
        'bg-normal': type === 'Normal',
        'bg-fire': type === 'Fire',
        'bg-water': type === 'Water',
        'bg-electric': type === 'Electric',
        'bg-grass': type === 'Grass',
        'bg-ice': type === 'Ice',
        'bg-fighting': type === 'Fighting',
        'bg-poison': type === 'Poison',
        'bg-ground': type === 'Ground',
        'bg-flying': type === 'Flying',
        'bg-psychic': type === 'Psychic',
        'bg-bug': type === 'Bug',
        'bg-rock': type === 'Rock',
        'bg-ghost': type === 'Ghost',
        'bg-dragon': type === 'Dragon',
        'bg-dark': type === 'Dark',
        'bg-steel': type === 'Steel',
        'bg-fairy': type === 'Fairy',
      },
    )}
  >
    {children}
  </div>
)

const PokemonCard = ({ name, id, type, image }: PokemonCardProps) => {
  return (
    <div
      className={clsx(
        'border border-solid shadow-md rounded-lg p-5 w-full h-48 flex flex-col items-center justify-center relative',
        {
          'border-normal': type[0] === 'Normal',
          'border-fire': type[0] === 'Fire',
          'border-water': type[0] === 'Water',
          'border-electric': type[0] === 'Electric',
          'border-grass': type[0] === 'Grass',
          'border-ice': type[0] === 'Ice',
          'border-fighting': type[0] === 'Fighting',
          'border-poison': type[0] === 'Poison',
          'border-ground': type[0] === 'Ground',
          'border-flying': type[0] === 'Flying',
          'border-psychic': type[0] === 'Psychic',
          'border-bug': type[0] === 'Bug',
          'border-rock': type[0] === 'Rock',
          'border-ghost': type[0] === 'Ghost',
          'border-dragon': type[0] === 'Dragon',
          'border-dark': type[0] === 'Dark',
          'border-steel': type[0] === 'Steel',
          'border-fairy': type[0] === 'Fairy',
        },
      )}
    >
      <NumberBadge type={type[0]}>{id}</NumberBadge>
      <img src={image} alt={`${name}`} className="w-28 h-28" />
      <p>{name}</p>
      <div className="flex gap-x-2 absolute -bottom-4">
        {type.map((t, i) => (
          <IconType type={t} key={i.toString()} />
        ))}
      </div>
    </div>
  )
}

export default PokemonCard
