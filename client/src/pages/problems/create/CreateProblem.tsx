import { Navbar } from "@/components/ui/navbar";
import StatementComponent from "./StatementComponent";
import SolutionComponent from "./SolutionComponent";
const CreateProblem = () => {

  return (
    <>
      <Navbar />
      <div className="flex gap-5 px-5 h-[90vh] overflow-y-auto flex-col md:flex-row">
        <StatementComponent />
        <SolutionComponent />
      </div>
    </>
  );
};

export default CreateProblem;
