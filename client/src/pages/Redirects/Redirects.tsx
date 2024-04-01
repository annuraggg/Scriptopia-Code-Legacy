import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectScreening = () => {
  useEffect(() => {
    const screenCode = window.location.pathname.split("/").pop();
    axios
      .get(`${import.meta.env.VITE_BACKEND_ADDRESS}/redirects/${screenCode}`)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.error(err);
        toast.error("No such screening found");
      });
  }, []);

  return <div className="h-[100vh] flex items-center justify-center">Redirecting...</div>;
};

export default RedirectScreening;
