import { SIGN_IN, SIGN_OUT } from "../action/types";

const INTIAL_STATE = {
  userId: null,
  username: null,
  role: null,
  accessToken: null,
  refreshToken: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userInfo,accessToken,refreshToken } = action.payload;
      return {
        userId: userInfo.user_id,
        username: userInfo.username,
        role: userInfo.role,
        accessToken: accessToken,
        refreshToken: refreshToken
      };
    case SIGN_OUT:
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
