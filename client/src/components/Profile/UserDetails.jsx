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

const UserDetails = () => {
  const [edit, setEdit] = useState(false);

  const {saveUser, userDetails } = useGlobalContext();

  const [details, setDetails] = useState({
    email: "",
    username: "",
  });

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

          console.log(details);
        }
      } catch (error) {
        console.error("User not found:", error);
      }
    };
    getAccountUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/users/updateUser`,
        { username: details.username, email: details.email},
        { withCredentials: true }
      );
      saveUser(response.data.user);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error("Failed to update user:", error);
    }

    setEdit(false);
  }

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
                  <Input value={details.username} className="mt-5 px-10" onChange={(e)=>{
                    setDetails((details) => ({...details, username: e.target.value}))
                  } }/>
                ) : (
                  <h1 className="mt-4 text-xl">{details.username}</h1>
                )}
                <div className="mt-4 flex items-center">
                  <RiMedal2Fill size={30} className="text-yellow-500" />
                  <h1 className="text-xl ml-2">
                    32 <span className="text-lg">Rank</span>
                  </h1>
                </div>
              </div>
              <hr className="mt-5 mx-5" />
              <div className="mt-5 flex w-full items-center justify-center gap-x-5">
                <p>Current Solved Questions</p>
                <Circular value={10} size="lg" label={"Solved"} />
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
                  className=" bg-red-500 p-3 flex gap-x-2 items-center mr-4 rounded-lg hover:bg-red-600 hover:cursor-pointer"
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
                  <Input value={details.email} onChange={(e)=>{
                    setDetails((details) => ({...details, email: e.target.value}))
                  } }/>
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
                  <h1 className="text-3xl">56</h1>
                </div>
                <img
                  src={img}
                  className="rounded-full w-16 h-16 object-contain"
                />
              </div>

              <div className="flex items-center p-6 rounded-2xl gap-x-10 bg-gray-100 w-fit shadow">
                <div className="flex flex-col gap-y-3 w-[7vw]">
                  <h1 className="text-sm">Total Problems Solved</h1>
                  <h1 className="text-3xl">10</h1>
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
        <div className="flex-[6]">
          <h1 className="text-2xl font-semibold">Latest Submissions</h1>
          <div className="mt-5 flex flex-col gap-y-6">
            <LatestSubmission
              sols={7}
              title={"Missing in Array"}
              diff={"Hard"}
            />
            <LatestSubmission
              sols={22}
              title={"Indexes of Subarray Sum"}
              diff={"Medium"}
            />
            <LatestSubmission
              sols={47}
              title={"Array Duplicates"}
              diff={"Easy"}
            />
          </div>
        </div>
        <div className="flex-[4]"></div>
      </div>
    </div>
  );
};

export default UserDetails;
