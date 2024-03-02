import { Navbar } from "@/components/ui/navbar";
import MyCourses from "./MyCourses";
import PopularCourses from "./PopularCourses";
import AllCourses from "./AllCourses";

const Learn = () => {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <MyCourses />
        <PopularCourses />
        <AllCourses />
      </div>
    </>
  );
};

export default Learn;
