import { configure } from "@solidjs/testing-library";
import "@testing-library/jest-dom/vitest";
import { createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";

configure({
  testIdAttribute: "data-test-id",
});

vi.mock("@tanstack/solid-query", () => ({
  createQuery: vi.fn().mockImplementation((selector) => {
    const { queryKey, queryFn } = selector();
    const [result] = createResource(() => queryKey, queryFn);
    const [state, setState] = createStore({
      data: undefined,
      isLoading: true,
    });

    createEffect(() => {
      setState({
        data: result(),
        isLoading: result.loading,
      });
    });

    return state;
  }),
}));
