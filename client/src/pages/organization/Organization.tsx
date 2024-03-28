import Loader from "@/components/Loader";
import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaLink } from "react-icons/fa";
import { MdEmail, MdPhone } from "react-icons/md";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IoIosAlert } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiSettings } from "react-icons/ci";

interface Organization {
  name: string;
  description: string;
  website: string;
  email: string;
  phone: string;
  screenings: number;
  candidates: number;
  ratings: Record<string, number>;
  code: string;
  admins: {
    name: string;
    email: string;
    id: string;
    phone: string;
  }[];
  screeners: {
    name: string;
    email: string;
    id: string;
    phone: string;
  }[];
  requesters: {
    name: string;
    email: string;
    id: string;
    phone: string;
  }[];
  isAdmin: boolean;
}

const Organization = () => {
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<Organization>(
    {} as Organization
  );

  const [createOpen, setCreateOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  const [joinButtonLoading, setJoinButtonLoading] = useState(false);
  const [joinCode, setJoinCode] = useState("");

  const [createButtonLoading, setCreateButtonLoading] = useState(false);
  const [createName, setCreateName] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createWebsite, setCreateWebsite] = useState("");
  const [createEmail, setCreateEmail] = useState("");
  const [createPhone, setCreatePhone] = useState("");

  const [reload, setReload] = useState(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/organization/get`)
      .then((res) => {
        setOrganization(res.data.organization);
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to fetch organization details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reload]);

  const joinOrganization = () => {
    if (!joinCode)
      return toast("Please enter the code to join the organization");

    setJoinButtonLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/organization/join`, {
        code: joinCode,
      })
      .then(() => {
        toast("Request sent to join organization");
        setJoinOpen(false);
      })
      .catch((err) => {
        if (err.response.status === 404) {
          toast("Organization not found");
          return;
        }
        console.error(err);
        toast("Failed to join organization");
      })
      .finally(() => {
        setJoinButtonLoading(false);
      });
  };

  const createOrganization = () => {
    if (
      !createName ||
      !createDescription ||
      !createWebsite ||
      !createEmail ||
      !createPhone
    )
      return toast("Please fill all the fields");

    setCreateButtonLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/organization/create`, {
        name: createName,
        description: createDescription,
        website: createWebsite,
        email: createEmail,
        phone: createPhone,
      })
      .then(() => {
        setReload(!reload);
        toast("Organization created successfully");
        setCreateOpen(false);
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to create organization");
      })
      .finally(() => {
        setCreateButtonLoading(false);
      });
  };

  const calculateRating = () => {
    let total = 0;
    let count = 0;
    for (const key in organization.ratings) {
      total += organization.ratings[key];
      count++;
    }
    return total / count;
  };

  if (!loading) {
    return (
      <>
        <Navbar />
        <div className="py-5 px-10">
          {organization ? (
            <div className="flex gap-10">
              <div className="w-[160%]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3>{organization.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Code: {organization.code.toUpperCase()}
                    </p>
                  </div>

                  {organization.isAdmin &&
                    organization.requesters.length > 0 && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {" "}
                            <IoIosAlert
                              size={30}
                              color="orange"
                              className="cursor-pointer"
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>You have pending requests</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                  {organization.isAdmin && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <CiSettings size={25} className=" cursor-pointer" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Settings</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
                <p className="mt-3 text-gray-400 border rounded-lg p-5">
                  {organization.description}
                </p>
                <div className="flex gap-5">
                  <Card className="mt-5 w-[33.33%]">
                    <CardHeader>
                      <CardTitle>Total Organization Screening's</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{organization.screenings || 0}</p>
                    </CardContent>
                  </Card>

                  <Card className="mt-5 w-[33.33%]">
                    <CardHeader>
                      <CardTitle>Total Organization Candidates's</CardTitle>
                    </CardHeader>
                    <CardContent>{organization.candidates || 0}</CardContent>
                  </Card>

                  <Card className="mt-5 w-[33.33%]">
                    <CardHeader>
                      <CardTitle>Rating</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{calculateRating() || "Not Rated Yet"}</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mt-5">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Organization Details</CardTitle>
                      {organization.isAdmin && (
                        <Button variant="link">Edit</Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <a
                        href={
                          organization.website.startsWith("http")
                            ? organization.website
                            : `http://${organization.website}`
                        }
                        target="_blank"
                        className="hover:text-primary"
                      >
                        <strong>Website:</strong> {organization.website}
                      </a>
                      <p>
                        <strong>Email:</strong> {organization.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {organization.phone}
                      </p>
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>

              <div className="w-[100vw]">
                <div>
                  <Card className="h-[40vh]">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        Organization Admins
                        {organization.isAdmin && (
                          <Button variant="link">Add Admin</Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              <TableHead>Phone</TableHead>
                              {organization.isAdmin && (
                                <TableHead>Actions</TableHead>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {organization.admins.map((admin) => (
                              <TableRow key={admin?.id}>
                                <TableCell>{admin?.name}</TableCell>
                                <TableCell>{admin?.email}</TableCell>
                                {organization.isAdmin && (
                                  <>
                                    <TableCell>{admin?.phone}</TableCell>
                                    <TableCell>
                                      <Button variant="link">Remove</Button>
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardDescription>
                    </CardContent>
                  </Card>

                  <Card className="h-[40vh] mt-5">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        Organization Screeners
                        {organization.isAdmin && (
                          <Button variant="link">Add Screener</Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Email</TableHead>
                              {organization.isAdmin && (
                                <>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Actions</TableHead>
                                </>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {organization.screeners.map((screener) => (
                              <TableRow key={screener?.id}>
                                <TableCell>{screener?.name}</TableCell>
                                {organization.isAdmin && (
                                  <>
                                    <TableCell>{screener?.email}</TableCell>
                                    <TableCell>{screener?.phone}</TableCell>
                                    <TableCell>
                                      <Button variant="link">Remove</Button>
                                    </TableCell>
                                  </>
                                )}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CardDescription>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Alert>
                <RocketIcon className="h-4 w-4" />
                <AlertTitle>Organization</AlertTitle>
                <AlertDescription>
                  You are not associated with any organization
                </AlertDescription>
              </Alert>

              <div className="flex gap-5 mt-10 items-center justify-center">
                <div>
                  <Button variant="link" onClick={() => setCreateOpen(true)}>
                    Create Organization
                  </Button>
                </div>

                <p>OR</p>

                <div>
                  <Button variant="link" onClick={() => setJoinOpen(true)}>
                    Join Organization
                  </Button>
                </div>
              </div>
            </>
          )}

          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new Organization</DialogTitle>
                <DialogDescription asChild>
                  <div>
                    <div className="mt-5">
                      <Label>Organization Name</Label>
                      <Input
                        placeholder="Enter the organization name"
                        className="mt-2"
                        value={createName}
                        onChange={(e) => setCreateName(e.target.value)}
                      />
                    </div>

                    <div className="mt-5">
                      <Label className="mt-5">Organization Description</Label>
                      <Textarea
                        placeholder="Enter the organization description"
                        className="mt-2"
                        value={createDescription}
                        onChange={(e) => setCreateDescription(e.target.value)}
                      />
                    </div>

                    <div className="mt-5">
                      <Label className="mt-5">Organization Website</Label>
                      <div className="flex gap-5 items-center mt-2">
                        <FaLink />
                        <Input
                          placeholder="Enter the organization website"
                          value={createWebsite}
                          onChange={(e) => setCreateWebsite(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="flex gap-5">
                      <div className="mt-5">
                        <Label className="mt-5">Contact Email</Label>
                        <div className="flex gap-2 items-center mt-2">
                          <MdEmail size={20} />
                          <Input
                            placeholder="Organization email"
                            value={createEmail}
                            onChange={(e) => setCreateEmail(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <Label className="mt-5">Contact Phone</Label>
                        <div className="flex gap-2 items-center mt-2">
                          <MdPhone size={20} />
                          <Input
                            placeholder="Organization phone"
                            value={createPhone}
                            onChange={(e) => setCreatePhone(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={createOrganization}
                      className="mt-5 w-full"
                    >
                      {createButtonLoading ? (
                        <ReloadIcon className="w-4 h-4 animate-spin" />
                      ) : (
                        "Create"
                      )}
                    </Button>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join an Organization</DialogTitle>
                <DialogDescription>
                  Enter the code provided by the organization admin to join the
                  organization
                </DialogDescription>
                <div>
                  <p className="pt-5">
                    *Note that your admin will still have to approve your
                    request
                  </p>

                  <div className="flex gap-5 flex-col mt-3">
                    <Input
                      placeholder="Enter the code here"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                    />
                    <Button onClick={joinOrganization}>
                      {joinButtonLoading ? (
                        <ReloadIcon className="w-4 h-4 animate-spin" />
                      ) : (
                        "Join"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </>
    );
  } else return <Loader />;
};

export default Organization;
