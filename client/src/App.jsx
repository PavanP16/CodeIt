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

const Root = () => {
  const path = useLocation();
  console.log(path.pathname);
  return (
    <>
      {/* {!(path.pathname === "/") && <Navbar />} */}
      <Outlet />;
    </>
  );
};

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="" element={<Auth />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <NextUIProvider>
        <RouterProvider router={Router} />
      </NextUIProvider>
    </>
  );
}

export default App;
