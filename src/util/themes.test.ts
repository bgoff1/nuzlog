import { isTheme } from "./themes";

it("should check if it is a theme", () => {
  expect(isTheme("not a theme")).toBe(false);
  expect(isTheme("mocha")).toBe(true);
  expect(isTheme("latte")).toBe(true);
  expect(isTheme("macchiato")).toBe(true);
  expect(isTheme("frappe")).toBe(true);
});
