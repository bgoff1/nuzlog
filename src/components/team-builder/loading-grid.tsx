import { For } from "solid-js";

export const LoadingGrid = () => {
  return (
    <ul class="flex flex-wrap justify-center gap-4">
      <For each={Array.from(new Array(50))}>
        {() => {
          return (
            <div class="text-center">
              <div class="h-24 w-24 rounded-full bg-neutral" />
              <div class="invisible">loading...</div>
            </div>
          );
        }}
      </For>
    </ul>
  );
};
