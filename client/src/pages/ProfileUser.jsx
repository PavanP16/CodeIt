import { Outlet } from "react-router-dom";
import Sidebar from "../components/Profile/Sidebar";

const ProfileUser = () => {
  return (
    <div className="flex min-h-screen m-0 p-0 bg-gray-100">
      <div className="flex-[1] pt-4 pr-4">
        <Sidebar />
      </div>
      <div className="flex-[6] flex flex-col pt-4 gap-y-2">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileUser;
