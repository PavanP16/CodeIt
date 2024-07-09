/* eslint-disable react/prop-types */
import { Pencil, Plus, Trash, Trash2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const RowProblem = ({ idx, title, CreatedOn, Submissions, prob }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalType, setModalType] = useState(null);
  const tagItemsList = prob?.tags.join();

  console.log(prob);
  const [details, setDetails] = useState({
    slug: prob?.slug,
    title: prob?.title,
    description: prob?.description,
    difficulty: prob?.difficulty,
    constraints: prob?.constraints,
    tagItems: tagItemsList,
    timelimit: prob?.timelimit,
  });

  const handleDetailChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: files[0],
      }));
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const [testCases, setTestCases] = useState(prob.siteCases);
  const handleTestCaseChange = (index, e) => {
    const { name, value } = e.target;
    setTestCases((prevTestCases) => {
      const newTestCases = [...prevTestCases];
      newTestCases[index][name] = value;
      return newTestCases;
    });
  };

  const handleAddTestCase = () => {
    setTestCases((prevTestCases) => [
      ...prevTestCases,
      { input: "", output: "" },
    ]);
  };

  const handleRemoveTestCase = (index) => {
    setTestCases((prevTestCases) => {
      const newTestCases = [...prevTestCases];
      newTestCases.splice(index, 1);
      return newTestCases;
    });
  };

  const timestamp = CreatedOn;
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

  const openEditModal = () => {
    setModalType("edit");
    onOpen();
  };

  const openDeleteModal = () => {
    setModalType("delete");
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let tags = details.tagItems.split(",");

    const formData = new FormData();
    formData.append("slug", details.slug);
    formData.append("title", details.title);
    formData.append("description", details.description);
    formData.append("difficulty", details.difficulty);
    formData.append("constraints", details.constraints);
    formData.append("timelimit", details.timelimit);

    testCases.forEach((testCase, index) => {
      formData.append(`testCases[${index}][input]`, testCase.input);
      formData.append(`testCases[${index}][output]`, testCase.output);
    });

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/problems/update/${
          prob?._id
        }`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      toast.success("Problem updated successfully");
    } catch (error) {
      toast.error("Failed to update problem");
    }
  };

  return (
    <tr className={idx % 2 != 0 ? "bg-gray-200" : ""}>
      <td className="py-4 pl-2">{idx + 1}.</td>
      <td>{title}</td>
      <td>{formattedDate}</td>
      <td className="pl-10">{Submissions}</td>
      <td className="pl-16">{prob?.solvedBy.length}</td>
      <td>
        <div className="flex items-center gap-x-2">
          <div
            className="bg-amber-200 w-fit p-3 text-amber-500 rounded-lg hover:bg-amber-300 hover:cursor-pointer"
            onClick={onOpen}
          >
            <Pencil size={20} className="text-inherit" />
            <Modal
              size="5xl"
              isOpen={isOpen}
              onClose={onClose}
              backdrop="blur"
              scrollBehavior="inside"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Problem {idx + 1}
                    </ModalHeader>
                    <ModalBody>
                      <div className="flex gap-x-10">
                        <Input
                          label="Title"
                          value={details.title}
                          className="flex-[1]"
                          name="title"
                          onChange={handleDetailChange}
                        />
                        <Input
                          label="Slug"
                          value={details.slug}
                          className="flex-[1]"
                          name="slug"
                          onChange={handleDetailChange}
                        />
                      </div>
                      <Textarea
                        label="Description"
                        value={details.description}
                        name="description"
                        onChange={handleDetailChange}
                      ></Textarea>
                      <Textarea
                        label="Constraints"
                        value={details.constraints}
                        name="constraints"
                        onChange={handleDetailChange}
                      ></Textarea>
                      <div className="flex gap-x-10">
                        <Input
                          label="Difficulty(Easy,Medium,Hard)"
                          value={details.difficulty}
                          className="flex-[1.5]"
                          name="difficulty"
                          onChange={handleDetailChange}
                        />
                        <Input
                          label="Time Limit"
                          value={details.timelimit}
                          className="flex-[1]"
                          name="timeLimit"
                          onChange={handleDetailChange}
                        />
                        <Input
                          label="Tags(Dp,array...)"
                          value={details.tagItems}
                          className="flex-[3]"
                          name="tagItems"
                          onChange={handleDetailChange}
                        />
                      </div>
                      <div className="pt-4 space-y-4 mb-5">
                        <h2 className="text-xl ml-2 font-semibold">
                          Site Test Cases
                        </h2>
                        {testCases.map((testCase, index) => (
                          <div key={index} className="space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Textarea
                                underlined
                                autoComplete="false"
                                fullWidth
                                label={`Input ${index + 1}`}
                                name="input"
                                value={testCase.input}
                                onChange={(e) => handleTestCaseChange(index, e)}
                                required
                              />

                              <Textarea
                                underlined
                                fullWidth
                                autoComplete="false"
                                label={`Output ${index + 1}`}
                                name="cppoutput"
                                value={testCase.output}
                                onChange={(e) => handleTestCaseChange(index, e)}
                                required
                              />
                            </div>
                            <div
                              className="p-2 ml-2 hover:bg-red-200 hover:cursor-pointer bg-red-100 w-fit text-red-500 rounded-xl"
                              onClick={() => handleRemoveTestCase(index)}
                            >
                              <Trash size={20} className="text-inherit" />
                            </div>
                          </div>
                        ))}
                        <div
                          className="flex p-2 bg-blue-500 w-fit text-white rounded-md hover:bg-blue-600 hover:cursor-pointer"
                          onClick={handleAddTestCase}
                        >
                          <Plus size={20} className="text-inherit" />
                          <p className="text-sm font-semibold text-inherit">
                            Add New Test Case
                          </p>
                        </div>
                      </div>
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={handleSubmit}>
                        Edit Changes
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </div>
          <div
            className="bg-red-200 w-fit p-3 text-red-500 rounded-lg hover:bg-red-300 hover:cursor-pointer"
            onClick={onOpen}
          >
            <Trash2 size={20} className="text-inherit" />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default RowProblem;
