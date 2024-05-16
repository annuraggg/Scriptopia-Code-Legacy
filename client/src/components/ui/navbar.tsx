import { useNavigate } from "react-router-dom";
import { useTheme } from "../theme-provider";
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
import { useSelector } from "react-redux";
import UserToken from "@/types/UserToken";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useEffect, useState } from "react";
import Logo from "../LogoIcon";

export const Navbar = () => {
  const navigate = useNavigate();
  const { setTheme, theme } = useTheme();
  const [openPalettePicker, setOpenPalettePicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>("blue");

  const user = useSelector((state: { user: UserToken }) => state.user);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useHotkeys("ctrl+shift+l", changeTheme);

  const savePalette = () => {
    localStorage.setItem("colorPalette", selectedColor);
    window.location.reload();
  };

  useEffect(() => {
    const colorPalette = localStorage.getItem("colorPalette");
    if (colorPalette) {
      setSelectedColor(colorPalette);
    }
  }, []);

  return (
    <>
      <div className="px-10 flex justify-between items-center py-3 z-50">
        <div className="flex items-center cursor-pointer">
          <Logo />
          <div className="flex items-center ml-5">
            <Button variant="link" onClick={() => navigate("/screenings")}>
              Screenings
            </Button>
            <Button variant="link" onClick={() => navigate("/problems/")}>
              My Problems
            </Button>
           {/* <Button variant="link" onClick={() => navigate("/leaderboards")}>
              Leaderboards
  </Button>*/}
          </div>
        </div>
        <Avatar
          className=" cursor-pointer"
          style={{ height: "30px", width: "30px" }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger>
              <AvatarImage src={localStorage.getItem("image") || ""} />
              <AvatarFallback>{user.firstName.slice(0,1).toUpperCase() + user.lastName.slice(0,1).toUpperCase()}</AvatarFallback>
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
              <DropdownMenuItem onClick={() => setOpenPalettePicker(true)}>
                Color Palette{" "}
                <span className="text-gray-400 ml-2">
                  {selectedColor.slice(0, 1).toUpperCase() +
                    selectedColor.slice(1)}
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(`/u/${user.id}`)}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/organization")}>
                {" "}
                My Organization{" "}
              </DropdownMenuItem>
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

      <Dialog open={openPalettePicker} onOpenChange={setOpenPalettePicker}>
        <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>Choose a Color Palette</DialogTitle>
            <DialogDescription>
              Note that this will require a page refresh
            </DialogDescription>
            <div className="pt-5 flex gap-5 items-center justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("zinc")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "zinc"
                          ? "border-[#53535B]"
                          : "border-transparent"
                      }`}
                    >
                      <div className="h-7 w-7 bg-[#53535B] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zinc</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("rose")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "rose"
                          ? "border-[#E01C48]"
                          : "border-transparent"
                      }
                    `}
                    >
                      <div className="h-7 w-7 bg-[#E01C48] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Rose</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("blue")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "blue"
                          ? "border-[#3A82F7]"
                          : "border-transparent"
                      }
                    `}
                    >
                      <div className="h-7 w-7 bg-[#3A82F7] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Blue</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("green")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "green"
                          ? "border-[#23C45E]"
                          : "border-transparent"
                      }
                    `}
                    >
                      <div className="h-7 w-7 bg-[#23C45E] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Green</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("orange")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "orange"
                          ? "border-[#EB590C]"
                          : "border-transparent"
                      }
                    `}
                    >
                      <div className="h-7 w-7 bg-[#EB590C] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Orange</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("yellow")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "yellow"
                          ? "border-[#FBCC14]"
                          : "border-transparent"
                      }
                    `}
                    >
                      <div className="h-7 w-7 bg-[#FBCC14] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Yellow</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger onClick={() => setSelectedColor("purple")}>
                    <div
                      className={`rounded-full p-1 border-2 transition-all duration-300
                      ${
                        selectedColor === "purple"
                          ? "border-[#6D29D8]"
                          : "border-transparent"
                      }
                    `}
                    >
                      <div className="h-7 w-7 bg-[#6D29D8] rounded-full cursor-pointer"></div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Purple</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <div className="flex gap-5 w-full pt-10">
              <Button
                onClick={() => setOpenPalettePicker(false)}
                className="w-full"
                variant="outline"
              >
                Cancel
              </Button>
              <Button onClick={savePalette} className="w-full">
                Save
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
