import type { JSX } from "solid-js";
import { Show, createResource, createSignal } from "solid-js";
import { Header } from "../components/core/Header";
import { Sidebar } from "../components/core/sidebar/Sidebar";
import { InstallProvider } from "../context/install";
import { ThemeProvider } from "../context/theme";
import { db } from "../worker/instance";

const Layout = (props: { children?: JSX.Element }) => {
  const [open, setOpen] = createSignal(false);
  const toggle = () => setOpen((previouslyOpen) => !previouslyOpen);
  const close = () => setOpen(false);
  const [data] = createResource(() => db.load().then(() => false), {
    initialValue: true,
  });

  return (
    <ThemeProvider>
      <InstallProvider>
        <Header toggle={toggle} />
        <Sidebar closeSidebar={close} open={open()} />
        <Show when={!data()} fallback={<main>loading...</main>}>
          {props.children}
        </Show>
      </InstallProvider>
    </ThemeProvider>
  );
};

export default Layout;
