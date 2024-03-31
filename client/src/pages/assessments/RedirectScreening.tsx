import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";

const RedirectScreening = () => {
  useEffect(() => {
    console.log("RedirectScreening");
    const screenCode = window.location.pathname.split("/").pop();
    axios
      .get(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/redirect/${screenCode}`)
      .then((res) => {
        window.location.href = res.data.url;
      })
      .catch((err) => {
        console.error(err);
        toast.error("No such screening found");
      });
  }, []);

  return <div>RedirectScreening</div>;
};

export default RedirectScreening;
