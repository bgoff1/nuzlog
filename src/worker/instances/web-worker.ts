import { wrap } from "comlink";

export const db = wrap<(typeof import("../worker"))["workerObject"]>(
  new Worker(new URL("../worker", import.meta.url), { type: "module" }),
);
