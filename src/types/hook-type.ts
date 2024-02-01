/* v8 ignore next 12 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookType<T extends (...args: any[]) => any> = ReturnType<
  ReturnType<T>
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type QueryHookType<T extends (...args: any[]) => any> =
  ReturnType<T>["data"];

export type Defined<T> = T extends null | undefined ? never : T;
