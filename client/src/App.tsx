import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProtectedRoutes from "./ProtectedRoutes";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import GoogleSuccess from "./pages/auth/GoogleSuccess";
import Cookies from "js-cookie";
import expireSession from "./functions/expireSession";
import { useDispatch } from "react-redux";
import User from "./types/User";
import { clearUser, setUser } from "./states/user/UserSlice";
import axios from "axios";

function App() {
  const [userLocal, setUserLocal] = useState<null | Object>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    axios.defaults.withCredentials = true;
    const token = Cookies.get("token");
    if (token) {
      const decodedToken: User = jwtDecode(token);
      setUserLocal(decodedToken);
      dispatch(setUser(decodedToken));
    } else {
      dispatch(clearUser());
    }
    setLoading(false);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {userLocal && !loading ? (
          ProtectedRoutes()
        ) : (
          <Route path="*" element={<Login />} />
        )}
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/google/success" element={<GoogleSuccess />} />

        <Route path="*" element={"404 Not Found"} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
