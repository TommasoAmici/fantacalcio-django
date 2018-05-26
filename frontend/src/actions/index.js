import axios from "axios";
import history from "../history";
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, USER } from "./types";
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

export function loginUser({ email, password }) {
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

export function registerUser({ username, email, password1, password2 }) {
  return function(dispatch) {
    axios
      .post("/register/", { username, email, password1, password2 })
      .then(response => {
        localStorage.setItem("user", response.data.token);
        dispatch({ type: AUTH_USER });
        history.push("/dashboard");
        UIkit.modal.alert(StringsActions.signup);
      })
      .catch(error => {
        errorHandler(error.response, AUTH_ERROR);
      });
  };
}

export function logoutUser() {
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
          payload: response.data.results[0]
        });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export function newLeague() {
  return function(dispatch) {
    axios
      .get("/leagues/", {
        headers: { Authorization: "JWT " + localStorage.getItem("user") }
      })
      .then(response => {
        dispatch({
          type: USER,
          payload: response.data.content
        });
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}
