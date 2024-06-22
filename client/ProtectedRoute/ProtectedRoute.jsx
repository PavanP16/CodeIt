import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../ContextAPI/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userDetails, isLoading } = useGlobalContext();

  if (isLoading) {
    return (
      <h1 className="text-2xl text-center text-violet-600 my-40">Loading...</h1>
    );
  }

  return userDetails ? children : <Navigate to="/" />;
};
export default ProtectedRoute;
