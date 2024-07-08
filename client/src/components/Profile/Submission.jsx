/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Trash } from "lucide-react";
import Tag from "../ui/Tag";
import axios from "axios";
import toast from "react-hot-toast";
import { Editor } from "@monaco-editor/react";

const Submission = ({ sub }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [problem, setProblem] = useState({});
  //   <Tag value={"X Rejected"} size={"sm"} variant={"flat"} color={"danger"}/>
  const timestamp = sub?.createdAt;
  const date = new Date(timestamp);

  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getUTCFullYear();

  const ordinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = `${day}${ordinalSuffix(day)} ${month}, ${year}`;

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
        console.log(response.data.problem);
        setProblem(response.data.problem);
      } catch (error) {
        toast.error("Failed to fetch submissions");
        console.error("Failed to fetch submissions:", error);
      }
    };

    getProblemDetails();
  }, []);

  return (
    <div className="w-[60%] flex flex-col justify-between bg-gray-50 shadow-md rounded-xl py-6 px-4">
      <div className="flex justify-between w-full">
        <h1 className="text-lg">{problem?.title}</h1>
        <div className="p-2 ml-2 hover:bg-red-100 hover:text-red-600 hover:cursor-pointer w-fit text-gray-900 rounded-xl">
          <Trash size={20} className="text-inherit" />
        </div>
      </div>
      <div className="mt-2 flex items-center gap-x-3">
        <h1 className="text-sm font-light">Submitted on : {formattedDate}</h1>
        <Tag
          value={
            sub?.language === "java"
              ? "Java"
              : sub?.language === "cpp"
              ? "C++"
              : "Python"
          }
          size={"sm"}
        />
        <Tag value={problem?.difficulty} size={"sm"} variant={"flat"} />
      </div>
      <div className="mt-5 flex justify-between">
        <div className="flex items-center">
          <h1 className="text-sm">Status:</h1>
          {sub?.status === "accepted" ? (
            <div className="bg-emerald-200 flex ml-2 py-1 px-2 rounded-lg items-center">
              <h1 className="text-sm text-emerald-600">Accepted</h1>
            </div>
          ) : (
            <div className="bg-[#f8ccdc] flex ml-2 py-1 px-2 rounded-lg items-center">
              <h1 className="text-sm text-[#f31260]">Rejected</h1>
            </div>
          )}
        </div>
        <div
          className="text-sm text-inherit flex items-end gap-x-1 hover:underline hover:cursor-pointer"
          onClick={onOpen}
        >
          <h1>Code</h1>
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
      </div>
    </div>
  );
};

export default Submission;
