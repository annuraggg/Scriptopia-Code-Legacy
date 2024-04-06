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

interface Result {
  id: number;
  name: string;
  email: string;
  status: string;
  assessmentDate: string;
  timeTaken: string;
  score: string;
  cheating: string;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const r = [
      {
        id: 1,
        name: "John Doe",
        email: "abc@gmail.com",
        status: "Assessed",
        assessmentDate: "2021-09-01",
        timeTaken: "1hr 30min",
        score: "80%",
        cheating: "No Copying",
      },
      {
        id: 2,
        name: "Jane Doe",
        email: "abc@gmail.com",
        status: "Assessed",
        assessmentDate: "2021-09-01",
        timeTaken: "1hr 30min",
        score: "80%",
        cheating: "No Copying",
      },
      {
        id: 3,
        name: "John Doe",
        email: "abc@gmail.com",
        status: "Assessed",
        assessmentDate: "2021-09-01",
        timeTaken: "1hr 30min",
        score: "80%",
        cheating: "No Copying",
      },
      {
        id: 4,
        name: "John Doe",
        email: "abc@gmail.com",
        status: "Assessed",
        assessmentDate: "2021-09-01",
        timeTaken: "1hr 30min",
        score: "80%",
        cheating: "No Copying",
      },
    ];

    setResults(r);
  }, []);

  return (
    <>
      <Navbar />
      <div className="px-10 py-5">
        <div className="flex gap-3">
          <Card>
            <CardHeader className="p-8 flex items-center justify-center w-[23vw]">
              <CardTitle className=" text-4xl">0</CardTitle>
              <CardDescription>Assessments</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="p-8 flex items-center justify-center w-[23vw]">
              <CardTitle className=" text-4xl">0</CardTitle>
              <CardDescription>Assessed (20%)</CardDescription>
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
                <p className="text-xs mt-1">No Copying: 0 (0%)</p>
                <p className="text-xs mt-1">Light Copying: 0 (0%)</p>
                <p className="text-xs mt-1">Heavy Copying: 0 (0%)</p>
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
              {results.map((result) => (
                <TableRow key={result.email}>
                  <TableCell>{result.name}</TableCell>
                  <TableCell>{result.email}</TableCell>
                  <TableCell>{result.status}</TableCell>
                  <TableCell>{result.assessmentDate}</TableCell>
                  <TableCell>{result.timeTaken}</TableCell>
                  <TableCell>{result.score}</TableCell>
                  <TableCell
                    className={`${
                      result.cheating === "No Copying"
                        ? "text-green-500"
                        : result.cheating === "Light Copying"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {result.cheating}
                  </TableCell>
                  <TableCell>
                    <Button
                      className="bg-primary-foreground text-primary-background px-5 py-1 rounded-lg"
                      onClick={() =>
                        navigate(
                          window.location.pathname + "/c/" + result.id
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
