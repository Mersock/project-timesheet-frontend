import { SIGN_IN, SIGN_OUT } from "../action/types";

const INTIAL_STATE = {
  userId: null,
  username: null,
  role: null,
};

const authReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return { ...state };
    case SIGN_OUT:
      return { ...state };
    default:
      return state;
  }
};

export default authReducer;
