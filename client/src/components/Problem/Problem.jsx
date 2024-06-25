import React from "react";
import Tag from "../ui/Tag";
import Snippet from "../ui/Snippet";
import Example from "./Example";

const Problem = () => {
  return (
    <div className="py-3 pl-4 border min-h-screen">
      <h1 className="text-xl tracking-wide font-semibold">1.Binary Search</h1>
      <div className="mt-3">
        <Tag variant={"flat"} color={"success"} value={"Easy"} size={"sm"} />
      </div>

      <p className="mt-3 text-sm mr-4 tracking-wider leading-6">
        Given an array of integers nums which is sorted in ascending order, and
        an integer target, write a function to search target in nums. If target
        exists, then return its index. Otherwise, return -1.
      </p>

      <p className="mt-3 text-sm mr-4 tracking-wider leading-6">
      You must write an algorithm with <Snippet value={"O (logn)"}></Snippet> runtime complexity.
      </p>

        <div className="mt-8">
            <Example />
        </div>
    </div>
  );
};

export default Problem;
