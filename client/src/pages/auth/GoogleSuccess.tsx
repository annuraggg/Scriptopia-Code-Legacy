import PageLoading from "@/components/PageLoading";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleSuccess = () => {
  const navigator = useNavigate();
  useEffect(() => {
    const cookieToken = document.cookie;
    const token = cookieToken.split("=")[1];
    if (token) {
      localStorage.setItem("token", token);
      navigator("/");
    } else {
      navigator("/signin");
    }
  }, []);

  return <PageLoading />;
};

export default GoogleSuccess;
