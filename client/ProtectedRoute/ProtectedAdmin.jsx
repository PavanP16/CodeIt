/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../ContextAPI/AuthContext";

const Protectedadmin = ({ children }) => {
  const { isLoading,userRole } = useGlobalContext();
  console.log(userRole);

  if (isLoading) {
    return (
      <h1 className="text-2xl text-center text-violet-600 my-40">Loading...</h1>
    );
  }

  return userRole === "admin" ? children : <Navigate to="/" />;
};
export default Protectedadmin;
