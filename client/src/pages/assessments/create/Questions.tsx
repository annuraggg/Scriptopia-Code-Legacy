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

const Questions = ({ nextTab }: { nextTab: (currentPage: string) => void }) => {
  const [questionDrawer, setQuestionDrawer] = useState(false);
  const [questionsLoading, setQuestionsLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/problems/`)
      .then((res) => {
        console.log(res.data);
        setQuestionsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setQuestionsLoading(false);
      });
  });

  const goToNext = (tab: string) => {
    nextTab(tab);
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
        <div className="absolute bottom-2 right-5">
          <Button className="mt-5 mr-5" onClick={() => goToNext("null")}>
            Back
          </Button>
          <Button className="mt-5" onClick={() => goToNext("questions")}>
            Save
          </Button>
        </div>
      </div>

      <Sheet open={questionDrawer} onOpenChange={setQuestionDrawer}>
        <SheetContent className="min-w-[40vw]">
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
            // ! Add a map function here to map through the problems
            <div className="border py-4 px-5 rounded-lg">
              <div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-5">
                    <p>Problem 1</p>
                    <Badge className="bg-green-500">Easy</Badge>
                  </div>
                  <p className=" text-gray-500 text-xs">
                    By @
                    <u className="hover:text-primary cursor-pointer duration-100 transition-all">
                      scriptopia
                    </u>
                  </p>
                </div>
                <p className=" line-clamp-2 text-sm mt-2">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Iusto eaque ullam provident veniam optio temporibus autem
                  sequi in nesciunt, minima illo at est iure suscipit ratione
                  harum blanditiis assumenda dolores!
                </p>
                <div className="flex gap-2 items-center my-3">
                  <p>Tags: </p>
                  <Badge>Array</Badge>
                  <Badge>String</Badge>
                </div>
                <Separator />
                <div className="mt-3 flex items-center justify-end">
                  <Button className="mr-3" variant="outline">
                    View
                  </Button>
                  <Button className="mr-3" variant="outline">
                    Edit
                  </Button>
                  <Button variant="outline">Add</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Questions;
