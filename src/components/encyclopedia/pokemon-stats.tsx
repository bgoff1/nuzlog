import { createQuery } from "@tanstack/solid-query";
import type { Accessor, Component } from "solid-js";
import { Index } from "solid-js";
import { query } from "../../database/query";
import { queryBuilder } from "../../database/query-builder";
import type { Defined, QueryHookType } from "../../types/hook-type";
import { MAX_BASE_STAT, MAX_EFFORT } from "../../util/constants";

const usePokemonStats = (id: Accessor<number>) => {
  return createQuery(() => ({
    queryKey: ["pokemon-stats", id()],
    queryFn: () => {
      return query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_pokemonstat as pokemon_stat",
            "pokemon_v2_stat as stat",
            "pokemon_v2_statname as stat_name",
            "pokemon_v2_language as language",
          ])
          .select([
            "pokemon_stat.base_stat",
            "pokemon_stat.effort",
            "stat_name.name",
          ])
          .where("pokemon_stat.pokemon_id", "=", id())
          .whereRef("pokemon_stat.stat_id", "=", "stat.id")
          .whereRef("stat_name.stat_id", "=", "stat.id")
          .whereRef("language.id", "=", "stat_name.language_id")
          .where("language.name", "=", "en")
          .compile(),
      );
    },
  }));
};

const usePokemonStatNames = () => {
  return createQuery(() => ({
    queryKey: ["stat-names"],
    queryFn: () =>
      query(
        queryBuilder
          .selectFrom([
            "pokemon_v2_stat as stat",
            "pokemon_v2_statname as stat_name",
            "pokemon_v2_language as language",
          ])
          .select(["stat_name.name"])
          .whereRef("stat.id", "=", "stat_name.stat_id")
          .whereRef("stat_name.language_id", "=", "language.id")
          .where("language.name", "=", "en")
          .where("stat.is_battle_only", "=", "0")
          .compile(),
      ),
  }));
};

export const PokemonStats: Component<{ id: string }> = (props) => {
  const pokemonStats = usePokemonStats(() => +props.id);
  const statNames = usePokemonStatNames();

  return (
    <div>
      <h2 class="text-xl">Statistics</h2>
      <div class="flex gap-4 pl-3 max-md:flex-wrap">
        <StatSection
          statNames={statNames.data}
          max={MAX_BASE_STAT}
          pokemonDataFinder={(stat) =>
            (pokemonStats.data ?? []).find(
              (pokemonStat) => pokemonStat.name === stat.name,
            )!
          }
          selector={(item) => item?.base_stat}
          title="Base Stats"
        />
        <StatSection
          statNames={statNames.data}
          max={MAX_EFFORT}
          pokemonDataFinder={(stat) =>
            (pokemonStats.data ?? []).find(
              (pokemonStat) => pokemonStat.name === stat.name,
            )!
          }
          selector={(item) => item?.effort}
          title="Effort"
        />
      </div>
    </div>
  );
};

type PokemonStat = Defined<QueryHookType<typeof usePokemonStats>>[number];
type Stat = QueryHookType<typeof usePokemonStatNames>;

const StatSection: Component<{
  statNames: Stat;
  pokemonDataFinder: (stat: Defined<Stat>[number]) => PokemonStat;
  selector: (item: PokemonStat) => number;
  title: string;
  max: number;
}> = (props) => {
  return (
    <section class="w-full">
      <h3 class="text-lg">{props.title}</h3>
      <ul class="pl-3">
        <Index each={props.statNames}>
          {(item) => (
            <StatBar
              data={props.pokemonDataFinder(item())}
              selector={props.selector}
              max={props.max}
            />
          )}
        </Index>
      </ul>
    </section>
  );
};

const StatBar: Component<{
  data: PokemonStat;
  selector: (item: PokemonStat) => number;
  max: number;
}> = (props) => {
  return (
    <li class="flex flex-col">
      <span>
        {props.data?.name} - {props.selector(props.data)}
      </span>
      <progress
        class="progress progress-primary"
        value={props.selector(props.data) ?? 0}
        max={props.max}
      />
    </li>
  );
};
