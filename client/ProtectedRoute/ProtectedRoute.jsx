import { Navigate } from "react-router-dom";
import { GlobalContext } from "../ContextAPI/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { userDetails } = GlobalContext();

  console.log(userDetails

    
  );

  return userDetails ? children : <Navigate to="/" />;
};

export default ProtectedRoute;