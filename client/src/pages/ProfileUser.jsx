import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";

const ProfileUser = () => {
  return (
    <div className="flex h-screen m-0 p-0">
      <div className="flex-[1] ">
        <Sidebar />
      </div>
      <div className="flex-[6] flex flex-col gap-y-2">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileUser;
