import { For, createResource } from "solid-js";
import { fetchFunction, getCacheKeys } from "../../api/cached-fetch";
import { Link } from "../../components/common/Link";
import { kebabToTitle } from "../../util/titlecase";

const fetchEndpoints = () => fetchFunction("/", {});

const DataManagementPage = () => {
  const [data] = createResource(() => fetchEndpoints(), {
    initialValue: {} as Awaited<ReturnType<typeof fetchEndpoints>>,
  });
  const [allKeys] = createResource(() => getCacheKeys(), { initialValue: [] });

  return (
    <>
      <span>User is currently {navigator.onLine ? "Online" : "Offline"}</span>
      <ul class="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <For each={Object.keys(data())}>
          {(key) => (
            <Link href="/data-management/:category" params={{ category: key }}>
              <button class="btn btn-outline btn-primary h-full w-full flex-nowrap justify-between p-2 text-left text-lg">
                <span class="text-base-content">{kebabToTitle(key)}</span>
                <span class="text-base-content">
                  {allKeys().filter((k) => k.includes(key)).length}
                </span>
              </button>
            </Link>
          )}
        </For>
      </ul>
    </>
  );
};

export default DataManagementPage;
