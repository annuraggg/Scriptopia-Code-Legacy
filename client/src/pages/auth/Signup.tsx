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
    const nameSchema = z.string().nonempty().min(2).max(50);
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
