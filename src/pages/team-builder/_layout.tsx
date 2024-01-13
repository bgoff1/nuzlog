import type { JSX } from "solid-js";
import { PokeballIcon } from "../../components/common/icons";
import { Footer } from "../../components/core/Footer";

const TeamBuilderLayout = (props: { children?: JSX.Element }) => {
  return (
    <>
      <main class="flex h-full flex-col overflow-y-auto">{props.children}</main>
      <Footer
        items={[
          {
            href: "/team-builder",
            icon: PokeballIcon,
            label: "Builder",
          },
          {
            href: "/team-builder/options",
            label: "Options",
            icon: PokeballIcon,
          },
        ]}
      />
    </>
  );
};

export default TeamBuilderLayout;