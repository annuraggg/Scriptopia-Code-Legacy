import { Navbar } from "@/components/ui/navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import Heatmap from "@uiw/react-heat-map";
import Tooltip from "@uiw/react-tooltip";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import { ArcElement, Chart, Tooltip as TooltipChartjs, Legend } from "chart.js";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EditIcon } from "lucide-react";
import AvatarEditor from "react-avatar-editor";
import User from "@/types/User";
import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/Separator";

const ProgressBar = ({ value, color }: { value: number; color: string }) => {
  return (
    <div
      className={`w-full h-2 bg-gray-5 rounded-lg overflow-hidden
    ${color === "green" && "bg-green-500/50"}
    ${color === "orange" && "bg-yellow-500/50"}
    ${color === "red" && "bg-red-500/50"}
    `}
    >
      <div
        className={`h-full 
        ${color === "green" && "bg-green-500"}
        ${color === "orange" && "bg-yellow-500"}
        ${color === "red" && "bg-red-500"}
      `}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const Profile = () => {
  const { theme } = useTheme();
  const [mapColor, setMapColor] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [openProfilePicture, setOpenProfilePicture] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<User>({} as User);

  const [resumeOpen, setResumeOpen] = useState(false);

  const [skills, setSkills] = useState<string[]>([]);

  const [education, setEducation] = useState<
    { degree: string; school: string }[]
  >([]);

  const [experience, setExperience] = useState<
    { title: string; years: number; company: string }[]
  >([]);

  const [skillInp, setSkillInp] = useState("");

  const [eduSchool, setEduSchool] = useState("");
  const [eduDegree, setEduDegree] = useState("");

  const [expTitle, setExpTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expYears, setExpYears] = useState("");

  const addSkill = () => {
    setSkills([...skills, skillInp]);
    setSkillInp("");
  };

  const addEducation = () => {
    setEducation([...education, { degree: educationInp, school: "" }]);
    setEducationInp("");
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { title: experienceInp, years: 0, company: "" },
    ]);
    setExperienceInp("");
  };

  Chart.register(ArcElement, TooltipChartjs, Legend);

  useEffect(() => {
    if (theme === "dark") {
      setMapColor("#111827");
    } else {
      setMapColor("#F8FAFC");
    }
  }, [theme]);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/profile`)
      .then((res) => {
        setProfile(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  if (loading) {
    return <Loader />;
  }

  const data = {
    name: "Anurag Sawant",
    country: "in",
    image: "",
    username: "annuraggg",
    bio: "I am a full stack developer. lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
    links: {
      github: "https://www.github.com/annuraggg",
      linkedin: "https://www.linkedin.com/in/annuraggg",
      website: "https://www.anuragsawant.tech",
    },
    activeDates: [
      {
        date: "03/19/2024",
        count: 1,
      },
      {
        date: "03/20/2024",
        count: 2,
      },
      {
        date: "03/21/2024",
        count: 5,
      },
      {
        date: "03/22/2024",
        count: 2,
      },
      {
        date: "03/23/2024",
        count: 1,
      },
      {
        date: "03/24/2024",
        count: 0,
      },
      {
        date: "03/25/2024",
        count: 3,
      },
      {
        date: "03/26/2024",
        count: 2,
      },
      {
        date: "03/27/2024",
        count: 3,
      },
      {
        date: "03/28/2024",
        count: 4,
      },
      {
        date: "03/29/2024",
        count: 5,
      },
      {
        date: "03/30/2024",
        count: 1,
      },
      {
        date: "03/31/2024",
        count: 5,
      },
      {
        date: "04/01/2024",
        count: 9,
      },
      {
        date: "04/02/2024",
        count: 2,
      },
      {
        date: "04/03/2024",
        count: 2,
      },
      {
        date: "04/04/2024",
        count: 0,
      },
      {
        date: "04/05/2024",
        count: 1,
      },
    ],
    problems: {
      easy: 70,
      medium: 20,
      hard: 20,
    },
    totalProblems: {
      easy: 100,
      medium: 50,
      hard: 150,
    },
  };

  return (
    <>
      <Navbar />
      <div className="flex gap-5 py-5 h-[90vh] px-10 justify-center items-center">
        <div>
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle>Personal Info</CardTitle>
            </CardHeader>
            <CardContent>
              <Avatar className="mt-2 w-20 h-20">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>
                  {data.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 justify-start mt-5">
                <h1>{profile?.firstName + " " + profile?.lastName}</h1>
                <img
                  srcSet="https://flagsapi.com/IN/flat/32.png"
                  className="w-5 h-auto self-start"
                ></img>
              </div>
              <CardDescription>
                @{profile?.username}
                <span className="mt-2 block">{profile?.bio}</span>
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="mt-5 w-[300px]">
            <CardHeader>
              <CardTitle>Links</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FiLink />
                  <a
                    href={profile?.links?.website}
                    target="_blank"
                    className="truncate"
                  >
                    {profile?.links?.website}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <FaGithub />
                  <a
                    href={profile?.links?.github}
                    target="_blank"
                    className="truncate"
                  >
                    {profile?.links?.github}
                  </a>
                </div>
                <div className="flex items-center gap-2 overflow-ellipsis">
                  <FaLinkedin />
                  <a
                    href={profile?.links?.linkedin}
                    target="_blank"
                    className="truncate"
                  >
                    {profile?.links?.linkedin}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="mt-5 w-full" onClick={() => setResumeOpen(true)}>
            Update Resume
          </Button>
        </div>
        <div>
          <Heatmap
            width={800}
            value={data.activeDates}
            weekLabels={[]}
            legendCellSize={0}
            rectSize={14}
            style={{ color: theme === "dark" ? "#F8FAFC" : "#111827" }}
            panelColors={{
              0: mapColor,
              1: "#C7E58B",
              2: "#7AC86F",
              3: "#239A3B",
              4: "#186027",
            }}
            rectProps={{
              rx: 5,
            }}
            rectRender={(props, data) => {
              // if (!data.count) return <rect {...props} />;
              return (
                <Tooltip placement="top" content={`count: ${data.count || 0}`}>
                  <rect {...props} />
                </Tooltip>
              );
            }}
          />

          <Card className="w-[100%]">
            <CardHeader>
              <CardTitle>Problems Solved</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div></div>

              <div className="w-[100%]">
                <div className=" w-[100%] mb-4">
                  <div className="flex mb-1 items-end">
                    <p className="text-sm">Easy: {data.problems.easy}</p>
                    <p className="ml-auto text-xs">Top 5%</p>
                  </div>
                  <ProgressBar
                    value={(data.problems.easy / data.totalProblems.easy) * 100}
                    color="green"
                  />
                </div>

                <div className=" w-[100%] mb-4">
                  <div className="flex mb-1 items-end">
                    <p className="text-sm">Medium: {data.problems.medium}</p>
                    <p className="ml-auto text-xs">Top 5%</p>
                  </div>
                  <ProgressBar
                    value={
                      (data.problems.medium / data.totalProblems.medium) * 100
                    }
                    color="orange"
                  />
                </div>

                <div className=" w-[100%]">
                  <div className="flex mb-1 items-end">
                    <p className="text-sm">Hard: {data.problems.hard}</p>
                    <p className="ml-auto text-xs">Top 5%</p>
                  </div>
                  <ProgressBar
                    value={(data.problems.hard / data.totalProblems.hard) * 100}
                    color="red"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            className="float-right mt-3"
            onClick={() => setEditOpen(true)}
          >
            Edit
          </Button>
        </div>
      </div>
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Edit your profile and make it look better
            </DialogDescription>
          </DialogHeader>
          <Avatar className="mt-2 w-20 h-20 flex items-center justify-center group relative">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>
              {data.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
            <div className="bg-white bg-opacity-50 rounded-full flex cursor-pointer h-20 w-20 absolute invisible group-hover:visible">
              <EditIcon className="h-6 w-6 m-auto" />
            </div>
          </Avatar>

          <div>
            <p>Name</p>
            <Input className="mt-1" placeholder={data.name} />
          </div>

          <div className="mt-2">
            <p>Bio</p>
            <Textarea className="mt-1 h-20" placeholder={data.bio} />
          </div>

          <div>
            <p>Github</p>
            <Input className="mt-2" placeholder={data.links.github} />
          </div>
          <div>
            <p>Linkedin</p>
            <Input className="mt-2" placeholder={data.links.linkedin} />
          </div>
          <div>
            <p>Website</p>
            <Input className="mt-2" placeholder={data.links.website} />
          </div>

          <AvatarEditor
            image="http://github.com/.jpg"
            width={250}
            height={250}
            border={50}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1.2}
            rotate={0}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openProfilePicture} onOpenChange={setOpenProfilePicture}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={resumeOpen} onOpenChange={setResumeOpen}>
        <DialogContent className="h-[90vh] min-w-[90vw]">
          <DialogHeader>
            <DialogTitle>Update Resume</DialogTitle>
            <DialogDescription>
              Enter your details to update your resume
            </DialogDescription>
            <div className="flex p-5 ">
              <div className="w-[50%]">
                <div className="border p-5 rounded-lg">
                  <h2 className="mb-2">Skills</h2>
                  {skills.map((skill) => (
                    <Badge className="mt-2 ml-2">{skill}</Badge>
                  ))}
                </div>

                <div className="mt-5 border p-5 rounded-lg">
                  <h2 className="mb-2">Education</h2>
                  {education.map((edu) => (
                    <div>
                      <p className="mt-2">{edu.degree}</p>
                      <p className="text-xs text-gray-300">
                        {edu.school} - <span>Graduated</span>
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <div className="mt-5 border p-5 rounded-lg">
                    <h2 className="mb-2">Experience</h2>
                    {experience.map((exp) => (
                      <div>
                        <p className="mt-2">{exp.title}</p>
                        <p className="text-xs text-gray-300">
                          {exp.company} - <span>2 years</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Separator orientation="vertical" className="mx-10" />

              <div className="w-[50%]">
                <Input
                  className="mt-5"
                  placeholder="Add a skill"
                  value={skillInp}
                  onChange={(e) => setSkillInp(e.target.value)}
                />
                <Button className="mb-10 mt-3 float-right" onClick={addSkill}>
                  Add Skill
                </Button>

                <Input
                  className="mt-5"
                  placeholder="Add Education"
                  value={educationInp}
                  onChange={(e) => setEducationInp(e.target.value)}
                />
                <Input
                  className="mt-2"
                  placeholder="School"
                  value={eduSchool}
                  onChange={(e) => setEduSchool(e.target.value)}
                />
                <Input
                  className="mt-2"
                  placeholder="Degree"
                  value={eduDegree}
                  onChange={(e) => setEduDegree(e.target.value)}
                />
                <Button
                  className="mb-10 mt-3 float-right"
                  onClick={addEducation}
                >
                  Add Education
                </Button>

                <Input
                  className="mt-2"
                  placeholder="Company"
                  value={expCompany}
                  onChange={(e) => setExpCompany(e.target.value)}
                />
                <Input
                  className="mt-2"
                  placeholder="Title"
                  value={expTitle}
                  onChange={(e) => setExpTitle(e.target.value)}
                />
                <Input
                  className="mt-2"
                  placeholder="Years"
                  value={expYears}
                  onChange={(e) => setExpYears(e.target.value)}
                />
                <Button
                  className="mb-10 mt-3 float-right"
                  onClick={addExperience}
                >
                  Add Experience
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
