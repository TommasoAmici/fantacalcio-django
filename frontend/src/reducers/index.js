import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import userDataReducer from "./UserDataReducer";
import leagueReducer from "./LeagueReducer";
import { routerReducer } from "react-router-redux";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userDataReducer,
  router: routerReducer,
  league: leagueReducer
});

export default rootReducer;
