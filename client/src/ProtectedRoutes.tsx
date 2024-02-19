import { Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Editor from "./pages/editor/Editor";
import CreateProblem from "./pages/problems/create/CreateProblem";
import Home from "./pages/home/Home";

function ProtectedRoutes() {
  return (
    <>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/editor/:id" element={<Editor />} />
      <Route path="/create/problem" element={<CreateProblem />} />

      <Route path="/" element={<Home />} />

      <Route path="*" element={"404 Not Found"} />
    </>
  );
}

export default ProtectedRoutes;
