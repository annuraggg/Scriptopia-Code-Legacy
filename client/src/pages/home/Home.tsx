import LearningPath from "./LearningPath";
import { Navbar } from "@/components/ui/navbar";
import PopularCourses from "./PopularCourses";
import ChallengeCompass from "./ChallengeCompass";
import CodeFlow from "./CodeFlow";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex p-5 px-10 gap-5 justify-center">
        <div>
          <LearningPath />
          <PopularCourses />
          <ChallengeCompass />
        </div>
        <div>
          <CodeFlow />
        </div>
      </div>
    </>
  );
};

export default Home;
