import axios from "axios";
import { GET_ERRORS } from "./types";

// Campaigns - get campaigns of a team
export const getTeams = userData => dispatch => {
  axios
    .post("/api/users/getTeams", userData)
    .then(res => {
      return {
        sucess: true
      };
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
