import { typeColors } from "./pokemon-types";

it("should get a pokemon color", () => {
  expect(typeColors).toContain("fire");
});
