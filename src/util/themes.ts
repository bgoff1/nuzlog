import type { FlavorName } from "@catppuccin/palette";

export const defaultTheme: FlavorName = "mocha";
export const themes: FlavorName[] = ["mocha", "macchiato", "frappe", "latte"];
export type Theme = FlavorName;

export const isTheme = (possibleTheme: string): possibleTheme is Theme => {
  return themes.some((theme) => possibleTheme === theme);
};
