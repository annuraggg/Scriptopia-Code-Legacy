import { FaBook } from "react-icons/fa";
import { IoPieChart } from "react-icons/io5";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface course {
  name: string;
  description: string;
  currentModule: number;
  totalModules: number;
  link: string;
}

const MyCourses = () => {
  const courses: course[] = [
    {
      name: "Mastering Python Fundamentals",
      description: "Learn the basics of Python programming",
      currentModule: 3,
      totalModules: 10,
      link: "/learn/python",
    },
    {
      name: "Mastering React Fundamentals",
      description: "Learn the basics of React programming",
      currentModule: 5,
      totalModules: 10,
      link: "/learn/react",
    },
    {
      name: "Mastering TypeScript Fundamentals",
      description: "Learn the basics of TypeScript programming",
      currentModule: 7,
      totalModules: 10,
      link: "/learn/typescript",
    },
    {
      name: "Mastering JavaScript Fundamentals",
      description: "Learn the basics of JavaScript programming",
      currentModule: 10,
      totalModules: 10,
      link: "/learn/javascript",
    },
  ];

  const getPercentage = (current: number, total: number) => {
    return Math.round((current / total) * 100);
  };

  return (
    <>
      <h3 className="mb-5">Learning Journey Overview</h3>
      <div className="flex gap-5 flex-wrap items-center justify-center">
        {courses.map((course, index) => {
          const progressPercent = getPercentage(
            course.currentModule,
            course.totalModules
          );

          return (
            <Card
              className="w-[340px] max-h-max relative hover:scale-105 transition-all duration-300 cursor-pointer"
              key={index}
            >
              <div className="absolute inset-0 border rounded-lg"></div>
              <div
                className="absolute inset-0 border-2 border-primary rounded-lg"
                style={{
                  clipPath: `polygon(
                      0 ${100 - progressPercent}%, /* Adjust top corner */
                      100% ${100 - progressPercent}%, 
                      100% 100%, 
                      0 100%
                  )`,
                }}
              />
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
                <CardDescription>{course.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <FaBook size="12" />
                  <p className="p-0 m-0">
                    Current Module: {course.currentModule}/{course.totalModules}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <IoPieChart size="12" />
                  <p>Progress: {progressPercent}%</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default MyCourses;
