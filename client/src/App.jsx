import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Auth from "./pages/Auth";
import { AppProvider } from "../ContextAPI/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import ProtectedLayout from "../ProtectedRoute/ProtectedLayout";
import Navbar from "./components/Navbar";
import Problems from "./pages/Problems";
import Leaderboard from "./pages/Leaderboard";
import ProfileUser from "./pages/ProfileUser";
import UserDetails from "./components/Profile/UserDetails";
import Resume from "./components/Profile/Resume";
import Submissions from "./components/Profile/Submissions";
import ProblemDetail from "./pages/ProblemDetail";
import Admin from "./pages/Admin";
import AdminProblems from "./components/Admin/AdminProblems";
import AddProblem from "./components/Admin/AddProblem";

const Root = () => {
  const path = useLocation();
  return (
    <>
      {!(path.pathname === "/") && !path.pathname.startsWith("/admin") && (
        <Navbar />
      )}
      <Outlet />
    </>
  );
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Auth />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="allproblems" element={<Problems />} />
        <Route path="problems/:slug" element={<ProblemDetail />} />
        <Route path="profile" element={<ProfileUser />}>
          <Route path="user" element={<UserDetails />} />
          <Route path="skills" element={<Resume />} />
          <Route path="submissions" element={<Submissions />} />
        </Route>
        <Route path="admin" element={<Admin />}>
          <Route path="problems" element={<AdminProblems />} />
          <Route path="createproblem" element={<AddProblem />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="w-screen h-screen overflow-x-hidden">
      <AppProvider>
        <NextUIProvider>
          <Toaster />
          <RouterProvider router={Router} />
        </NextUIProvider>
      </AppProvider>
    </div>
  );
}

export default App;
