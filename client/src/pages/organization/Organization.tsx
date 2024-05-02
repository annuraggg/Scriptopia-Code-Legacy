import Loader from "@/components/Loader";
import { Navbar } from "@/components/ui/navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ReloadIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
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
import { IoIosNotifications } from "react-icons/io";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";
import UserToken from "@/types/UserToken";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    username: string;
  }[];
  screeners: {
    name: string;
    email: string;
    id: string;
    phone: string;
    username: string;
  }[];
  requesters: {
    username: string;
    name: string;
    email: string;
    id: string;
    phone: string;
  }[];
  isAdmin: boolean;
}

const Organization = () => {
  const navigate = useNavigate();

  const [openEdit, setOpenEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [editWebsite, setEditWebsite] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");

  const user = useSelector((state: { user: UserToken }) => state.user);

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

  const [addScreenOpen, setAddScreenOpen] = useState(false);

  const [reload, setReload] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  // const [phoneVerified, setPhoneVerified] = useState(false);

  const [verifyInfoOpen, setVerifyInfoOpen] = useState(false);

  const [requestsOpen, setRequestsOpen] = useState(false);

  const [adminSheetOpen, setAdminSheetOpen] = useState(false);

  const [confirmScreenerRemove, setConfirmScreenerRemove] = useState(false);
  const [confirmAdminRemove, setConfirmAdminRemove] = useState(false);
  const [confirmAdminDemote, setConfirmAdminDemote] = useState(false);
  const [confirmAdminAdd, setConfirmAdminAdd] = useState(false);
  const [currentSelectedScreener, setCurrentSelectedScreener] = useState("");
  const [currentSelectedAdmin, setCurrentSelectedAdmin] = useState("");

  useEffect(() => {
    axios
      ?.post(`${import.meta.env.VITE_BACKEND_ADDRESS}/organization/get`)
      .then((res) => {
        setOrganization(res?.data?.organization);
        setEmailVerified(res?.data?.emailVerified);
        // setPhoneVerified(res?.data?.phoneVerified);
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
    const schema = z.string().nonempty();
    try {
      schema.parse(joinCode);
    } catch (err) {
      return toast("Please enter a valid code");
    }

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
        if (err?.response?.status === 404) {
          toast("Organization not found");
          return;
        }
        console.error(err);
        toast(err.response?.data?.message || "Failed to join organization");
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
    for (const key in organization?.ratings) {
      total += organization?.ratings[key];
      count++;
    }
    return total / count;
  };

  const rejectCandidate = (id: string) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/organization/candidate/reject`,
        {
          id,
        }
      )
      .then(() => {
        setReload(!reload);
        toast("Candidate rejected successfully");
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to reject candidate");
      });
  };

  const acceptCandidate = (id: string) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/organization/candidate/accept`,
        {
          id,
        }
      )
      .then(() => {
        setReload(!reload);
        toast("Candidate accepted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to accept candidate");
      });
  };

  const addAdmin = () => {
    setAdminSheetOpen(true);
  };

  const addAsAdmin = (id: string) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/organization/admin/add`, {
        id,
      })
      .then(() => {
        setReload(!reload);
        toast("Admin added successfully");
        setAdminSheetOpen(false);
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to add admin");
      });
  };

  const removeAdmin = (id: string) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/organization/admin/remove`,
        {
          id,
        }
      )
      .then(() => {
        setReload(!reload);
        toast("Admin removed successfully");
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to remove admin");
      });
  };

  const removeScreener = (id: string) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/organization/screener/remove`,
        {
          id,
        }
      )
      .then(() => {
        setReload(!reload);
        toast("Screener removed successfully");
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to remove screener");
      });
  };

  const demoteAdmin = (id: string) => {
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_ADDRESS}/organization/admin/demote`,
        {
          id,
        }
      )
      .then(() => {
        setReload(!reload);
        toast("Admin demoted successfully");
      })
      .catch((err) => {
        console.error(err);
        toast("Failed to demote admin");
      });
  };

  const saveEdits = () => {
    setEditLoading(true);

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/organization/edit`, {
        website: editWebsite,
        email: editEmail,
        phone: editPhone,
      })
      .then(() => {
        toast.success("Details Updated Successfully");
        setOpenEdit(false);
        setReload(!reload);
      })
      .catch((err) => {
        toast.error(err);
        console.log(err);
      })
      .finally(() => {
        setEditLoading(false);
      });
  };

  if (!loading) {
    return (
      <>
        <Navbar />
        <div className="py-5 px-10">
          {organization ? (
            <div className="flex gap-10">
              <div className="w-[140%]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3>{organization?.name}</h3>
                    <p className="text-gray-400 text-sm">
                      Code: {organization?.code?.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {organization?.isAdmin &&
                      organization?.requesters?.length > 0 && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              {" "}
                              <IoIosNotifications
                                size={20}
                                color="red"
                                className="cursor-pointer"
                                onClick={() => setRequestsOpen(true)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>You have pending requests</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                  </div>
                </div>
                <p className="mt-3 text-gray-400 border rounded-lg p-5">
                  {organization?.description}
                </p>
                <div className="flex gap-5">
                  <Card className="mt-5 w-[33?.33%]">
                    <CardHeader>
                      <CardTitle>Total Organization Screening's</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{organization?.screenings || 0}</p>
                    </CardContent>
                  </Card>

                  <Card className="mt-5 w-[33.33%]">
                    <CardHeader>
                      <CardTitle>Total Organization Candidates's</CardTitle>
                    </CardHeader>
                    <CardContent>{organization?.candidates || 0}</CardContent>
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
                      {organization?.isAdmin && (
                        <Button
                          variant="link"
                          onClick={() => {
                            setEditEmail(organization?.email);
                            setEditPhone(organization?.phone);
                            setEditWebsite(organization?.website);
                            setOpenEdit(true)
                          }}
                        >
                          Edit
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <a
                        href={
                          organization?.website?.startsWith("http")
                            ? organization?.website
                            : `http://${organization?.website}`
                        }
                        target="_blank"
                        className="hover:text-primary"
                      >
                        <strong>Website:</strong> {organization?.website}
                      </a>
                      <p>
                        <strong>Email:</strong> {organization?.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {organization?.phone}
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
                        {organization?.isAdmin && (
                          <Button variant="link" onClick={addAdmin}>
                            Add Admin
                          </Button>
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
                              {organization?.isAdmin && (
                                <TableHead>Actions</TableHead>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {organization?.admins?.map((admin) => (
                              <TableRow key={admin?.id}>
                                <TableCell>{admin?.name}</TableCell>
                                <TableCell>{admin?.email}</TableCell>
                                {organization.isAdmin && (
                                  <>
                                    <TableCell>{admin?.phone}</TableCell>
                                    <TableCell>
                                      {admin?.id !== user?.id && (
                                        <>
                                          <Button
                                            variant="link"
                                            onClick={() => {
                                              setCurrentSelectedAdmin(
                                                admin?.id
                                              );
                                              setConfirmAdminRemove(true);
                                            }}
                                          >
                                            Remove
                                          </Button>
                                          <Button
                                            variant="link"
                                            onClick={() => {
                                              setCurrentSelectedAdmin(
                                                admin?.id
                                              );
                                              setConfirmAdminDemote(true);
                                            }}
                                          >
                                            Demote
                                          </Button>
                                        </>
                                      )}
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
                        {organization?.isAdmin && (
                          <Button
                            variant="link"
                            onClick={() => setAddScreenOpen(true)}
                          >
                            Add Screener
                          </Button>
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
                              {organization?.isAdmin && (
                                <>
                                  <TableHead>Phone</TableHead>
                                  <TableHead>Actions</TableHead>
                                </>
                              )}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {organization?.screeners?.map((screener) => (
                              <TableRow key={screener?.id}>
                                <TableCell>{screener?.name}</TableCell>
                                {organization?.isAdmin && (
                                  <>
                                    <TableCell>{screener?.email}</TableCell>
                                    <TableCell>{screener?.phone}</TableCell>
                                    <TableCell>
                                      <Button
                                        variant="link"
                                        onClick={() => {
                                          setCurrentSelectedScreener(
                                            screener?.id
                                          );
                                          setConfirmScreenerRemove(true);
                                        }}
                                      >
                                        Remove
                                      </Button>
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
                  <Button
                    variant="link"
                    onClick={() => {
                      if (!emailVerified) {
                        setVerifyInfoOpen(true);
                        return;
                      }
                      setCreateOpen(true);
                    }}
                  >
                    Create Organization
                  </Button>
                </div>

                <p>OR</p>

                <div>
                  <Button
                    variant="link"
                    onClick={() => {
                      if (!emailVerified) {
                        setVerifyInfoOpen(true);
                        return;
                      }
                      setJoinOpen(true);
                    }}
                  >
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
                        onChange={(e) => setCreateName(e?.target?.value)}
                      />
                    </div>

                    <div className="mt-5">
                      <Label className="mt-5">Organization Description</Label>
                      <Textarea
                        placeholder="Enter the organization description"
                        className="mt-2"
                        value={createDescription}
                        onChange={(e) => setCreateDescription(e?.target?.value)}
                      />
                    </div>

                    <div className="mt-5">
                      <Label className="mt-5">Organization Website</Label>
                      <div className="flex gap-5 items-center mt-2">
                        <FaLink />
                        <Input
                          placeholder="Enter the organization website"
                          value={createWebsite}
                          onChange={(e) => setCreateWebsite(e?.target?.value)}
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
                            onChange={(e) => setCreateEmail(e?.target?.value)}
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
                            onChange={(e) => setCreatePhone(e?.target?.value)}
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
                      onChange={(e) => setJoinCode(e?.target?.value)}
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

          <Dialog open={addScreenOpen} onOpenChange={setAddScreenOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Screener</DialogTitle>
                <DialogDescription>
                  Share the code below with the person you want to add as a
                  screener. Note that the person will need to verify thier email
                  and phone number before they can join the organization.
                </DialogDescription>

                <div className="flex gap-5 flex-col mt-3">
                  <Input value={organization?.code} readOnly />
                  <Button
                    onClick={() => {
                      navigator?.clipboard?.writeText(organization?.code);
                      toast("Code copied to clipboard");
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <AlertDialog open={verifyInfoOpen} onOpenChange={setVerifyInfoOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  You need to verify your email first
                </AlertDialogTitle>
                <AlertDialogDescription>
                  You need to verify your email before you can join an
                  organization Click Continue to verify your email
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => navigate("/settings/contact")}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <Sheet open={requestsOpen} onOpenChange={setRequestsOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Requests</SheetTitle>
              <SheetDescription>
                {organization?.requesters?.map((requester) => (
                  <div
                    key={requester?.id}
                    className="flex justify-center items-center flex-col border p-5 rounded-lg mt-2"
                  >
                    <h3>{requester?.name}</h3>
                    <p>{requester?.email}</p>
                    <Separator className="my-4" />
                    <div className="self-center gap-5 flex items-center justify-center">
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate(`/profile/${requester?.username}`)
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => rejectCandidate(requester?.id)}
                      >
                        Reject
                      </Button>
                      <Button
                        className="bg-green-500"
                        onClick={() => acceptCandidate(requester?.id)}
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                ))}
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <Sheet open={adminSheetOpen} onOpenChange={setAdminSheetOpen}>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Add Admin</SheetTitle>
              <SheetDescription>
                Select a screener to add as an admin
              </SheetDescription>
              <div>
                {organization?.screeners?.map((screener) => (
                  <div
                    key={screener?.id}
                    className="flex justify-center items-center flex-col border p-5 rounded-lg mt-2"
                  >
                    <h3>{screener?.name}</h3>
                    <p>{screener?.email}</p>
                    <Separator className="my-4" />
                    <div className="self-center gap-5 flex items-center justify-center">
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate(`/profile/${screener?.username}`)
                        }
                      >
                        View
                      </Button>
                      <Button
                        className="bg-green-500"
                        onClick={() => {
                          setCurrentSelectedAdmin(screener?.id);
                          setConfirmAdminAdd(true);
                        }}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <AlertDialog
          open={confirmScreenerRemove}
          onOpenChange={setConfirmScreenerRemove}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to remove this screener from the
                organization?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  removeScreener(currentSelectedScreener);
                  setConfirmScreenerRemove(false);
                }}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={confirmAdminRemove}
          onOpenChange={setConfirmAdminRemove}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to remove this admin from the organization?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmAdminRemove(false);
                  removeAdmin(currentSelectedAdmin);
                }}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog
          open={confirmAdminDemote}
          onOpenChange={setConfirmAdminDemote}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to demote this admin to a screener?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmAdminDemote(false);
                  demoteAdmin(currentSelectedAdmin);
                }}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog open={confirmAdminAdd} onOpenChange={setConfirmAdminAdd}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Do you really want to add this user as an admin?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  setConfirmAdminAdd(false);
                  addAsAdmin(currentSelectedAdmin);
                }}
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Details</DialogTitle>
              <DialogDescription>
                <p className="mt-5 mb-2">Website</p>
                <Input
                  type="text"
                  onChange={(e) => setEditWebsite(e.target.value)}
                  value={editWebsite}
                />

                <p className="mt-5 mb-2">Email</p>
                <Input
                  type="email"
                  onChange={(e) => setEditEmail(e.target.value)}
                  value={editEmail}
                />

                <p className="mt-5 mb-2">Phone</p>
                <Input
                  type="number"
                  onChange={(e) => setEditPhone(e.target.value)}
                  value={editPhone}
                />

                <Button className="w-full mt-5" onClick={saveEdits}>
                  {editLoading ? (
                    <ReloadIcon className="animate-spin h-4 w-4" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  } else return <Loader />;
};

export default Organization;
