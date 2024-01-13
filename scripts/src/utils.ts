import path from "path";
import { FALLBACK_FILE_NAME, LAYOUT_FILE, ROUTES_DIRECTORY } from "./const";

export const getPathFromFileName = (fileName: string): string => {
  const replacedFileName = fileName
    .replace(/\(.+\)/, "")
    .replace("index", "")
    .replace(".tsx", "")
    .replace(/\[([\w-]+)\]/g, ":$1");

  if (replacedFileName === FALLBACK_FILE_NAME) {
    return "**";
  }

  return replacedFileName;
};

export const buildDynamicImport = (slashPaddedPath: string) => {
  const fileName = slashPaddedPath.slice(1);
  return `lazy(() => import('${path.resolve(ROUTES_DIRECTORY, fileName)}'))`;
};

export const buildLayoutPath = (fileName: string) => {
  const directoryName = fileName.substring(
    0,
    fileName.replace(/\(.+\)\//, "").lastIndexOf("/"),
  );
  return `${directoryName}/${LAYOUT_FILE}`;
};
