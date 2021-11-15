import clsx from 'clsx'

interface IconTypeProps {
  type: string
}

const IconType = ({ type }: IconTypeProps) => {
  return (
    <div
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-full',
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
      <img
        src={`/images/type-icons/${type.toLowerCase()}.png`}
        alt={type}
        className="w-5 h-5"
      />
    </div>
  )
}

export default IconType
