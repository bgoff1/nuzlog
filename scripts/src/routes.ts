import { LAYOUT_FILE } from "./const";
import {
  buildDynamicImport,
  buildLayoutPath,
  getPathFromFileName,
} from "./utils";

type RouteDefinition = {
  path: string;
  component?: string;
  children?: RouteDefinition[];
};

type Level = {
  [key: string]: RouteDefinition[] | Level;
};

export const buildRouteTree = (routes: string[]): RouteDefinition[] => {
  const nonLayoutRoutes = routes.filter(
    (fileName) => !fileName.includes(LAYOUT_FILE),
  );

  const allRoutes: RouteDefinition[] = [];
  const level: Level = { result: allRoutes };

  nonLayoutRoutes.forEach((fullPath) => {
    const pageKeys = fullPath.split("/");

    pageKeys.reduce((r, fullName) => {
      const path = getPathFromFileName(fullName);
      const isFile = fullName.includes(".tsx");

      if (!r[path]) {
        r[path] = { result: [] };

        // if we are on a route file
        if (isFile) {
          (r.result as RouteDefinition[]).push({
            path,
            component: buildDynamicImport(fullPath),
          });
        } else {
          const layoutPath = buildLayoutPath(fullPath);

          const folderHasLayoutRoute = routes.some(
            (glob) => glob === layoutPath,
          );

          (r.result as RouteDefinition[]).push({
            path,
            ...(folderHasLayoutRoute
              ? {
                  component: buildDynamicImport(layoutPath),
                }
              : {}),
            children: (r[path] as Level).result as RouteDefinition[],
          });
        }
      }

      return r[path] as Level;
    }, level);
  });

  return allRoutes;
};
