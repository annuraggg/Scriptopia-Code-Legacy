import { Navbar } from "@/components/ui/navbar";
import { ArrowLeftIcon } from "lucide-react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import All from "./All";

const modules = {};

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

const CourseName = () => {
  return (
    <>
      <Navbar />
      <div className="px-10 py-5 flex items-center justify-center flex-col">
        <div className="text-white bg-gradient-to-r from-indigo-900 relative to-purple-800 rounded flex flex-col items-center justify-center w-full h-[30vh]">
          <ArrowLeftIcon className="h-8 w-8 absolute z-50 top-5 left-5 bg-white bg-opacity-20 p-2 rounded-full cursor-pointer hover:bg-opacity-30 transition-all duration-200" />
          <div>
            <p className="text-xs">Unlock Your Web Potential With</p>
            <h1 className="text-4xl">JavaScript Roadmap</h1>
          </div>
        </div>
        <div className=" self-start w-full mt-5">
          <All />
        </div>
      </div>
    </>
  );
};

export default CourseName;
