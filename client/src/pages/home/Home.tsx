import LearningPath from "./LearningPath";
import { Navbar } from "@/components/ui/navbar";
import PopularCourses from "./PopularCourses";
import ChallengeCompass from "./ChallengeCompass";
import CodeFlow from "./CodeFlow";
import SetUsername from "./SetUsername";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState<boolean>(false);

  useEffect(() => {
    const newAcc = searchParams.get("new");
    if (newAcc) {
      setModal(true);
    }
  }, [searchParams]);

  const setOpen = (value: boolean) => {
    setModal(value);
  };

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
      {modal && <SetUsername open={modal} setOpen={setOpen} />}
    </>
  );
};

export default Home;
