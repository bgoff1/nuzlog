import type { JSX } from "solid-js";
import { createSignal } from "solid-js";
import { Header } from "../components/core/Header";
import { Sidebar } from "../components/core/sidebar/Sidebar";
import { ThemeProvider } from "../context/theme";

const Layout = (props: { children?: JSX.Element }) => {
  const [open, setOpen] = createSignal(false);
  const toggle = () => setOpen((previouslyOpen) => !previouslyOpen);
  const close = () => setOpen(false);

  return (
    <ThemeProvider>
      <Header toggle={toggle} />
      <Sidebar closeSidebar={close} open={open()} />
      <main class="flex flex-col overflow-auto main-area">
        {props.children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;
