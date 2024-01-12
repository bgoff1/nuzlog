import path from "path";
import { ROUTES_DIRECTORY } from "./const";
import { countSlashes } from "./utils";

export interface Route {
  content: string;
  path: string;
  children: Route[];
}

const generateRouteConfig = (route: { path: string; file: string }): string => {
  return `path: '/${route.path}',
  component: lazy(() => import('${path.resolve(
    ROUTES_DIRECTORY,
    route.file,
  )}'))`;
};

export const buildRouteDefinitions = (
  routes: { path: string; file: string }[],
) => {
  const addedRoutes = new Set<string>();

  return routes.reduce((previous, route) => {
    if (route.file.includes("_layout.tsx")) {
      const currentRoutePaths = countSlashes(route.file);
      const siblingRoutes = routes.filter(
        (r) =>
          countSlashes(r.file) === currentRoutePaths && r.file !== route.file,
      );

      console.log(siblingRoutes);

      const children = siblingRoutes.map((r) => ({
        children: [],
        content: `{${generateRouteConfig(r)}}`,
        path: `'/${r.path}'`,
      }));

      const layoutRoute: Route = {
        content: `{${generateRouteConfig(route)},
        children: [${children.map((child) => child.content).join(",")}]}`,
        path: `'/${route.path}'`,
        children,
      };

      siblingRoutes.forEach((route) => addedRoutes.add(route.file));

      return [...previous, layoutRoute];
    }

    if (addedRoutes.has(route.file)) {
      return previous;
    }

    const newRoute: Route = {
      content: `{${generateRouteConfig(route)}}`,
      path: `'/${route.path}'`,
      children: [],
    };

    return [...previous, newRoute];
  }, [] as Route[]);
};
