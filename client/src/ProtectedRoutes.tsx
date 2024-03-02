import { Route } from "react-router-dom";
import Editor from "./pages/editor/Editor";
import CreateProblem from "./pages/problems/create/CreateProblem";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import RecentLogins from "./pages/settings/recent_logins/RecentLogins";
import ChangePassword from "./pages/settings/change_password/ChangePassword";
import TFA from "./pages/settings/tfa/TFA";
import Learn from "./pages/learn/Learn";

function ProtectedRoutes() {
  return (
    <>
      <Route path="/editor/:id" element={<Editor />} />
      <Route path="/create/problem" element={<CreateProblem />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/logins" element={<RecentLogins />} />
      <Route path="/settings/password" element={<ChangePassword />} />
      <Route path="/settings/two-factor" element={<TFA />} />

      <Route path="/learn" element={<Learn />} />

      <Route path="/" element={<Home />} />

      <Route path="*" element={"404 Not Found"} />
    </>
  );
}

export default ProtectedRoutes;
