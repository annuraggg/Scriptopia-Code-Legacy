import { Input } from "@/components/ui/input";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
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

type metaType = {
  lastUpdated: string;
  categories: Category[];
  tags: Tag[];
};

type Problem = {
  id: string;
  title: string;
  difficulty: string;
  tags: string[];
  lastUpdated: string;
  solution?: boolean;
  completion?: {
    totalCases: number;
    passedCases: number;
  };
};

type Category = {
  value: string;
  label: string;
};

type Tag = {
  value: string;
  label: string;
};

const ChallengeCompass = () => {
  const [openCategory, setOpenCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");

  const [openTags, setOpenTags] = useState(false);
  const [tagsValue, setTagsValue] = useState("");

  const meta: metaType = {
    lastUpdated: "2024-02-19",
    categories: [
      { value: "arrays", label: "Arrays" },
      { value: "functions", label: "Functions" },
      { value: "objects", label: "Objects" },
      { value: "loops", label: "Loops" },
      { value: "strings", label: "Strings" },
      { value: "recursion", label: "Recursion" },
      { value: "sorting", label: "Sorting" },
      { value: "searching", label: "Searching" },
      { value: "data-structures", label: "Data Structures" },
    ],
    tags: [
      { value: "array", label: "Array" },
      { value: "binary-search", label: "Binary Search" },
      { value: "divide-and-conquer", label: "Divide and Conquer" },
      { value: "hash-table", label: "Hash Table" },
      { value: "linked-list", label: "Linked List" },
      { value: "math", label: "Math" },
      { value: "string", label: "String" },
      { value: "two-pointers", label: "Two Pointers" },
    ],
  };

  const problems: Problem[] = [
    {
      id: "1",
      title: "Two Sum",
      difficulty: "easy",
      tags: ["arrays", "searching"],
      lastUpdated: "2024-02-19",
      solution: true,
      completion: {
        totalCases: 10,
        passedCases: 10,
      },
    },
    {
      id: "2",
      title: "Add Two Numbers",
      difficulty: "medium",
      tags: ["linked-list", "math"],
      lastUpdated: "2024-02-19",
      solution: true,
      completion: {
        totalCases: 10,
        passedCases: 10,
      },
    },
    {
      id: "3",
      title: "Longest Substring Without Repeating Characters",
      difficulty: "medium",
      tags: ["hash-table", "two-pointers", "string"],
      lastUpdated: "2024-02-19",
      solution: true,
      completion: {
        totalCases: 10,
        passedCases: 10,
      },
    },
    {
      id: "4",
      title: "Median of Two Sorted Arrays",
      difficulty: "hard",
      tags: ["array", "binary-search", "divide-and-conquer"],
      lastUpdated: "2024-02-19",
      solution: true,
      completion: {
        totalCases: 10,
        passedCases: 10,
      },
    },
  ];

  return (
    <div className="mt-5 w-[65vw]">
      <div className="flex justify-between">
        <div>
          <h2>Challenge Compass</h2>
          <p className=" text-[11px] ">Last Updated: {meta.lastUpdated}</p>
        </div>
        <div className="flex gap-5">
          <Input placeholder="Search" className="ml-5 w-[250px]" />
          <Popover open={openCategory} onOpenChange={setOpenCategory}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open as unknown as boolean}
                className="w-[150px] justify-between"
              >
                {categoryValue
                  ? meta.categories.find((m) => m.value === categoryValue)
                      ?.label
                  : "Select Category"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search Categories..." />
                <CommandEmpty>No Category found.</CommandEmpty>
                <CommandGroup>
                  {meta.categories.map((category) => (
                    <CommandItem
                      key={category.value}
                      value={category.value}
                      onSelect={(currentValue) => {
                        setCategoryValue(
                          currentValue === categoryValue ? "" : currentValue
                        );
                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          categoryValue === category.label
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {category.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <Popover open={openTags} onOpenChange={setOpenTags}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open as unknown as boolean}
                className="justify-between"
              >
                {tagsValue
                  ? meta.tags.find((m) => m.value === tagsValue)?.label
                  : "Select Tag"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command>
                <CommandInput placeholder="Search Tags..." />
                <CommandEmpty>No Tags found.</CommandEmpty>
                <CommandGroup>
                  {meta.tags.map((tag) => (
                    <CommandItem
                      key={tag.value}
                      value={tag.value}
                      onSelect={(currentValue) => {
                        setTagsValue(
                          currentValue === tagsValue ? "" : currentValue
                        );
                        setOpenCategory(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          tagsValue === tag.label ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {tag.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
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
      <div className="mt-5 bg-gray-900 p-5 rounded">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Solution</TableHead>
              <TableHead>Completion</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map((problem) => (
              <TableRow key={problem.id}>
                <TableCell>{problem.title}</TableCell>
                <TableCell>{problem.difficulty}</TableCell>
                <TableCell>{problem.solution ? "Yes" : "No"}</TableCell>
                <TableCell>
                  {problem.completion
                    ? `${problem.completion.passedCases}/${problem.completion.totalCases}`
                    : "N/A"}
                </TableCell>
                <TableCell className="w-[150px] overflow-hidden line-clamp-1 text-nowrap flex items-center h-[50px]">
                  {problem.tags.map((tag, i) => (
                    <TooltipProvider>
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
      <Pagination className="mt-5">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ChallengeCompass;
