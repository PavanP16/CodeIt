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
import { useNavigate } from "react-router-dom";
import Tag from "../components/ui/Tag";

const Problems = () => {
  const navigator = useNavigate();

  const problemsData = 
    {
      title: "Binary Search Binary Search Binary Search ",
      difficulty: "Hard",
      tags: ["Searching", "Arrays", "LogN"],
    }
  
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

  return (
    <div className="m-0 flex h-screen pt-16 px-32 gap-x-10 bg-gray-50">
      <div className="h-fit pb-52 w-52 flex-[3] p-5 bg-white rounded-md">
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
      <div className=" h-screen w-52 flex-[9] p-5 bg-white">
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

        <div className="mt-10">
          <Table isStriped>
            {" "}
            <TableHeader>
              <TableColumn>S.No</TableColumn>
              <TableColumn>Title</TableColumn>
              <TableColumn>Difficulty</TableColumn>
              <TableColumn>Submissions</TableColumn>
              <TableColumn>Tags</TableColumn>
            </TableHeader>
            <TableBody>
              {/* {problemsData?.map((problem, idx) => { */}
                <TableRow
                  onClick={() =>
                    navigator(`/problems/${problemsData.slug}/description`)
                  }
                >
                  <TableCell >
                   1
                  </TableCell>
                  <TableCell className="text-sm">
                    {problemsData.title}
                  </TableCell>
                  <TableCell >
                    <Chip
                      variant="light"
                      color={
                        problemsData.difficulty === "Easy"
                          ? "success"
                          : problemsData.difficulty === "Medium"
                          ? "warning"
                          : problemsData.difficulty === "Hard"
                          ? "danger"
                          : "default"
                      }
                      size="sm"
                    >
                      {problemsData.difficulty}
                    </Chip>
                  </TableCell>
                  <TableCell>
                    672
                  </TableCell>
                  <TableCell >
                    {problemsData.tags.map((tag) => {
                      <Tag value={tag} size={"sm"}></Tag>
                    })}
                  </TableCell>
                </TableRow>
                <TableRow
                  onClick={() =>
                    navigator(`/problems/${problemsData.slug}/description`)
                  }
                >
                  <TableCell >
                   1
                  </TableCell>
                  <TableCell >
                  Binary Search Binary Search Binary Search Biny Searc
                  </TableCell>
                  <TableCell >
                    <Chip
                      variant="light"
                      color={
                        problemsData.difficulty === "Easy"
                          ? "success"
                          : problemsData.difficulty === "Medium"
                          ? "warning"
                          : problemsData.difficulty === "Hard"
                          ? "warning"
                          : "default"
                      }
                      size="sm"
                    >
                      Medium
                    </Chip>
                  </TableCell>
                  <TableCell>
                    672
                  </TableCell>
                  <TableCell className="w-44 flex gap-x-3">
                    <Tag value={"DP"} size={"sm"}></Tag>
                    <Tag value={"Searching"} size={"sm"}></Tag>
                  </TableCell>
                </TableRow>
              {/* })} */}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Problems;
