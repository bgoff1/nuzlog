import type { JSX } from "solid-js";
import { createSignal } from "solid-js";
import { Toaster } from "solid-toast";
import { Header } from "../components/core/Header";
import { Sidebar } from "../components/core/sidebar/Sidebar";
import { DatabaseProvider } from "../context/database";
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
        <DatabaseProvider>{props.children}</DatabaseProvider>
      </InstallProvider>
      <Toaster
        position="bottom-center"
        toastOptions={{
          className:
            "border-2 border-base-100 !bg-neutral !text-neutral-content",
        }}
      />
    </ThemeProvider>
  );
};

export default Layout;
