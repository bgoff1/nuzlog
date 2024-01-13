import fs from "fs/promises";
import { exit } from "process";
import { ROUTES_DIRECTORY } from "./const";
import { filterFiles, getAllParameters, splitRoutes } from "./files";
import { formatTypescript, isFormattedError } from "./formatting";
import { buildRouteTree } from "./routes";
import { getPathFromFileName } from "./utils";

const stringifyRouteTree = (tree: ReturnType<typeof buildRouteTree>) => {
  const definitions = JSON.stringify(tree, null, 2).replace(
    /"(lazy.+\))"/g,
    "$1",
  );

  return `export const routes: RouteDefinition[] = ${definitions}`;
};

const stringifyRoutes = (
  routes: ReturnType<typeof splitRoutes>,
): Record<"normal" | "parameters" | "both", string> => {
  const paramRoutes = routes.parameters.map((param) => `'${param}'`);

  const parameterizedRoutes = paramRoutes.map((current) => ({
    path: current,
    value: getAllParameters(current)
      .map((parameter) => `${parameter}: string;`)
      .join("\n"),
  }));

  const parameters = `export type ParameterizedRoutes = { ${
    parameterizedRoutes.length
      ? parameterizedRoutes
          .map((route) => `${route.path}: {${route.value}}`)
          .join("\n")
      : "[key: string]: never"
  } };`;

  const normal = `export type NonParameterizedRoutes = ${routes.normal
    .map((route) => `'${route.replace(/(\w)\/$/, "$1")}'`)
    .join(" | ")}`;

  const both = `export type Routes = ${
    parameterizedRoutes.length
      ? "NonParameterizedRoutes | ParameterizedRoutes"
      : "NonParameterizedRoutes"
  };`;

  return { parameters, normal, both };
};

async function main() {
  console.log("♻️  Generating routes...");
  const start = Date.now();
  const filesOrDirectories = await fs.readdir(ROUTES_DIRECTORY, {
    recursive: true,
  });
  const routes = await filterFiles(filesOrDirectories);

  const { normal, parameters } = splitRoutes(
    routes
      .map((route) => getPathFromFileName(route))
      .filter((route) => !route.includes("_layout")),
  );

  if (!normal.length && !parameters.length) {
    console.error("You have no routes.");
    exit(1);
  }

  const tree = buildRouteTree(routes);

  const stringRouteDefinitions = stringifyRouteTree(tree);

  const strings = stringifyRoutes({ normal, parameters });

  const content = [
    "import { lazy } from 'solid-js';",
    "import { RouteDefinition } from '@solidjs/router';",
    "",
    stringRouteDefinitions,
    "",
    strings.normal,
    "",
    strings.parameters,
    "",
    strings.both,
  ].join("\n");

  const formattedContent = await formatTypescript(content);

  if (isFormattedError(formattedContent)) {
    console.error(formattedContent.error);
    exit(1);
  } else {
    await fs.writeFile("./src/route-tree.gen.ts", formattedContent.text, {
      encoding: "utf-8",
    });

    console.log(
      `🚀 Processed ${normal.length + parameters.length} routes in ${
        Date.now() - start
      }ms`,
    );
  }
}

main();
