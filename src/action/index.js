import jwtDecode from "jwt-decode";
import { SIGN_IN } from "./types";

export const signInAction = (data) => (dispatch, getState) => {
  try {
    const userInfo = jwtDecode(data.access_token)
    dispatch({
      type: SIGN_IN,
      payload: {
        userInfo,
      },
    });
  } catch (error) {
    console.error("signInAction", error);
  }
};
