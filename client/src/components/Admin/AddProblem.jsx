import { Textarea, Input, Button } from "@nextui-org/react";
import axios from "axios";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const AddProblem = () => {
  const [details, setDetails] = useState({
    slug: "",
    title: "",
    description: "",
    difficulty: "",
    constraints: "",
    timeLimit: 0,
    tagItems: "",
    input: null,
    cppoutput: null,
    javaoutput: null,
    pythonoutput: null,
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

  const [testCases, setTestCases] = useState([
    {
      input: "",
      output: "",
    },
  ]);
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


  const handleSubmit = async (e) => {
    e.preventDefault();

    let tags = details.tagItems.split(",");

    const formData = new FormData();
    formData.append("slug", details.slug);
    formData.append("title", details.title);
    formData.append("description", details.description);
    formData.append("difficulty", details.difficulty);
    formData.append("constraints", details.constraints);
    formData.append("input", details.input); 
    formData.append("cppoutput", details.cppoutput); 
    formData.append("javaoutput", details.javaoutput); 
    formData.append("pythonoutput", details.pythonoutput); 

    testCases.forEach((testCase, index) => {
      formData.append(`siteCases[${index}][input]`, testCase.input);
      formData.append(`siteCases[${index}][output]`, testCase.output);
    });

    tags.forEach((tag, index) => {
      formData.append(`tags[${index}]`, tag);
    });

    console.log(formData);
    console.log(details);

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_API}/api/v1/problems`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Problem added successfully");
    } catch (error) {
      toast.error("Failed to add problem");
    }
  };


  return (
    <div className="bg-white p-4">
      <h1 className="mt-5 text-3xl mb-10">Add a Problem</h1>
      <div className="flex gap-x-5 mb-5">
        <Input
          label="Title"
          name="title"
          value={details.title}
          className="flex-[1]"
          onChange={handleDetailChange}
        />
        <Input
          label="Slug"
          name="slug"
          value={details.slug}
          className="flex-[1]"
          onChange={handleDetailChange}
        />
      </div>
      <Textarea
        label="Description"
        name="description"
        value={details.description}
        className="mb-5"
        onChange={handleDetailChange}
      ></Textarea>
      <Textarea
        label="Constraints"
        name="constraints"
        value={details.constraints}
        className="mb-5"
        onChange={handleDetailChange}
      ></Textarea>
      <div className="flex gap-x-5">
        <Input
          label="Difficulty(Easy,Medium,Hard)"
          name="difficulty"
          value={details.difficulty}
          className="flex-[1.5]"
          onChange={handleDetailChange}
        />
        <Input
          label="Time Limit"
          type="number"
          name="timeLimit"
          value={details.timeLimit}
          className="flex-[1]"
          onChange={handleDetailChange}
        />
        <Input
          label="Tags(Dp,array...)"
          name="tagItems"
          value={details.tagItems}
          className="flex-[3]"
          onChange={handleDetailChange}
        />
      </div>
      <div className="pt-4 space-y-4">
        <h2 className="text-xl ml-2 font-semibold">Site Test Cases</h2>
        {testCases.map((testCase, index) => (
          <div key={index} className="space-y-3">
            <div className="flex gap-4">
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
                name="output"
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
      <h1 className="mt-10 text-2xl mb-10">File Uploads</h1>
      <div className="flex gap-x-7">
        <div>
          <p className="text-lg">Input: </p>
          <div className="flex items-center justify-center w-full mt-2">
            <label className="flex flex-row items-center gap-x-2 justify-center px-2 py-3 border-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer w-72">
              <input type="file" name="input" onChange={handleDetailChange} />
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg">Cpp Output: </p>
          <div className="flex items-center justify-center w-full mt-2">
            <label className="flex flex-row items-center gap-x-2 justify-center px-2 py-3 border-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer w-72">
              <input
                type="file"
                name="cppoutput"
                onChange={handleDetailChange}
              />
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg">Java Output: </p>
          <div className="flex items-center justify-center w-full mt-2">
            <label className="flex flex-row items-center gap-x-2 justify-center px-2 py-3 border-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer w-72">
              <input
                type="file"
                name="javaoutput"
                onChange={handleDetailChange}
              />
            </label>
          </div>
        </div>
        <div>
          <p className="text-lg">Python Output: </p>
          <div className="flex items-center justify-center w-full mt-2">
            <label className="flex flex-row items-center gap-x-2 justify-center px-2 py-3 border-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer w-72">
              <input
                type="file"
                name="pythonoutput"
                onChange={handleDetailChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className="py-10 w-full">
        <Button className="w-full h-14 text-xl text-gray-700" onClick={handleSubmit}>Add</Button>
      </div>
    </div>
  );
};

export default AddProblem;
