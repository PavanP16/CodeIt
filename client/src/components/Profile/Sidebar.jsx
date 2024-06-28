import { VscSignOut } from "react-icons/vsc";
import {  ClipboardCheck, UserRound } from "lucide-react";
import styles from "./Sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { useGlobalContext } from "../../../ContextAPI/AuthContext";
import { PiNotepad } from "react-icons/pi";

const Sidebar = () => {

  const navigate = useNavigate();
  const { logoutUser } = useGlobalContext();
  return (
    <div className="bg-white h-[80vh] rounded-lg pr-3 sticky top-0">
      <div className="flex items-center justify-center h-20">
        {/* <img src={logo} className="h-12 w-14" /> */}
        <h1 className="text-xl">Profile</h1>
      </div>
      <div className="flex flex-col justify-between">
        <>
          <NavLink
            to="user"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(240 253 244)",
                    borderRadius: 5,
                    color: "rgb(34 197 94)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 font-semibold ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <UserRound size={17} className={styles.inicon} />
            <h1 className={"text-sm " + styles.intext}>User Details</h1>
          </NavLink>


          <NavLink
            to="skills"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(240 253 244)",
                    borderRadius: 5,
                    color: "rgb(34 197 94)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 font-semibold ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <PiNotepad size={20} className={"text-inherit " + styles.inicon} />

            <h1 className={"text-sm text-inherit " + styles.intext}>
              Skills
            </h1>
          </NavLink>

          <NavLink
            to="submissions"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(240 253 244)",
                    borderRadius: 5,
                    color: "rgb(34 197 94)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 ml-2 pl-3 px-2 py-3 rounded-md text-gray-500 font-semibold " +
              styles.box
            }
          >
            <ClipboardCheck size={17} className={"text-inherit " + styles.inicon} />
            <h1 className={"text-sm text-inherit " + styles.intext}>Submissions</h1>
          </NavLink>
        </>
        <div className="mt-24">     
          <button
            className={
              "mt-3 flex items-center gap-x-2 text-gray-500 font-semibold w-full ml-2 pl-3 mr-3 px-2 py-3 rounded-md hover:bg-rose-100 hover:text-rose-500 transition ease-in-out duration-300"
            }
            onClick={() => {
              logoutUser();
              navigate("/");
            }}
          >
            <VscSignOut size={20} className={"text-inherit"} />
            <h1 className={"text-sm text-inherit"}>LogOut</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
