import clsx from "clsx";
import type { Component } from "solid-js";
import { For } from "solid-js";
import { useInstall } from "../../../context/install";
import { DatabaseIcon, DownloadIcon, ThemeIcon } from "../../common/icons";
import { SidebarLink } from "./SidebarLink";
import { links } from "./links.data";

export const Sidebar: Component<{
  open: boolean;
  closeSidebar: () => void;
}> = (props) => {
  const { show, action } = useInstall();

  return (
    <nav
      class={clsx(
        "flex h-full flex-col overflow-x-hidden border-r border-neutral bg-base-300 duration-500 sidebar-area",
        {
          "0:w-screen xs:w-60": props.open,
          "invisible w-0 xs:visible xs:w-14": !props.open,
        },
      )}>
      <div class="grow border-b border-neutral">
        <For each={links}>
          {(item) => (
            <SidebarLink
              closeSidebar={props.closeSidebar}
              link={item}
              open={props.open}
            />
          )}
        </For>
      </div>
      <SidebarLink
        closeSidebar={props.closeSidebar}
        link={{
          href: "/data-management",
          label: "Data Management",
          icon: DatabaseIcon,
        }}
        open={props.open}
      />
      {!!show() && (
        <SidebarLink
          closeSidebar={() => {
            props.closeSidebar();
            action();
          }}
          open={props.open}
          link={{
            noLink: true,
            icon: DownloadIcon,
            label: "Install the app",
          }}
        />
      )}
      <SidebarLink
        link={{ href: "/theme", icon: ThemeIcon, label: "Theme" }}
        open={props.open}
        closeSidebar={props.closeSidebar}
      />
    </nav>
  );
};
