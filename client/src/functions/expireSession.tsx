import axios from "axios";
import Cookies from "js-cookie";

const expireSession = () => {
  localStorage.removeItem("token");
  Cookies.remove("token");
  axios.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/logout`);
  window.location.href = "/signin";
};

export default expireSession;
