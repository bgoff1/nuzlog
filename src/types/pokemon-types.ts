export const typeColors = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

export type PokemonType = (typeof typeColors)[number];

type Background = `bg-${PokemonType}`;
type Border = `border-${PokemonType}`;
type AlternateBorder = `${Border}-alt`;

export const bgMapping: Record<PokemonType, Background> = {
  bug: "bg-bug",
  dark: "bg-dark",
  dragon: "bg-dragon",
  electric: "bg-electric",
  fairy: "bg-fairy",
  fighting: "bg-fighting",
  fire: "bg-fire",
  flying: "bg-flying",
  ghost: "bg-ghost",
  grass: "bg-grass",
  ground: "bg-ground",
  ice: "bg-ice",
  normal: "bg-normal",
  poison: "bg-poison",
  psychic: "bg-psychic",
  rock: "bg-rock",
  steel: "bg-steel",
  water: "bg-water",
};

export const borderMapping: Record<PokemonType, Border> = {
  bug: "border-bug",
  dark: "border-dark",
  dragon: "border-dragon",
  electric: "border-electric",
  fairy: "border-fairy",
  fighting: "border-fighting",
  fire: "border-fire",
  flying: "border-flying",
  ghost: "border-ghost",
  grass: "border-grass",
  ground: "border-ground",
  ice: "border-ice",
  normal: "border-normal",
  poison: "border-poison",
  psychic: "border-psychic",
  rock: "border-rock",
  steel: "border-steel",
  water: "border-water",
};

export const altBorderMapping: Record<PokemonType, AlternateBorder> = {
  bug: "border-bug-alt",
  dark: "border-dark-alt",
  dragon: "border-dragon-alt",
  electric: "border-electric-alt",
  fairy: "border-fairy-alt",
  fighting: "border-fighting-alt",
  fire: "border-fire-alt",
  flying: "border-flying-alt",
  ghost: "border-ghost-alt",
  grass: "border-grass-alt",
  ground: "border-ground-alt",
  ice: "border-ice-alt",
  normal: "border-normal-alt",
  poison: "border-poison-alt",
  psychic: "border-psychic-alt",
  rock: "border-rock-alt",
  steel: "border-steel-alt",
  water: "border-water-alt",
};

export const getBorderColor = (
  types: PokemonType[],
): Border | AlternateBorder => {
  if (types.length === 1) {
    return altBorderMapping[types[0]];
  }
  return borderMapping[types[1]];
};

export const getBackgroundColor = (types: PokemonType[]): Background =>
  bgMapping[types[0]];
