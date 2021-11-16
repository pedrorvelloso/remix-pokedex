const POKEAPI_URL = 'https://pokeapi.co/api/v2/'

type FlavorText = {
  language: {
    name: string
  }
  version: {
    name: string
  }
}

export const getPokemonDetail = async (pokemonName: string) => {
  const pokemonRes = await fetch(`${POKEAPI_URL}/pokemon/${pokemonName}`)
  const { name, types, species: s, sprites, id } = await pokemonRes.json()

  const pokemonSpeciesRes = await fetch(s.url)
  const species = await pokemonSpeciesRes.json()

  const { flavor_text: description } =
    species.flavor_text_entries.find(
      (fte: FlavorText) =>
        fte.language.name === 'en' && fte.version.name === 'ruby',
    ) ||
    species.flavor_text_entries.filter(
      (fte: FlavorText) => fte.language.name === 'en',
    )[0]

  return {
    name,
    types: types.map((t: { type: { name: string } }) => t.type.name),
    sprite: sprites.other['official-artwork'].front_default,
    spriteMobile: sprites.front_default,
    id: `00${id}`.slice(-3),
    description,
  }
}
