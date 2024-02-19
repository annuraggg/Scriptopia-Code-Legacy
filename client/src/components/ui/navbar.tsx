import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="px-10 flex justify-between items-center py-3">
      <img
        className=" cursor-pointer"
        srcSet="/assets/img/logo-icon.svg"
        style={{ height: "25px" }}
        onClick={() => navigate("/")}
      />
      <Avatar
        className=" cursor-pointer"
        style={{ height: "30px", width: "30px" }}
      >
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    </div>
  );
};
