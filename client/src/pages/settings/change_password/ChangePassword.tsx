import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navbar } from "@/components/ui/navbar";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "sonner";
import Loader from "../../../components/Loader";
import { z } from "zod";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [pageloading, setpageLoading] = useState(false);

  useEffect(() => {
    setpageLoading(true);
    setTimeout(() => {
      setpageLoading(false);
    }, 1000);
  }, []);

  const changePass = () => {
    const schema = z.object({
      oldPassword: z.string(),
      newPassword: z
        .string()
        .min(8)
        .regex(/[a-zA-Z]/)
        .regex(/[0-9]/),
      confirmPassword: z
        .string()
        .min(8)
        .regex(/[a-zA-Z]/)
        .regex(/[0-9]/),
    });

    try {
      schema.parse({
        oldPassword,
        newPassword,
        confirmPassword,
      });
    } catch (err) {
      toast.error(
        "Invalid input. Make sure all fields are filled correctly and password is atleast 8 characters long with atleast 1 letter and 1 number"
      );
      return;
    }

    setLoading(true);
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/settings/password`,
        {
          oldPassword,
          newPassword,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        toast.success("Password changed successfully");
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Old password is incorrect");
          return;
        }
        console.log(err);
        toast.error("Error changing password");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {pageloading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <IoMdArrowBack
            className="text-2xl mt-5 cursor-pointer ml-10"
            onClick={() => history.back()}
          />
          <div className="container mx-auto mt-10 flex justify-center flex-col items-center">
            <h1 className="text-2xl font-bold">Change Password</h1>
            <div>
              <p className="mt-5 text-center mb-5">
                If you suspect any unauthorized activity, change your password
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="mb-5">
                <label htmlFor="old_password" className="block mb-2">
                  Old Password
                </label>
                <Input
                  type="password"
                  name="old_password"
                  id="old_password"
                  className="w-full p-2 border rounded-md"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="new_password" className="block mb-2">
                  New Password
                </label>
                <Input
                  type="password"
                  name="new_password"
                  id="new_password"
                  className="w-full p-2 border rounded-md"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label htmlFor="confirm_password" className="block mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  name="confirm_password"
                  id="confirm_password"
                  className="w-full p-2 border rounded-md"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button
                className="bg-primary text-white w-full p-2 rounded-md"
                onClick={changePass}
                disabled={loading}
              >
                {loading ? (
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChangePassword;
