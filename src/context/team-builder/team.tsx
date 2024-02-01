import type { Accessor } from "solid-js";
import { type Component } from "solid-js";
import { createStore } from "solid-js/store";
import type { WithChildren } from "../../types/with-children";
import { createContext, useContext } from "../context-helpers";
import {
  reducer,
  type TeamContextAction,
  type TeamContextState,
} from "./team-reducer";

type TeamContextType = {
  [Key in keyof TeamContextState]: Accessor<TeamContextState[Key]>;
} & {
  dispatcher: (action: TeamContextAction) => void;
};

const TeamContext = createContext<TeamContextType>("TeamContext");

export const TeamProvider: Component<WithChildren> = (props) => {
  const [state, setState] = createStore<TeamContextState>({
    members: [],
    filters: [],
  });

  const dispatcher = (action: TeamContextAction) =>
    setState((currentState) => reducer(currentState, action));

  const contextValue: TeamContextType = {
    members: () => state.members,
    filters: () => state.filters,
    dispatcher,
  };

  return (
    <TeamContext.Provider value={contextValue}>
      {props.children}
    </TeamContext.Provider>
  );
};

export const useTeam = () => useContext(TeamContext);
