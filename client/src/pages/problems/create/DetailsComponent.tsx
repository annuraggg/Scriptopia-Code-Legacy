import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import Quill from "quill";
import { Delta } from "quill/core";
import { useEffect } from "react";
import TagsInput from "react-tagsinput";

const DetailsComponent = ({
  questionName,
  setQuestionName,
  difficulty,
  setDifficulty,
  recommendedTime,
  setRecommendedTime,
  tags,
  setTags,
  description,
  setDescription,
  isPrivate,
  setIsPrivate,
  useAllowed,
  setUseAllowed,
}: {
  questionName: string;
  setQuestionName: (value: string) => void;
  difficulty: "easy" | "medium" | "hard";
  setDifficulty: (value: "easy" | "medium" | "hard") => void;
  recommendedTime: number;
  setRecommendedTime: (value: number) => void;
  tags: string[];
  setTags: (value: string[]) => void;
  description: Delta;
  setDescription: (value: Delta) => void;
  isPrivate: boolean;
  setIsPrivate: (value: boolean) => void;
  useAllowed: boolean;
  setUseAllowed: (value: boolean) => void;
}) => {
  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
      placeholder: "Write your problem description here...",
      modules: {
        toolbar: [
          [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
          ["bold", "italic", "underline", "strike"], // toggled buttons
          ["code-block"],
          ["link", "image"],

          [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
          ["clean"],
        ],
      },
    });

    quill.setContents(description);
    quill.on("text-change", () => {
      console.log("text-change");
      setDescription(quill.getContents());
    });

    return () => {
      quill.off("text-change");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs">
          Question Name <span className="text-red-500">*</span>
        </p>
        <Input
          placeholder="Enter question name"
          className="w-full"
          value={questionName}
          onChange={(e) => setQuestionName(e.target.value)}
        />
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col gap-2 mt-5">
          <p className="text-xs">
            Is this a Private Question? <span className="text-red-500">*</span>
          </p>
          <Switch onCheckedChange={setIsPrivate} checked={isPrivate} />
        </div>

        {isPrivate && (
          <div className="flex flex-col gap-2 mt-5">
            <p className="text-xs">
              Allow to be used in interview?{" "}
              <span className="text-red-500">*</span>
            </p>
            <Switch onCheckedChange={setUseAllowed} checked={useAllowed} />
          </div>
        )}
      </div>

      <div className="flex gap-5 mt-5">
        <div className="flex flex-col gap-2 mt-3 w-full">
          <p className="text-xs">
            Difficulty <span className="text-red-500">*</span>
          </p>
          <Select
            value={difficulty}
            onValueChange={(value) =>
              setDifficulty(value as "easy" | "medium" | "hard")
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 mt-3 w-full">
          <p className="text-xs">
            Recommended Time (In Minutes) <span className="text-red-500">*</span>
          </p>
          <Input
            placeholder="Enter Recommended Time"
            type="number"
            className="w-full"
            value={recommendedTime}
            onChange={(e) => setRecommendedTime(parseInt(e.target.value))}
          />
        </div>

        <div className="flex flex-col gap-2 mt-3 w-full">
          <p className="text-xs">
            Tags <span className="text-red-500">*</span>
          </p>
          <TagsInput value={tags} onChange={(tags) => setTags(tags)} />
          <em className="text-xs">
            Press enter to add a tag. Click on a tag to remove it.
          </em>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3 w-full">
        <p className="text-xs">
          Problem Statement <span className="text-red-500">*</span>
        </p>
        <div className="border shadow-sm border-input h-[43vh] mt-2 rounded p-1 overflow-auto">
          <div className=" h-min" id="editor"></div>
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
