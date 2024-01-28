import type { JSX } from "solid-js";
import { createSignal } from "solid-js";
import { Header } from "../components/core/Header";
import { Sidebar } from "../components/core/sidebar/Sidebar";
import { InstallProvider } from "../context/install";
import { ThemeProvider } from "../context/theme";

const Layout = (props: { children?: JSX.Element }) => {
  const [open, setOpen] = createSignal(false);
  const toggle = () => setOpen((previouslyOpen) => !previouslyOpen);
  const close = () => setOpen(false);

  return (
    <ThemeProvider>
      <InstallProvider>
        <Header toggle={toggle} />
        <Sidebar closeSidebar={close} open={open()} />
        {props.children}
      </InstallProvider>
    </ThemeProvider>
  );
};

export default Layout;
