import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import RowProblem from "./RowProblem";

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const AllProblems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/problems`,
          {
            withCredentials: true,
          }
        );
        // console.log(response.data.problems);
        setProblems(response.data.problems);
      } catch (error) {
        toast.error("Failed to fetch problems");
        console.error("Failed to fetch problems:", error);
      }
      setLoading(false);
    };
    AllProblems();
  }, []);

  if (loading) return <div>Loading</div>;

  return (
    <div className="h-full bg-white">
      <table className="w-[95%] mx-auto mt-8 bg-white">
        <thead className="bg-gray-100 h-12">
          <tr>
            <th className="font-semibold text-left text-md py-5 px-2">#</th>
            <th className="font-semibold text-left text-md py-3 px-2] w-[25%]">
              Problem Title
            </th>
            <th className="font-semibold text-left text-md py-3 px-2] w-[20%]">
              Created on
            </th>
            <th className="font-semibold text-left text-md py-3 px-2">
              Submissions
            </th>
            <th className="font-semibold text-left text-md py-3 px-2] ">
              Success rate
            </th>
            <th className="font-semibold text-left text-md py-3 pr-4">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {problems.map((prob, idx) => {
            return (
              <RowProblem
                key={idx}
                idx={idx}
                prob={prob}
                title={prob?.title}
                CreatedOn={prob?.createdAt}
                Submissions={prob?.Submissions}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProblems;
