import { For, createResource } from "solid-js";
import {
  fetchFunction,
  getCacheKeys,
  getKeysMatching,
} from "../../api/cached-fetch";
import { Link } from "../../components/common/Link";
import { kebabToTitle } from "../../util/titlecase";

const fetchEndpoints = () => fetchFunction("/", {});

const DataManagementPage = () => {
  const [data] = createResource(() => fetchEndpoints(), {
    initialValue: {} as Awaited<ReturnType<typeof fetchEndpoints>>,
  });
  const [allKeys] = createResource(() => getCacheKeys(), { initialValue: [] });

  return (
    <main class="flex flex-col overflow-y-auto">
      <h2 class="text-center">
        User is currently {navigator.onLine ? "Online" : "Offline"}
      </h2>
      <ul class="grid grid-cols-2 gap-2 overflow-y-auto p-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <For each={Object.keys(data())}>
          {(category) => (
            <Link href="/data-management/:category" params={{ category }}>
              <button class="btn btn-primary h-full w-full flex-nowrap justify-between p-2 text-left text-lg">
                <span>{kebabToTitle(category)}</span>
                <span>{getKeysMatching(allKeys(), category).length}</span>
              </button>
            </Link>
          )}
        </For>
      </ul>
    </main>
  );
};

export default DataManagementPage;
