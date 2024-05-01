import { Button } from "@/components/ui/button";
import { Case } from "@/types/TestCase";
import { Delta } from "quill/core";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { TiTick, TiTimes } from "react-icons/ti";

const QualityGate = ({
  tags,
  statement,
  testCases,
  isPublic,
  submit,
}: {
  tags: string[];
  statement: Delta;
  testCases: Case[];
  isPublic: boolean;
  submit: () => void;
}) => {
  const totalCases = testCases?.length;
  const sampleCases = testCases?.filter((testCase) => testCase.isSample).length;
  const tagsCount = tags?.length;
  const descriptionLength = statement?.ops
    ?.map((op) => op?.insert)
    ?.join("")?.length;

  console.log(descriptionLength);

  const totalFactors = 4;
  const done = calcFactors();

  function calcFactors() {
    let done = 0;
    if (totalCases >= 3) done++;
    if (sampleCases >= 2) done++;
    if (tagsCount >= 2) done++;
    if (descriptionLength >= 100) done++;

    return done;
  }

  return (
    <div className=" h-full flex flex-col items-center justify-center">
      <h3>Quality Gate Check</h3>
      <p>A Quality Gate of 4 is required for posting a question as public</p>

      <CircularProgressbar
        value={done}
        text={`${done} / ${totalFactors}`}
        className="h-24 w-24 mt-8"
        maxValue={totalFactors}
        styles={buildStyles({
          pathColor: totalFactors === done ? "#3ae374" : "#f7b71d",
        })}
      />

      <div>
        <div className="flex gap-3 items-center mt-10">
          {totalCases >= 3 ? (
            <TiTick className=" text-green-500" />
          ) : (
            <TiTimes className=" text-red-500" />
          )}
          <p>3 - 15 Test Cases Recommended</p>
        </div>

        <div className="flex gap-3 items-center">
          {sampleCases >= 2 ? (
            <TiTick className=" text-green-500" />
          ) : (
            <TiTimes className=" text-red-500" />
          )}
          <p>Atleast 2 Sample Cases are Required</p>
        </div>

        <div className="flex gap-3 items-center">
          {tagsCount >= 2 ? (
            <TiTick className=" text-green-500" />
          ) : (
            <TiTimes className=" text-red-500" />
          )}
          <p>2 Tags Per Question is Recommended</p>
        </div>

        <div className="flex gap-3 items-center">
          {descriptionLength >= 100 ? (
            <TiTick className=" text-green-500" />
          ) : (
            <TiTimes className=" text-red-500" />
          )}
          <p>Minimum 100 words of statement is recommended</p>
        </div>
      </div>

      <Button
        className="mt-10"
        disabled={isPublic ? done < totalFactors : false}
        onClick={() => submit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default QualityGate;
