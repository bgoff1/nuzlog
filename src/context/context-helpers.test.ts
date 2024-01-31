import type { Context } from "./context-helpers";
import { createContext, useContext } from "./context-helpers";

const { createSolidContext, useSolidContext } = vi.hoisted(() => ({
  createSolidContext: vi.fn().mockReturnValue({}),
  useSolidContext: vi.fn(),
}));

vi.mock("solid-js", () => ({
  createContext: createSolidContext,
  useContext: useSolidContext,
}));

describe("Context Helpers", () => {
  it("should create context", () => {
    const context = createContext("my context");
    expect(context).toEqual({ name: "my context" });
  });

  it("should use context", () => {
    useSolidContext.mockReturnValue({});
    const value = useContext({} as Context<unknown>);
    expect(value).toEqual({});
  });

  it("should throw on missing context", () => {
    useSolidContext.mockReturnValue(null);
    expect(() =>
      useContext({
        name: "CustomContext",
      } as Context<unknown>),
    ).toThrowError(new Error(`CustomContext not provided`));
  });
});
