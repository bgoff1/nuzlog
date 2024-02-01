import type { JSX } from "solid-js";
import {
  CoverageIcon,
  PokeballIcon,
  SettingsIcon,
} from "../../components/common/icons";
import { Footer } from "../../components/core/Footer";
import { TeamProvider } from "../../context/team-builder/team";

const TeamBuilderLayout = (props: { children?: JSX.Element }) => {
  return (
    <TeamProvider>
      <main class="flex h-full flex-col overflow-y-auto">{props.children}</main>
      <Footer
        items={[
          {
            href: "/team-builder/options",
            label: "Options",
            icon: SettingsIcon,
          },
          {
            href: "/team-builder",
            icon: PokeballIcon,
            label: "Builder",
          },
          {
            href: "/team-builder/coverage",
            label: "Coverage",
            icon: CoverageIcon,
          },
        ]}
      />
    </TeamProvider>
  );
};

export default TeamBuilderLayout;
