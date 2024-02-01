import { fireEvent, render, waitFor } from "@solidjs/testing-library";
import type { BeforeInstallPromptEvent } from "./install";
import { InstallProvider, useInstall } from "./install";

const useSW = vi.hoisted(() => vi.fn());

vi.mock("virtual:pwa-register/solid", () => ({
  useRegisterSW: useSW,
}));

const toast = vi.hoisted(() => vi.fn());
vi.mock("solid-toast", () => ({
  default: { success: toast },
}));

const actionResultHandler = vi.fn();

const MyComponent = () => {
  const context = useInstall();

  return (
    <button onClick={() => context.action().then(actionResultHandler)}>
      my button
    </button>
  );
};

describe("Install Provider", () => {
  beforeEach(() => actionResultHandler.mockClear());

  it("should render", async () => {
    const { getByRole } = render(() => (
      <InstallProvider>
        <MyComponent />
      </InstallProvider>
    ));

    const myEvent = new Event(
      "beforeinstallprompt",
    ) as BeforeInstallPromptEvent;
    myEvent.prompt = vi.fn().mockResolvedValue({
      outcome: "accepted",
      platform: "",
    });

    fireEvent(window, myEvent);

    fireEvent.click(getByRole("button"));

    await waitFor(() => expect(myEvent.prompt).toHaveBeenCalled());

    await waitFor(() => expect(actionResultHandler).toHaveBeenCalledOnce());
    expect(actionResultHandler).toHaveBeenCalledWith({
      outcome: "accepted",
      platform: "",
    });
  });

  it("should throw an error if prompt is not supported", async () => {
    const { getByRole } = render(() => (
      <InstallProvider>
        <MyComponent />
      </InstallProvider>
    ));

    const myEvent = new Event("beforeinstallprompt");
    fireEvent(window, myEvent);

    fireEvent.click(getByRole("button"));

    await waitFor(() => expect(actionResultHandler).toHaveBeenCalledOnce());
    expect(actionResultHandler).toHaveBeenCalledWith({
      outcome: "dismissed",
      platform: "",
    });
  });

  it("should show a toast on offline ready", async () => {
    useSW.mockImplementation(({ onOfflineReady }) => onOfflineReady());

    render(() => <InstallProvider>something</InstallProvider>);

    return waitFor(() =>
      expect(toast).toHaveBeenCalledWith("App is available offline!"),
    );
  });
});
