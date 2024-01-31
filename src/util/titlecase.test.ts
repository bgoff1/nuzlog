import { kebabToTitle, titleCase } from "./titlecase";

it("should title case one word", () => {
  expect(titleCase("word")).toEqual("Word");
});

it("should title case multiple words", () => {
  expect(titleCase("many words in one go")).toEqual("Many Words In One Go");
});

it("should convert kebab case to title case", () => {
  expect(kebabToTitle("some-kebab-case-words")).toEqual(
    "Some Kebab Case Words",
  );
});
