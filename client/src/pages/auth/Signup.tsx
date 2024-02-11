import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const glassFrost = {
  backdropFilter: "blur(30px)",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
};

const bg = {
  backgroundImage: "url('assets/blob-bg.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const fetchGoogle = () => {
  window.open("http://localhost:3000/auth/google", "_self");
};

const Signup = () => {
  return (
    <div
      className="flex items-center justify-center h-[100vh] p-5 gap-20"
      style={bg}
    >
      <div className="h-[90vh] w-[40%] p-10 rounded-xl" style={glassFrost}>
        <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
          Sign Up<span className="text-blue-500">.</span>
        </h2>

        <div className="flex gap-5 mb-5">
          <div>
            <small className="text-sm font-medium leading-none">
              First Name
            </small>
            <Input className="p-6 mt-4 w-[250px] border-gray-700" />
          </div>

          <div>
            <small className="text-sm font-medium leading-none">
              Last Name
            </small>
            <Input className="p-6 mt-4 w-[250px] border-gray-700" />
          </div>
        </div>

        <div className=" mb-5">
          <small className="text-sm font-medium leading-none">
            Email Address
          </small>
          <Input className="p-6 mt-4 w-[100%] border-gray-700" />
        </div>

        <div className=" mb-5">
          <small className="text-sm font-medium leading-none">Password</small>
          <Input
            className="p-6 mt-4 w-[100%] border-gray-700"
            placeholder="Minimum 8 Characters, Including Alphanumeric Characters"
          />
        </div>

        <div className="flex items-center gap-3 mt-5">
          <Checkbox id="terms" />
          <p>I agree to the terms and conditions</p>
        </div>

        <Button className="mt-10 w-[100%]">Sign Up</Button>
        <Button
          onClick={fetchGoogle}
          className="mt-2 mb-5 w-[100%] bg-white flex items-center justify-center"
        >
          <img src="assets/img/google.webp" width="20px" className="mr-3" />
          Sign up with Google
        </Button>
        <a href="/signin">Sign in</a>
      </div>
      <div className=" bg-red h-[90vh] w-[40%]">
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="flex justify-center items-center h-[90vh]">
                <img src="assets/img/logo.png" width="50px" />
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="border h-[90vh] ">Hellpo</div>
            </CarouselItem>{" "}
            <CarouselItem>
              <div className="border h-[90vh] ">Hellpo</div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default Signup;
