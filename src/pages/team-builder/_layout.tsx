import type { JSX } from "solid-js";
import { PokeballIcon } from "../../components/common/icons";
import { Footer } from "../../components/core/Footer";

const TeamBuilderLayout = (props: { children?: JSX.Element }) => {
  return (
    <>
      <div class="flex h-full flex-col">{props.children}</div>
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
