import { useParams } from "@solidjs/router";
import { createQuery } from "@tanstack/solid-query";
import { For, Show } from "solid-js";
import { Link } from "../../components/common/link";
import { Pokemon } from "../../components/common/pokemon";
import { PokemonAbilities } from "../../components/encyclopedia/pokemon-abilities";
import { PokemonStats } from "../../components/encyclopedia/pokemon-stats";
import { query } from "../../database/query";
import {
  getBasePokemonQuery,
  getSpriteFromDBSprite,
  getTypesFromDBTypes,
} from "../../hooks/team-builder/builder";

const EncyclopediaPokemon = () => {
  const params = useParams<{ id: string }>();

  const id = () => params.id;

  // TODO: make this a hook
  const data = createQuery(() => ({
    queryKey: ["pokemon", id()],
    queryFn: async () => {
      const result = await query(
        getBasePokemonQuery()
          .where((eb) =>
            eb(
              "pokemon_species.evolution_chain_id",
              "=",
              eb
                .selectFrom(["pokemon_v2_pokemonspecies", "pokemon_v2_pokemon"])
                .select("pokemon_v2_pokemonspecies.evolution_chain_id")
                .whereRef(
                  "pokemon_v2_pokemonspecies.id",
                  "=",
                  "pokemon_v2_pokemon.pokemon_species_id",
                )
                .where("pokemon_v2_pokemon.id", "=", +id()),
            ),
          )
          .compile(),
      );
      return result.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        sprite: getSpriteFromDBSprite(pokemon.sprites),
        types: getTypesFromDBTypes(pokemon.types),
      }));
    },
  }));

  const pokemon = () => data.data!;
  const currentPokemon = () => pokemon().find((item) => item.id === +id());

  return (
    <div class="flex flex-col overflow-y-auto p-2">
      <Show when={!data.isLoading}>
        <h1 class="sr-only">
          Encyclopedia for {currentPokemon()?.name ?? id()}
        </h1>
        <div class="breadcrumbs overflow-visible text-sm">
          <ul>
            <li>
              <Link href="/encyclopedia">Encyclopedia</Link>
            </li>
            <li>{currentPokemon()?.name}</li>
          </ul>
        </div>
        <div class="flex items-center justify-center gap-4">
          <For each={pokemon()}>
            {(familyMember) => (
              <Show
                when={familyMember.id === +id()}
                fallback={
                  <Link
                    href="/encyclopedia/:id"
                    params={{ id: familyMember.id.toString() }}>
                    <Pokemon
                      id={familyMember.id}
                      name={familyMember.name}
                      sprite={familyMember.sprite}
                      types={familyMember.types}
                      size="medium"
                    />
                  </Link>
                }>
                <div>
                  <Pokemon
                    id={familyMember.id}
                    name={familyMember.name}
                    sprite={familyMember.sprite}
                    types={familyMember.types}
                    size="large"
                  />
                </div>
              </Show>
            )}
          </For>
        </div>
        <div class="flex flex-col gap-4">
          <PokemonStats id={id()} />
          <hr />
          <PokemonAbilities id={id()} />
        </div>
      </Show>
    </div>
  );
};

export default EncyclopediaPokemon;
