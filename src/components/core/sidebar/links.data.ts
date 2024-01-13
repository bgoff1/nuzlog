import type { IconTypes } from "solid-icons";
import type { NonParameterizedRoutes } from "../../../route-tree.gen";
import { PokeballIcon } from "../../common/icons";

type LinkItemBase = {
  label: string;
  href: NonParameterizedRoutes;
};

export type DisabledLinkItem = LinkItemBase & {
  disabled: true;
};

export type EnabledLinkItem = LinkItemBase & {
  icon: IconTypes;
};

export type LinkItem = DisabledLinkItem | EnabledLinkItem;

export const links: LinkItem[] = [
  {
    href: "/team-builder",
    label: "Team Builder",
    icon: PokeballIcon,
  },
];

export const isLinkDisabled = (link: LinkItem): link is DisabledLinkItem =>
  (link as DisabledLinkItem).disabled === true;
