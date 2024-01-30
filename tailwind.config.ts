import { flavors } from "@catppuccin/palette";
import type { Config as DaisyUIConfig } from "daisyui";
import daisyui from "daisyui";
import tailwindPlugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss/types/config";

export const typeColors = {
  normal: {
    DEFAULT: "#a8a77a",
    alt: "#8f8e68",
    contrast: "#000000",
  },
  fire: {
    DEFAULT: "#ee8130",
    alt: "#d4742a",
    contrast: "#000000",
  },
  water: {
    DEFAULT: "#6390f0",
    alt: "#5880d6",
    contrast: "#000000",
  },
  electric: {
    DEFAULT: "#f7d02c",
    alt: "#deb928",
    contrast: "#000000",
  },
  grass: {
    DEFAULT: "#7ac74c",
    alt: "#69ad42",
    contrast: "#000000",
  },
  ice: {
    DEFAULT: "#96d9d6",
    alt: "#84bfbc",
    contrast: "#000000",
  },
  fighting: {
    DEFAULT: "#c22e28",
    alt: "#a82823",
    contrast: "#ffffff",
  },
  poison: {
    DEFAULT: "#a33ea1",
    alt: "#8a3488",
    contrast: "#ffffff",
  },
  ground: {
    DEFAULT: "#e2bf65",
    alt: "#c9aa5b",
    contrast: "#000000",
  },
  flying: {
    DEFAULT: "#a98ff3",
    alt: "#9880d9",
    contrast: "#000000",
  },
  psychic: {
    DEFAULT: "#f95587",
    alt: "#c7446b",
    contrast: "#000000",
  },
  bug: {
    DEFAULT: "#a6b91a",
    alt: "#91a116",
    contrast: "#000000",
  },
  rock: {
    DEFAULT: "#b6a136",
    alt: "#9c892f",
    contrast: "#000000",
  },
  ghost: {
    DEFAULT: "#735797",
    alt: "#5f487d",
    contrast: "#ffffff",
  },
  dragon: {
    DEFAULT: "#6f35fc",
    alt: "#6230e3",
    contrast: "#ffffff",
  },
  dark: {
    DEFAULT: "#705746",
    alt: "#574337",
    contrast: "#ffffff",
  },
  steel: {
    DEFAULT: "#b7b7ce",
    alt: "#a1a1b5",
    contrast: "#000000",
  },
  fairy: {
    DEFAULT: "#d685ad",
    alt: "#bd7599",
    contrast: "#000000",
  },
} as const;

const theme: Config & { daisyui: DaisyUIConfig } = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: typeColors,
    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "auto-1fr-auto": "auto 1fr auto",
      },
      gridTemplateRows: {
        "auto-1fr-auto": "auto 1fr auto",
      },
      animation: {
        spinning: "spin 3s linear infinite",
      },
    },
    screens: {
      "max-0": [{ max: "0px" }],
      "max-xs": [{ max: "400px" }],
      "max-sm": [{ max: "640px" }],
      "max-md": [{ max: "768px" }],
      "max-lg": [{ max: "1024px" }],
      "max-xl": [{ max: "1280px" }],
      0: [{ min: "0px" }],
      xs: [{ min: "400px" }],
      sm: [{ min: "640px" }],
      md: [{ min: "768px" }],
      lg: [{ min: "1024px" }],
      xl: [{ min: "1280px" }],
    },
  },
  plugins: [
    daisyui,
    tailwindPlugin((plugin) => {
      plugin.addUtilities({
        ".grid-layout-main": {
          gridTemplateAreas: "'header header' 'sidebar main' 'sidebar footer'",
        },
        ...["header", "sidebar", "footer"].reduce((prev, curr) => {
          return {
            ...prev,
            [`.${curr}-area`]: {
              gridArea: curr,
            },
          };
        }, {}),
        main: {
          gridArea: "main",
        },
        ".main-padding": {
          padding: "0.75rem",
        },
        ".progress[value]": {
          transition: "width 0.5s",
        },
      });
    }),
  ],
  daisyui: {
    logs: false,
    darkTheme: "mocha",
    themes: [
      {
        mocha: {
          primary: flavors.mocha.colors.mauve.hex,
          secondary: flavors.mocha.colors.lavender.hex,
          accent: flavors.mocha.colors.pink.hex,
          neutral: flavors.mocha.colors.surface0.hex,
          "base-100": flavors.mocha.colors.base.hex,
          info: flavors.mocha.colors.blue.hex,
          success: flavors.mocha.colors.green.hex,
          warning: flavors.mocha.colors.peach.hex,
          error: flavors.mocha.colors.red.hex,
        },
      },
      {
        macchiato: {
          primary: flavors.macchiato.colors.mauve.hex,
          secondary: flavors.macchiato.colors.lavender.hex,
          accent: flavors.macchiato.colors.pink.hex,
          neutral: flavors.macchiato.colors.surface0.hex,
          "base-100": flavors.macchiato.colors.base.hex,
          info: flavors.macchiato.colors.blue.hex,
          success: flavors.macchiato.colors.green.hex,
          warning: flavors.macchiato.colors.peach.hex,
          error: flavors.macchiato.colors.red.hex,
        },
      },
      {
        frappe: {
          primary: flavors.frappe.colors.mauve.hex,
          secondary: flavors.frappe.colors.lavender.hex,
          accent: flavors.frappe.colors.pink.hex,
          neutral: flavors.frappe.colors.surface0.hex,
          "base-100": flavors.frappe.colors.base.hex,
          info: flavors.frappe.colors.blue.hex,
          success: flavors.frappe.colors.green.hex,
          warning: flavors.frappe.colors.peach.hex,
          error: flavors.frappe.colors.red.hex,
        },
      },
      {
        latte: {
          primary: flavors.latte.colors.lavender.hex,
          secondary: flavors.latte.colors.mauve.hex,
          accent: flavors.latte.colors.pink.hex,
          neutral: flavors.latte.colors.surface0.hex,
          "base-100": flavors.latte.colors.base.hex,
          "base-200": flavors.latte.colors.crust.hex,
          "base-300": flavors.latte.colors.mantle.hex,
          info: flavors.latte.colors.blue.hex,
          success: flavors.latte.colors.green.hex,
          warning: flavors.latte.colors.peach.hex,
          error: flavors.latte.colors.red.hex,
        },
      },
    ],
  },
};

export default theme;
