import { LEAGUE_CREATED } from "../actions/types";

const INITIAL_STATE = {
  content: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LEAGUE_CREATED:
      return { ...state, content: action.payload };
    default:
      return state;
  }
}
