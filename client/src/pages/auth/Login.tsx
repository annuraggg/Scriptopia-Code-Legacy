import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Cookies from "js-cookie";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useHotkeys } from "react-hotkeys-hook";
import { z } from "zod";
import Logo from "@/components/LogoIcon";
import { useSelector } from "react-redux";
import { useTheme } from "@/components/theme-provider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  useHotkeys("enter", () => {
    handleLogin();
  });

  const [signInLoading, setSignInLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [code, setCode] = useState<string>("");

  const [id, setId] = useState<string>("");
  const [isTfa, setIsTfa] = useState<boolean>(false);
  const [tfaToken, setTfaToken] = useState<string>("");

  useEffect(() => {
    const urlErr = new URLSearchParams(window.location.search).get("error");
    if (urlErr) {
      toast.error(urlErr);
    }
  });

  const handleLogin = (): void => {
    setSignInLoading(true);

    const schema = z.object({
      username: z.string(),
      password: z.string(),
    });

    try {
      schema.parse({ username, password });
    } catch (err) {
      console.log(err);
      toast.error("Please fill in all the fields");
      setSignInLoading(false);
      return;
    }

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
        localStorage.setItem("image", res.data.image);

        Cookies.set("token", res.data.token, {
          secure: true,
          sameSite: "none",
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        if (
          err.response.status === 401 ||
          err.response.status === 400 ||
          err.response.status === 404
        ) {
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
        if (res.data.tfa) {
          setIsTfa(true);
          setId(res.data.id);
          setTfaToken(res.data.token);
          localStorage.setItem("image", res.data.image);
          return;
        }

        const token = res.data.token;
        document.cookie = `token=${token}; secure; samesite=none; path=/;`;
        window.location.href = "/";
        localStorage.setItem("token", token);
      })
      .catch((err) => {
        console.log(err);
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
    const schema = z.object({
      code: z.string(),
    });

    try {
      schema.parse({ code });
    } catch (err) {
      console.log(err);
      toast.error("Please fill in all the fields");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/tfa/verify`, {
        code,
        id: id,
        token: tfaToken,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("image", res.data.image);
        Cookies.set("token", res.data.token, {
          secure: true,
          sameSite: "none",
        });
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 400) {
          toast.error("Invalid Code");
        } else {
          toast.error("Something went wrong");
        }
      });
  };

  const setChange = () => {
    setIsTfa(!isTfa);
  };

  const listenEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const color = useSelector(
    (state: {
      theme: { colorPalette: string; color: string; theme: string };
    }) => state.theme
  );

  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    } else {
      setTheme("dark");
      return;
    }
  };

  const [show, setShow] = useState<boolean>(false);
  const toggleShow = () => {
    setShow(!show);
  };

  return (
    <div>
      <div className="h-[100vh] flex flex-col items-center justify-center gap-3">
        <div
          className="border p-5 flex items-center justify-center rounded-full cursor-pointer"
          onClick={changeTheme}
          style={{
            boxShadow: `0 0 140px 0 ${color.color}`,
          }}
        >
          <Logo height={30} width={30} />
        </div>

        <div className="text-center">
          <h2 className=" font-semibold">Welcome back</h2>
          <p className="text-sm mt-1 text-gray-400">
            Please enter your details to sign in.
          </p>
        </div>

        <div>
          <div
            className="w-full flex items-center justify-center py-2"
            id="btn"
          >
            <GoogleLogin
              onSuccess={continueGoogle}
              onError={() => toast.error("Something went wrong")}
              type="standard"
              theme={color.theme === "dark" ? "filled_black" : "outline"}
              useOneTap={true}
              text="continue_with"
              shape="circle"
              logo_alignment="left"
              context="signin"
              itp_support={true}
            />
          </div>
          <Button className="mt-2 w-[300px] py-5 hidden" variant="outline">
            Sign in with
            <img
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-icon-png-transparent-background-osteopathy-16.png"
              alt="Sign in With Google"
              className="ml-2 w-5 h-5"
            />
          </Button>
        </div>

        <div className="flex gap-5 items-center my-2">
          <div className="w-[120px] h-0 border"></div>
          <p>OR</p>
          <div className="w-[120px] h-0 border"></div>
        </div>

        <div>
          <b className="text-sm font-semibold">Username</b>
          <Input
            placeholder="Username"
            className="w-[300px] mt-1"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>

        <div>
          <b className="text-sm font-semibold">Password</b>
          <div className="flex gap-2 items-center justify-center mt-1">
            <Input
              placeholder="Password"
              type={show ? "text" : "password"}
              className="w-[244px]"
              onKeyUp={(e) => listenEnter(e)}
            />
            <Button variant="outline" onClick={toggleShow}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-end w-[300px]">
          <a
            href="/forgot"
            className="text-xs underline underline-offset-[4px]"
          >
            Forgot Password?
          </a>
        </div>

        <Button
          className="mt-2 w-[300px] py-5"
          disabled={signInLoading}
          onClick={handleLogin}
        >
          {signInLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <div>Login</div>
          )}
        </Button>

        <p className="text-xs">
          Dont have an account yet?{" "}
          <b>
            <a href="/signup">Sign Up.</a>
          </b>
        </p>
      </div>

      <Dialog open={isTfa} onOpenChange={setChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="mb-5 font-semibold tracking-normal">
              Enter the 2FA code generated by your app or use a backup code
            </DialogTitle>
            <DialogDescription className="flex flex-col items-center justify-center">
              <InputOTP
                maxLength={6}
                onChange={(e) => setCode(e)}
                value={code}
                className="mt-5 mb-5"
                onComplete={verifyCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>

                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

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
