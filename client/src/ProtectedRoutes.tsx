import Editor from "./pages/editor/Editor";
import CreateProblem from "./pages/problems/create/CreateProblem";
import CreateProblemL from "./pages/problems/create/legacy/CreateProblem";
import Home from "./pages/home/Home";
import Settings from "./pages/settings/Settings";
import RecentLogins from "./pages/settings/recent_logins/RecentLogins";
import ChangePassword from "./pages/settings/change_password/ChangePassword";
import TFA from "./pages/settings/tfa/TFA";
import Assessments from "./pages/assessments/Screenings";
import Submission from "./pages/submission/Submission";
import Profile from "./pages/profile/Profile";
import CreateScreening from "./pages/assessments/create/CreateScreening";
import Organization from "./pages/organization/Organization";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { clearUser, setUser } from "./states/user/UserSlice";
import { useDispatch } from "react-redux";
import ErrB from "./ErrorBoundary";
import Leaderboards from "./pages/leaderboards/Leaderboards";
import RedirectScreening from "./pages/Redirects/Redirects";
import Results from "./pages/assessments/results/Results";
import CandidateReport from "./pages/assessments/results/candidate/CandidateReport";
import SubmissionReport from "./pages/assessments/results/submission/Submission";
import UserToken from "./types/UserToken";
import Contact from "./pages/settings/contact/Contact";

// eslint-disable-next-line react-refresh/only-export-components
export const Routes = [
  {
    element: <ErrB />,
    children: [
      { path: "/editor/:id", Component: Editor },
      { path: "/problems/create", Component: CreateProblem },
      { path: "/problems/:id/edit", Component: CreateProblem },
      { path: "/problems/l/create", Component: CreateProblemL },

      { path: "/settings", Component: Settings },
      { path: "/settings/logins", Component: RecentLogins },
      { path: "/settings/password", Component: ChangePassword },
      { path: "/settings/two-factor", Component: TFA },
      { path: "/settings/contact", Component: Contact},

      { path: "/screenings", Component: Assessments },
      { path: "/screenings/create", Component: CreateScreening },
      { path: "/screenings/:id/results", Component: Results },
      { path: "/screenings/:screenId/results/c/:candidateId", Component: CandidateReport},
      { path: "/screenings/:screenId/results/c/:candidateId/s/:sid", Component: SubmissionReport},

      { path: "/r/:id", Component: RedirectScreening },

      { path: "/organization", Component: Organization },
      
      { path: "/u/:id", Component: Profile },

      { path: "/submission/:id", Component: Submission },

      { path: "/", Component: Home },

      { path: "/leaderboards", Component: Leaderboards },
    ],
  },
];

export default function ProtectedRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    const excludeRedirection = [
      "/signin",
      "/signup",
      "/screenings/",
      "/screenings",
      "/r/",
      "/screenings/current",
      "screening/current/editor"
    ];
    const token = Cookies.get("token");
    if (token) {
      const decodedToken: UserToken = jwtDecode(token);
      dispatch(setUser(decodedToken));
    } else {
      const currentPath = window.location.pathname;
      let redirectToSignIn = true;
      excludeRedirection.forEach((excludedPath) => {
        if (currentPath.includes(excludedPath)) {
          redirectToSignIn = false;
        }
      });
      if (redirectToSignIn) {
        window.location.href = "/signin";
      }
      dispatch(clearUser());
    }
  }, [dispatch]);
}
