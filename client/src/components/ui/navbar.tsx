import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider";
import { useSelector } from "react-redux";
import { useHotkeys } from "react-hotkeys-hook";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import expireSession from "@/functions/expireSession";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  // @ts-ignore
  const userSelector = useSelector((state) => state?.user);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useHotkeys("ctrl+shift+l", changeTheme);

  return (
    <>
      <div className="px-10 flex justify-between items-center py-3">
        <div className="flex items-center">
          <img
            className="cursor-pointer z-50"
            srcSet="/assets/img/logo-icon.svg"
            style={{ height: "25px" }}
            onClick={() => navigate("/")}
            alt="logo"
          />
          <div className="flex items-center ml-5">
            <Button variant="link" onClick={() => navigate("/screenings")}>
              Screenings
            </Button>
            <Button variant="link" onClick={() => navigate("/problems/create")}>
              Create a Problem
            </Button>
            <Button variant="link" onClick={() => navigate("/leaderboards")}>
              Leaderboards
            </Button>
          </div>
        </div>
        <Avatar
          className=" cursor-pointer"
          style={{ height: "30px", width: "30px" }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>SC</AvatarFallback>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[250px] mr-14">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={changeTheme}>
                Theme{" "}
                <span className="text-gray-400 ml-2">
                  {theme === "dark" ? "Dark" : "Light"}
                </span>
                <DropdownMenuShortcut>⌘ + ⇧ + L</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/organization")}> My Organization </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={expireSession}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Avatar>
      </div>
    </>
  );
};
