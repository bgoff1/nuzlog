import type { AnchorProps } from "@solidjs/router";
import { A } from "@solidjs/router";
import type { JSX } from "solid-js";
import type {
  NonParameterizedRoutes,
  ParameterizedRoutes,
} from "../../route-tree.gen";

type LinkWithParams<TRoute extends keyof ParameterizedRoutes> = {
  href: TRoute;
  params: ParameterizedRoutes[TRoute];
};

type LinkWithoutParams = {
  href: NonParameterizedRoutes;
};

type LinkParams<TRoute extends keyof ParameterizedRoutes> =
  | LinkWithParams<TRoute>
  | LinkWithoutParams;

const isLinkWithParams = <TRoute extends keyof ParameterizedRoutes>(
  params: LinkParams<TRoute>,
): params is LinkWithParams<TRoute> =>
  (params as LinkWithParams<TRoute>).params !== undefined;

const buildLinkWithParams = <TRoute extends keyof ParameterizedRoutes>(
  url: TRoute,
  params: ParameterizedRoutes[TRoute],
) => {
  let newLink = url.toString();
  for (const [key, value] of Object.entries(params ?? {})) {
    newLink = newLink.replace(`:${key}`, value);
  }

  return newLink;
};

export const Link = <TRoute extends keyof ParameterizedRoutes>(
  props: Omit<AnchorProps, "children"> & {
    children: JSX.Element;
  } & LinkParams<TRoute>,
) => {
  return (
    <A
      {...props}
      href={
        isLinkWithParams(props)
          ? buildLinkWithParams(props.href, props.params)
          : props.href
      }
    />
  );
};
