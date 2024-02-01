import { getBackgroundColor, getBorderColor, getTextColor } from "./colors";

it("should get border color for one type", () => {
  expect(getBorderColor(["bug"])).toEqual("border-bug-alt");
});

it("should get border color for two types", () => {
  expect(getBorderColor(["bug", "dark"])).toEqual("border-dark");
});

it("should get background color for one type", () => {
  expect(getBackgroundColor(["bug"])).toEqual("bg-bug");
  expect(getBackgroundColor("bug")).toEqual("bg-bug");
});

it("should get background color for two types", () => {
  expect(getBackgroundColor(["bug", "dark"])).toEqual("bg-bug");
});

it("should get text color", () => {
  expect(getTextColor("bug")).toEqual("text-bug-contrast");
});
