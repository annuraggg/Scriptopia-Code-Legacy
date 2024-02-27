import { Navbar } from "@/components/ui/navbar";
import { Separator } from "@radix-ui/react-dropdown-menu";
import React from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-10">
        <h1 className="text-2xl font-bold">Settings</h1>
        <h5 className="mt-3">Login and Security</h5>
        <div
          onClick={() => {
            navigate("/settings/logins");
          }}
          className="border py-5 px-5 mt-5 rounded flex items-center justify-between hover:bg-gray-900 transition-all duration-300 cursor-pointer"
        >
          <p>Recent Logins</p>
          <MdOutlineKeyboardArrowRight size="25" />
        </div>
      </div>
    </>
  );
};

export default Settings;
