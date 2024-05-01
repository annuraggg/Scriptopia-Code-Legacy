import { Navbar } from "@/components/ui/navbar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import Loader from "@/components/Loader";
import Screening from "@/types/Screenings";

interface Result {
  id: number;
  name: string;
  email: string;
  status: string;
  assessmentDate: string;
  timeTaken: number;
  score: string;
  cheating: number;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);
  const [screening, setScreening] = useState<Screening>({} as Screening);
  const [loading, setLoading] = useState(true);
  const [cheating, setCheating] = useState({
    no: 0,
    light: 0,
    heavy: 0,
  });

  useEffect(() => {
    let no = 0;
    let light = 0;
    let heavy = 0;

    results?.forEach((result) => {
      if (result?.cheating < 1) no++;
      else if (result?.cheating < 5) light++;
      else heavy++;
    });

    setCheating({ no, light, heavy });
  }, [results]);

  useEffect(() => {
    const id = window?.location?.pathname?.split("/")[2];

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/results`, {
        screeningId: id,
      })
      .then((res) => {
        setResults(res?.data?.data);
        setScreening(res?.data?.screening);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch results");
      })
      .finally(() => setLoading(false));
  }, []);

  const convertToDate = (date: string) => {
    if (!date) return "";
    const d = new Date(date);
    return d?.toDateString();
  };

  const convertToMinsSecs = (time: number) => {
    if (time === 0) return "0m 0s";
    const mins = Math?.floor(time / 60);
    const secs = time % 60;
    return `${mins}m ${secs}s`;
  };

  const calcPercentage = (score: number, total: number) => {
    if (total === 0) return 0;
    if (score === 0) return 0;
    return (score / total) * 100;
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <div className="flex gap-3">
          <Card>
            <CardHeader className="p-8 flex items-center justify-center w-[23vw]">
              <CardTitle className=" text-4xl">{results?.length}</CardTitle>
              <CardDescription>Assessments</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="p-8 flex items-center justify-center w-[23vw]">
              <CardTitle className=" text-4xl">{results?.length}</CardTitle>
              <CardDescription>
                Assessed (
                {calcPercentage(results?.length, screening.candidates.length)}%)
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="p-8 flex items-center justify-center w-[23vw]">
              <CardTitle className=" text-4xl">0</CardTitle>
              <CardDescription>Qualified (0%)</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="p-8 flex justify-center w-[23vw]">
              <CardTitle>Cheating</CardTitle>
              <CardDescription>
                <p className="text-xs mt-1 text-green-500">
                  No Copying: {cheating?.no} (
                  {calcPercentage(cheating?.no, results?.length)}%)
                </p>

                <p className="text-xs mt-1 text-yellow-500">
                  Light Copying: {cheating?.light} (
                  {calcPercentage(cheating?.light, results?.length)}%)
                </p>
                <p className="text-xs mt-1 text-red-500">
                  Heavy Copying: {cheating?.heavy} (
                  {calcPercentage(cheating?.heavy, results?.length)}%)
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className=" bg-primary-foreground mt-5 h-[60vh] rounded-lg p-5 px-10 overflow-auto">
          <Table>
            <TableCaption>Results</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assessment Date</TableHead>
                <TableHead>Time Taken</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Cheating</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results?.map((result) => (
                <TableRow key={result?.email}>
                  <TableCell>{result?.name}</TableCell>
                  <TableCell>{result?.email}</TableCell>
                  <TableCell>
                    {result?.status?.slice(0, 1)?.toUpperCase() +
                      result?.status?.slice(1)}
                  </TableCell>
                  <TableCell>{convertToDate(result?.assessmentDate)}</TableCell>
                  <TableCell>{convertToMinsSecs(result?.timeTaken)}</TableCell>
                  <TableCell>{result?.score}</TableCell>
                  <TableCell
                    className={`${
                      result?.cheating < 1
                        ? "text-green-500"
                        : result?.cheating < 5
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {result?.cheating < 1
                      ? "No Copying"
                      : result?.cheating < 5
                      ? "Light Copying"
                      : "Heavy Copying"}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-primary-foreground text-primary-background px-5 py-1 rounded-lg"
                      onClick={() =>
                        navigate(
                          window?.location?.pathname + "/c/" + result?.id
                        )
                      }
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Results;
