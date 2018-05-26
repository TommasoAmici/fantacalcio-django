import { USER } from "../actions/types";

const INITIAL_STATE = {
  info: ""
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER:
      return { ...state, info: action.payload };
    default:
      return state;
  }
}
