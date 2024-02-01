/* v8 ignore next 4 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HookType<T extends (...args: any[]) => any> = ReturnType<
  ReturnType<T>
>;
