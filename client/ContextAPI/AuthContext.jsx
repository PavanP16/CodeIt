import axios from "axios";
import { useContext, useState, useEffect, createContext } from "react";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [userDetails, setUser] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const saveUser = (user) => {
    setUser(user);
  };
  const saveUserRole = (role) => {
    setUserRole(role);
  };

  const deleteUser = () => {
    setUser(null);
    setUserRole(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/users/showMe`, {
        withCredentials: true,
      });
      console.log(data);
      saveUser(data?.user);
      saveUserRole(data?.role.role)
    } catch (error) {
        deleteUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_API}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      deleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  
  return (
    <AppContext.Provider
      value={{
        saveUser,
        userDetails,
        isLoading,
        logoutUser,
        userRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };