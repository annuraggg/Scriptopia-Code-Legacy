import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type CardData = {
  image: string;
  title: string;
  description: string;
  footer: string;
  id: string;
  time: string;
  challenges: string;
};

const PopularCourses = () => {
  const cardData: CardData[] = [
    {
      image: "c",
      title: "Learn C",
      description: "Learn C from scratch and build a project",
      footer: "Start",
      id: "c",
      time: "2 weeks",
      challenges: "10",
    },
    {
      image: "cpp",
      title: "Learn C++",
      description: "Learn C++ from scratch and build a project",
      footer: "Start",
      id: "cpp",
      time: "2 weeks",
      challenges: "10",
    },
    {
      image: "java",
      title: "Learn Java",
      description: "Learn Java from scratch and build a project",
      footer: "Start",
      id: "java",
      time: "2 weeks",
      challenges: "10",
    },
    {
      image: "javascript",
      title: "Learn JavaScript",
      description: "Learn JavaScript from scratch and build a project",
      footer: "Start",
      id: "javascript",
      time: "2 weeks",
      challenges: "10",
    },
    {
      image: "python",
      title: "Learn Python",
      description: "Learn Python from scratch and build a project",
      footer: "Start",
      id: "python",
      time: "2 weeks",
      challenges: "10",
    },
    {
      image: "scala",
      title: "Learn Scala",
      description: "Learn Scala from scratch and build a project",
      footer: "Start",
      id: "scala",
      time: "2 weeks",
      challenges: "10",
    },
  ];

  return (
    <div className="mt-5">
      <Accordion type="single" collapsible className="w-[65vw]">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h3>Popular Courses</h3>
          </AccordionTrigger>
          <AccordionContent>
            <div className="flex gap-4 flex-wrap">
              {cardData.map((card, index) => (
                <Card key={index} className="w-[320px]">
                  <CardHeader>
                    <img
                      src={`/assets/languages/${card.image}.svg`}
                      alt={card.title}
                      className="h-10 w-10"
                    />
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                    <div className="flex items-center justify-center mt-5">
                        <p className="border rounded-l-lg border-gray-600 p-1 px-2">Time: {card.time}</p>
                        <p className="bg-blue-500 bg-opacity-75 rounded-r-lg p-1 px-2">Challenges: {card.challenges}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default PopularCourses;
