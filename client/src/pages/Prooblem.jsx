import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SplitPane from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import axios from "axios";
import EditorCode from "../components/Problem/Editor";
import toast from "react-hot-toast";
import Problem from "../components/Problem/Problem";

const ProblemDetail = () => {
  const { id } = useParams();
  const [loading, setIsLoading] = useState(true);
  const [problem, setProblem] = useState(null);

  const [sizes, setSizes] = useState(["40%", "auto"]);

  // useEffect(() => {
  //   const fetchProblem = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${import.meta.env.VITE_SERVER_API}/api/v1/problems/${id}/description`,
  //         {
  //           withCredentials: true,
  //         }
  //       );
  //       setProblem(response.data.problem);
  //     } catch (error) {
  //       toast.error("Failed to fetch problem");
  //       console.error("Failed to fetch problem:", error);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchProblem();
  // }, [id]);

  // if (loading) {
  //   return <div className="text-center my-40 text-2xl">Loading...</div>;
  // }

  // if (!problem) {
  //   return <div>Problem not found</div>;
  // }

  return (
    <div className=" w-full flex">
      {/* <SplitPane
        split="vertical"
        sizes={sizes}
        onChange={(sizes) => setSizes(sizes)}
        className="custom-split-pane"
      >
        <p>Hello</p> */}
      <div className="flex-[2]">
        <Problem />
      </div>
      <div className="flex-[3]">
        <EditorCode />
      </div>
      {/* </SplitPane> */}
    </div>
  );
};

export default ProblemDetail;
