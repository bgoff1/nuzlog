import { createEffect } from "solid-js";
import type { SetStoreFunction, Store } from "solid-js/store";
import { createStore } from "solid-js/store";

export function createLocalStore<T extends object>(
  name: string,
  init: T,
): [Store<T>, SetStoreFunction<T>] {
  const localState = localStorage.getItem(name);
  const [state, setState] = createStore<T>(
    localState ? JSON.parse(localState) : init,
  );
  createEffect(() => localStorage.setItem(name, JSON.stringify(state)));
  return [state, setState];
}
