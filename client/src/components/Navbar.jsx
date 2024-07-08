import { Link } from "react-router-dom";
import Profile from "./ui/Avatar";
import { AiOutlineFire } from "react-icons/ai";
import { AiFillFire } from "react-icons/ai";
import { PiFireLight } from "react-icons/pi";
import { useState } from "react";
import { PiFireFill } from "react-icons/pi";

const Navbar = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="h-fit bg-gray-200 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        <Link to="home" className="flex gap-2 items-center">
          <p className="hidden text-zinc-700 text-base font-semibold md:block">
            CodeIT
          </p>
        </Link>
        <div className="flex gap-x-10">
          <Link
            to="/home"
            className="text-zinc-700 text-sm font-medium hover:text-green-500 hover:"
          >
            Home
          </Link>

          <Link
            to="/leaderboard"
            className="text-zinc-700 text-sm font-medium hover:text-green-500 hover:"
          >
            Leaderboard
          </Link>
          <Link
            to="/allproblems"
            className="text-zinc-700 text-sm font-medium hover:text-green-500 hover:"
          >
            Problems
          </Link>
        </div>

        <div className="flex items-center gap-x-6">
          <div className="flex items-center ">
            <PiFireFill size={25} className="text-gray-900 fill-orange-500" />
            <p className="text-gray-950">7</p>
          </div>
          <Profile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
