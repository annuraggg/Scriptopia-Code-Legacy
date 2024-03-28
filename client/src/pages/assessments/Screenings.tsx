import { Navbar } from "@/components/ui/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyAssessments from "./MyScreenings";
import GivenAssessments from "./GivenScreenings";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RocketIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import TagsInput from "react-tagsinput";

interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const Screenings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [enabledScreening, setEnabledScreening] = useState(false);
  const [organization, setOrganization] = useState({} as any);
  const [openModal, setOpenModal] = useState(false);
  const [cities, setCities] = useState<City[]>([] as City[]);

  const [experience, setExperience] = useState(0);
  const [selectedCities, setSelectedCities] = useState<City[]>([] as City[]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [_currentCity, setCurrentCity] = useState<City>({} as City);

  const [citiesOpen, setCitiesOpen] = useState(false);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/getStatus`)
      .then((res) => {
        setEnabledScreening(res.data.enabledScreening);
        setOrganization(res.data.organization);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/cities`)
      .then((res) => {
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Please try again later.");
      });
  }, []);

  const searchCities = (e: any) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/api/cities`, {
        search: e.target.value,
      })
      .then((res) => {
        setCities(res.data.cities);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Please try again later.");
      });
  };

  const submit = () => {
    if (
      !experience ||
      selectedRoles.length === 0 ||
      selectedCities.length === 0
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (experience < 1 || experience > 70) {
      toast.error("Experience cannot be less than 1 or more than 70");
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/enable`, {
        experience,
        roles: selectedRoles,
        cities: selectedCities.map((city) => city.name),
      })
      .then(() => {
        toast.success("Screenings Enabled Successfully");
        setEnabledScreening(true);
        setOpenModal(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong! Please try again later.");
      });
  };

  if (!loading) {
    if (!enabledScreening) {
      return (
        <>
          <Navbar />
          <div className="px-10 py-5">
            <Alert>
              <AlertTitle>Screenings are disabled</AlertTitle>
              <AlertDescription>
                Click below to enable screenings.
              </AlertDescription>
            </Alert>

            <Button className="mt-5" onClick={() => setOpenModal(true)}>
              Enable Screenings
            </Button>

            <Dialog open={openModal} onOpenChange={setOpenModal}>
              <DialogContent>
                <>
                  <DialogHeader>
                    <DialogTitle>
                      We will need some additional info to get started
                    </DialogTitle>
                    <DialogDescription className="flex flex-col gap-5">
                      Please provide the following information to enable
                      screenings{" "}
                    </DialogDescription>
                    <div className="pt-5">
                      <label htmlFor="experience">
                        Years of Experience you have
                      </label>
                      <Input
                        type="number"
                        name="experience"
                        id="experience"
                        className="mt-2"
                        value={experience}
                        onChange={(e) =>
                          setExperience(parseInt(e.target.value))
                        }
                      />
                    </div>
                    <div className="pt-5">
                      <label htmlFor="roles">
                        Enter your preferred Job Roles (Use Enter to add more
                        roles)
                      </label>

                      <TagsInput
                        value={selectedRoles}
                        onChange={(tags) => setSelectedRoles(tags)}
                        className="mt-2 border rounded-lg pt-[5px] px-2"
                        onlyUnique={true}
                      />
                    </div>
                    <div className="pt-5">
                      <div className="flex gap-2 items-center">
                        <label htmlFor="cities">
                          Enter your preferred Job Cities
                        </label>
                        <p
                          className="text-primary cursor-pointer text-lg"
                          onClick={() => setCitiesOpen(true)}
                        >
                          +
                        </p>
                      </div>

                      {selectedCities.length > 0 ? (
                        <div className="flex gap-2 mt-2">
                          {selectedCities.map((city) => (
                            <div
                              key={city.id}
                              className="flex gap-2 items-center p-2 rounded-md"
                            >
                              <p>{city.name}</p>
                              <button
                                onClick={() =>
                                  setSelectedCities(
                                    selectedCities.filter(
                                      (c) => c.id !== city.id
                                    )
                                  )
                                }
                              >
                                x
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="mt-2">
                          No cities selected{" "}
                          <span
                            className="text-primary cursor-pointer"
                            onClick={() => setCitiesOpen(true)}
                          >
                            Add a city to get started
                          </span>
                        </p>
                      )}

                      <CommandDialog
                        open={citiesOpen}
                        onOpenChange={setCitiesOpen}
                      >
                        <CommandInput
                          placeholder="Enter a City Name..."
                          onChangeCapture={(e) => searchCities(e)}
                        />
                        <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup heading="Cities in India">
                            {cities.map((city) => (
                              <CommandItem
                                key={city.id}
                                onSelect={() => {
                                  setSelectedCities([...selectedCities, city]);
                                  setCurrentCity(city);
                                  setCitiesOpen(false);
                                }}
                              >
                                {city.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </CommandDialog>
                    </div>

                    <br />

                    <Button onClick={submit} className="mt-5">
                      Submit
                    </Button>
                  </DialogHeader>
                </>
              </DialogContent>
            </Dialog>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Navbar />
          <div className="py-5 px-10">
            <div className="flex">
              <h1>Screenings</h1>
              <IoMdInformationCircleOutline
                size="12"
                className="cursor-pointer"
                onClick={() => navigate("docs/screening")}
              />
            </div>
            <Alert className=" my-3">
              <RocketIcon className="h-4 w-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                To Learn More about Screenings, click{" "}
                <a
                  onClick={() => navigate("docs/screening")}
                  className="text-primary underline cursor-pointer"
                >
                  here
                </a>
                .
              </AlertDescription>
            </Alert>

            <Tabs defaultValue="Given" className="mt-5">
              <TabsList>
                <TabsTrigger value="Given">Screenings Taken</TabsTrigger>
                <TabsTrigger value="My">My Screenings</TabsTrigger>
              </TabsList>
              <TabsContent value="Given">
                <GivenAssessments />
              </TabsContent>
              <TabsContent value="My" className="mt-3">
                {organization ? (
                  <MyAssessments />
                ) : (
                  <>
                    <Alert>
                      <AlertTitle>Organization not found</AlertTitle>
                      <AlertDescription>
                        You are not associated with any organization. You need
                        to be associated with an organization to view your
                        screenings.
                        <br />
                        <br />
                        <a href="/organization" className="text-primary cursor-pointer">
                          Click here to create or join an organization
                        </a>
                      </AlertDescription>
                    </Alert>
                  </>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </>
      );
    }
  } else {
    return <Loader />;
  }
};

export default Screenings;
