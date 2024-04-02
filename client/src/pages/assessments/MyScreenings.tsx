import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Screening from "@/types/Screenings";
import axios from "axios";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";

const MyAssessments = () => {
  const navigate = useNavigate();
  const [screenings, setScreenings] = useState<Screening[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`${import.meta.env.VITE_BACKEND_ADDRESS}/screenings/get/my`)
      .then((res) => {
        setScreenings(res.data);
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
        + Create Screenings
      </Button>
      {loading ? (
        <ReloadIcon className="w-6 h-6 animate-spin mt-10 ml-16" />
      ) : (
        <div>
          {screenings.length === 0 ? (
            <div className="mt-5">No Screenings Yet</div>
          ) : (
            <div className="mt-5">
              {screenings.map((screening) => (
                <div key={screening._id} className="border p-2 rounded-md mt-2">
                  <div>{screening.name}</div>
                  <div className="text-xs text-gray-500">{screening.desc}</div>
                  <div>{screening.duration} mins</div>
                  <Button
                    onClick={() => navigate(`/screenings/${screening._id}`)}
                    className="mt-2"
                  >
                    View
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(`/screenings/${screening._id}/edit`)
                    }
                    className="mt-2"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(`/screenings/${screening._id}/candidates`)
                    }
                    className="mt-2"
                  >
                    Candidates
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(`/screenings/${screening._id}/results`)
                    }
                    className="mt-2"
                  >
                    Results
                  </Button>

                  <Button
                    onClick={() =>
                      navigate(`/screenings/${screening._id}/feedback`)
                    }
                    className="mt-2"
                  >
                    Feedback
                  </Button>
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
