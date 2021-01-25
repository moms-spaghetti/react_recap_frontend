import React, { useEffect, useState } from "react";
import app from "./Base.js";
import { Spin } from "antd";
import config from "../config";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [pending, setPending] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUsers, setAdminUsers] = useState(false);

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
      setPending(false);
    });
  }, []);

  useEffect(() => {
    const getAdminUsers = async () => {
      const res = await fetch(config.BACKEND_URL_GET_ADMIN_USERS);
      const users = await res.json();
      setAdminUsers(users);
    };
    if (!adminUsers) {
      getAdminUsers();
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setIsAdmin(adminUsers.some((user) => currentUser.email === user.email));
    }
  }, [currentUser]);

  if (pending) {
    return <Spin />;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
