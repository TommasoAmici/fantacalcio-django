import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import userDataReducer from "./UserDataReducer";
import leagueReducer from "./LeagueReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userDataReducer,
  league: leagueReducer
});

export default rootReducer;
