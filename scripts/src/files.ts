import fs from "fs/promises";
import path from "path";
import { ROUTES_DIRECTORY } from "./const";

export const filterFiles = async (filesOrDirectories: string[]) => {
  const results: string[] = [];
  for (const fileOrDirectory of filesOrDirectories) {
    const stats = await fs.stat(
      path.resolve(ROUTES_DIRECTORY, fileOrDirectory),
    );
    if (!stats.isDirectory()) {
      results.push("/" + fileOrDirectory);
    }
  }

  return results;
};

export const countSlashes = (string: string): number => {
  return string
    .split("")
    .filter((s) => s === "/")
    .join("").length;
};

export const splitRoutes = (
  definitions: string[],
): { normal: string[]; parameters: string[] } => {
  const [normal, parameters]: [string[], string[]] = [[], []];

  for (const definition of definitions) {
    if (definition.match(/\[(.+)\]/)?.length) {
      parameters.push(definition);
    } else {
      normal.push(definition);
    }
  }

  return {
    normal,
    parameters,
  };
};

export const getAllParameters = (route: string) => {
  let string = route.toString();
  const result: string[] = [];

  do {
    const paramMatch = string.match(/\[([\w-]+)\]/)!;
    result.push(paramMatch[1]);
    string = string.substring(string.indexOf("]") + 1);
  } while (string.match(/\[([\w-]+)\]/));

  return result;
};
