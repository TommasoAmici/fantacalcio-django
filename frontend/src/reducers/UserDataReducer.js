import { USER, LEAGUE_SELECTED, UNAUTH_USER } from "../actions/types";

const INITIAL_STATE = {
  info: "",
  league: []
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER:
      return { ...state, info: action.payload };
    case LEAGUE_SELECTED:
      return {
        ...state,
        league: {
          accessCode: action.payload
        }
      };
    default:
      return state;
  }
}
