import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Screening from "@/types/Screenings";
import axios from "axios";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { MdDelete } from "react-icons/md";

const MyAssessments = () => {
  const navigate = useNavigate();
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/get/my`)
      .then((res) => {
        setScreenings(res.data.reverse());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch screenings");
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Button onClick={() => navigate("/screenings/create")} className="mt-2">
        + Create Screening
      </Button>
      {loading ? (
        <ReloadIcon className="w-6 h-6 animate-spin mt-10 ml-16" />
      ) : (
        <div>
          {screenings.length === 0 ? (
            <div className="mt-5">No Screenings Yet</div>
          ) : (
            <div className="mt-5 flex items-center justify-start gap-5 flex-wrap animate__animated animate__fadeIn animate__faster">
              {screenings.map((screening) => (
                <div
                  key={screening._id}
                  className="p-5 rounded-xl bg-card w-[32%]"
                >
                  <h3>{screening.name}</h3>
                  <div className=" mt-1 text-xs text-gray-500">
                    {screening.desc}
                  </div>

                  <div className="flex items-end justify-end">
                    <Button
                      variant="destructive"
                      onClick={() =>
                        navigate(`/screenings/${screening._id}/responses`)
                      }
                      className="mt-2 mr-2"
                    >
                      <MdDelete />
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(`/screenings/${screening._id}/edit`)
                      }
                      className="mt-8"
                    >
                      Edit
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() => {
                        window.navigator.clipboard.writeText(
                          `${window.location.origin}/screenings/${screening._id}`
                        );

                        toast.success("Link Copied");
                      }}
                      className="mt-2 ml-2"
                    >
                      Copy Link
                    </Button>

                    <Button
                      variant="secondary"
                      onClick={() =>
                        navigate(`/screenings/${screening._id}/results`)
                      }
                      className="mt-2 ml-2"
                    >
                      Results
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyAssessments;
