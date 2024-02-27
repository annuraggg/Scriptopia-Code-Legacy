import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { toast } from "sonner";

const Username = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [exists, setExists] = useState<boolean>(false);

  const checkAndSetUsername = () => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/username`)
      .then((res) => {})
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Username already exists. Please try another one.");
          return;
        }
        if (err.response.status === 403) {
          window.location.href = "/signin";
        }
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex items-center justify-center h-[100vh] flex-col">
      <h2>Update Username</h2>
      <p>
        Your Current Username is:{" "}
        <u>
          <b>prosperous-deduction60182</b>
        </u>
      </p>
      <div className="flex items-center justify-center gap-2 mt-2">
        <Input
          className={`py-2 px-5 pr-10 mt-2 w-[250px] border-gray-700 border ${
            exists ? "border-red-500" : "border-gray-700"
          }`}
          placeholder="Enter New Username"
        />
        <RxCross2 className={`text-red-500 mt-2 ml-[-35px] ${exists? "opacity-100": "opacity-0"}`} />
      </div>

      <Button className="mt-5 w-[250px] ml-3" disabled={loading} onClick={checkAndSetUsername}>
        {loading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Update"}
      </Button>
    </div>
  );
};

export default Username;
