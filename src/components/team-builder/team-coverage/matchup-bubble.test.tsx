import { render } from "@solidjs/testing-library";
import { MatchupBubble } from "./matchup-bubble";

it("should render a matchup bubble", () => {
  const { container } = render(() => (
    <MatchupBubble class="px-2">content</MatchupBubble>
  ));

  expect(container.innerHTML).toEqual(
    `<span class="px-2 flex items-center justify-center rounded bg-base-300">content</span>`,
  );
});
