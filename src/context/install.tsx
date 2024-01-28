import {
  createEffect,
  createSignal,
  type Accessor,
  type JSX,
  type Setter,
} from "solid-js";
import { useRegisterSW } from "virtual:pwa-register/solid";
import { createContext, useContext } from "./context-helpers";

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
 *
 * @note Only supported on Chrome and Android Webview.
 */
interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<UserChoice>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<UserChoice>;
}

type UserChoice = {
  outcome: "accepted" | "dismissed";
  platform: string;
};

export type ShowInstallContext = {
  show: Accessor<boolean>;
  action: () => Promise<UserChoice>;
  offlineReady: [Accessor<boolean>, Setter<boolean>];
  needRefresh: Accessor<boolean>;
  refresh: () => Promise<void>;
};

export const ShowInstallContext =
  createContext<ShowInstallContext>("ShowInstallContext");

export const useInstall = () => useContext(ShowInstallContext);

export const InstallProvider = (props: { children: JSX.Element }) => {
  const [prompt, setPrompt] = createSignal<BeforeInstallPromptEvent>();
  const [showInstall, setShowInstall] = createSignal(false);

  createEffect(() => {
    const beforeInstallListener = (event: Event) => {
      const e = event as BeforeInstallPromptEvent;
      // Prevents the default mini-info-bar or install dialog from appearing on mobile
      e.preventDefault();
      // Save the event because you'll need to trigger it later.
      setPrompt(e);
      // Show your customized install prompt for your PWA
      // Your own UI doesn't have to be a single element, you
      // can have buttons in different locations, or wait to prompt
      // as part of a critical journey.
      setShowInstall(true);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallListener);

    return () =>
      window.removeEventListener("beforeinstallprompt", beforeInstallListener);
  });

  const {
    needRefresh: [needRefresh],
    offlineReady,
    updateServiceWorker,
  } = useRegisterSW();

  const contextValue: ShowInstallContext = {
    show: showInstall,
    action: () => {
      const promptValue = prompt();
      if (promptValue) {
        return promptValue.prompt();
      } else {
        throw new Error("prompt is not supported");
      }
    },
    offlineReady,
    needRefresh,
    refresh: () => updateServiceWorker(),
  };

  return (
    <ShowInstallContext.Provider value={contextValue}>
      {props.children}
    </ShowInstallContext.Provider>
  );
};
