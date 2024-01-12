import type { AnchorProps } from "@solidjs/router";
import { A } from "@solidjs/router";
import type { JSX } from "solid-js";
import type {
  NonParameterizedRoutes,
  ParameterizedRoutes,
} from "../route-tree.gen";

type LinkWithParams<TRoute extends keyof ParameterizedRoutes> = {
  href: TRoute;
  params: ParameterizedRoutes[TRoute];
};

export const Link = <TRoute extends keyof ParameterizedRoutes>(
  props: Omit<AnchorProps, "children"> & { children: JSX.Element } & (
      | {
          href: NonParameterizedRoutes;
        }
      | LinkWithParams<TRoute>
    ),
) => {
  return <A {...props} />;
};
