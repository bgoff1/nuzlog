import { For } from "solid-js";

export const LoadingGrid = () => {
  return (
    <ul class="flex flex-wrap justify-center gap-4">
      <For each={Array.from(new Array(100))}>
        {() => {
          return (
            <div class="text-center">
              <div class="h-24 w-24 rounded-full motion-safe:custom-loader motion-reduce:bg-neutral" />
              <div class="invisible">loading...</div>
            </div>
          );
        }}
      </For>
    </ul>
  );
};
