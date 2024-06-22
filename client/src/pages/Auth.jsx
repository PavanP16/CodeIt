import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "../components/ui/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/ui/icons/EyeFilledIcon";
import { FaLaptopCode } from "react-icons/fa";
import { useGlobalContext } from "../../ContextAPI/AuthContext";
import toast from "react-hot-toast";

const Auth = () => {
  const { saveUser,userDetails } = useGlobalContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [register, setRegister] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigator = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (email === "" || password === "" || (register && username === "")) {
      toast.error("Please fill all the fields");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,20}$/
    const isValidEmail = emailRegex.test(email);
    const isValidPassword = passwordRegex.test(password);
    if (!isValidEmail) {
      toast.error("Enter a valid email.", {
        style: {
          border: "1px solid rgb(234 179 8)",
          padding: "16px",
          color: "rgb(234 179 8)",
        },
        iconTheme: {
          primary: "rgb(234 179 8)",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    if (!isValidPassword) {
      toast.error("Enter a valid password(Min 8 characters with minimum 1 captial,1 small,1 number and 1 symbol).", {
        style: {
          border: "1px solid rgb(234 179 8)",
          padding: "16px",
          color: "rgb(234 179 8)",
        },
        iconTheme: {
          primary: "rgb(234 179 8)",
          secondary: "#FFFAEE",
        },
      });
      return;
    }

    if (register) {
      const registerUser = {
        email,
        password,
        username,
      };

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/api/v1/auth/register`,
          registerUser,
          {
            withCredentials: true,
          }
        );
        saveUser(data.user);
        console.log(data.user);
        toast.success("Registered successfully");
        setEmail("");
        setPassword("");
        setUsername("");
        navigator("/home");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    } else {
      const loginUser = {
        email,
        password,
      };

      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_SERVER_API}/api/v1/auth/login`,
          loginUser,
          {
            withCredentials: true,
          }
        );
        saveUser(data.user);
        console.log(data.user);
        toast.success("Logged in successfully");
        setEmail("");
        setPassword("");
        navigator("/home");
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };

  console.log(userDetails);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-10 w-96 min-h-[30rem] border flex flex-col items-center bg-white">
        <div className="-mt-5 flex flex-col items-center justify-center gap-y-2">
          <FaLaptopCode size={70} />
          <h2 className="text-2xl tracking-wide font-[700] text-gray-800 text-center uppercase">
            CODE IT
          </h2>
        </div>
        <h1 className="mt-10 text-lg font-semibold uppercase">
          {register ? "Register" : "Login"}
        </h1>
        <form className="mt-5 space-y-4">
          {register && (
            <Input
              size={"md"}
              type="text"
              id="username"
              label="Username"
              color="default"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-72"
            />
          )}
          <Input
            size={"md"}
            type="email"
            id="email"
            label="Email"
            color="default"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-72"
          />
          <Input
            label="Password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            id="password"
            color="default"
            type={isVisible ? "text" : "password"}
            className="max-w-xs"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <button
              type="submit"
              className="mt-5 w-full py-3 px-4 text-center bg-yellow-500 text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring focus:border-yellow-500"
              onClick={submitHandler}
            >
              {register ? "Sign Up" : "Sign In"}
            </button>
          </div>
        </form>
        {!register ? (
          <h1 className="mt-5 text-base">
            Don't have account?{" "}
            <span
              className="hover:text-amber-600 hover:cursor-pointer hover:underline"
              onClick={() => {
                setRegister((res) => !res);
              }}
            >
              Register
            </span>
          </h1>
        ) : (
          <h1 className="mt-5 text-base">
            Already a user?{" "}
            <span
              className="hover:text-blue-500 hover:cursor-pointer hover:underline"
              onClick={() => {
                setRegister((res) => !res);
              }}
            >
              Login
            </span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Auth;
