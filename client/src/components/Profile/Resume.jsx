import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Chip } from "@nextui-org/react";
import axios from "axios";
import toast from "react-hot-toast";

const Resume = () => {
  const [edit, setEdit] = useState(false);
  const [ski, setSki] = useState("");

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_SERVER_API}/api/v1/users/r/getSkills`,
          { withCredentials: true }
        );
        if (data?.skills) {
          setSkills(data.skills);
        }
      } catch (error) {
        console.error("Failed to fetch skills:", error);
      }
    };
    getSkills();
  }, []);

  const handleClose = (fruitToRemove) => {
    setSkills(skills.filter((fruit) => fruit !== fruitToRemove));
  };

  const handleAdd = async () => {
    if (ski === "") {
      toast.error("Please enter a skill");
      return;
    }
    setSkills([...skills, ski]);
   
    setSki("");
  };

  const submitHandler = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_SERVER_API}/api/v1/users/updateSkills`,
        { skills },
        { withCredentials: true }
      );
      if (res) {
        toast.success("Skills updated successfully");
        setEdit(false);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 pb-5 mr-4 min-h-[80vh]">
      <h1 className="text-2xl font-semibold pl-2">Resume</h1>
      <div className="flex gap-x-3 w-[75%]">
        <div className="flex gap-x-5 items-center">
          <Input
            size="sm"
            type="text"
            label="Enter your skill"
            value={ski}
            isDisabled={!edit}
            className="mt-5 rounded-xl w-72"
            onChange={(e) => setSki(e.target.value)}
          />
          {edit && (
            <Button
              size="lg"
              variant="flat"
              color="success"
              className="mt-5"
              onClick={handleAdd}
            >
              Add Skill
            </Button>
          )}
        </div>
        {!edit ? (
          <Button
            size="lg"
            variant="light"
            color="warning"
            className="mt-5 mr-24"
            onClick={() => setEdit((edit) => !edit)}
          >
            Edit Resume
          </Button>
        ) : (
          <Button
            size="lg"
            variant="light"
            color="success"
            className="mt-5 mr-24"
            onClick={submitHandler}
          >
            Done
          </Button>
        )}
      </div>
      <h1 className="mt-5 text-2xl font-semibold pl-2">Your Skills</h1>
      <div className="mt-5 flex gap-5 flex-wrap w-[75%]">
        {skills.map((fruit, index) => (
          <Chip
            key={index}
            onClose={edit ? () => handleClose(fruit) : undefined}
            variant="flat"
            className="bg-gradient-to-br from-gray-200 to-gray-100"
          >
            {fruit}
          </Chip>
        ))}
      </div>
    </div>
  );
};

export default Resume;
