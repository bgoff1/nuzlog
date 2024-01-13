import clsx from "clsx";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { Link } from "../components/common/Link";
import type { NonParameterizedRoutes } from "../route-tree.gen";

const HomePage: Component = () => {
  const buttons: { label: string; href: NonParameterizedRoutes }[] = [
    {
      label: "Team Builder",
      href: "/team-builder",
    },
  ];

  return (
    <main class="flex h-full flex-col items-center justify-center gap-4 text-center">
      <h1 class="text-4xl">Home</h1>

      <div class={clsx(buttons.length > 1 && "grid-cols-2", "grid gap-4")}>
        <For each={buttons}>
          {(item) => (
            <Link href={item.href}>
              <button class="btn btn-outline btn-primary">{item.label}</button>
            </Link>
          )}
        </For>
      </div>
    </main>
  );
};

export default HomePage;
