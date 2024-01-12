export const getPathFromFileName = (file: string): string =>
  file
    .replace(".tsx", "")
    .replace(/\(.+\)/, "")
    .replace("index", "")
    .replace("_layout", "")
    .replace(/\/$/, "");

export const countSlashes = (s: string): number => {
  return s
    .split("")
    .filter((s) => s === "/")
    .join("").length;
};
