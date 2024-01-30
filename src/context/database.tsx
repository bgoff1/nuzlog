import { Show, createResource, type Component } from "solid-js";
import type { WithChildren } from "../types/with-children";
import { db } from "../worker/instance";

export const DatabaseProvider: Component<WithChildren> = (props) => {
  const [data] = createResource(() => db.load());

  return (
    <Show when={data.loading} fallback={props.children}>
      <main>loading...</main>
    </Show>
  );
};
