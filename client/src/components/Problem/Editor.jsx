/* eslint-disable react/prop-types */
import { Editor } from "@monaco-editor/react";
import {
  Button,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import { useState } from "react";
import { Pane } from "split-pane-react";
import axios from "axios";
import { RotateCcw } from "lucide-react";
import toast from "react-hot-toast";
import Tag from "../ui/Tag";

const CODE_SNIPPETS = {
  cpp: `#include<bits/stdc++.h>\nusing namespace std;\n\nint main() {\n\n\tcout<<"Hello World!!"<<endl;\n\treturn 0;\n\n}`,
  python: "print('Hello World!!')\n",
  java: `public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World!!");\n\t}\n}`,
};

const EditorCode = ({ problem }) => {
  const [code, setCode] = useState(CODE_SNIPPETS["cpp"]);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("cpp");
  const [running, setRunning] = useState(false);

  const handleRunCode = async () => {
    setRunning(true);
    setOutput("Compiling...");
    const payload = {
      language,
      code,
      input,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/code/run`,
        payload,
        {
          withCredentials: true,
        }
      );
      setRunning(false);
      setOutput(data.output);
    } catch (error) {
      console.log(error);
      setRunning(false);
      setOutput(error.response.data.stderr);
    }
  };

  const handleSubmitCode = async () => {
    setRunning(true);
    setOutput("Submitting code...");
    const payload = {
      language,
      code,
      problemId: problem[0]._id,
    };
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/code/submit`,
        payload,
        {
          withCredentials: true,
        }
      );
      console.log(data);
      setRunning(false);
      if (data.output) setOutput(data.output) || "";
      if (data.output === "accepted") toast.success("Submission Accepted");
      else toast.error(`Submission Rejected`);
    } catch (error) {
      console.log(error);
      setRunning(false);
      toast.error(`Submission Rejected`);
      setOutput(error.response.data);
    }
    setInput("");
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    setInput("");
    setOutput("");
    setCode(CODE_SNIPPETS[e.target.value]);
  };

  const handleRetriveCode = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_SERVER_API}/api/v1/submissions/problem/${
          problem[0]._id
        }/latestSubmission`,
        { language },
        {
          withCredentials: true,
        }
      );
      setCode(data.latestSubmission.code);
      setLanguage(data.latestSubmission.language);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Pane>
      <div className="px-6 bg-white rounded-lg shadow-md h-screen flex flex-col overflow-y-scroll thin-scrollbar">
        <div className="flex items-center justify-between">
          <Select
            size="sm"
            label="Language"
            className="max-w-xs my-3"
            defaultSelectedKeys={["cpp"]}
            placeholder="Language"
            onChange={handleLanguageChange}
          >
            <SelectItem key="cpp" color="">
              Cpp
            </SelectItem>
            <SelectItem key="python">Python</SelectItem>
            <SelectItem key="java">Java</SelectItem>
          </Select>
          <div className="flex gap-x-3 items-center">
            <Tooltip content="Get the latest submission" size="sm">
              <RotateCcw
                size="13"
                className="cursor-pointer text-gray-500"
                onClick={handleRetriveCode}
              />
            </Tooltip>
            <Button variant="light" color="warning" onClick={handleRunCode}>
              Run
            </Button>
            <Button
              variant="solid"
              color="success"
              className="text-white"
              onClick={handleSubmitCode}
            >
              Submit
            </Button>
          </div>
        </div>
        <Editor
          height="65vh"
          language={language}
          theme="vs-light"
          value={code}
          onChange={(value) => setCode(value)}
        />
        <div className="flex flex-row">
          <div className="flex-[80%]">
            <Tabs aria-label="Options" className="mt-3">
              {!running && (
                <Tab key="input" title="Input">
                  <Textarea
                    className="w-full mb-2 flex-1"
                    placeholder="Input"
                    variant="faded"
                    value={`${running ? "Running..." : input}`}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Tab>
              )}
              {
                <Tab key="output" title="Output">
                  <Textarea
                    className={`w-full mb-2 flex-1 ${
                      output === "accepted"
                        ? "text-green-500"
                        : output === "rejected"
                        ? "text-red-500"
                        : output === "time limit exceeded"
                        ? "text-amber-500"
                        : ""
                    }`}
                    placeholder="Output"
                    variant="faded"
                    value={`${
                      output === "accepted" ||
                      output === "rejected" ||
                      output === "time limit exceeded"
                        ? output.charAt(0).toUpperCase() + output.slice(1)
                        : output
                    }`}
                    readOnly
                  ></Textarea>
                </Tab>
              }
            </Tabs>
          </div>
        </div>
      </div>
    </Pane>
  );
};

export default EditorCode;
