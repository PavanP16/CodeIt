import React from "react";
import start from "../assets/Home1.png";
import second from "../assets/Home2.png";
import Third from "../assets/Home3.png";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";

const Home = () => {
  return (
    <div className="flex flex-col pt-16 px-64">
      <div className="flex items-start">
        <div className="mt-20 flex flex-col gap-y-8">
          <h1 className="text-5xl font-semibold w-[80%] leading-[4rem]">
            Start your coding journey today
          </h1>
          <h1 className="font-light">
            Practice all the problems and become a master coder! Our
            comprehensive leaderboard tracks your progress, allowing you to see
            how you rank against other developers. Keep solving challenges,
            improve your skills, and climb to the top!
          </h1>
          <div className="p-3 bg-amber-500 text-white w-fit rounded-lg border-2 border-amber-500 hover:bg-white hover:text-amber-500 fill-white hover:fill-amber-500 transition-all hover:cursor-pointer">
            <Link
              to="/allproblems"
              className="text-inherit flex gap-x-1 items-center"
            >
              All the Problems
              <ArrowBigRight className="text-inherit fill-inherit" />
            </Link>
          </div>
        </div>
        <img src={start} className="-mt-5" />
      </div>

      <div className="mt-10 flex h-[80vh]">
        <div className="flex-[1] -mt-28">
          <img src={second} className="w-[50rem] h-[30rem]" />
        </div>
        <div className="mt-12 pl-24 flex-[1] flex flex-col gap-y-8">
          <h1 className="text-5xl font-semibold w-[80%] leading-[4rem]">
            Leaderboard
          </h1>
          <h1 className="font-light">
            Track your coding progress and see how you rank against other
            developers! Our interactive leaderboard lets you compare your
            problem-solving skills with the entire community. Challenge yourself
            and climb the ranks today!
          </h1>
          <div className="p-3 bg-green-500 text-white w-fit rounded-lg border-2 border-green-500 hover:bg-white hover:text-green-500 fill-white hover:fill-green-500 transition-all hover:cursor-pointer">
            <Link
              to="/leaderboard"
              className="text-inherit flex gap-x-1 items-center"
            >
              Leaderboard
              <ArrowBigRight className="text-inherit fill-inherit" />
            </Link>
          </div>
        </div>
      </div>

      <div className="-mt-20 flex gap-x-2">
        <div className="flex flex-col gap-y-8">
          <h1 className="text-5xl font-semibold w-[80%] leading-[4rem]">
            Submissions
          </h1>
          <h1 className="font-light w-[85%]">
          Track all your submissions in one place! Our platform allows you to review each attempt, helping you monitor your progress and identify areas for improvement. Stay on top of your coding journey with detailed submission records.
          </h1>
          <div className="p-3 bg-gray-500 text-white w-fit rounded-lg border-2 border-gray-500 hover:bg-white hover:text-gray-500 fill-white hover:fill-gray-500 transition-all hover:cursor-pointer">
            <Link
              to="/allproblems"
              className="text-inherit flex gap-x-1 items-center"
            >
              Submissions
              <ArrowBigRight className="text-inherit fill-inherit" />
            </Link>
          </div>
        </div>
        <div className="">
          <img src={Third} className="w-[70rem] h-[30rem]" />
        </  div>
      </div>
    </div>
  );
};

export default Home;
