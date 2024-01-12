import { flavors } from "@catppuccin/palette";
import type { Config as DaisyUIConfig } from "daisyui";
import daisyui from "daisyui";
import tailwindPlugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss/types/config";

const theme: Config & { daisyui: DaisyUIConfig } = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    colors: {},
    extend: {
      gridTemplateColumns: {
        "auto-1fr": "auto 1fr",
        "auto-1fr-auto": "auto 1fr auto",
      },
      gridTemplateRows: {
        "auto-1fr-auto": "auto 1fr auto",
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
        ...["header", "sidebar", "main", "footer"].reduce((prev, curr) => {
          return {
            ...prev,
            [`.${curr}-area`]: {
              gridArea: curr,
            },
          };
        }, {}),
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
          primary: flavors.latte.colors.mauve.hex,
          secondary: flavors.latte.colors.lavender.hex,
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
