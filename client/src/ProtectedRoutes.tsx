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
import Assessments from "./pages/assessments/Screenings";
import Submission from "./pages/submission/Submission";
import Profile from "./pages/profile/Profile";
import CreateScreening from "./pages/assessments/create/CreateScreening";
import Organization from "./pages/organization/Organization";

export const Routes = [
  { path: "/editor/:id", Component: Editor },
  { path: "/problems/create", Component: CreateProblem },
  { path: "/problems/:id/edit", Component: CreateProblem },
  { path: "/settings", Component: Settings },
  { path: "/settings/logins", Component: RecentLogins },
  { path: "/settings/password", Component: ChangePassword },
  { path: "/settings/two-factor", Component: TFA },
  { path: "/screenings", Component: Assessments },
  { path: "/screenings/create", Component: CreateScreening },
  { path: "/organization", Component: Organization },
  { path: "/u/:id", Component: Profile },
  { path: "/learn", Component: Learn },
  { path: "/course", Component: Course },
  { path: "/course/:courseName", Component: CourseName },
  { path: "/submission/:id", Component: Submission },
  { path: "/", Component: Home },
];
