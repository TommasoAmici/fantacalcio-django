import { TEAM, AUTH_ERROR } from "./types";
import { errorHandler } from "./index";
import axios from "axios";

function newTeam({ name, logo, history }, browserHistory) {
  return function(dispatch) {
    const username = localStorage.getItem("username");
    const access_code = localStorage.getItem("league");
    axios
      .post(
        "/teams/",
        { name, logo, history, username, access_code },
        {
          headers: { Authorization: "JWT " + localStorage.getItem("token") }
        }
      )
      .then(response => {
        console.log(response);
        dispatch({
          type: TEAM,
          payload: {
            data: response.data
          }
        });
        browserHistory.push("/dashboard/");
      })
      .catch(error => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

export { newTeam };
