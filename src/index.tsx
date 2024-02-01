/* @refresh reload */
import { Router } from "@solidjs/router";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { render } from "solid-js/web";
import { routes } from "./route-tree.gen";

import { Show, Suspense, lazy } from "solid-js";
import { env } from "./env";
import "./styles/main.css";

const root = document.getElementById("root");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      networkMode: "always",
    },
  },
});

const DevTools = lazy(() =>
  import("@tanstack/solid-query-devtools").then((devTools) => ({
    default: devTools.SolidQueryDevtools,
  })),
);

render(
  () => (
    <QueryClientProvider client={queryClient}>
      <Show when={env().local}>
        <Suspense>
          <DevTools />
        </Suspense>
      </Show>
      <Router>{routes}</Router>
    </QueryClientProvider>
  ),
  root!,
);
