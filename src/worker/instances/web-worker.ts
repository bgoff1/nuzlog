import { wrap } from "comlink";

export const db = wrap<(typeof import("../worker"))["workerObject"]>(
  new Worker(new URL("../worker/worker", import.meta.url), { type: "module" }),
);
