import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyAssessments = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Button onClick={() => navigate("/screenings/create")}>
        + Create Screenings
      </Button>
      <div className="mt-5">No Screenings Yet</div>
    </div>
  );
};

export default MyAssessments;
