import type { useBuilderData } from "../../hooks/team-builder/builder";
import type { Defined, QueryHookType } from "../../types/hook-type";
import type { ListItem } from "../../types/list-item";
import { MAX_TEAM_SIZE } from "../../util/constants";

type Member = Defined<QueryHookType<typeof useBuilderData>>[number];
export type Filter = {
  type: "generation" | "type" | "fullyEvolved";
} & ListItem<number>;

export type TeamContextAction =
  | {
      type: "addMember";
      payload: Member;
    }
  | {
      type: "removeMember";
      payload: Member;
    }
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

export type TeamContextState = {
  members: Member[];
  filters: Filter[];
};

export const reducer = (
  state: TeamContextState,
  action: TeamContextAction,
): TeamContextState => {
  switch (action.type) {
    case "addMember": {
      if (state.members.length === MAX_TEAM_SIZE) {
        return state;
      }
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    }
    case "removeMember": {
      return {
        ...state,
        members: state.members.filter(
          (member) => member.id !== action.payload.id,
        ),
      };
    }
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
