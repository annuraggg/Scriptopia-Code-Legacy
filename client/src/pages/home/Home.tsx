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
import Tags from "./Tags";

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
  const [problems, setProblems] = useState<Problem[]>([]);
  const [excludedIDs, setExcludedIDs] = useState<string[]>([]);
  const [streak, setStreak] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [codeFlowTSP, setCodeFlowTSP] = useState<number>(0);
  const [allTags, setAllTags] = useState<string[]>([]);

  const [problemLoading, setProblemLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home`)
      .then((res) => {
        setProblems(res.data.problems);
        setStreak(res.data.streak);
        setCodeFlowTSP(res.data.tsp);
        setExcludedIDs(res.data.exclude);
        setAllTags(res.data.tags);
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

  const loadMore = () => {
    setProblemLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/home/page`, {
        exclude: excludedIDs,
      })
      .then((res) => {
        if (res.data.problems.length === 0) {
          toast("No more problems to load");
          return;
        }
        setProblems((prev) => [...prev, ...res.data.problems]);
        setExcludedIDs(res.data.exclude);
      })
      .catch((err) => {
        toast.error("Failed to fetch data");
        console.log(err);
      })
      .finally(() => {
        setProblemLoading(false);
      });
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
        setProblems(res.data.problems);
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
  }

  return (
    <>
      <Navbar />
      <div className="flex p-5 px-10 gap-5 justify-center">
        <div>
          {/*}<LearningPath />
            <PopularCourses />{*/}
          <ChallengeCompass
            problems={problems}
            filter={filterProblems}
            problemsLoading={problemLoading}
            loadMore={loadMore}
          />
        </div>
        <div>
          <CodeFlow codeFlow={streak} tsp={codeFlowTSP} />
          <Tags tags={allTags} />
        </div>
      </div>
      {modal && <SetUsername setOpen={setOpen} />}
    </>
  );
};

export default Home;
