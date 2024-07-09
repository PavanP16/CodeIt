import { VscSignOut } from "react-icons/vsc";
import { ClipboardCheck, ClipboardPlus, List, UserRound } from "lucide-react";
import styles from "./SidebarAdmin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { TfiWrite } from "react-icons/tfi";
import { useGlobalContext } from "../../../ContextAPI/AuthContext";
import { PiNotepad } from "react-icons/pi";
import { FaDatabase } from "react-icons/fa6";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const { logoutUser } = useGlobalContext();
  return (
    <div className="bg-white h-[80vh] rounded-lg pr-3 sticky top-0">
      <div className="flex items-center justify-center gap-x-3 h-20">
        <FaDatabase size={20}/>
        <h1 className="text-xl">Admin</h1>
      </div>
      <div className="flex flex-col justify-between">
        <>
  
          <NavLink
            to="problems"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(255 251 235)",
                    borderRadius: 5,
                    color: "rgb(245 158 11)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 text-gray-500 font-semibold ml-2 pl-3 px-2 py-3 rounded-md " +
              styles.box
            }
          >
            <List size={20} className={"text-inherit " + styles.inicon} />

            <h1 className={"text-sm text-inherit " + styles.intext}>
              Problems
            </h1>
          </NavLink>

          <NavLink
            to="createproblem"
            style={({ isActive }) =>
              isActive
                ? {
                    background: "rgb(255 251 235)",
                    borderRadius: 5,
                    color: "rgb(245 158 11)",
                  }
                : {}
            }
            className={
              "mt-2 flex items-center gap-x-2 ml-2 pl-3 px-2 py-3 rounded-md text-gray-500 font-semibold " +
              styles.box
            }
          >
            <ClipboardPlus
              size={17}
              className={"text-inherit " + styles.inicon}
            />
            <h1 className={"text-sm text-inherit " + styles.intext}>
              Create Problem
            </h1>
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

export default SidebarAdmin;
