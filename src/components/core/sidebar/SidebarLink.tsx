import clsx from "clsx";
import type { Component } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Link } from "../../common/Link";
import { ConstructionIcon } from "../../common/icons";
import type { SidebarLinkType } from "./links.data";

const OpenedLinkText: Component<{
  disabled?: true;
  label: string;
}> = (props) => {
  return (
    <div class="flex-1 opacity-100 transition-opacity delay-200 duration-200">
      <div>{props.label}</div>
      {props.disabled && <div>Under Construction</div>}
    </div>
  );
};

export const SidebarLink: Component<{
  closeSidebar: () => void;
  link: SidebarLinkType;
  open: boolean;
}> = (props) => {
  const onClick = () => props.closeSidebar();

  const className =
    "grid h-14 grid-cols-auto-1fr items-center gap-2 whitespace-nowrap border-y border-neutral px-4";

  return (
    <>
      {"disabled" in props.link ? (
        <div class={clsx(className, "text-neutral")}>
          <ConstructionIcon />
          {props.open && <OpenedLinkText label={props.link.label} disabled />}
        </div>
      ) : (
        <Link
          href={props.link.href}
          onClick={onClick}
          class={clsx(
            className,
            "duration-300 hover:bg-neutral active:bg-primary active:text-primary-content",
          )}>
          <Dynamic component={props.link.icon} />
          {props.open && <OpenedLinkText label={props.link.label} />}
        </Link>
      )}
    </>
  );
};
