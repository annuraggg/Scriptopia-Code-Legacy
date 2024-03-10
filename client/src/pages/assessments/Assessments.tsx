import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAssessments from "./MyAssessments";
import GivenAssessments from "./GivenAssessments";

const Assessments = () => {
  return (
    <>
      <Navbar />
      <div className="py-5 px-10">
        <h1>Assessments</h1>
        <Tabs defaultValue="My" className="mt-5">
          <TabsList>
            <TabsTrigger value="My">My Assessments</TabsTrigger>
            <TabsTrigger value="Given">Assessments Taken</TabsTrigger>
          </TabsList>
          <TabsContent value="My" className="mt-3">
            <MyAssessments />
          </TabsContent>
          <TabsContent value="Given">
            <GivenAssessments />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Assessments;
