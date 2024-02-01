import { env } from "./env";

const conditions: Array<{
  name: string;
  selector: (options: ReturnType<typeof env>) => boolean;
}> = [
  { name: "VITE_DEBUG_QUERY", selector: (options) => options.debugQuery },
  { name: "VITE_LOCAL_DEV", selector: (options) => options.local },
];

for (const condition of conditions) {
  it(`should handle ${condition.name}`, () => {
    vi.stubEnv(condition.name, "true");

    expect(condition.selector(env())).toEqual(true);

    const possibilities = ["not true", "false", "", "null"];
    for (const possible of possibilities) {
      vi.stubEnv(condition.name, possible);
      expect(condition.selector(env())).toEqual(false);
    }
  });
}
