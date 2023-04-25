import jwtDecode from "jwt-decode";
import { SIGN_IN } from "./types";

export const signInAction = (data) => (dispatch, getState) => {
  try {
    const userInfo = jwtDecode(data.access_token);
    dispatch({
      type: SIGN_IN,
      payload: {
        userInfo,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
      },
    });
  } catch (error) {
    console.error("signInAction", error);
  }
};

export const initUserAction = () => (dispatch, getState) => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const refreshToken = localStorage.getItem("refreshToken");
      const userInfo = jwtDecode(accessToken);
      dispatch({
        type: SIGN_IN,
        payload: {
          userInfo,
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
      });
    }
  } catch (error) {
    console.error("initUserAction", error);
  }
};
