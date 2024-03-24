import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

const General = ({
  nextTab,
  data,
}: {
  nextTab: (currentTab: string, data: any) => void;
  data: any;
}) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number | undefined>(undefined);
  const [allowAutocomplete, setAllowAutocomplete] = useState<boolean>(false);
  const [allowRunCode, setAllowRunCode] = useState<boolean>(false);
  const [allowSyntaxHighlighting, setAllowSyntaxHighlighting] =
    useState<boolean>(false);
  const [range, setRange] = useState<DateRange | undefined>(undefined);
  const [fromTime, setFromTime] = useState<string>("");
  const [toTime, setToTime] = useState<string>("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setDescription(data.description);
      setTimeLimit(data.timeLimit);
      setAllowAutocomplete(data.allowAutocomplete);
      setAllowRunCode(data.allowRunCode);
      setAllowSyntaxHighlighting(data.allowSyntaxHighlighting);
      setRange(data.range);
      setFromTime(data.fromTime);
      setToTime(data.toTime);
    }
  }, [data]);

  const goToNext = () => {
    const data = {
      name,
      description,
      timeLimit,
      allowAutocomplete,
      allowRunCode,
      allowSyntaxHighlighting,
      range,
      fromTime,
      toTime,
    };

    nextTab("general", data);
  };

  return (
    <div className="mt-5 w-[95vw]">
      <div className="flex w-full gap-10">
        <div className="w-full">
          <h2>General</h2>
          <div className="flex flex-col gap-3 mt-5">
            <p>Screening Name</p>
            <Input
              placeholder="Enter screening name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <p>Description </p>
            <Textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-3 mt-5">
            <p>Time Limit (In Minutes) </p>
            <Input
              placeholder="Limit"
              type="number"
              className="w-20"
              value={timeLimit}
              onChange={(e) => setTimeLimit(parseInt(e.target.value))}
            />
          </div>

          <div className="flex gap-3 mt-10">
            <Checkbox
              checked={allowAutocomplete}
              onCheckedChange={() => setAllowAutocomplete(!allowAutocomplete)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Allow Autocomplete
            </label>
          </div>

          <div className="flex gap-3 mt-5">
            <Checkbox
              checked={allowRunCode}
              onCheckedChange={() => setAllowRunCode(!allowRunCode)}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Allow to Run Code
            </label>
          </div>

          <div className="flex gap-3 mt-5">
            <Checkbox
              checked={allowSyntaxHighlighting}
              onCheckedChange={() =>
                setAllowSyntaxHighlighting(!allowSyntaxHighlighting)
              }
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Allow Syntax Highlighting
            </label>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 mt-5 px-10">
          <div>
            <p>Test Open Range</p>

            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              className="rounded-md mt-3"
            />

            <div className="flex gap-5 items-center justify-center">
              <div className="flex flex-col gap-3 mt-5">
                <p>From Time </p>
                <Input
                  type="time"
                  value={fromTime}
                  onChange={(e) => setFromTime(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-3 mt-5">
                <p>To Time </p>
                <Input
                  type="time"
                  value={toTime}
                  onChange={(e) => setToTime(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button className="mt-10 float-right" onClick={goToNext}>
        Save  
      </Button>
    </div>
  );
};

export default General;
