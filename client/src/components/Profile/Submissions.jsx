import React, { useEffect, useState } from "react";
import Submission from "./Submission";
import axios from "axios";
import toast from "react-hot-toast";
import { Pagination } from "@nextui-org/pagination";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/submissions/user`,
          { params: { page: currentPage, limit: 5 }, withCredentials: true }
        );

        console.log(data);
        setSubmissions(data.submissions);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissions();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-white rounded-lg p-4 pb-5 mr-4 min-h-[80vh]">
      <h1 className="text-2xl font-semibold">All Submissions</h1>
      <div className="mt-5 w-full flex flex-col gap-10">
        {submissions?.map((sub, idx) => {
          return <Submission key={idx} sub={sub} />;
        })}
      </div>
      <div className="mt-5 ml-4">
        <Pagination
          total={totalPages}
          initialPage={1}
          onChange={(page) => handlePageChange(page)}
          page={currentPage}
          color="success"
        />
      </div>
    </div>
  );
};

export default Submissions;
