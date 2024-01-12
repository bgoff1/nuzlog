import catppuccin from "@catppuccin/tailwindcss";
import { Config } from "tailwindcss/types/config";

const theme: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {},
    extend: {},
  },
  plugins: [catppuccin({ defaultFlavour: "mocha" })],
};

export default theme;
