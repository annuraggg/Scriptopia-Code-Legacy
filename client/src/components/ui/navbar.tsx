import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

export const Navbar = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState<string>(
    localStorage.getItem("vite-ui-theme")!
  );

  const changeTheme = () => {
    if (theme === "dark") {
      localStorage.setItem("vite-ui-theme", "light");
      setTheme("light");
    } else {
      localStorage.setItem("vite-ui-theme", "dark");
      setTheme("dark");
    }

    window.location.reload();
  };

  useHotkeys("ctrl+shift+l", changeTheme);

  return (
    <div className="px-10 flex justify-between items-center py-3">
      <img
        className=" cursor-pointer z-50"
        srcSet="/assets/img/logo-icon.svg"
        style={{ height: "25px" }}
        onClick={() => navigate("/")}
      />
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
            <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Avatar>
    </div>
  );
};
