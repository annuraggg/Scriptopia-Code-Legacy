import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAssessments from "./MyScreenings";
import GivenAssessments from "./GivenScreenings";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Screenings = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="py-5 px-10">
        <div className="flex">
          <h1>Screenings</h1>
          <IoMdInformationCircleOutline size="12" className="cursor-pointer" onClick={() => navigate("docs/screening")} />
        </div>
        <Tabs defaultValue="My" className="mt-5">
          <TabsList>
            <TabsTrigger value="My">My Screenings</TabsTrigger>
            <TabsTrigger value="Given">Screenings Taken</TabsTrigger>
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

export default Screenings;
