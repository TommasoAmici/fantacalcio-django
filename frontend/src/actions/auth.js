import axios from "axios";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, USER } from "./types";
import UIkit from "uikit";
import { StringsActions } from "../localization/Strings";

/*
 * Redux actions for user authentication 
*/

function errorHandler(error, type) {
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

function loginUser({ email, password }, history) {
  return function(dispatch) {
    axios
      .post("/login/", { email, password })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("pk", response.data.user.pk);
        dispatch({ type: AUTH_USER });
        history.push("/dashboard");
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

function registerUser({ username, email, password1, password2 }, history) {
  return function(dispatch) {
    axios
      .post("/register/", { username, email, password1, password2 })
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        dispatch({ type: AUTH_USER });
        history.push("/dashboard/welcome");
        UIkit.modal.alert(StringsActions.signup);
      })
      .catch(error => {
        errorHandler(error.response, AUTH_ERROR);
      });
  };
}

function logoutUser() {
  return function(dispatch) {
    const token = localStorage.getItem("token");
    axios
      .post("/logout/", { token })
      .then(response => {
        localStorage.clear();
        dispatch({ type: UNAUTH_USER });
      })
      .catch(error => {
        errorHandler(error.response, AUTH_ERROR);
      });
  };
}

function getUser() {
  return function(dispatch) {
    axios
      .get("/users/", {
        headers: { Authorization: "JWT " + localStorage.getItem("token") }
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

export { errorHandler, loginUser, registerUser, logoutUser, getUser };
