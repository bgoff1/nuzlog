import { A, AnchorProps } from "@solidjs/router";
import { JSX } from "solid-js";
import { NonParameterizedRoutes, ParameterizedRoutes } from "../route-tree.gen";

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

const Whatever = () => {
  return <Link href="/team-builder/">boo</Link>;
};
