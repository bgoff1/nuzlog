/* v8 ignore next 3 */
export type WithChildren<T = unknown> = T & {
  children: import("solid-js").JSX.Element;
};
