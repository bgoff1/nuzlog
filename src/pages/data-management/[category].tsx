import type { Endpoints } from "@bgoff1/pokeapi-types";
import { useParams } from "@solidjs/router";
import clsx from "clsx";
import type { Accessor } from "solid-js";
import { createResource, createSignal } from "solid-js";
import { getCacheKeys, getKeysMatching } from "../../api/cached-fetch";
import { getLastUpdate } from "../../api/last-update";
import { RefreshIcon } from "../../components/common/icons";
import { kebabToTitle } from "../../util/titlecase";

const CategoryPage = () => {
  const { category } = useParams<{ category: keyof Endpoints["/"]["data"] }>();
  const [spin, setSpin] = createSignal(false);

  const reloadItems: Accessor<boolean> = () => !spin();

  const [lastUpdate] = createResource(reloadItems, async () => {
    const last = await getLastUpdate();
    return last?.[`/${category}`];
  });

  const [keys] = createResource(
    reloadItems,
    async () => {
      const allKeys = await getCacheKeys();
      return getKeysMatching(allKeys, category);
    },
    { initialValue: [] },
  );

  return (
    <main class="flex flex-col p-3">
      <h1 class="text-center text-2xl">
        {kebabToTitle(category)} - {keys().length}
      </h1>
      <h2 class="flex items-center justify-center gap-4">
        {lastUpdate()
          ? `Last Updated at: ${lastUpdate()!.toLocaleString()}`
          : "Never updated"}
        <button
          class="btn btn-ghost"
          onClick={async () => {
            setSpin(true);
            await new Promise((res) => setTimeout(res, 5000));
            setSpin(false);
          }}>
          <RefreshIcon class={clsx(spin() && "animate-spinning")} />
        </button>
      </h2>
    </main>
  );
};

export default CategoryPage;
