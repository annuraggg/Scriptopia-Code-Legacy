import { Navbar } from "@/components/ui/navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface language {
  name: string;
  id: number;
  logo: string;
  link: string;
}

const AssesmentStart = () => {
  const navigate = useNavigate()

  const languages: language[] = [
    { id: 1, name: "Python", logo: "languages/python.svg", link: "/python" },
    {
      id: 2,
      name: "JavaScript",
      logo: "languages/javascript.svg",
      link: "/javascript",
    },
    { id: 3, name: "Java", logo: "languages/java.svg", link: "/java" },
  ];

  return (
    <>
      <Navbar />
      <div className="px-10 py-5 flex gap-5 items-center justify-center h-[90vh] flex-col">
        <h2>Please Select A Language</h2>
        <div className="flex gap-5 items-center justify-center">
          {languages.map((lang, i) => {
            return (
              <Card
                key={i}
                className="flex items-center justify-center flex-col w-[150px] hover:bg-secondary cursor-pointer"
                onClick={() => navigate("/learning" + lang.link + "/new")}
              >
                <CardHeader>
                  <CardTitle>{lang.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={`/assets/${lang.logo}`}
                    alt=""
                    className="w-[50px]"
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AssesmentStart;
