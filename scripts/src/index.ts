import fs from "fs/promises";
import prettier from "prettier";
import { exit } from "process";
import { ROUTES_DIRECTORY } from "./const";
import { filterFiles } from "./files";
import { buildRouteDefinitions } from "./routes";
import { getPathFromFileName } from "./utils";

const splitRoutes = (
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

const getAllParameters = (route: string) => {
  let string = route.toString();
  const result: string[] = [];

  do {
    const paramMatch = string.match(/\[([\w-]+)\]/)!;
    result.push(paramMatch[1]);
    string = string.substring(string.indexOf("]") + 1);
  } while (string.match(/\[([\w-]+)\]/));

  return result;
};

async function main() {
  const filesOrDirectories = await fs.readdir(ROUTES_DIRECTORY, {
    recursive: true,
  });
  const files = await filterFiles(filesOrDirectories);

  const routes = files.map((file) => ({
    path: getPathFromFileName(file),
    file,
  }));

  const definitions = buildRouteDefinitions(routes);

  const stringRouteDefinitions = definitions
    .map((def) => def.content)
    .join(", ");

  const paths = [
    ...new Set(
      definitions.reduce((previous, current) => {
        return [
          ...previous,
          current.path,
          ...current.children.map((child) => child.path),
        ];
      }, [] as string[]),
    ),
  ];

  const { normal, parameters } = splitRoutes(paths);

  if (!normal.length && !parameters.length) {
    console.error("You have no routes.");
    exit(1);
  }

  const parameterizedRoutes = parameters.map((current) => ({
    path: current,
    value: getAllParameters(current)
      .map((parameter) => `${parameter}: string;`)
      .join("\n"),
  }));

  const stringParameterizedRoutes = `export type ParameterizedRoutes = { ${
    parameterizedRoutes.length
      ? parameterizedRoutes
          .map((route) => `${route.path}: {${route.value}}`)
          .join("\n")
      : "[key: string]: never"
  } };`;

  const content = `import { lazy } from 'solid-js';
  import { RouteDefinition } from '@solidjs/router';

  const definitions: RouteDefinition[] = [${stringRouteDefinitions}];

  export type NonParameterizedRoutes = ${normal.join(" | ")};

  ${stringParameterizedRoutes}

  export type Routes = ${
    stringParameterizedRoutes
      ? "NonParameterizedRoutes | ParameterizedRoutes"
      : "NonParameterizedRoutes"
  };
  
  export const routes = definitions;`;

  const formattedContent = await prettier
    .format(content, {
      parser: "typescript",
    })
    .then((content) => ({ content }))
    .catch((e) => ({ isError: true, error: e }));

  if ("isError" in formattedContent) {
    console.error(formattedContent.error);
    exit(1);
  } else {
    await fs.writeFile("./src/route-tree.gen.ts", formattedContent.content, {
      encoding: "utf-8",
    });
  }
}

main();
