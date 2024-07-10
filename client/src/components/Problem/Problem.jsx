/* eslint-disable react/prop-types */
import React from "react";
import Tag from "../ui/Tag";
import Snippet from "../ui/Snippet";
import Example from "./Example";
import { Dot } from "lucide-react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useGlobalContext } from "../../../ContextAPI/AuthContext";

const Problem = ({ problem }) => {
  const { userDetails } = useGlobalContext();
  const exists =
    problem[0]?.solvedBy.findIndex((user) => user._id === userDetails._id) !==
    -1;
  console.log(exists);

  return (
    <div className="py-3 pl-4 border min-h-screen border-gray-200">
      <h1 className="text-xl tracking-wide font-semibold">
        1.{problem[0].title}
      </h1>
      <div className="mt-3 flex justify-between items-center">
        <Tag variant={"flat"} value={problem[0].difficulty} size={"sm"} />
        {exists && (
          <div className="mr-10 flex items-end gap-x-1">
            <p className="text-sm">Solved</p>
            <IoMdCheckmarkCircleOutline size={17} className="fill-[#28ae40]" />
          </div>
        )}
      </div>

      <p className="mt-3 text-sm mr-4 tracking-wider leading-6">
        {problem[0].description}
      </p>

      {/* <p className="mt-3 text-sm mr-4 tracking-wider leading-6">
      You must write an algorithm with <Snippet value={"O (logn)"}></Snippet> runtime complexity.
      </p> */}

      <div className="mt-8">
        {problem[0].siteCases.map((siteCase, id) => {
          return <Example key={id} siteCase={siteCase} id={id} />;
        })}
      </div>

      <h1 className="mt-8 font-semibold tracking-wide">Constraint:</h1>
      <div className="mt-1 flex items-end">
        <Dot />
        <h1 className="-mt-2 font-light text-sm tracking-wide">
          {problem[0].constraints}
        </h1>
      </div>
    </div>
  );
};

export default Problem;
