import { configure } from "@solidjs/testing-library";
import "@testing-library/jest-dom/vitest";

configure({
  testIdAttribute: "data-test-id",
});
