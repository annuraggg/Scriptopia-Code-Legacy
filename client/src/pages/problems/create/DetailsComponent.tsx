import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Quill from "quill";
import { ToolbarConfig } from "quill/modules/toolbar";
import { useEffect, useState } from "react";
import TagsInput from "react-tagsinput";

const DetailsComponent = () => {
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    const toolbarOptions: ToolbarConfig = [
      [{ header: 1 }, { header: 2 }, { header: 3 }], // custom button values
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["code-block"],
      ["link", "image"],

      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      ["clean"],
    ];

    new Quill("#editor", {
      theme: "snow",
      placeholder: "Write your problem description here...",
      modules: {
        toolbar: toolbarOptions,
      },
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-xs">
          Question Name <span className="text-red-500">*</span>
        </p>
        <Input placeholder="Enter question name" className="w-full" />
      </div>

      <div className="flex gap-5 mt-5">
        <div className="flex flex-col gap-2 mt-3 w-full">
          <p className="text-xs">
            Difficulty <span className="text-red-500">*</span>
          </p>
          <Select>
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
            Recommended Time <span className="text-red-500">*</span>
          </p>
          <Input
            placeholder="Enter Recommended Time"
            type="number"
            className="w-full"
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
