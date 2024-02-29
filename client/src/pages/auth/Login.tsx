import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";

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
  const [code, setCode] = useState<string>("");

  const [id, setId] = useState<string>("");
  const [isTfa, setIsTfa] = useState<boolean>(false);
  const [googleCreds, setGoogleCreds] = useState<GoogleCredentialResponse>();
  const [loginType, setLoginType] = useState<"local" | "google">("local");
  const [tfaToken, setTfaToken] = useState<string>("");

  useEffect(() => {
    const urlErr = new URLSearchParams(window.location.search).get("error");
    if (urlErr) {
      toast.error(urlErr);
    }
  });

  const handleLogin = (): void => {
    setSignInLoading(true);
    setLoginType("local");
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/login`, {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.tfa) {
          setIsTfa(true);
          setId(res.data.id);
          setTfaToken(res.data.token);
          return;
        }

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
    setGoogleCreds(creds);
    setLoginType("google");
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/google`, {
        creds,
        auth_type: "signin",
      })
      .then((res) => {
        // SET COOKIE
        if (res.data.tfa) {
          setIsTfa(true);
          setId(res.data.id);
          setTfaToken(res.data.token);
          return;
        }

        const token = res.data.token;
        document.cookie = `token=${token}; secure; samesite=none; path=/;`;
        window.location.href = "/";
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast.error("Account does not exist. Please sign up.");
          return;
        }
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {});
  };

  const verifyCode = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/tfa/verify`, {
        code,
        id: id,
        token: tfaToken,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token)
        Cookies.set("token", res.data.token, { secure: true, sameSite: "none" });
        window.location.href = "/";
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("Invalid Code");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  return (
    <div
      className="h-[100vh] flex flex-col items-center justify-center gap-3"
      style={divStyle}
    >
      <img srcSet="assets/img/logo.svg" width="100px" />
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

      <Dialog open={isTfa}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Enter the 2FA code generated by your app or use a backup code
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center justify-center">
              <Input
                placeholder="2FA Code"
                type="text"
                className="w-[250px] mt-5"
                onChange={(e) => setCode(e.target.value)}
                value={code}
              />
              <Button
                variant="default"
                className="mt-5 w-[250px]"
                onClick={verifyCode}
              >
                Continue
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Login;
