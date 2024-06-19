import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "../components/ui/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../components/ui/icons/EyeFilledIcon";
import { Button } from "@nextui-org/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigator = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

    navigator("/home");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 w-96 h-96 border flex flex-col items-center">
        <h2 className="text-4xl tracking-wide font-[1000] text-gray-800 text-center mb-4 uppercase">
          Login
        </h2>
        <form className="mt-10 space-y-4">
          <div>
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
          </div>
          <div>
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
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 text-center bg-blue-500 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-500"
            onClick={loginHandler}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
