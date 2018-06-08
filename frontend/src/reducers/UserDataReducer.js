import {
  USER,
  UNAUTH_USER,
  LEAGUE_SELECTED,
  LEAGUE_CREATED,
  LEAGUE_UPDATED
} from "../actions/types";

const INITIAL_STATE = {
  info: "",
  league: { selected: false }
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER:
      return { ...state, info: action.payload };
    case LEAGUE_SELECTED:
      return {
        ...state,
        league: action.payload
      };
    case LEAGUE_CREATED:
      return { ...state, league: action.payload };
    case LEAGUE_UPDATED:
      return { ...state, league: action.payload };
    case UNAUTH_USER:
      return {
        ...state,
        league: {}
      };
    default:
      return { ...state };
  }
}
