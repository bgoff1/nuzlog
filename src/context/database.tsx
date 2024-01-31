import { Show, createResource, type Component } from "solid-js";
import { loadDB } from "../database";
import type { WithChildren } from "../types/with-children";

export const DatabaseProvider: Component<WithChildren> = (props) => {
  const [data] = createResource(() => loadDB());

  return (
    <Show when={data.loading} fallback={props.children}>
      <main>loading...</main>
    </Show>
  );
};
