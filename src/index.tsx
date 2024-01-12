/* @refresh reload */
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";
import { routes } from "./route-tree.gen";

import "./styles/main.css";

const root = document.getElementById("root");

render(() => <Router>{routes}</Router>, root!);
