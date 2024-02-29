import { Route } from "react-router-dom";
import Editor from "./pages/editor/Editor";
import CreateProblem from "./pages/problems/create/CreateProblem";
import Home from "./pages/home/Home";
import Username from "./pages/auth/Username";
import Settings from "./pages/settings/Settings";
import RecentLogins from "./pages/settings/recent_logins/RecentLogins";
import ChangePassword from "./pages/settings/change_password/ChangePassword";
import TFA from "./pages/settings/tfa/TFA";

function ProtectedRoutes() {
  return (
    <>
      <Route path="/profile/new/username" element={<Username />} />

      <Route path="/editor/:id" element={<Editor />} />
      <Route path="/create/problem" element={<CreateProblem />} />

      <Route path="/settings" element={<Settings />} />
      <Route path="/settings/logins" element={<RecentLogins />} />
      <Route path="/settings/password" element={<ChangePassword />} />
      <Route path="/settings/two-factor" element={<TFA />} />

      <Route path="/" element={<Home />} />

      <Route path="*" element={"404 Not Found"} />
    </>
  );
}

export default ProtectedRoutes;
