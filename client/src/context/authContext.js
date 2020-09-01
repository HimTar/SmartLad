import React, { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext();

export default ({ children }) => {
  const [user, setUser] = useState({});
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    AuthService.isAuthenticated().then((data) => {
      setUser(data.user);
      setisAuthenticated(data.isAuthenticated);
      setisLoaded(true);
    });
  }, []);

  return (
    <div>
      {!isLoaded ? (
        <h1>Loading</h1>
      ) : (
        <AuthContext.Provider
          value={{ user, setUser, isAuthenticated, setisAuthenticated }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </div>
  );
};
