import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const divStyle = {
  backgroundImage: "url(/assets/wave-bg.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Login = () => {
  const navigate = useNavigate();
  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const [googleSignInLoading, setGoogleSignInLoading] =
    useState<boolean>(false);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const urlErr = new URLSearchParams(window.location.search).get("error");
    if (urlErr) {
      toast.error(urlErr);
    }
  });

  const handleLogin = (): void => {
    setSignInLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 401 || err.response.status === 400) {
          toast.error("Invalid Username or Password");
        } else {
          toast.error("Something went wrong");
        }
      })
      .finally(() => {
        setSignInLoading(false);
      });
  };

  const handleGoogleLogin = (): void => {
    setGoogleSignInLoading(true);
    window.open(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/google?auth_type=login`, "_self");
  };

  return (
    <div
      className="h-[100vh] flex flex-col items-center justify-center gap-3"
      style={divStyle}
    >
      <img srcSet="assets/img/logo.svg" width="55px" />
      <h2 className=" mt-5 mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Welcome, Please Login.
      </h2>

      <Input
        placeholder="Username"
        type="text"
        className="w-[250px]"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <Input
        placeholder="Password"
        type="password"
        className="w-[250px]"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      <Button
        className="mt-5 w-[250px]"
        variant="default"
        disabled={signInLoading || googleSignInLoading}
        onClick={handleLogin}
      >
        {signInLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <div>Login</div>
        )}
      </Button>

      <Button
        className="w-[250px]"
        variant="outline"
        onClick={handleGoogleLogin}
        disabled={signInLoading || googleSignInLoading}
      >
        {googleSignInLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <>
            <img
              srcSet="assets/img/google.webp"
              width="15px"
              className="mr-4"
            />
            Login with Google
          </>
        )}
      </Button>

      <a href="/forgot" className=" text-gray-400 mt-5">
        Forgot Password?
      </a>

      <a href="/signup" className="justify-self-end bottom-10 absolute">
        Create a new <span className="text-blue-500 underline">Account</span>
      </a>
    </div>
  );
};

export default Login;
