import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import Problem from "@/types/Problem";
import { Badge } from "@/components/ui/badge";
import { Delta } from "quill/core";
import axios from "axios";
import CreateProblem from "./Question/CreateProblem";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Questions = ({
  selectedQuestions,
  setSelectedQuestions,
}: {
  selectedQuestions: Problem[];
  setSelectedQuestions: (questions: Problem[]) => void;
}) => {
  const [questionDrawer, setQuestionDrawer] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Problem[]>([]);
  const [currQuest, setCurrQuest] = useState<Problem>({} as Problem);
  const [questionEditorOpen, setQuestionEditorOpen] = useState(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/problems/`)
      .then((res) => {
        setQuestions(res.data);
        setQuestionsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setQuestionsLoading(false);
      });
  }, [questionDrawer]);

  return (
    <div>
      <h2>Questions</h2>
      <p>Questions for the assessment.</p>
      <div className="my-5">
        <Button
          onClick={() => {
            setQuestionDrawer(true);
          }}
        >
          Add Question
        </Button>
      </div>

      <Separator />

      {selectedQuestions.map((question: Problem, i: number) => {
        return (
          <div className="mt-5">
            <div className="flex border p-5 mt-2 rounded-lg items-center">
              <div className="flex items-center">
                <div>
                  <p className=" text-xs text-gray-400">Question {i + 1}</p>
                  <h3>{question.title}</h3>
                  <p className="w-[95%] line-clamp-2">
                    {question.description?.ops
                      ?.map((op: Delta) => op.insert)
                      .join("")}
                  </p>
                </div>
                <div className="mr-5 w-[150px]">
                  <p className="bg-secondary px-3 py-2 rounded-lg text-center w-[150px]">
                    Total Score:{" "}
                    {question.testCases?.reduce(
                      (acc, curr) => acc + curr.score,
                      0
                    )}
                  </p>
                  <p className="bg-secondary px-3 py-2 mt-2 rounded-lg text-center w-[150px]">
                    Cases: {question.testCases?.length}
                  </p>
                </div>
              </div>
              <div className="ml-auto">
                <div className="flex gap-3 items-center justify-center">
                  <div className="p-2 bg-green-500 rounded-lg hover:scale-110 transition-all duration-100 cursor-pointer">
                    <IoIosArrowUp
                      onClick={() => {
                        if (i !== 0) {
                          const temp = selectedQuestions[i];
                          selectedQuestions[i] = selectedQuestions[i - 1];
                          selectedQuestions[i - 1] = temp;
                          setSelectedQuestions([...selectedQuestions]);
                        }
                      }}
                    />
                  </div>
                  <div className="p-2 bg-green-500 rounded-lg hover:scale-110 transition-all duration-100 cursor-pointer">
                    <IoIosArrowDown
                      onClick={() => {
                        if (i !== selectedQuestions.length - 1) {
                          const temp = selectedQuestions[i];
                          selectedQuestions[i] = selectedQuestions[i + 1];
                          selectedQuestions[i + 1] = temp;
                          setSelectedQuestions([...selectedQuestions]);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex gap-3 items-center justify-center mt-3">
                  <div className="p-2 bg-red-500 rounded-lg hover:scale-110 transition-all duration-100 cursor-pointer">
                    <MdDelete
                      onClick={() => {
                        setSelectedQuestions(
                          selectedQuestions.filter(
                            (q) => q._id !== question._id
                          )
                        );
                      }}
                    />
                  </div>
                  <div className="p-2 bg-primary rounded-lg hover:scale-110 transition-all duration-100 cursor-pointer">
                    <MdEdit
                      onClick={() => {
                        setCurrQuest(question);
                        setQuestionEditorOpen(true);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <Sheet open={questionDrawer} onOpenChange={setQuestionDrawer}>
        <SheetContent className="min-w-[40vw] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Problem Library</SheetTitle>
            <SheetDescription>
              Select a problem from the library to add to the assessment or
              create a new problem.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-5 mb-5">
            <Input placeholder="Search Problems" />
          </div>
          {questionsLoading ? (
            <div className="flex justify-center mt-10">
              <ReloadIcon className="animate-spin h-6 w-6" />
            </div>
          ) : (
            questions?.map((question) => {
              // render only if the question is not already selected
              if (
                selectedQuestions.find((q) => q._id === question._id) ===
                undefined
              ) {
                return (
                  <div className="border py-4 px-5 rounded-lg mt-5">
                    <div>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-5">
                          <p className="w-72 truncate ">{question?.title}</p>
                        </div>
                        <Badge className="bg-green-500">Easy</Badge>
                        <p className=" text-gray-500 text-xs w-32 truncate ">
                          By @
                          <u className="hover:text-primary cursor-pointer duration-100 transition-all">
                            {question?.author}
                          </u>
                        </p>
                      </div>
                      <p className=" line-clamp-2 text-sm mt-2">
                        {question?.description?.ops
                          ?.map((op: Delta) => op.insert)
                          .join("")}
                      </p>
                      <div className="flex gap-2 items-center my-3">
                        <p>Tags: </p>
                        {question?.tags?.map((tag: string, i: number) => {
                          return (
                            i < 5 && (
                              <Badge key={tag} className="bg-primary">
                                {tag}
                              </Badge>
                            )
                          );
                        })}
                      </div>
                      <Separator />
                      <div className="mt-3 flex items-center justify-end">
                        <Button
                          variant="outline"
                          onClick={() => {
                            if (
                              !selectedQuestions.find(
                                (q) => q._id === question._id
                              )
                            ) {
                              setSelectedQuestions([
                                ...selectedQuestions,
                                question,
                              ]);
                            }

                            setQuestionDrawer(false);
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={questionEditorOpen} onOpenChange={setQuestionEditorOpen}>
        <DialogContent className="h-[90vh] m min-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
          </DialogHeader>
          <div className="">
            <CreateProblem
              addQuest={(q: Problem) => {
                setSelectedQuestions((prev) => {
                  const index = prev.findIndex((quest) => quest._id === q._id);
                  if (index !== -1) {
                    prev[index] = q;
                    return prev;
                  }
                  return [...prev, q];
                });
                setSelectedQuestions([...selectedQuestions, q]);
                setQuestionEditorOpen(false);
              }}
              currQuest={currQuest}
              allQuestions={questions}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Questions;
