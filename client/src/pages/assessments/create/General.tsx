import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DateRange } from "react-day-picker";

const General = ({
  name,
  setName,
  description,
  setDescription,
  timeLimit,
  setTimeLimit,
  allowAutocomplete,
  setAllowAutocomplete,
  allowRunCode,
  setAllowRunCode,
  allowSyntaxHighlighting,
  setAllowSyntaxHighlighting,
  range,
  setRange,
  fromTime,
  setFromTime,
  toTime,
  setToTime,
  passingPercentage,
  setPassingPercentage,
}: {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  timeLimit: number;
  setTimeLimit: (timeLimit: number) => void;
  allowAutocomplete: boolean;
  setAllowAutocomplete: (allowAutocomplete: boolean) => void;
  allowRunCode: boolean;
  setAllowRunCode: (allowRunCode: boolean) => void;
  allowSyntaxHighlighting: boolean;
  setAllowSyntaxHighlighting: (allowSyntaxHighlighting: boolean) => void;
  range: DateRange;
  setRange: (range: DateRange) => void;
  fromTime: string;
  setFromTime: (fromTime: string) => void;
  toTime: string;
  setToTime: (toTime: string) => void;
  passingPercentage: number;
  setPassingPercentage: (passingPercentage: number) => void;
}) => {
  return (
    <div className="mt-5 w-[95vw]">
      <div className="flex w-full gap-10">
        <div className="w-full bg-primary-foreground p-10 rounded-lg">
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
              className="h-[190px]"
            />
          </div>

          <div className="flex flex-col gap-10 mt-10 justify-between">
            <div className="flex gap-10 items-center">
              <p>Time Limit (In Minutes) </p>
              <Input
                placeholder="Limit"
                type="number"
                className="w-20"
                value={timeLimit}
                onChange={(e) => setTimeLimit(parseInt(e.target.value))}
              />

              <p>Passing Percentage</p>
              <Input
                placeholder="Percentage"
                type="number"
                className="w-40"
                value={passingPercentage}
                onChange={(e) => setPassingPercentage(parseInt(e.target.value))}
              />
            </div>

            <div className="flex gap-10">
              <div className="flex gap-3">
                <Checkbox
                  checked={allowAutocomplete}
                  onCheckedChange={() =>
                    setAllowAutocomplete(!allowAutocomplete)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Allow Autocomplete
                </label>
              </div>

              <div className="flex gap-3">
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

              <div className="flex gap-3">
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
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-3 px-10 py-5 bg-primary-foreground rounded-lg">
          <div>
            <p>Test Open Range</p>

            <Calendar
              mode="range"
              selected={range}
              onSelect={(range) => setRange(range as DateRange)}
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
    </div>
  );
};

export default General;
