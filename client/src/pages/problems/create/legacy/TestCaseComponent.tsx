import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

const TestCaseComponent = ({
  getCases,
  goBack,
  data,
}: {
  getCases: Function;
  goBack: Function;
  data: { input: string; output: string }[];
}) => {
  const [testCases, setTestCases] = useState<
    { input: string; output: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      setTestCases(data);
    }
  }, [data]);

  const addTestCase = () => {
    setTestCases([...testCases, { input: "", output: "" }]);
  };

  const handleSave = () => {
    getCases(testCases);
  };

  return (
    <>
      <div className="w-[50vw] rounded-lg h-[80vh] overflow-y-auto relative">
        <div className="sticky bg-background top-0 p-5">
          <h3>Define Test Cases</h3>
          <Button className="mt-5" onClick={addTestCase}>
            Add Test Case
          </Button>
        </div>
        <div className="mt-5">
          {testCases.map((testCase, index) => (
            <div key={index} className="flex flex-col gap-2 mb-3">
              <p>Test Case {index + 1}</p>
              <div className="flex gap-5">
                <Input
                  type="text"
                  placeholder="Input"
                  value={testCase.input}
                  onChange={(e) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].input = e.target.value;
                    setTestCases(newTestCases);
                  }}
                />
                <Input
                  type="text"
                  placeholder="Output"
                  value={testCase.output}
                  onChange={(e) => {
                    const newTestCases = [...testCases];
                    newTestCases[index].output = e.target.value;
                    setTestCases(newTestCases);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button onClick={() => goBack(2)}>&lt; Problem Details</Button>
      <Button onClick={handleSave}>&gt; Submit</Button>
    </>
  );
};

export default TestCaseComponent;
