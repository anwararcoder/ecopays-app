'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Loading from "../Components/Loading/Loading";
import { storage } from "../Utilities/LocalStorage/localStorageContainer";

export const ContextAuth = createContext(null);

export function ContextAuthProvider({ children }) {
  const [dataUser, setDataUser] = useState(
    storage.get("DataUser") ? storage.get("DataUser") : ""
  );
  const [isLogged, setIsLogged] = useState(
    storage.get("DataUser") ? true : false
  );
  const [loading, setLoading] = useState(true);
  const [asideNavbarActive, setAsideNavbarActive] = useState(false);
  const value = useMemo(
    () => ({
      dataUser,
      isLogged,
      asideNavbarActive,
      setAsideNavbarActive,
      login: (user_data) => {
        setDataUser(user_data), storage.set("DataUser", user_data);
        setIsLogged(true);
      },

      logout: () => {
        setIsLogged(false);
        setDataUser(undefined), storage.remove("DataUser");
        window.location.href = "/";
      },
    }),
    [dataUser, isLogged, asideNavbarActive, setAsideNavbarActive]
  );
  useEffect(() => {
    const new_user = storage.get("DataUser");
    if (new_user) {
      setDataUser(new_user);
      setIsLogged(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, []);
  if (loading) return <Loading />;
  return <ContextAuth.Provider value={value}>{children}</ContextAuth.Provider>;
}
export function useContextAuth() {
  const context = useContext(ContextAuth);
  return context;
}
