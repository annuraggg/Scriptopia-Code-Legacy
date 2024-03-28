import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import CreateProblem from "./Question/CreateProblem";

const Questions = ({
  nextTab,
  data,
  setData,
}: {
  nextTab: (currentPage: string, data: any) => void;
  data: any;
  setData: any;
}) => {

  const [questionDrawer, setQuestionDrawer] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currQuest, setCurrQuest] = useState<any>(null);

  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setSelectedQuestions(data);
    }
  }, []);

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

  const goToNext = (tab: string) => {
    nextTab(tab, null);
  };

  const addQuest = (question: any) => {
    setSelectedQuestions([...selectedQuestions, question]);
  };

  const save = () => {
    setData(selectedQuestions);
    goToNext("questions");
  };

  return (
    <div className="flex h-[80vh]">
      <div className=" border-r w-[20%] h-full relative">
        <div className="border p-5 border-r-0">
          <div className="flex items-center">
            <p>Added Questions</p>
            <div
              onClick={() => setQuestionDrawer(true)}
              className="ml-auto rounded-full h-5 w-5 flex items-center justify-center hover:bg-primary cursor-pointer duration-100 transition-all"
            >
              <p className="mt-[-4px]">+</p>
            </div>
          </div>
        </div>
        <div>
          {selectedQuestions.map((question) => {
            return (
              <div
                className="py-4 px-5 border-r-0 cursor-pointer hover:bg-gray-900 transition-all duration-300"
                onClick={() => {
                  setCurrQuest(question);
                }}
              >
                <div className="flex items-center">
                  <p className="line-clamp-1">{question.title}</p>
                  <div className="ml-auto rounded-full h-5 w-5 flex items-center justify-center hover:scale-125 p-4  cursor-pointer duration-100 transition-all">
                    <p>
                      <Trash
                        size="14"
                        className=" text-red-500"
                        onClick={() => {
                          setSelectedQuestions(
                            selectedQuestions.filter(
                              (q) => q._id !== question._id
                            )
                          );
                        }}
                      />
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="absolute bottom-2 right-5">
          <Button className="mt-5 mr-5" onClick={() => goToNext("null")}>
            Back
          </Button>
          <Button className="mt-5" onClick={() => save()}>
            Save
          </Button>
        </div>
      </div>

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
                        {question.description.ops.map((op: any) => {
                          if (op.insert) {
                            return op.insert;
                          }
                        })}
                      </p>
                      <div className="flex gap-2 items-center my-3">
                        <p>Tags: </p>
                        {question?.tags.map((tag: string, i: number) => {
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

      <div className="p-5">
        <CreateProblem
          addQuest={addQuest}
          currQuest={currQuest}
          allQuestions={questions}
        />
      </div>
    </div>
  );
};

export default Questions;
