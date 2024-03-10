import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface module {
  id: string;
  name: string;
  description: string;
  number: number;
  timeRequired: number;
  subModules?: module[];
  type?: string;
}

const All = () => {
  const module1: module = {
    id: "1",
    name: "Introduction to JavaScript",
    description: "Learn the basics of JavaScript.",
    number: 1,
    timeRequired: 60,
    subModules: [
      {
        id: "1.1",
        name: "What is JavaScript?",
        description: "Learn the basics of JavaScript.",
        number: 1,
        timeRequired: 10,
        type: "content",
      },
      {
        id: "1.2",
        name: "History of JavaScript",
        description: "Learn the history of JavaScript.",
        number: 2,
        timeRequired: 10,
      },
      {
        id: "1.3",
        name: "Javascript Versions",
        description: "The different versions of JavaScript.",
        number: 3,
        timeRequired: 5,
      },
    ],
  };

  const module2: module = {
    id: "2",
    name: "Variables",
    description: "Learn about variables in JavaScript.",
    number: 2,
    timeRequired: 60,
    subModules: [
      {
        id: "2.1",
        name: "What are variables?",
        description: "Learn the basics of variables.",
        number: 1,
        timeRequired: 10,
      },
      {
        id: "2.2",
        name: "Declaring variables",
        description: "Learn how to declare variables.",
        number: 2,
        timeRequired: 10,
      },
      {
        id: "2.3",
        name: "Variable scope",
        description: "Learn about variable scope.",
        number: 3,
        timeRequired: 5,
      },
      {
        id: "2.4",
        name: "Hoisting",
        description: "Learn about hoisting.",
        number: 4,
        timeRequired: 5,
      },
      {
        id: "2.5",
        name: "Variable naming conventions",
        description: "The different conventions for naming variables.",
        number: 5,
        timeRequired: 5,
      },
    ],
  };

  const modules: module[] = [module1, module2];

  return (
    <div className="w-[65%]">
      {modules.map((module) => (
        <Accordion key={parseInt(module.id)} type="single" collapsible>
          <AccordionItem value={module.id}>
            <AccordionTrigger>
              <p className="text-md font-bold">{module.name}</p>
            </AccordionTrigger>
            <AccordionContent>
              {module.subModules?.map((subModule) => {
                return (
                  <div key={subModule.id}>
                    <p>{subModule.name}</p>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default All;
