import type { ListItem } from "../../types/list-item";

export type FilterType =
  | "generation"
  | "type"
  | "region"
  | "version"
  | "fullyEvolved";
export type Filter = {
  type: FilterType;
} & ListItem<number>;

export type FilterContextAction =
  | {
      type: "toggleFilter";
      payload: Filter;
    }
  | {
      type: "clearFilters";
    }
  | {
      type: "toggleFullyEvolved";
    };

export type FilterContextState = {
  filters: Filter[];
};

export const reducer = (
  state: FilterContextState,
  action: FilterContextAction,
): FilterContextState => {
  switch (action.type) {
    case "toggleFilter": {
      const currentFilters = state.filters.filter(
        (filter) => filter.type === action.payload.type,
      );
      const isAddingFilter = !currentFilters.find(
        (filter) => filter.value === action.payload.value,
      );
      return {
        ...state,
        filters: isAddingFilter
          ? [...state.filters, action.payload]
          : [
              ...state.filters.filter(
                (filter) => filter.type !== action.payload.type,
              ),
              ...currentFilters.filter(
                (filter) => filter.value !== action.payload.value,
              ),
            ],
      };
    }
    case "toggleFullyEvolved": {
      const hasFullyEvolved = state.filters.find(
        (filter) => filter.type === "fullyEvolved",
      );
      return {
        ...state,
        filters: hasFullyEvolved
          ? state.filters.filter((f) => f.type !== "fullyEvolved")
          : [
              ...state.filters,
              {
                type: "fullyEvolved",
                label: "",
                value: -1,
              },
            ],
      };
    }
    case "clearFilters": {
      return {
        ...state,
        filters: [],
      };
    }
    default:
      return state;
  }
};
