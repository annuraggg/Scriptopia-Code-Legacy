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
import "./App.css";
import { selectTheme } from "./states/user/ThemeSlice";
import { useTheme } from "./components/theme-provider";

import "./dark.css";
import "./light.css";

const router = createBrowserRouter([
  {
    element: <ErrorBoundary />,
    children: [
      { path: "/signin", Component: Login },
      { path: "/signup", Component: Signup },
      { path: "/screenings/:id", Component: Screening },
      { path: "/screenings/current", Component: Main },
      { path: "/screening/current/editor", Component: Editor },
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
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const token = Cookies.get("token");
    const colorPalette = localStorage.getItem("colorPalette");
    if (token) {
      const decodedToken: UserToken = jwtDecode(token);
      dispatch(setUser(decodedToken));
    } else {
      dispatch(clearUser());
    }

    if (!theme) {
      setTheme("dark");
    }

    let color;
    if (colorPalette) {
      selectThemeImport(colorPalette);
      color = selectColor(colorPalette);
    } else {
      localStorage.setItem("colorPalette", "blue");
      selectThemeImport("blue");
      color = selectColor("blue");
    }

    dispatch(
      selectTheme({
        colorPalette: colorPalette || "blue",
        color,
        theme: theme || "light",
      })
    );
  }, [dispatch, setTheme, theme]);

  const selectThemeImport = (color: string) => {
    switch (color) {
      case "zinc":
        import("./themes/zinc.css");
        break;
      case "blue":
        import("./themes/blue.css");
        break;
      case "green":
        import("./themes/green.css");
        break;
      case "orange":
        import("./themes/orange.css");
        break;
      case "rose":
        import("./themes/rose.css");
        break;
      case "purple":
        import("./themes/purple.css");
        break;
      case "yellow":
        import("./themes/yellow.css");
        break;
      default:
        import("./themes/blue.css");
        break;
    }
  };

  const selectColor = (color: string) => {
    switch (color) {
      case "zinc":
        return "hsl(240 5.9% 55%)";
      case "blue":
        return "hsl(221.2 83.2% 53.3%)";
      case "green":
        return "hsl(142.1 76.2% 36.3%)";
      case "orange":
        return "hsl(24.6 95% 53.1%)";
      case "rose":
        return "hsl(346.8 77.2% 49.8%)";
      case "purple":
        return "hsl(262.1 83.3% 57.8%)";
      case "yellow":
        return "hsl(47.9 95.8% 53.1%)";
      default:
        return "hsl(221.2 83.2% 53.3%)";
    }
  };

  return (
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
