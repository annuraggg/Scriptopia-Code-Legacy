import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import axios from "axios";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Logo from "@/components/LogoIcon";
import { useTheme } from "@/components/theme-provider";
import { useSelector } from "react-redux";

const glassFrost = {
  backdropFilter: "blur(30px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const bg = {
  backgroundImage: "url('assets/blob-bg.webp')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Signup = () => {
  const navigate = useNavigate();

  const [fName, setFName] = useState<string>("");
  const [lName, setLName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [signUpLoading, setSignUpLoading] = useState<boolean>(false);
  const [googleSignUpLoading, setGoogleSignUpLoading] =
    useState<boolean>(false);

  const [show, setShow] = useState<boolean>(false);
  const toggleShow = () => {
    setShow(!show);
  };

  const continueGoogle = (creds: GoogleCredentialResponse) => {
    setGoogleSignUpLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/google`, {
        creds,
        auth_type: "signup",
      })
      .then((res) => {
        // SET COOKIE
        const token = res.data.token;
        document.cookie = `token=${token}; secure; samesite=none;`;
        toast.success("Account created successfully");
        window.location.href = "/?new=true";
        localStorage.setItem("token", token);
        localStorage.setItem("image", res.data.image);
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Account already exists. Please sign in.");
          return;
        }
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setGoogleSignUpLoading(false);
      });
  };

  useEffect(() => {
    const urlErr = new URLSearchParams(window.location.search).get("error");
    if (urlErr) {
      if (urlErr === "account-already-exists") {
        toast.error("Account already exists. Please sign in.");
      } else {
        toast.error(urlErr);
      }
      setTerms(true);
    }
  }, []);

  const signUp = () => {
    const nameSchema = z.string().min(2).max(50);
    const emailSchema = z.string().email();
    const passwordSchema = z
      .string()
      .min(8)
      .regex(/[a-zA-Z]/)
      .regex(/[0-9]/);

    setSignUpLoading(true);
    if (fName && lName && email && password) {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        setSignUpLoading(false);
        return;
      }

      try {
        nameSchema.parse(fName);
        nameSchema.parse(lName);
      } catch (err) {
        toast.error("Invalid Name");
        setSignUpLoading(false);
        return;
      }

      try {
        emailSchema.parse(email);
      } catch (err) {
        toast.error("Invalid Email");
        setSignUpLoading(false);
        return;
      }

      try {
        passwordSchema.parse(password);
      } catch (err) {
        toast.error(
          "Invalid Password. Password must be at least 8 characters long and contain at least one letter and one number."
        );
        setSignUpLoading(false);
        return;
      }

      if (terms) {
        axios
          .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/register`, {
            fName,
            lName,
            email,
            password,
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success("Account created successfully");
              Cookies.set("token", res.data.token, {
                secure: true,
                sameSite: "none",
              });
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("image", res.data.image);
              window.location.href = "/?new=true";
            }
          })
          .catch((err) => {
            if (err.response.status === 409) {
              toast.error("Account already exists. Please sign in.");
            } else {
              toast.error("Something went wrong");
            }
          })
          .finally(() => {
            setSignUpLoading(false);
          });
      } else {
        toast.error("Please agree to the terms and conditions");
        setSignUpLoading(false);
      }
    } else {
      toast.error("Please fill all the fields");
      setSignUpLoading(false);
    }
  };

  const { theme, setTheme } = useTheme();
  const color = useSelector(
    (state: {
      theme: { colorPalette: string; color: string; theme: string };
    }) => state.theme
  );

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] p-5">
      <div
        className="border p-5 flex items-center justify-center rounded-full cursor-pointer"
        onClick={changeTheme}
        style={{
          boxShadow: `0 0 140px 0 ${color.color}`,
        }}
      >
        <Logo height={30} width={30} />
      </div>
      <div className="text-center mt-2">
        <h2 className=" font-semibold">Welcome to Scriptopia</h2>
        <p className="text-sm mt-1 text-gray-400">Let's get you started</p>
      </div>

      <div className="p-2 rounded-lg w-[40%] mt-3">
        <div className="flex gap-2">
          <div className="w-full">
            <b className="text-sm font-semibold">First Name</b>
            <Input
              placeholder="First Name"
              className="w-full mt-1"
              onChange={(e) => setFName(e.target.value)}
              value={fName}
            />
          </div>

          <div className="w-full">
            <b className="text-sm font-semibold">Last Name</b>
            <Input
              placeholder="Last Name"
              className="w-full mt-1"
              onChange={(e) => setLName(e.target.value)}
              value={lName}
            />
          </div>
        </div>

        <div className="w-full mt-3 mb-3">
          <b className="text-sm font-semibold">Email</b>
          <Input
            placeholder="Email"
            className="w-full mt-1"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <b className="text-sm font-semibold">Password</b>
        <div className="flex gap-2 items-center mt-1">
          <div className="w-full">
            <Input
              placeholder="Password"
              type={show ? "text" : "password"}
              className="w-full"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          <div className="w-full">
            <Input
              placeholder="Confirm Password"
              type={show ? "text" : "password"}
              className="w-full"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
            />
          </div>

          <div>
            <Button variant="outline" onClick={toggleShow}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
        </div>
        <p className=" text-center text-xs text-gray-400 mt-3">
          Password must be at least 8 characters long and contain at least one
          letter and one number.
        </p>

        <div className="flex gap-2 mt-5">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(e: boolean) => setTerms(e)}
          />
          <p className="text-xs">
            I agree to the{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/terms")}
            >
              terms and conditions
            </span>
          </p>
        </div>

        <Button className="w-full mt-5" onClick={signUp}>
          Sign Up
        </Button>
        <p className="text-xs mt-4 text-center">
          Already have an account?{" "}
          <b>
            <a href="/signin">Sign In.</a>
          </b>
        </p>
      </div>

      <div className="flex gap-5 items-center mb-2">
        <div className="w-[120px] h-0 border"></div>
        <p>OR</p>
        <div className="w-[120px] h-0 border"></div>
      </div>

      <div>
        <GoogleLogin
          onSuccess={continueGoogle}
          onError={() => toast.error("Something went wrong")}
          type="standard"
          theme={color.theme === "dark" ? "filled_black" : "outline"}
          useOneTap={true}
          text="continue_with"
          shape="pill"
          logo_alignment="left"
          context="signup"
        />
      </div>
    </div>
  );

  return (
    <div
      className="flex items-center justify-center h-[100vh] p-5 gap-20"
      style={bg}
    >
      <div className="h-[90vh] w-[40%] p-10 rounded-xl" style={glassFrost}>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5 flex items-center gap-2">
          Sign Up<span className="text-blue-500">.</span>
          {googleSignUpLoading && (
            <ReloadIcon className="h-6 w-6 animate-spin" />
          )}
        </h2>

        <div className="flex gap-5 mb-2">
          <div>
            <small className="text-sm font-medium leading-none">
              First Name
            </small>
            <Input
              className="p-6 mt-2 w-[250px] border-gray-700"
              onChange={(e) => setFName(e.target.value)}
              value={fName}
            />
          </div>

          <div>
            <small className="text-sm font-medium leading-none">
              Last Name
            </small>
            <Input
              className="p-6 mt-2 w-[250px] border-gray-700"
              onChange={(e) => setLName(e.target.value)}
              value={lName}
            />
          </div>
        </div>

        <div className=" mb-2">
          <small className="text-sm font-medium leading-none">
            Email Address
          </small>
          <Input
            className="p-6 mt-2 w-[100%] border-gray-700"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className=" mb-2">
          <small className="text-sm font-medium leading-none">Password</small>
          <div className="flex items-center justify-center gap-2">
            <Input
              type={show ? "text" : "password"}
              className="p-6 mt-2 w-[100%] border-gray-700"
              placeholder="Minimum 8 Characters, Including Alphanumeric Characters"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div
              className="border border-blue-500 p-4 rounded-lg mt-2 cursor-pointer"
              onClick={() => setShow(!show)}
              onKeyDown={() => setShow(!show)}
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
        </div>

        <div className=" mb-2">
          <small className="text-sm font-medium leading-none">
            Confirm Password
          </small>
          <Input
            type={show ? "text" : "password"}
            className="p-6 mt-2 w-[100%] border-gray-700"
            placeholder=""
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Checkbox
            id="terms"
            checked={terms}
            onCheckedChange={(e: boolean) => setTerms(e)}
          />
          <p>
            I agree to the{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => navigate("/terms")}
            >
              terms and conditions
            </span>
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 my-4">
          <Button className="w-[100%]" disabled={!terms} onClick={signUp}>
            {signUpLoading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <div>Sign Up</div>
            )}
          </Button>

          <div>
            <GoogleLogin
              onSuccess={continueGoogle}
              onError={() => toast.error("Something went wrong")}
              type="icon"
              theme="filled_black"
              useOneTap={true}
              text="continue_with"
              shape="pill"
              logo_alignment="left"
              context="signup"
            />
          </div>
        </div>

        <a href="/signin" className="mt-2">
          Sign in Instead
        </a>
      </div>
      <div className=" bg-red h-[90vh] w-[40%]">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="flex justify-center items-center h-[90vh] bg-gray-900 rounded-lg">
                <img src="assets/img/logo.svg" width="250px" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="border h-[90vh] ">Hellpo</div>
            </CarouselItem>{" "}
            <CarouselItem>
              <div className="border h-[90vh] ">Hellpo</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Signup;
