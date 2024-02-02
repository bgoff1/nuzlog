import type { Accessor } from "solid-js";
import { type Component } from "solid-js";
import { createStore } from "solid-js/store";
import type { WithChildren } from "../../types/with-children";
import { createContext, useContext } from "../context-helpers";
import type { FilterContextAction, FilterContextState } from "./filter-reducer";
import { reducer } from "./filter-reducer";

type TeamContextType = {
  [Key in keyof FilterContextState]: Accessor<FilterContextState[Key]>;
} & {
  dispatcher: (action: FilterContextAction) => void;
};

const FilterContext = createContext<TeamContextType>("FilterContext");

export const FilterProvider: Component<WithChildren> = (props) => {
  const [state, setState] = createStore<FilterContextState>({
    filters: [],
  });

  const dispatcher = (action: FilterContextAction) =>
    setState((currentState) => reducer(currentState, action));

  const contextValue: TeamContextType = {
    filters: () => state.filters,
    dispatcher,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {props.children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);
