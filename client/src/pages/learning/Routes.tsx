import { Route } from "react-router-dom";
import AssesmentStart from "./{lang}/new/AssessmentStart";

const RoutesComp = () => {
  return (
    <>
      <Route path="/learning/:lang/new" element={<AssesmentStart />} />
    </>
  );
};

export default RoutesComp;
