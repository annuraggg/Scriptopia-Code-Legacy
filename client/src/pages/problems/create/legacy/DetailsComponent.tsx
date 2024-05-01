/* eslint-disable react-hooks/exhaustive-deps */
import { Input } from "@/components/ui/input";
import Quill from "quill";
import "quill/dist/quill.core.css";
import { ToolbarConfig } from "quill/modules/toolbar";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { Button } from "@/components/ui/button";
import { Delta } from "quill/core";

const DetailsComponent = ({
  requestNext,
  respondNext,
  data,
}: {
  requestNext: boolean;
  respondNext: (allowed: boolean, data: unknown) => void;
  data: {
    name: string;
    time: string;
    difficulty: "easy" | "medium" | "hard";
    tags: string[];
    description: string;
  };
}) => {
  const [name, setName] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">(
    "easy"
  );
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setName(data.name);
      setTime(data.time);
      setDifficulty(data.difficulty);
      setTags(data.tags);
      const quill = new Quill("#editor");
      quill.setContents(data.description as unknown as Delta);
    }
  }, [data]);

  useEffect(() => {
    if (requestNext) goToNext();
  }, [requestNext]);

  const goToNext = (): boolean => {
    if (verifyFields()) {
      const desc = new Quill("#editor").getContents();
      const data = {
        name,
        time,
        difficulty,
        tags,
        description: desc,
      };
      respondNext(true, data);
      return true;
    }

    respondNext(false, null);
    return false;
  };

  const verifyFields = (): boolean => {
    if (!name || !time || !difficulty || !tags.length) return false;
    const quill = new Quill("#editor");
    const description: Delta = quill.getContents();
    if (description.ops.length === 1 && description.ops[0].insert === "\n\n")
      return false;

    return true;
  };

  const toolbarOptions: ToolbarConfig = [
    [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["code-block"],
    ["link", "image"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["clean"], // remove formatting button
  ];

  useEffect(() => {
    new Quill("#editor", {
      theme: "snow",
      placeholder: "Write your problem description here...",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }, []);

  return (
    <div className=" overflow-y-auto h-[77vh] pr-16">
      <h5>Problem Details</h5>

      <div className="mt-5">
        <p>
          Question Name <span className="text-red-500">*</span>
          <Input
            placeholder="Enter Question Name"
            className="w-[60vw] mt-2"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </p>
      </div>

      <div className="flex gap-5 items-center mt-10">
        <div>
          <p className="mb-3">
            Difficulty <span className="text-red-500">*</span>
          </p>
          <Select
            onValueChange={(e: "easy" | "medium" | "hard") => setDifficulty(e)}
            value={difficulty}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Easy" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy" defaultChecked>
                Easy
              </SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-3">
            Time Limit <span className="text-red-500">*</span>
          </p>
          <Input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Enter Recommended Time"
            className="w-[200px] mt-2"
          />
        </div>
      </div>

      <div className="mt-10">
        <TagsInput value={tags} onChange={(tags) => setTags(tags)} />
        <em className="text-xs">
          Press enter to add a tag. Click on a tag to remove it.
        </em>
      </div>

      <div className="mt-10">
        <p>
          Problem Description <span className="text-red-500">*</span>
        </p>
        <div className="border shadow-sm border-input h-[43vh] mt-2 rounded p-1 overflow-auto">
          <div className=" h-min" id="editor"></div>
        </div>
      </div>

      <Button onClick={() => goToNext()} className="mt-10 float-right">
        Next
      </Button>
    </div>
  );
};

export default DetailsComponent;
