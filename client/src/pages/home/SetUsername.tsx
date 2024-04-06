import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import User from "@/types/User";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const SetUsername = ({ setOpen }: { setOpen: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [exists, setExists] = useState<boolean>(false);

  useEffect(() => {
    // Get Username from URL
    const newAcc = searchParams.get("new");
    if (newAcc) {
      try {
        const token = Cookies.get("token");
        if (token) {
          const decoded: User = jwtDecode(token!);
          if (decoded) setCurrentUsername(decoded?.username);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchParams]);

  const checkAndSetUsername = () => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/auth/username`, {
        username: newUsername,
      })
      .then((res) => {
        Cookies.set("token", res.data.token);
        localStorage.setItem("token", res.data.token);
        toast.success("Username Updated Successfully");
        setOpen(false);
        navigate("/");
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toast.error("Username already exists. Please try another one.");
          setExists(true);
          setTimeout(() => {
            setExists(false);
          }, 3000);
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
    <Dialog open={true} onOpenChange={(op) => setOpen(op)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Username</DialogTitle>
          <DialogDescription>
            <p>
              Your Current Username is:{" "}
              <u>
                <b>{currentUsername}</b>
              </u>
            </p>
            <div className="flex flex-col items-center justify-center mt-2">
              <Input
                className={`py-2 px-5 pr-10 mt-2 w-[250px] border ${
                  exists ? "border-red-500" : "border-gray-700"
                }`}
                placeholder="Enter New Username"
                onChange={(e) => setNewUsername(e.target.value)}
                value={newUsername}
              />

              <Button
                className="mt-2 w-[250px]"
                disabled={loading}
                onClick={checkAndSetUsername}
              >
                {loading ? (
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SetUsername;
