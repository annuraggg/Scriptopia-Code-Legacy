import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const divStyle = {
  backgroundImage: "url(/assets/wave-bg.png)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

const Login = () => {
  return (
    <div
      className="h-[100vh] flex flex-col items-center justify-center gap-3"
      style={divStyle}
    >
      <img srcSet="assets/img/logo.png" width="55px" />
      <h2 className=" mt-5 mb-5 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Welcome, Please Login.
      </h2>

      <Input placeholder="Email" type="email" className="w-[250px]" />
      <Input placeholder="Password" type="password" className="w-[250px]" />

      <Button className="mt-5 w-[250px]" variant="default">
        Login
      </Button>

      <a href="/forgot" className=" text-gray-400 mt-5">
        Forgot Password?
      </a>

      <a href="/signup" className="justify-self-end bottom-10 absolute">
        Create a new <span className="text-blue-500 underline">Account</span>
      </a>
    </div>
  );
};

export default Login;
