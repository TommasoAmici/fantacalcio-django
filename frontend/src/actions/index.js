import axios from "axios";
import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  USER,
  LEAGUE_CREATED
} from "./types";
import UIkit from "uikit";
import StringsActions from "../localization/Strings";

//const API_URL = '';
//const CLIENT_ROOT_URL = 'http://localhost:3000';

export function errorHandler(error, type) {
  let errorMessage = "";

  if (error.data.error) {
    errorMessage = error.data.error;
  } else if (error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }
  return function(dispatch) {
    if (error.status === 401) {
      dispatch({
        type: type,
        payload: StringsActions.error401
      });
      logoutUser();
    } else {
      dispatch({
        type: type,
        payload: errorMessage
      });
    }
  };
}

export function loginUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post("/login/", { email, password })
      .then(response => {
        localStorage.setItem("user", response.data.token);
        dispatch({ type: AUTH_USER });
        history.push("/dashboard");
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function registerUser(
  { username, email, password1, password2 },
  history
) {
  return function(dispatch) {
    axios
      .post("/register/", { username, email, password1, password2 })
      .then(response => {
        localStorage.setItem("user", response.data.token);
        dispatch({ type: AUTH_USER });
        history.push("/dashboard/welcome");
        UIkit.modal.alert(StringsActions.signup);
      })
      .catch(error => {
        errorHandler(error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser(history) {
  return function(dispatch) {
    const token = localStorage.getItem("user");
    axios
      .post("/logout/", { token })
      .then(response => {
        localStorage.clear();
        dispatch({ type: UNAUTH_USER });
        history.push("/");
        UIkit.modal.alert(StringsActions.logout);
      })
      .catch(error => {
        errorHandler(error.response, AUTH_ERROR);
      });
  };
}

export function getUser() {
  return function(dispatch) {
    axios
      .get("/users/", {
        headers: { Authorization: "JWT " + localStorage.getItem("user") }
      })
      .then(response => {
        dispatch({
          type: USER,
          payload: response.data[0]
        });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function newLeague({ name }, history) {
  return function(dispatch) {
    axios
      .post(
        "/leagues/",
        { name, teams: [] },
        {
          headers: { Authorization: "JWT " + localStorage.getItem("user") }
        }
      )
      .then(response => {
        dispatch({
          type: LEAGUE_CREATED,
          payload: response.data
        });
        history.push("/dashboard/league-created");
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function joinLeague({ name, access_code, history }, browserHistory) {
  return function(dispatch) {
    axios
      .post(
        "/teams/",
        { name, access_code, history },
        {
          headers: { Authorization: "JWT " + localStorage.getItem("user") }
        }
      )
      .then(response => {
        console.log(response);
        dispatch({
          type: LEAGUE_CREATED,
          payload: response.data
        });
        browserHistory.push("/dashboard/");
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}
