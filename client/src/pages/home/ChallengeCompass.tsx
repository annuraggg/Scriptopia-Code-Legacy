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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  pages,
  currentPage,
  setCurrentPage,
  setPrevPage,
  loading,
}: {
  problems: Problem[];
  pages: number;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  setPrevPage: (value: number) => void;
  loading: boolean;
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(problems);
  }, [problems]);

  return (
    <div className="mt-5 w-[65vw]">
      <div className="flex justify-between">
        <div>
          <h2>Challenge Compass</h2>
        </div>
        <div className="flex gap-5">
          <Input placeholder="Search" className="ml-5 w-[250px]" />
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {loading ? (
        <div className="mt-16 h-[62vh]w-[65vw] flex items-center justify-center">
          <ReloadIcon className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="mt-5 bg-primary-foreground p-5 rounded shadow-md">
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
      )}
      <Pagination className="mt-5">
        <PaginationContent className="cursor-pointer">
          <PaginationPrevious
            onClick={() => {
              setPrevPage(currentPage);
              setCurrentPage(currentPage - 1);
            }}
          >
            Previous
          </PaginationPrevious>
          {Array.from({ length: pages }, (_, i) => i + 1).map((page) => (
            <PaginationItem
              className="cursor-pointer"
              key={page}
              onClick={() => {
                setPrevPage(currentPage);
                setCurrentPage(page);
              }}
            >
              <PaginationLink isActive={currentPage === page}>
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext
            onClick={() => {
              setPrevPage(currentPage);
              setCurrentPage(currentPage + 1);
            }}
          >
            Next
          </PaginationNext>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ChallengeCompass;
