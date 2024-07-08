import { Pagination } from "@nextui-org/pagination";
import { Chip } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React, { useEffect, useState } from "react";
import { IoIosPodium } from "react-icons/io";
import first from "../assets/first.svg";
import second from "../assets/second.svg";
import third from "../assets/third.svg";
import axios from "axios";
import toast from "react-hot-toast";

const Leaderboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/users/leaderboard`,
          {
            withCredentials: true,
          }
        );
        console.log(data);
        setData(data?.users);
      } catch (error) {
        toast.error("Failed to fetch leaderboard");
        console.error("Failed to fetch leaderboard:", error);
      }
    };

    getLeaderboard();
  }, []);
  //   const data = [
  //     {
  //       name: "Pavan Kumar",
  //       days: 67,
  //       score: 700,
  //     },
  //     {
  //       name: "Ananya Singh",
  //       days: 45,
  //       score: 680,
  //     },
  //     {
  //       name: "Ravi Patel",
  //       days: 40,
  //       score: 500,
  //     },
  //     {
  //       name: "Neha Sharma",
  //       days: 35,
  //       score: 435,
  //     },
  //     {
  //       name: "Amit Verma",
  //       days: 30,
  //       score: 410,
  //     },
  //     {
  //       name: "Priya Reddy",
  //       days: 27,
  //       score: 300,
  //     },
  //     {
  //       name: "Sandeep Kumar",
  //       days: 23,
  //       score: 254,
  //     },
  //     {
  //       name: "Ritika Gupta",
  //       days: 22,
  //       score: 250,
  //     },
  //     {
  //       name: "Manish Yadav",
  //       days: 20,
  //       score: 210,
  //     },
  //     {
  //       name: "Shivani Desai",
  //       days: 20,
  //       score: 200,
  //     },
  //   ];

  return (
    <div className="px-64">
      <div className="mt-5 p-1 flex gap-x-2 rounded-md items-center justify-center bg-green-500">
        <IoIosPodium size={38} className="text-white fill-white" />
        <h1 className="text-xl text-white font-semibold tracking-wide uppercase">
          Leaderboard
        </h1>
      </div>
      <div className="bg-white h-fit">
        <Table isStriped shadow="none">
          <TableHeader>
            <TableColumn className="text-bold text-sm text-gray-700">
              #Rank
            </TableColumn>
            <TableColumn className="text-bold text-sm text-gray-700">
              Username
            </TableColumn>
            <TableColumn className="text-bold text-sm text-gray-700">
              Overall Score
            </TableColumn>
            {/* <TableColumn className="text-bold text-sm text-gray-700">
              Questions solved
            </TableColumn> */}
          </TableHeader>
          <TableBody>
            {data.map((rs, idx) => {
              return (
                <TableRow key={idx} className="py-3">
                  <TableCell>
                    {idx <= 2 ? (
                      <img
                        src={idx == 0 ? first : idx == 1 ? second : third}
                        className="w-9 h-9"
                      />
                    ) : (
                      <p className="pl-3 font-light">{idx + 1}.</p>
                    )}
                  </TableCell>
                  <TableCell className="w-72 py-4 font-light">
                    {rs.username}
                  </TableCell>
                  <TableCell className="pl-6">{rs.score}</TableCell>
                  {/* <TableCell className="pl-20">{rs.solvedQuestions}</TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Leaderboard;
