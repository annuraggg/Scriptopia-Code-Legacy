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
import { useEffect, useRef, useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Data {
  activeDates: {
    date: string;
    count: number;
  }[];
  totalProblems: {
    easy: number;
    medium: number;
    hard: number;
  };
  problems: {
    easy: number;
    medium: number;
    hard: number;
  };
}

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

  const [zoom, setZoom] = useState<number[]>([1]);
  const [profileImage, setProfileImage] = useState<string | File>("");
  const [openProfilePicture, setOpenProfilePicture] = useState(false);
  const [profilePictureLoading, setProfilePictureLoading] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Data>({} as Data);
  const [profile, setProfile] = useState<User>({} as User);

  const [newFirstName, setNewFirstName] = useState<string>("");
  const [newLastName, setNewLastName] = useState<string>("");
  const [newBio, setNewBio] = useState<string>("");
  const [newGithub, setNewGithub] = useState<string>("");
  const [newLinkedin, setNewLinkedin] = useState<string>("");
  const [newWebsite, setNewWebsite] = useState<string>("");

  const ppRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<AvatarEditor | null>(null);

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
        const activeDates = res.data.user?.score?.map(
          (score: { date: string }) => {
            return {
              date: new Date(score.date).toLocaleDateString(),
              count: 1,
            };
          }
        );

        setData({
          activeDates: activeDates,
          totalProblems: res.data.data.totalProblems,
          problems: res.data.data.solvedProblems,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const selectPhoto = () => {
    ppRef.current?.click();
  };

  const setPhotoInEditor = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setProfileImage(e.target.files[0]);
    setOpenProfilePicture(true);
  };

  const updatePicture = () => {
    setProfilePictureLoading(true);
    const canvas = editorRef?.current?.getImageScaledToCanvas();
    if (!canvas) return;
    const base64 = canvas.toDataURL("image/png");

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/profile/picture`, {
        newImage: base64,
      })
      .then(() => {
        toast.success("Profile picture updated successfully");
        setOpenProfilePicture(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update profile picture");
      })
      .finally(() => {
        setProfilePictureLoading(false);
      });
  };

  const updateProfile = () => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/profile/update`, {
        firstName: newFirstName || profile?.firstName,
        lastName: newLastName || profile?.lastName,
        bio: newBio || profile?.bio,
        github: newGithub || profile?.links?.github,
        linkedin: newLinkedin || profile?.links?.linkedin,
        website: newWebsite || profile?.links?.website,
      })
      .then(() => {
        toast.success("Profile updated successfully");
        setEditOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to update profile");
      });
  };

  if (loading) {
    return <Loader />;
  }

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
                <AvatarImage src={profile?.image} />
                <AvatarFallback>
                  {profile?.firstName?.slice(0, 2)?.toUpperCase()}
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
                <Tooltip placement="top" content={`count: ${data?.count || 0}`}>
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
                    <p className="text-sm">Easy: {data?.problems?.easy}</p>
                    <p className="ml-auto text-xs">
                      Total&nbsp;
                      {data?.totalProblems?.easy}
                    </p>
                  </div>
                  <ProgressBar
                    value={
                      (data?.problems?.easy / data?.totalProblems?.easy) * 100
                    }
                    color="green"
                  />
                </div>

                <div className=" w-[100%] mb-4">
                  <div className="flex mb-1 items-end">
                    <p className="text-sm">Medium: {data?.problems?.medium}</p>
                    <p className="ml-auto text-xs">
                      Total&nbsp;
                      {data?.totalProblems?.medium}
                    </p>
                  </div>
                  <ProgressBar
                    value={
                      (data?.problems?.medium / data?.totalProblems?.medium) *
                      100
                    }
                    color="orange"
                  />
                </div>

                <div className=" w-[100%]">
                  <div className="flex mb-1 items-end">
                    <p className="text-sm">Hard: {data?.problems?.hard}</p>
                    <p className="ml-auto text-xs">
                      Total &nbsp;
                      {data?.totalProblems?.hard}
                    </p>
                  </div>
                  <ProgressBar
                    value={
                      (data?.problems?.hard / data?.totalProblems?.hard) * 100
                    }
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
          <div className="flex w-full items-center flex-col justify-center gap-2">
            <input type="file" hidden ref={ppRef} onChange={setPhotoInEditor} />
            <Avatar
              className="mt-2 w-20 h-20 flex items-center justify-center group relative"
              onClick={selectPhoto}
            >
              <AvatarImage src={profile?.image} />
              <AvatarFallback>
                {profile?.firstName?.slice(0, 2)?.toUpperCase()}
              </AvatarFallback>
              <div className="bg-white bg-opacity-50 rounded-full flex cursor-pointer h-20 w-20 absolute invisible group-hover:visible">
                <EditIcon className="h-6 w-6 m-auto" />
              </div>
            </Avatar>

            <div className="flex gap-2 justify-center items-center w-full mt-5">
              <div className="w-full">
                <p>First Name</p>
                <Input
                  className="mt-1 w-full"
                  placeholder={profile?.firstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  value={newFirstName}
                />
              </div>

              <div className="w-full">
                <p>Last Name</p>
                <Input
                  className="mt-2 w-full"
                  placeholder={profile?.lastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  value={newLastName}
                />
              </div>
            </div>

            <div className="mt-2 w-full">
              <p>Bio</p>
              <Textarea
                className="mt-1 h-20 "
                placeholder={profile?.bio}
                onChange={(e) => setNewBio(e.target.value)}
                value={newBio}
              />
            </div>

            <div className="flex gap-5 items-center justify-center w-full mt-5">
              <div className="w-full">
                <p>Github</p>
                <Input
                  className="mt-2 w-full"
                  placeholder={profile?.links?.github}
                  onChange={(e) => setNewGithub(e.target.value)}
                  value={newGithub}
                />
              </div>
              <div className="w-full">
                <p>Linkedin</p>
                <Input
                  className="mt-2 w-full"
                  placeholder={profile?.links?.linkedin}
                  onChange={(e) => setNewLinkedin(e.target.value)}
                  value={newLinkedin}
                />
              </div>
            </div>
            <div className="w-full mt-2">
              <p>Website</p>
              <Input
                className="mt-2 w-full"
                placeholder={profile?.links?.website}
                onChange={(e) => setNewWebsite(e.target.value)}
                value={newWebsite}
              />
            </div>

            <div className="flex gap-5 items-center justify-center w-full">
              <Button className="mt-5" onClick={() => setEditOpen(false)}>
                Cancel
              </Button>
              <Button className="mt-5" onClick={updateProfile}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={openProfilePicture} onOpenChange={setOpenProfilePicture}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Profile Picture</DialogTitle>
            <DialogDescription className="flex items-center justify-center gap-5 py-5 flex-col">
              <AvatarEditor
                image={profileImage}
                width={250}
                height={250}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={zoom[0]}
                rotate={0}
                borderRadius={125}
                ref={editorRef}
              />

              <Slider
                min={1}
                max={2}
                step={0.01}
                className="w-1/2"
                value={zoom}
                onValueChange={(value) => setZoom(value)}
              />

              <Button onClick={updatePicture}>
                {profilePictureLoading ? (
                  <ReloadIcon className="h-4 w-4 animate-spin" />
                ) : (
                  "Update"
                )}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
