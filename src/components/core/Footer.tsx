import { useMatch } from "@solidjs/router";
import clsx from "clsx";
import { For } from "solid-js";
import { Dynamic } from "solid-js/web";
import { Link } from "../common/Link";
import { isLinkDisabled, type LinkItem } from "./sidebar/links.data";

const FooterButton = (props: LinkItem) => {
  return (
    <button
      class={clsx(
        isLinkDisabled(props) ? "cursor-auto" : "duration-300 hover:bg-neutral",
        "flex flex-col items-center justify-center p-2 sm:w-24",
      )}>
      {!isLinkDisabled(props) && <Dynamic component={props.icon} />}
      <span class="hidden xs:inline">{props.label}</span>
    </button>
  );
};

const LinkFooterButton = (props: LinkItem) => {
  const match = useMatch(() => props.href);

  return (
    <Link href={props.href} replace class={clsx(match() && "text-primary")}>
      <FooterButton {...props} />
    </Link>
  );
};

export const Footer = (props: { items: LinkItem[] }) => {
  return (
    <footer class="flex justify-center gap-2 border-t border-neutral bg-base-300 footer-area">
      <For each={props.items}>
        {(item) => (
          <>
            {isLinkDisabled(item) ? (
              <FooterButton {...item} />
            ) : (
              <LinkFooterButton {...item} />
            )}
          </>
        )}
      </For>
    </footer>
  );
};
