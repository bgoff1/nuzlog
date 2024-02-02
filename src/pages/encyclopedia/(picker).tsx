import { For, Show, createSignal } from "solid-js";
import { Link } from "../../components/common/link";
import { Pokemon } from "../../components/common/pokemon";
import { LoadingGrid } from "../../components/team-builder/loading-grid";
import { useBuilderData } from "../../hooks/team-builder/builder";

const EncyclopediaPicker = () => {
  const state = useBuilderData(() => []);
  const [search, setSearch] = createSignal("");

  return (
    <div class="p-2">
      <h1 class="sr-only">Encyclopedia Pokemon Selector</h1>
      <Show when={!state.isLoading} fallback={<LoadingGrid />}>
        <div class="flex w-full justify-center py-2">
          <input
            type="text"
            placeholder="Search pokemon"
            value={search()}
            onInput={(e) => setSearch(e.target.value)}
            class="input input-bordered w-full max-w-xs"
          />
        </div>
        <ul class="flex flex-wrap justify-center gap-4">
          <For
            each={
              search().length
                ? state.data?.filter(({ name }) =>
                    name.toLowerCase().includes(search().toLowerCase()),
                  )
                : state.data
            }>
            {(pokemon) => (
              <Link
                href="/encyclopedia/:id"
                params={{ id: pokemon.id.toString() }}>
                <Pokemon {...pokemon} onClick={() => {}} />
              </Link>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
};

export default EncyclopediaPicker;
