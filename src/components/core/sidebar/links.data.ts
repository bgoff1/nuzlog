import type { IconTypes } from "solid-icons";
import type { NonParameterizedRoutes } from "../../../route-tree.gen";
import { PokeballIcon } from "../../common/icons";

export type SidebarLinkType = {
  label: string;
  href: NonParameterizedRoutes;
} & (
  | {
      disabled: true;
    }
  | { icon: IconTypes }
);

export const links: SidebarLinkType[] = [
  {
    href: "/team-builder",
    label: "Team Builder",
    icon: PokeballIcon,
  },
  {
    href: "/calculator",
    label: "Calculator",
    disabled: true,
  },
];
