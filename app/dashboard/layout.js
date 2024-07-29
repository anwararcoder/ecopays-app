"use client";
import React, { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../../Context/contextAuth";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/ReactQuery/FunctionsReactQuery";

const DashboardLayout = ({ admin, user }) => {
  const router = useRouter();
  let { dataUser, isLogged } = useContext(ContextAuth);
  const [role, setRole] = useState();

  useEffect(() => {
    if (dataUser) {
      setRole(dataUser.data.role);
    }
  }, [dataUser]);

  return (
    <>{isLogged ? (role === "admin" ? admin : user) : router.push("/login")}</>
  );
};

export default DashboardLayout;
