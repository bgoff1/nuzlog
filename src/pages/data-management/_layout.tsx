import { type JSX } from "solid-js";

const DataManagementLayout = (props: { children: JSX.Element }) => {
  return (
    <>
      <main>{props.children}</main>
    </>
  );
};

export default DataManagementLayout;
