import type { useBuilderData } from "../../hooks/team-builder/builder";
import type { Defined, QueryHookType } from "../../types/hook-type";
import { MAX_TEAM_SIZE } from "../../util/constants";

type Member = Defined<QueryHookType<typeof useBuilderData>>[number];

export type TeamContextAction =
  | {
      type: "addMember";
      payload: Member;
    }
  | {
      type: "removeMember";
      payload: Member;
    };

export type TeamContextState = {
  members: Member[];
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
    default:
      return state;
  }
};
