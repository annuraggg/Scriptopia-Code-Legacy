import { Navbar } from "@/components/ui/navbar";
import ChallengeCompass from "./ChallengeCompass";
import CodeFlow from "./CodeFlow";
import SetUsername from "./SetUsername";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

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
  const [streak, setStreak] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [codeFlowTSP, setCodeFlowTSP] = useState<number>(0);

  const [triggerPage, setTriggerPage] = useState<boolean>(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["home"],
    queryFn: () =>
      axios.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch data");
      return;
    }

    if (data) {
      const prob = problems;
      prob[currentPage - 1] = data.problems;
      setProblems(prob);
      setPages(data.pages);
      setExcludedIDs(data.exclude);
      setStreak(data.streak);
      setCodeFlowTSP(data.tsp);
    }
  }, [currentPage, data, error, problems]);

  useEffect(() => {
    if (
      currentPage < prevPage ||
      problems[currentPage - 1]?.length == undefined
    ) {
      console.log("Page changed but not fetching data");
      console.log("Current page", currentPage);
      console.log("Prev page", prevPage);
      console.log("Problems", problems[currentPage - 1]?.length);
      return;
    }

    console.log("Fetching data for page", currentPage);

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home/page`, {
        exclude: excludedIDs,
      })
      .then((res) => {
        const prob = problems;
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
  }, [triggerPage]);

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
    const validationSchema = z.object({
      difficulty: z.string().optional(),
      search: z.string().optional(),
    });

    try {
      validationSchema.parse({ difficulty, search });
    } catch (err) {
      console.log(err);
      toast.error("Invalid input");
      return;
    }

    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home/filter`, {
        difficulty,
        search,
        exclude: excludedIDs,
      })
      .then((res) => {
        const prob = problems;
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
  useEffect(() => {
    console.log("Problems");
    console.log(problems);
  }, [currentPage, problems]);

  if (isLoading) {
    return <Loader />;
  }

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
            triggerPage={triggerPage}
            setTriggerPage={setTriggerPage}
          />
        </div>
        <div>
          <CodeFlow codeFlow={streak} tsp={codeFlowTSP} />
        </div>
      </div>
      {modal && <SetUsername setOpen={setOpen} />}
    </>
  );
};

export default Home;
