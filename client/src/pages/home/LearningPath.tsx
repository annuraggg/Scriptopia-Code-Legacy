import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

type CardData = {
  image: string;
  title: string;
  description: string;
  footer: string;
  id: string;
};

const LearningPath = () => {
  const navigate = useNavigate();
  const cardData: CardData[] = [
    {
      image: "react",
      title: "Learn React",
      description: "Learn React from scratch and build a project",
      footer: "Start",
      id: "react",
    },
    {
      image: "nodejs",
      title: "Learn Node",
      description: "Learn Node from scratch and build a project",
      footer: "Start",
      id: "nodejs",
    },
    {
      image: "typescript",
      title: "Learn TypeScript",
      description: "Learn TypeScript from scratch and build a project",
      footer: "Start",
      id: "typescript",
    },
  ];

  return (
    <div className="w-[65vw]">
      <h1 className="mb-5">Your Learning Path</h1>
      <div className="flex space-x-5">
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
            </CardContent>
            <CardFooter>
              <Button onClick={() => navigate(`/learning-path/${card.id}`)}>
                {card.footer}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningPath;
