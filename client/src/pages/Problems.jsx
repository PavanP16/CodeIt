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
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
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

  const handleDifficultyChange = (e) => {
    setSelectedDifficulty(e.target.value);
    console.log(e.target.value);
  };

  const filteredProblems = problems.filter((problem) => {
    const matchesDifficulty =
      selectedDifficulty === "All" ||
      problem?.difficulty === selectedDifficulty;

    const matchesSearch =
      searchTerm === "" ||
      problem.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDifficulty && matchesSearch;
  });

  if (loading) return <div>Loading</div>;

  return (
    <div className="m-0 flex pt-10 px-32 gap-x-10 bg-gray-50 h-[80vh]">
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
        <div className="flex justify-around gap-x-6">
          <div className="">
            <Select
              size="sm"
              placeholder="Select Difficulty"
              className="w-32"
              onChange={handleDifficultyChange}
            >
              {diff.map((diff, idx) => (
                <SelectItem key={diff} value={diff}>
                  {diff}
                </SelectItem>
              ))}
            </Select>
          </div>
          <Input
            isClearable={true}
            className="w-[60%]"
            size="sm"
            placeholder="Type to search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm("")}
            startContent={
              <Search
                size={15}
                className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0"
              />
            }
          />
        </div>

        <div className="mt-5 bg-white flex flex-col justify-between h-[61vh]">
          <Table isStriped shadow="none">
            <TableHeader>
              <TableColumn className="font-bold text-gray-600">
                S.No
              </TableColumn>
              <TableColumn className="font-bold text-gray-600">
                Title
              </TableColumn>
              <TableColumn className="font-bold text-gray-600">
                Difficulty
              </TableColumn>
              <TableColumn className="font-bold text-gray-600">
                Submissions
              </TableColumn>
              <TableColumn className="font-bold text-gray-600">
                Tags
              </TableColumn>
            </TableHeader>
            <TableBody>
              {filteredProblems.length === 0 ? (
                <TableRow>
                  <TableCell className="relative">
                    <p className="absolute left-80 text-lg h-[42.5vh]">No Problems Found</p>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                  </TableCell>
                  <TableCell>
                 </TableCell>
                </TableRow>
              ) : (
                filteredProblems?.map((problem, idx) => {
                  return (
                    <TableRow
                      className="hover:cursor-pointer hover:bg-gray-200"
                      key={problem._id}
                      onClick={() => navigator(`/problems/${problem?.slug}`)}
                    >
                      <TableCell className="text-xs">{idx + 1}.</TableCell>
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
                })
              )}
            </TableBody>
          </Table>
          {/* <div className="mt-2 pl-7">
            <Pagination total={3} initialPage={1} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Problems;
