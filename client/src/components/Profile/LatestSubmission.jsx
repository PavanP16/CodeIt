/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";

import Tag from "../ui/Tag";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import toast from "react-hot-toast";

const LatestSubmission = ({ sub }) => {
  const [problem, setProblem] = useState({});
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  console.log(sub?.problemId);

  useEffect(() => {
    const getProblemDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/problems/prob/${
            sub?.problemId
          }`,
          {
            withCredentials: true,
          }
        );
        setProblem(response.data.problem);
      } catch (error) {
        toast.error("Failed to fetch submissions");
        console.error("Failed to fetch submissions:", error);
      }
    };

    getProblemDetails();
  }, []);

  return (
    <div className="w-full flex justify-between bg-gray-50 shadow rounded-xl py-6 px-4">
      <div className="flex flex-col w-[50%] gap-y-4">
        <h1>{problem?.title}({sub?.language === "cpp" ? "C++" :sub?.language === "java" ? "Java" : "Python"})</h1>
        <div className="flex flex-wrap gap-2">
          {problem?.tags?.map((tg, id) => {
            return <Tag key={id} value={tg} size="sm" />;
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-y-3">
        <div className="bg-emerald-600 px-5 py-2 rounded-lg hover:bg-emerald-700 hover:cursor-pointer">
          <h1 className="text-white" onClick={onOpen}>
            View Solution
          </h1>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
            <ModalContent>
              {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Your Submission
                  </ModalHeader>
                  <ModalBody>
                    <Editor
                      height="70vh"
                      options={{ readOnly: true }}
                      language={sub?.language}
                      theme="vs-light"
                      value={sub?.code}
                    />
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="flex items-center">
          <div className="border border-transparent border-r-1 border-r-gray-500 pr-2">
            <h1 className="text-sm">{problem?.difficulty}</h1>
          </div>
          <p className="pl-2 text-sm">{problem?.Submissions}</p>
        </div>
      </div>
    </div>
  );
};

export default LatestSubmission;
