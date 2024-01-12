import { JSX } from "solid-js/h/jsx-runtime";

const Layout = (props: { children?: JSX.Element }) => {
  return (
    <>
      <div> this is my layout</div>
      {props.children}
    </>
  );
};

export default Layout;
