import { render, waitFor } from "@solidjs/testing-library";
import { DatabaseProvider } from "./database";

vi.mock("../database/load", () => ({
  loadDB: vi.fn().mockImplementation(() => {
    return new Promise((res) => setTimeout(res, 200));
  }),
}));

describe("Database Provider", () => {
  it("should render", () => {
    const { queryByText } = render(() => (
      <DatabaseProvider children="children" />
    ));

    expect(queryByText("loading...")).toBeInTheDocument();
    expect(queryByText("children")).not.toBeInTheDocument();

    return waitFor(() => expect(queryByText("children")).toBeInTheDocument());
  });
});
