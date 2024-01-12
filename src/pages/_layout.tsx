import { JSX } from "solid-js/h/jsx-runtime";

const Layout = (props: { children?: JSX.Element }) => {
  return (
    <>
      {props.children}
    </>
  );
};

export default Layout;
