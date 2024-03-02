import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface course {
  name: string;
  description: string;
  assesments: number;
  modules: number;
  hours: number;
  link: string;
}

const AllCourses = () => {
  const navigate = useNavigate();
  const courses: course[] = [
    {
      name: "Mastering Python Fundamentals",
      description: "Learn the basics of Python programming",
      assesments: 5,
      modules: 10,
      hours: 20,
      link: "/python",
    },
    {
      name: "Mastering React Fundamentals",
      description: "Learn the basics of React programming",
      assesments: 5,
      modules: 10,
      hours: 20,
      link: "/learn/react",
    },
    {
      name: "Mastering TypeScript Fundamentals",
      description: "Learn the basics of TypeScript programming",
      assesments: 5,
      modules: 10,
      hours: 20,
      link: "/learn/typescript",
    },
    {
      name: "Mastering JavaScript Fundamentals",
      description: "Learn the basics of JavaScript programming",
      assesments: 5,
      modules: 10,
      hours: 20,
      link: "/learn/javascript",
    },
  ];

  const selectItems = [
    { name: "All", link: "/learn/all" },
    { name: "Python", link: "/learn/python" },
    { name: "React", link: "/learn/react" },
    { name: "TypeScript", link: "/learn/typescript" },
    { name: "JavaScript", link: "/learn/javascript" },
  ];

  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <h3>All Courses</h3>
        <div className="flex gap-5">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {selectItems.map((item, index) => {
                return (
                  <SelectItem key={index} value={item.link}>
                    {item.name}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>

          <Input placeholder="Search for a course" className="w-[300px]" />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-5 mt-5">
          {courses.map((course, index) => {
            return (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{course.name}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Assesments: {course.assesments}</p>
                  <p>Modules: {course.modules}</p>
                  <p>Hours: {course.hours}</p>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate(`/course/${course.link}`)}>
                    Start Course
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllCourses;
