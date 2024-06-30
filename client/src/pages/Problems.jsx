import { Chip, Input, Select, SelectItem } from "@nextui-org/react";
import { Search } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Pagination } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import Tag from "../components/ui/Tag";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Problems = () => {
  const navigator = useNavigate();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const topics = [
    "DP",
    "Arrays",
    "Graphs",
    "Sorting",
    "Greedy",
    "Cycle",
    "Math",
    "Matrix",
    "Binary Search",
    "Two Pointers",
    "Heap",
    "Sliding Window",
    "Back tracking",
    "Queue",
    "Stack",
    "Linked list",
    "Recursion",
    "Prefix Sum",
  ];

  const diff = ["Easy", "Medium", "Hard", "All"];
  const sta = ["All", "Solved"];

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
    <div className="m-0 flex pt-10 px-32 gap-x-10 bg-gray-50">
      <div className="h-fit pb-52 w-52 flex-[3] p-5 bg-white shadow-lg rounded-md">
        <h1 className="text-xl font-semibold ml-1">Tags</h1>
        <div className="mt-5 flex gap-x-3 gap-y-4 flex-wrap w-[85%]">
          {topics.map((fruit, index) => (
            <Chip
              key={index}
              size="sm"
              variant="flat"
              className="bg-gradient-to-br from-gray-300 to-gray-100 p-2"
            >
              {fruit}
            </Chip>
          ))}
        </div>
      </div>
      <div className="w-52 flex-[9] p-5 bg-white h-fit shadow-lg rounded-md">
        <div className="flex gap-x-6">
          <div className="">
            <Select size="sm" placeholder="Select Difficulty" className="w-32">
              {diff.map((diff, idx) => (
                <SelectItem
                  key={idx}
                  className={
                    diff == "Easy"
                      ? "text-green-500"
                      : diff == "Medium"
                      ? "text-amber-500"
                      : diff == "Hard"
                      ? "text-red-500"
                      : "success"
                  }
                >
                  {diff}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Select size="sm" placeholder="Status" className="w-32">
            {sta.map((sta, idx) => (
              <SelectItem key={idx}>{sta}</SelectItem>
            ))}
          </Select>
          <Input
            isClearable
            className="w-[50%]"
            size="sm"
            placeholder="Type to search..."
            startContent={
              <Search
                size={15}
                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
              />
            }
          />
        </div>

        <div className="mt-5 bg-white h-fit">
          <Table isStriped shadow="none">
            <TableHeader>
              <TableColumn>S.No</TableColumn>
              <TableColumn>Title</TableColumn>
              <TableColumn>Difficulty</TableColumn>
              <TableColumn>Submissions</TableColumn>
              <TableColumn>Tags</TableColumn>
            </TableHeader>
            <TableBody>
              {problems.length !== 0 &&
                problems?.map((problem, idx) => {
                  return (
                    <TableRow
                      className="hover:cursor-pointer hover:bg-gray-200"
                      key={problem._id}
                      onClick={() => navigator(`/problems/${problem?.slug}`)}
                    >
                      <TableCell className="text-xs">{idx + 1}</TableCell>
                      <TableCell className="text-xs w-72">
                        {problem?.title}
                      </TableCell>
                      <TableCell>
                        <Chip
                          variant="light"
                          color={
                            problem?.difficulty === "Easy"
                              ? "success"
                              : problem?.difficulty === "Medium"
                              ? "warning"
                              : problem?.difficulty === "Hard"
                              ? "danger"
                              : "default"
                          }
                          size="sm"
                        >
                          {problem?.difficulty}
                        </Chip>
                      </TableCell>
                      <TableCell className="pl-6">
                        {problem.Submissions}
                      </TableCell>
                      <TableCell className="flex gap-x-3">
                        {problem?.tags.map((tag, idx) => {
                          return <Tag key={idx} value={tag} size={"sm"}></Tag>;
                        })}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
          <div className="mt-2 pl-7">
            <Pagination total={8} initialPage={1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Problems;
