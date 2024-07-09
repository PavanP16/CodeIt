import { useEffect, useState } from "react";
import photo from "../../assets/Profile.jpg";
import img from "../../assets/img.jpg";
import tick from "../../assets/tick.webp";
import code from "../../assets/code.webp";
import { Pencil, Send, X } from "lucide-react";
import { RiMedal2Fill } from "react-icons/ri";
import Circular from "../ui/CircularProgress";
import LatestSubmission from "./LatestSubmission";
import { Input } from "@nextui-org/react";
import { useGlobalContext } from "../../../ContextAPI/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import PieChartSums from "./PieChartSums";

const UserDetails = () => {
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(true);

  const { saveUser, userDetails } = useGlobalContext();
  const [numbers, setNumbers] = useState({
    acceptedCount: 0,
    problemsCount: 0,
    solvedProblems: 0,
    totalCount: 0,
    codingScore: null,
    pos: 0,
  });

  const [details, setDetails] = useState({
    email: "",
    username: "",
  });

  const [submissions, setSubmissions] = useState([]);
  const [dataStats,setDataStats ] = useState([]);

  useEffect(() => {
    const getAccountUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/users/${
            userDetails?.username
          }`,
          {
            withCredentials: true,
          }
        );

        console.log(data);

        if (data?.user) {
          setDetails({
            email: data?.user?.email,
            username: data?.user?.username,
          });

          setNumbers({
            acceptedCount: data?.acceptedCount,
            problemsCount: data?.problemsCount,
            solvedProblems: data?.solvedProblems,
            totalCount: data?.totalCount,
            codingScore: data?.codingScore,
            pos: data?.pos,
          });

          setSubmissions(data?.submissions);
          setDataStats(data?.dataStats)
        }
      } catch (error) {
        console.error("User not found:", error);
      }
      setLoading(false);
    };
    getAccountUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/users/updateUser`,
        { username: details.username, email: details.email },
        { withCredentials: true }
      );
      saveUser(response.data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Failed to update user:", error);
    }

    setEdit(false);
  };

  if (loading) {
    return <div className="">Loading....</div>;
  }

  const problemsPercentage =
    (numbers.solvedProblems / numbers.problemsCount) * 100;

  return (
    <div className="flex flex-col gap-y-5 w-full pb-5">
      <div className="bg-white rounded-lg pb-5 mr-4">
        <div className="flex w-full">
          <div className="flex-[2] py-3">
            <div className=" border border-transparent border-r-gray-200">
              <div className="flex flex-col items-center w-full relative">
                <div className="rounded-full">
                  <img
                    src={photo}
                    className="w-24 h-24 rounded-full"
                    alt="Profile"
                  />
                </div>
                <div className="absolute top-16 right-32 bg-gray-600 p-2 rounded-full hover:bg-gray-400 hover:cursor-pointer">
                  <Pencil size={20} className="text-white" />
                </div>
                {edit ? (
                  <Input
                    value={details.username}
                    className="mt-5 px-10"
                    onChange={(e) => {
                      setDetails((details) => ({
                        ...details,
                        username: e.target.value,
                      }));
                    }}
                  />
                ) : (
                  <h1 className="mt-4 text-xl">{details.username}</h1>
                )}
                <div className="mt-4 flex items-center">
                  <RiMedal2Fill size={30} className="text-yellow-500" />
                  <h1 className="text-xl ml-2">
                    {numbers?.pos} <span className="text-lg">Rank</span>
                  </h1>
                </div>
              </div>
              <hr className="mt-5 mx-5" />
              <div className="mt-5 flex w-full items-center justify-center gap-x-5">
                <p>Current Solved Questions</p>
                <Circular
                  value={Math.ceil(problemsPercentage)}
                  size="lg"
                  label={"Solved"}
                />
              </div>
            </div>
          </div>

          <div className="flex-[5] w-full px-3 py-3 relative">
            {!edit && (
              <div
                className="absolute right-0 p-3 pr-4 bg-[#2f8d46] flex gap-x-2 items-center mr-4 rounded-lg hover:bg-green-700 hover:cursor-pointer"
                onClick={() => setEdit((edit) => !edit)}
              >
                <Pencil className="fill-white text-[#2f8d46]" />
                <p className="text-white">Edit Profile</p>
              </div>
            )}

            {edit && (
              <div className="absolute right-0 pr-4 flex">
                <div
                  className=" bg-[#2f8d46] p-3 flex gap-x-2 items-center mr-4 rounded-lg hover:bg-green-700 hover:cursor-pointer"
                  onClick={handleSubmit}
                >
                  <Send className="fill-white text-[#2f8d46]" />
                  <p className="text-white">Submit</p>
                </div>

                <div
                  className=" bg-red-600 p-3 flex gap-x-2 items-center mr-4 rounded-lg hover:bg-red-700 hover:cursor-pointer"
                  onClick={() => setEdit((edit) => !edit)}
                >
                  <X className="fill-white text-white" />
                  <p className="text-white">Cancel</p>
                </div>
              </div>
            )}

            <div className="mt-12 pl-3 flex gap-x-16">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-base text-gray-400">Email</h1>

                {edit ? (
                  <Input
                    value={details.email}
                    onChange={(e) => {
                      setDetails((details) => ({
                        ...details,
                        email: e.target.value,
                      }));
                    }}
                  />
                ) : (
                  <h1 className="text-xl">{details.email}</h1>
                )}
              </div>
              <div className="flex flex-col gap-y-2">
                <h1 className="text-base text-gray-400">Languages Used</h1>
                <h1 className="text-xl">Java,C++</h1>
              </div>
            </div>

            <hr className="mt-5 mx-2" />

            <div className="mt-5 ml-3 flex gap-x-6">
              <div className="flex items-center p-6 rounded-2xl gap-x-10 bg-gray-100 w-fit shadow">
                <div className="flex flex-col gap-y-3 w-[7vw]">
                  <h1 className="text-sm">Overall Coding Score</h1>
                  <h1 className="text-3xl">{Math.ceil(numbers.codingScore)}</h1>
                </div>
                <img
                  src={img}
                  className="rounded-full w-16 h-16 object-contain"
                />
              </div>

              <div className="flex items-center p-6 rounded-2xl gap-x-10 bg-gray-100 w-fit shadow">
                <div className="flex flex-col gap-y-3 w-[7vw]">
                  <h1 className="text-sm">Total Problems Solved</h1>
                  <h1 className="text-3xl">{numbers.solvedProblems}</h1>
                </div>
                <img
                  src={tick}
                  className="rounded-full w-16 h-16 object-contain"
                />
              </div>

              <div className="flex items-center p-6 rounded-2xl gap-x-10 bg-gray-100 w-fit shadow">
                <div className="flex flex-col gap-y-3 w-[7vw]">
                  <h1 className="text-sm">Highest Montly streak</h1>
                  <h1 className="text-3xl">25</h1>
                </div>
                <img
                  src={code}
                  className="rounded-full w-16 h-16 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white flex rounded-lg p-4 pb-5 mr-4 ">
        <div className="flex-[4]">
          <h1 className="text-2xl font-semibold">Successful Submissions</h1>
          <div className="mt-5 flex flex-col gap-y-6">
            {submissions.map((sub, idx) => {
              return <LatestSubmission key={idx} sub={sub} />;
            })}
          </div>
        </div>
        <div className="flex-[4] flex flex-col">
          <h1 className="mt-5 text-2xl text-center font-semibold">Solved Problems</h1>
          <PieChartSums dataStats={dataStats}/>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
