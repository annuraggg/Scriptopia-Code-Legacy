import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import User from "./types/User";
import { clearUser, setUser } from "./states/user/UserSlice";
import axios from "axios";
import { Routes as ProtectedRoutes } from "./ProtectedRoutes";

const router = createBrowserRouter([
  { path: "/signin", Component: Login },
  { path: "/signup", Component: Signup },
  { path: "*", Component: fourOhFour },
  ...ProtectedRoutes,
]);

function fourOhFour() {
  return <div>404 NOT FOUND</div>;
}

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    const token = Cookies.get("token");
    if (token) {
      const decodedToken: User = jwtDecode(token);
      dispatch(setUser(decodedToken));
    } else {
      dispatch(clearUser());
    }
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
