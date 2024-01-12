import type { JSX } from "solid-js";

export type WithChildren<T = unknown> = T & {
  children: JSX.Element;
};
