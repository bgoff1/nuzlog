import type { JSX } from "solid-js";

const Layout = (props: { children?: JSX.Element }) => {
  return (
    <>
      <main class="flex flex-col overflow-auto main-area">
        {props.children}
      </main>
    </>
  );
};

export default Layout;
