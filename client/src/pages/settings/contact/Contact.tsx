import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Loader from "@/components/Loader";

const Contact = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  const [phoneVerified, setPhoneVerified] = useState<boolean>(false);

  const [prevEmail, setPrevEmail] = useState<string>("");
  const [prevPhone, setPrevPhone] = useState<string>("");

  const [prevEmailVerified, setPrevEmailVerified] = useState<boolean>(false);
  const [prevPhoneVerified, setPrevPhoneVerified] = useState<boolean>(false);

  const [emailVerBtnLoading, setEmailVerBtnLoading] = useState<boolean>(false);
  const [phoneVerBtnLoading, setPhoneVerBtnLoading] = useState<boolean>(false);

  const [emailVerDialog, setEmailVerDialog] = useState<boolean>(false);
  const [phoneVerDialog, setPhoneVerDialog] = useState<boolean>(false);

  const [emailVerCode, setEmailVerCode] = useState<string>("");
  const [phoneVerCode, setPhoneVerCode] = useState<string>("");

  const [emailVerDialogLoading, setEmailVerDialogLoading] =
    useState<boolean>(false);
  const [phoneVerDialogLoading, setPhoneVerDialogLoading] =
    useState<boolean>(false);

  const [randomID, setRandomID] = useState<number>(0);

  useEffect(() => {
    setLoading(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/contact`)
      .then((res) => {
        const { email, phone, emailVerified, phoneVerified } = res.data;
        setEmail(email || "");
        setPhone(phone || "");
        setEmailVerified(emailVerified || false);
        setPhoneVerified(phoneVerified || false);

        setPrevEmail(email || null);
        setPrevPhone(phone || null);
        setPrevEmailVerified(emailVerified || false);
        setPrevPhoneVerified(phoneVerified || false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching contact information");
      })
      .finally(() => setLoading(false));
  }, []);

  const sendEmailCode = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      toast.error("Invalid email");
      return;
    }

    setEmailVerBtnLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/settings/contact/email/send`,
        {
          email,
        }
      )
      .then((res) => {
        setEmailVerBtnLoading(false);
        setEmailVerDialog(true);
        setRandomID(res.data.randomID);
      })
      .catch((err) => {
        console.log(err);
        setEmailVerBtnLoading(false);
        toast.error("Error sending verification code");
      });
  };

  const verifyEmail = () => {
    setEmailVerDialogLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/settings/contact/email/verify`,
        {
          email,
          otp: emailVerCode,
          randomID: randomID,
        }
      )
      .then((res) => {
        setEmailVerDialogLoading(false);
        setEmailVerified(true);
        setEmailVerDialog(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error(err.response.data.message);
        }
        console.log(err);
        setEmailVerDialogLoading(false);
        toast.error("Error verifying email");
      })
      .finally(() => setEmailVerDialog(false));
  };

  const sendPhoneCode = () => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    setPhoneVerBtnLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/phone/send`, {
        phone,
      })
      .then((res) => {
        setPhoneVerBtnLoading(false);
        setPhoneVerDialog(true);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setPhoneVerBtnLoading(false);
        toast.error("Error sending verification code");
      });
  };

  const verifyPhone = () => {
    setPhoneVerDialogLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/settings/phone/verify`, {
        phone,
        otp: phoneVerCode,
      })
      .then((res) => {
        setPhoneVerDialogLoading(false);
        setPhoneVerified(true);
        setPhoneVerDialog(false);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        setPhoneVerDialogLoading(false);
        toast.error("Error verifying phone");
      })
      .finally(() => setPhoneVerDialog(false));
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <IoMdArrowBack
        className="text-2xl mt-5 cursor-pointer ml-10"
        onClick={() => history.back()}
      />
      <div className="container mx-auto mt-10 flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold">Contact</h1>
        <div>
          <p className="mt-5 text-center mb-5">
            Update your contact information
          </p>
        </div>
        <div className="w-full md:w-1/3">
          <div className="mb-5">
            <label htmlFor="old_password" className="block mb-2">
              Email
            </label>
            <div className="flex gap-5 items-center">
              <Input
                type="text"
                name="email"
                id="email"
                className="w-full p-2 border rounded-md"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (e.target.value !== prevEmail) setEmailVerified(false);
                  else if (prevEmailVerified) setEmailVerified(true);
                }}
              />
              {emailVerified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <Button
                  className="bg-blue-500 text-white"
                  onClick={sendEmailCode}
                  disabled={emailVerBtnLoading}
                >
                  {emailVerBtnLoading ? (
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="new_password" className="block mb-2">
              Phone
            </label>
            <div className="flex gap-5">
              <Input
                disabled={true}
                type="text"
                name="phone"
                id="phone"
                className="w-full p-2 border rounded-md"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (e.target.value !== prevPhone) setPhoneVerified(false);
                  else if (prevPhoneVerified) setPhoneVerified(true);
                }}
              />
              {phoneVerified ? (
                <span className="text-green-500">Verified</span>
              ) : (
                <Button
                  className="bg-blue-500 text-white"
                  onClick={sendPhoneCode}
                  disabled={true}
                >
                  {phoneVerBtnLoading ? (
                    <ReloadIcon className="h-4 w-4 animate-spin" />
                  ) : (
                    "Verify"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={emailVerDialog} onOpenChange={setEmailVerDialog}>
        <AlertDialogContent className="flex items-center flex-col justify-center">
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Email</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the verification code sent to your email
            </AlertDialogDescription>
            <div className="py-5">
              <InputOTP
                maxLength={6}
                value={emailVerCode}
                onChange={(e) => setEmailVerCode(e)}
              >
                <InputOTPGroup>
                  {" "}
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
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={verifyEmail}
              disabled={emailVerDialogLoading}
            >
              {emailVerDialogLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={phoneVerDialog} onOpenChange={setPhoneVerDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Verify Phone</AlertDialogTitle>
            <AlertDialogDescription>
              Enter the verification code sent to your phone
            </AlertDialogDescription>
            <InputOTP
              maxLength={6}
              value={phoneVerCode}
              onChange={(e) => setPhoneVerCode(e)}
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
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={verifyPhone}
              disabled={phoneVerDialogLoading}
            >
              {phoneVerDialogLoading ? (
                <ReloadIcon className="h-4 w-4 animate-spin" />
              ) : (
                "Continue"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Contact;
