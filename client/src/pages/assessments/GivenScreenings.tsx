import Screening from "@/types/Screenings";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const GivenAssessments = () => {
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
      <div>
        {loading ? (
          <ReloadIcon className="w-6 h-6 animate-spin mt-10 ml-16 animate__fadeIn animate__faster" />
        ) : screenings.length === 0 ? (
          <div className="mt-5  animate__fadeIn animate__faster">No Screenings Yet</div>
        ) : (
          <div className="mt-5 flex gap-5 flex-wrap animate__animated animate__fadeIn animate__faster">
            {screenings.map((screening) => (
              <div key={screening._id} className="border p-5 rounded-md mt-2 w-[23%] bg-card h-[25vh] overflow-hidden">
                <h3>{screening.name}</h3>
                <div className=" mt-1 text-xs text-gray-500">
                  {screening.desc}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GivenAssessments;
