import axios from "axios";
import { useContext, useState, useEffect, createContext } from "react";
const AppContext = createContext();

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [userDetails, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const saveUser = (user) => {
    setUser(user);
  };

  const deleteUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_SERVER_API}/api/v1/users/showMe`, {
        withCredentials: true,
      });
      saveUser(data?.user);
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