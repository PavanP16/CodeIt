import React from "react";
import Tag from "../ui/Tag";

const LatestSubmission = ({ title, diff,sols }) => {
  return (
    <div className="w-full flex justify-between bg-gray-50 shadow rounded-xl py-6 px-4">
      <div className="flex flex-col w-[50%] gap-y-4">
        <h1>{title}</h1>
        <div className="flex flex-wrap gap-2">
          <Tag value="Array" size="sm" />
          <Tag value="DP" size="sm" />
          <Tag value="Recursion" size="sm" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-3">
        <div className="bg-emerald-600 px-5 py-2 rounded-lg hover:bg-emerald-700 hover:cursor-pointer">
          <h1 className="text-white">View Solution</h1>
        </div>
        <div className="flex items-center">
          <div className="border border-transparent border-r-1 border-r-gray-500 pr-2">
            <h1 className="text-sm">
              {diff}
            </h1>
          </div>
          <p className="pl-2 text-sm">{sols}</p>
        </div>
      </div>
    </div>
  );
};

export default LatestSubmission;
