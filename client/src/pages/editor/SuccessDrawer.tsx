import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { MdAccessTime, MdMemory } from "react-icons/md";
import Problem from "@/types/Problem";
import { Separator } from "@/components/ui/Separator";
import { Badge } from "@/components/ui/badge";
/*import { AxisOptions, Chart } from "react-charts";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
  CategoryScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";
*/

const SuccessDrawer = ({
  memoryUsed,
  timeTaken,
  open,
  setOpen,
  recommendation,
  memoryData,
  timeData,
}: {
  memoryUsed: number;
  timeTaken: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  recommendation: Problem;
  memoryData: {
    percent: number;
    avg: number;
  };
  timeData: {
    percent: number;
    avg: number;
  };
}) => {
  const dateAndTime = new Date().toLocaleString();

  // ! UNCOMMENT THIS TO USE CHARTJS
  /* 
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
  );

 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Time Taken",
      },
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const memoryData = {
    labels: ["0-20MB", "20-40MB", "40-60MB", "60-80MB", "80-100MB", ">100MB"],
    datasets: [
      {
        label: "Number of Users",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "white",
      },
    ],
  };

  const timeData = {
    labels: ["0-20ms", "20-40ms", "40-60ms", "60-80ms", "80-100ms", ">100ms"],
    datasets: [
      {
        label: "Number of Users",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "white",
      },
    ],
  };
*/
  return (
    <Drawer shouldScaleBackground open={open}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Solution Accepted!</DrawerTitle>
          <DrawerDescription>Submitted at {dateAndTime}</DrawerDescription>

          <div className="flex items-center justify-center flex-col gap-5">
            <div className="flex gap-5">
              {/*}
              <div className="flex gap-10 w-[100vw] h-[27vh] justify-center items-center">
                <Bar data={memoryData} options={options} />
                <Bar data={timeData} options={options} />
              </div>
            {*/}
              <div className="flex gap-5">
                <div
                  className={`flex gap-5 items-center justify-center p-5 rounded-lg w-[400px] border-2 ${
                    memoryData?.percent < 30
                      ? "border-red-800"
                      : memoryData?.percent < 60
                      ? "border-yellow-800"
                      : "border-green-800"
                  } `}
                >
                  <MdMemory size="40px" />
                  <div>
                    <h5>Memory Usage</h5>
                    <p>{parseFloat(memoryUsed.toFixed(2))} MB</p>
                    <p className="text-xs">
                      Your Solution is {memoryData.percent.toFixed(2)}% more efficient
                      than others
                    </p>
                    <p className="text-xs">Average Memory Usage: {memoryData.avg.toFixed(2)}MB</p>
                  </div>
                </div>
                <div
                  className={`flex gap-5 items-center justify-center p-5 rounded-lg w-[400px] border-2 ${
                    timeData?.percent < 30
                      ? "border-red-800"
                      : timeData?.percent < 60
                      ? "border-yellow-800"
                      : "border-green-800"
                  }`}
                >
                  <MdAccessTime size="40px" />
                  <div>
                    <h5>Time Taken</h5>
                    <p>{parseFloat(timeTaken.toFixed(2))}ms</p>
                    <p className="text-xs">
                      Your Solution is {timeData.percent.toFixed(2)}% more efficient
                      than others
                    </p>
                    <p className="text-xs">
                      Average Time Taken: {timeData.avg.toFixed(2)}ms
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div
              className="flex gap-5"
              onClick={() => {
                window.location.href = `/editor/${recommendation?._id}`;
              }}
            >
              <div className="flex flex-col gap-5 items-center justify-center border p-5 rounded-lg w-[30vw] hover:bg-primary-foreground transition-all duration-300 cursor-pointer">
                <h4>Recommended Problem</h4>
                <div className="flex gap-5 items-center">
                  <p>{recommendation?.title}</p>
                  <Badge>{recommendation?.difficulty}</Badge>
                </div>
              </div>
            </div>
          </div>
        </DrawerHeader>
        <DrawerClose className="flex items-center justify-center mb-8">
          <Button className=" w-fit" onClick={() => setOpen(false)}>
            Done
          </Button>
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  );
};

export default SuccessDrawer;
