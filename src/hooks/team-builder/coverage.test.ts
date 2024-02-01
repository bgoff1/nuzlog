import { renderHook, waitFor } from "@solidjs/testing-library";
import { useEffectiveness } from "./coverage";

const query = vi.hoisted(() => vi.fn());
vi.mock("../../database/query", () => ({
  query,
}));

describe("Coverage", () => {
  it("should load effectiveness", async () => {
    query.mockResolvedValue([
      {
        damage_factor: 100,
        damage_type: "fire",
        target_type: "normal",
      },
      {
        damage_factor: 200,
        damage_type: "water",
        target_type: "fire",
      },
    ]);

    const { result } = renderHook(useEffectiveness);

    await waitFor(() => expect(result().size).not.toEqual(0));

    expect(result().get("fire vs normal")).toEqual(1);
    expect(result().get("water vs fire")).toEqual(2);
  });
});
