import { Navbar } from "@/components/ui/navbar";
import ChallengeCompass from "./ChallengeCompass";
import CodeFlow from "./CodeFlow";
import SetUsername from "./SetUsername";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/Loader";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
  lastUpdated: string;
};

const Home = () => {
  const [searchParams] = useSearchParams();
  const [modal, setModal] = useState<boolean>(false);
  const [problems, setProblems] = useState<Problem[][]>([]);
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevPage, setPrevPage] = useState<number>(1);
  const [excludedIDs, setExcludedIDs] = useState<string[]>([]);
  const [streak, setStreak] = useState<boolean[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (
      currentPage < prevPage ||
      problems[currentPage - 1]?.length != undefined
    )
      return;
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home/page`, {
        exclude: excludedIDs,
      })
      .then((res) => {
        let prob = problems;
        prob[currentPage - 1] = res.data.problems;
        setProblems(prob);
        setExcludedIDs(res.data.exclude);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home`)
      .then((res) => {
        let prob = problems;
        prob[currentPage - 1] = res.data.problems;
        setProblems(prob);
        setPages(res.data.pages);
        setExcludedIDs(res.data.exclude);
        setStreak(res.data.streak);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const newAcc = searchParams.get("new");
    if (newAcc) {
      setModal(true);
    }
  }, [searchParams]);

  const setOpen = (value: boolean) => {
    setModal(value);
  };

  const filterProblems = (difficulty?: string, search?: string) => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home/filter`, {
        difficulty,
        search,
        exclude: excludedIDs,
      })
      .then((res) => {
        let prob = problems;
        prob[currentPage - 1] = res.data.problems;
        setProblems(prob);
        setPages(res.data.pages);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loader />;
  } else {
    return (
      <>
        <Navbar />
        <div className="flex p-5 px-10 gap-5 justify-center">
          <div>
            {/*}<LearningPath />
            <PopularCourses />{*/}
            <ChallengeCompass
              problems={problems[currentPage - 1] || []}
              pages={pages}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              setPrevPage={setPrevPage}
              loading={loading}
              filter={filterProblems}
            />
          </div>
          <div>
            <CodeFlow codeFlow={streak} />
          </div>
        </div>
        {modal && <SetUsername setOpen={setOpen} />}
      </>
    );
  }
};

export default Home;
