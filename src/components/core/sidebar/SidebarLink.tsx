import clsx from "clsx";
import type { Component } from "solid-js";
import { Show } from "solid-js";
import { Dynamic } from "solid-js/web";
import type { IconTypes } from "../../common/icons";
import { ConstructionIcon } from "../../common/icons";
import { Link } from "../../common/Link";
import type { EnabledLinkItem } from "./links.data";
import { isLinkDisabled, type LinkItem } from "./links.data";

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

const SidebarContent: Component<{
  icon: IconTypes;
  label: string;
  open: boolean;
}> = (props) => (
  <>
    <Dynamic component={props.icon} />
    <Show when={props.open}>
      <OpenedLinkText label={props.label} />
    </Show>
  </>
);

export const SidebarLink: Component<{
  closeSidebar: () => void;
  link: LinkItem | (Omit<EnabledLinkItem, "href"> & { noLink: true });
  open: boolean;
}> = (props) => {
  const onClick = () => props.closeSidebar();

  const className =
    "grid h-14 grid-cols-auto-1fr items-center gap-2 whitespace-nowrap border-y border-neutral px-4";

  const enabledClass = clsx(
    className,
    "duration-300 hover:bg-neutral active:bg-primary active:text-primary-content",
  );

  const disabledClass = clsx(className, "text-neutral");

  return (
    <>
      {isLinkDisabled(props.link) ? (
        <div class={disabledClass}>
          <ConstructionIcon />
          <Show when={props.open}>
            <OpenedLinkText label={props.link.label} disabled />
          </Show>
        </div>
      ) : "noLink" in props.link ? (
        <button class={clsx(enabledClass, "text-left")} onClick={onClick}>
          <SidebarContent
            icon={props.link.icon}
            label={props.link.label}
            open={props.open}
          />
        </button>
      ) : (
        <Link href={props.link.href} onClick={onClick} class={enabledClass}>
          <SidebarContent
            icon={props.link.icon}
            label={props.link.label}
            open={props.open}
          />
        </Link>
      )}
    </>
  );
};
