import { SIGN_IN, SIGN_OUT } from "../action/types";

const INTIAL_STATE = {
  userId: null,
  username: null,
  role: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      const { userInfo } = action.payload;
      return {
        userId: userInfo.user_id,
        username: userInfo.username,
        role: userInfo.role,
      };
    case SIGN_OUT:
      return {
        userId: null,
        username: null,
        role: null,
      };
    default:
      return state;
  }
};

export default authReducer;
