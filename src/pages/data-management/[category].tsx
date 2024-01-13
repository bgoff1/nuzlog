import type { Endpoints } from "@bgoff1/pokeapi-types";
import { useParams } from "@solidjs/router";
import clsx from "clsx";
import type { Accessor } from "solid-js";
import { createResource, createSignal } from "solid-js";
import { getCacheKeys, updateKey } from "../../api/cached-fetch";
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
      return allKeys.filter((key) => key.includes(`${category}/`));
    },
    { initialValue: [] },
  );

  return (
    <div class="flex flex-col">
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
            await updateKey(`/${category}`, keys());
            setSpin(false);
          }}>
          <RefreshIcon class={clsx(spin() && "animate-spinning")} />
        </button>
      </h2>
    </div>
  );
};

export default CategoryPage;
