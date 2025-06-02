import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("userRole");
    const id = localStorage.getItem("userId");
    const studentId = localStorage.getItem("studentId");
    const facultyId = localStorage.getItem("facultyId");

    if (token && role && id && role !== "undefined" && role !== "null") {
      setCurrentUser({
        role,
        id,
        studentId: studentId || null,
        facultyId: facultyId || null,
      });
      setIsAuthenticated(true);
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    localStorage.removeItem("studentId");
    localStorage.removeItem("facultyId");
    setCurrentUser(null);
    setIsAuthenticated(false);

    // Redirect to login or home after logout
    setTimeout(() => {
      window.location.replace("/");
    }, 100);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setCurrentUser,
        setIsAuthenticated,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
