import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAssessments from "./MyScreenings";
import GivenAssessments from "./GivenScreenings";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";

const Screenings = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="py-5 px-10">
        <div className="flex">
          <h1>Screenings</h1>
          <IoMdInformationCircleOutline
            size="12"
            className="cursor-pointer"
            onClick={() => navigate("docs/screening")}
          />
        </div>
        <Alert className=" my-3">
          <RocketIcon className="h-4 w-4" />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>
            To Learn More about Screenings, click{" "}
            <a
              onClick={() => navigate("docs/screening")}
              className="text-primary underline cursor-pointer"
            >
              here
            </a>
            .
          </AlertDescription>
        </Alert>

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
