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

const Root = () => {
  const path = useLocation();
  return (
    <>
      {/* {!(path.pathname === "/") && <Navbar />} */}
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
