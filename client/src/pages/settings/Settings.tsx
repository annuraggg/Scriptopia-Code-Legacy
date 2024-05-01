import { Navbar } from "@/components/ui/navbar";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoLogIn } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { Tb2Fa } from "react-icons/tb";
import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { GrContactInfo } from "react-icons/gr";

const Settings = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const navigate = useNavigate();
  const securityOptions = [
    {
      title: "Recent Logins",
      description: "View recent logins",
      icon: <IoLogIn size="25" />,
      onClick: () => {
        navigate("/settings/logins");
      },
    },

    {
      title: "Change Password",
      description: "Change your password",
      icon: <RiLockPasswordLine size="25" />,
      onClick: () => {
        navigate("/settings/password");
      },
    },

    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security",
      icon: <Tb2Fa size="25" />,
      onClick: () => {
        navigate("/settings/two-factor");
      },
    },

    {
      title: "Contact Information",
      description: "Update your contact information",
      icon: <GrContactInfo size="25" />,
      onClick: () => {
        navigate("/settings/contact");
      },
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold">Settings</h1>
            <h5 className="mt-3">Login and Security</h5>
            {securityOptions.map((option, index) => (
              <div
                key={index}
                onClick={option.onClick}
                onKeyPress={option.onClick}
                className="border py-5 px-5 mt-5 rounded flex items-center justify-between hover:saturate-200 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center">
                  {option.icon}
                  <div className="ml-5">
                    <h5>{option.title}</h5>
                    <p className="text-gray-500">{option.description}</p>
                  </div>
                </div>
                <MdOutlineKeyboardArrowRight size="25" />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Settings;
