import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

interface location {
  location: string;
  date: string;
  ip: string;
  device: string;
  _id: string;
  sessionID: string;
}

const RecentLogins = () => {
  const [logins, setLogins] = useState<location[]>([]);

  useEffect(() => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/settings/logins`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        setLogins(res.data.login);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error fetching logins");
      });
  }, []);

  const convertDateToLocale = (date: string) => {
    return new Date(date).toLocaleString();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10 flex justify-center flex-col items-center">
        <h1 className="text-2xl font-bold">Recent Logins</h1>
        <div>
          <p className="mt-5 text-center mb-5">
            If you suspect any unauthorized activity, <a href="/accounts/password" className="underline hover:text-primary">change your password</a>
          </p>
        </div>
        {logins.map((login) => (
          <div
            key={login._id}
            className="flex justify-between items-center w-[50%] border my-2 py-2 px-5 rounded"
          >
            <div>
              <h5>
                {login.location}{" "}
                <span className="text-green-500"> · Current Session</span>
              </h5>
              <p className="text-xs mt-1">{convertDateToLocale(login.date)}</p>
              <p className="text-xs mt-4">IP: {login.ip}</p>
            </div>
            <div>
              <a href="" className="text-red-500">
                Logout
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecentLogins;
