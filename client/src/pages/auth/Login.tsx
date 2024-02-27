import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";

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

  const continueGoogle = (creds: GoogleCredentialResponse) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/google`, {
        creds,
        auth_type: "signin",
      })
      .then((res) => {
        // SET COOKIE
        const token = res.data.token;
        document.cookie = `token=${token}; secure; samesite=none;`;
        window.location.href = "/";
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Account does not exist. Please sign up.")
          return;
        }
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {});
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

      <div>
        <GoogleLogin
          onSuccess={continueGoogle}
          onError={() => toast.error("Something went wrong")}
          type="standard"
          theme="filled_black"
          useOneTap={true}
          text="continue_with"
          shape="pill"
          logo_alignment="left"
          context="signup"
          itp_support={true}
        />
      </div>

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
