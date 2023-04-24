import axios from "axios";
import { backendUrl } from "../config";

export const Login = async (email, password) => {
  const configAxios = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const { data } = await axios.post(
    `${backendUrl}/auth/signin`,
    { email, password },
    configAxios
  );
  return data;
};
