import { SIGN_IN, SIGN_OUT, FETCH_USER_INFO } from "../action/types";

const INTIAL_STATE = {
  userId: null,
  username: null,
  role: null,
  accessToken: null,
  refreshToken: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_INFO:
      const userInfoState = JSON.parse(localStorage.getItem("userInfo"))
      const accessTokenState = localStorage.getItem("accessToken");
      const refreshTokenState = localStorage.getItem("refreshToken");
      return {
        userId: userInfoState.user_id,
        username: userInfoState.username,
        role: userInfoState.role,
        accessToken: accessTokenState,
        refreshToken: refreshTokenState,
      };
    case SIGN_IN:
      const { userInfo, accessToken, refreshToken } = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      return {
        userId: userInfo.user_id,
        username: userInfo.username,
        role: userInfo.role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    case SIGN_OUT:
      localStorage.removeItem('userInfo')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      return {
        userId: null,
        username: null,
        role: null,
        accessToken: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default authReducer;
