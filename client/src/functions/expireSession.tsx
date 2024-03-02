import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

const expireSession = () => {
  try {
    localStorage.removeItem("token");
    Cookies.remove("token");
    axios.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/logout`);
    window.location.href = "/signin";
  } catch (error) {
    toast.error("Error expiring session");
    console.log(error);
  }
};

export default expireSession;
