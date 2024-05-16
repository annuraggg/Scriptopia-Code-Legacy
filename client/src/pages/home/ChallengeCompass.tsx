import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
  lastUpdated: string;
};

const ChallengeCompass = ({
  problems,
  filter,
  problemsLoading,
  loadMore,
}: {
  problems: Problem[];
  filter: (difficulty: string, search: string) => void;
  problemsLoading: boolean;
  loadMore: () => void;
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("all");

  const evalSearch = () => {
    filter(difficulty, search);
  };

  return (
    <div className="mt-5 w-[65vw] animate__animated animate__fadeIn">
      <div className="flex justify-between">
        <div>
          <h2>Challenge Compass</h2>
        </div>
        <div className="flex gap-5">
          <Input
            placeholder="Search"
            className="ml-5 w-[250px]"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />

          <Select
            value={difficulty}
            onValueChange={(difficulty) => {
              setDifficulty(difficulty);
            }}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="default" onClick={() => evalSearch()}>
            Search
          </Button>
        </div>
      </div>
      <div className="mt-5 bg-card p-5 rounded-xl shadow-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => (
              <TableRow
                key={problem.id}
                className="cursor-pointer"
                onClick={() => navigate(`/editor/${problem.id}`)}
              >
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell className="w-[250px] overflow-hidden line-clamp-1 text-nowrap flex items-center h-[50px]">
                  {problem.tags.map((tag, i) => (
                    <TooltipProvider key={tag}>
                      <Tooltip>
                        <TooltipTrigger>
                          <Badge key={i} variant="outline" className="mr-2">
                            {tag}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent className=" bg-background border">
                          {problem.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="outline"
                              className={`${
                                i === problem.tags.length - 1 ? "" : "mr-2"
                              }`}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="text-gray-500 float-right mt-5 cursor-pointer">
        {problemsLoading ? (
          <ReloadIcon className="animate-spin" />
        ) : (
          <p onClick={loadMore}>Load More</p>
        )}
      </div>
    </div>
  );
};

export default ChallengeCompass;
