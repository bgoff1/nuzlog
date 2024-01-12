import fs from "fs/promises";
import path from "path";
import prettier from "prettier";

const routesDirectory = "./src/pages";

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

async function filterFiles(filesOrDirectories: string[]) {
  const results: string[] = [];
  for (const fileOrDirectory of filesOrDirectories) {
    const stats = await fs.stat(path.resolve(routesDirectory, fileOrDirectory));
    if (!stats.isDirectory()) {
      results.push(fileOrDirectory);
    }
  }

  return results;
}

async function main() {
  const filesOrDirectories = await fs.readdir(routesDirectory, {
    recursive: true,
  });
  const files = await filterFiles(filesOrDirectories);

  const routes = files.map((file) => ({
    path: file
      .replace(".tsx", "")
      .replace(/\(.+\)/, "")
      .replace("index", "")
      .replace(/\/$/, ""),
    file,
  }));

  const definitions = routes.map((route) => {
    return {
      content: `{
      path: '/${route.path}',
      component: lazy(() => import('${path.resolve(
        routesDirectory,
        route.file,
      )}')),
    }`,
      path: `'/${route.path}'`,
    };
  });

  const stringRouteDefinitions = definitions
    .map((def) => def.content)
    .join(", ");

  const { normal, parameters } = splitRoutes(
    definitions.map((def) => def.path),
  );

  const parameterizedRoutes = parameters.map((current) => ({
    path: current,
    value: getAllParameters(current)
      .map((parameter) => `${parameter}: string;`)
      .join("\n"),
  }));

  const content = `import { lazy } from 'solid-js';
  import { RouteDefinition } from '@solidjs/router';

  const definitions: RouteDefinition[] = [${stringRouteDefinitions}];

  export type NonParameterizedRoutes = ${normal.join(" | ")};

  export type ParameterizedRoutes = { ${parameterizedRoutes
    .map((route) => `${route.path}: {${route.value}}`)
    .join("\n")} };

  export type Routes = NonParameterizedRoutes | ParameterizedRoutes;
  
  export default definitions;`;

  const formattedContent = await prettier
    .format(content, {
      parser: "typescript",
    })
    .then((content) => ({ content }))
    .catch((e) => ({ isError: true, error: e }));

  if ("isError" in formattedContent) {
    console.log(formattedContent.error);
  } else {
    await fs.writeFile("./src/route-tree.gen.ts", formattedContent.content, {
      encoding: "utf-8",
    });
  }
}

main();
