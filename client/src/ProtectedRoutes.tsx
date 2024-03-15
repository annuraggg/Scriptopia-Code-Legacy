import { Route } from "react-router-dom";
import Editor from "./pages/editor/Editor";
import CreateProblem from "./pages/problems/create/CreateProblem";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import RecentLogins from "./pages/settings/recent_logins/RecentLogins";
import ChangePassword from "./pages/settings/change_password/ChangePassword";
import TFA from "./pages/settings/tfa/TFA";
import Learn from "./pages/learn/Learn";
import Course from "./pages/course/Course";
import CourseName from "./pages/course/{courseName}/CourseName";
import Assessments from "./pages/assessments/Assessments";
import SubRoutes from "./SubRoutes";
import Submission from "./pages/submission/Submission";

function ProtectedRoutes() {
  return (
    <>
      {SubRoutes()}
      <Route path="/editor/:id" element={<Editor />} />
      <Route path="/problems/create" element={<CreateProblem />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/logins" element={<RecentLogins />} />
      <Route path="/settings/password" element={<ChangePassword />} />
      <Route path="/settings/two-factor" element={<TFA />} />

      <Route path="/assessments" element={<Assessments />} />

      <Route path="/learn" element={<Learn />} />

      <Route path="/course" element={<Course />} />
      <Route path="/course/:courseName" element={<CourseName />} />

      <Route path="/submission/:id" element={<Submission />} />

      <Route path="/" element={<Home />} />

      <Route path="*" element={"404 Not Found"} />
    </>
  );
}

export default ProtectedRoutes;
