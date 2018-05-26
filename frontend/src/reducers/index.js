import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./AuthReducer";
import userDataReducer from "./UserDataReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  user: userDataReducer
});

export default rootReducer;
