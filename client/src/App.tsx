import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./states/user/UserSlice";
import axios from "axios";
import { Routes as ProtectedRoutes } from "./ProtectedRoutes";
import ErrorBoundary from "./ErrorBoundary";
import { Button } from "./components/ui/button";
import Screening from "./pages/assessments/id/Screening";
import Main from "./pages/assessments/id/Main";
import Editor from "./pages/assessments/id/Editor/Editor";
import UserToken from "./types/UserToken";
import ProtectedRoutesFunc from "./ProtectedRoutes";

const router = createBrowserRouter([
  {
    element: <ErrorBoundary />,
    children: [
      { path: "/signin", Component: Login },
      { path: "/signup", Component: Signup },
      { path: "/screenings/:id", Component: Screening},
      { path: "/screenings/current", Component: Main},
      { path: "/screening/current/editor", Component: Editor},
      { path: "*", Component: fourOhFour },
      ...ProtectedRoutes,
    ],
  },
]);

function fourOhFour() {
  return (
    <div className="flex items-center justify-center flex-col h-[100vh]">
      <img
        src="https://fontmeme.com/permalink/240331/c6c4170b2ff97fb4326fb71984b81a9b.png"
        alt="404"
        className="mix-blend-screen"
      />

      <p className=" font-bold">Page Not Found</p>
      <p>Please Check the URL and try again</p>

      <Button
        onClick={() => (window.location.href = "/")}
        variant="outline"
        className="mt-5"
      >
        Go Back to Home
      </Button>
    </div>
  );
}

function App() {
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  ProtectedRoutesFunc();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken: UserToken = jwtDecode(token);
      dispatch(setUser(decodedToken));
    } else {
      dispatch(clearUser());
    }
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
