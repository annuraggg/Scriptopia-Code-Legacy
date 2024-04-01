import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Terminal = () => {
  return (
    <div className="bg-primary-foreground rounded h-[40vh] overflow-auto">
      <div className="bg-secondary p-3 rounded-tl-none flex justify-between items-center">
        <p>Terminal</p>
      </div>
      <div className="rounded-b bg-secondary px-5 pb-5 h-full">
        <Tabs defaultValue="caseOne" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="caseOne">Case 1</TabsTrigger>
            <TabsTrigger value="caseTwo">Case 2</TabsTrigger>
            <TabsTrigger value="caseThree">Case 3</TabsTrigger>
          </TabsList>
          <TabsContent value="caseOne">Case 1 content here.</TabsContent>
          <TabsContent value="caseTwo">Case 2 content here.</TabsContent>
          <TabsContent value="caseThree">Case 3 content here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Terminal;
