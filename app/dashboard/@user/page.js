import UserBox from "@/Components/Dashboard/User/UserBox";
import { getUserDetails } from "@/ReactQuery/FunctionsReactQuery";
import { QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";

const DashboardUser = ({userDetails}) => {
  console.log("fvbxdfbuserDetails", userDetails);
  return (
    <>
      <UserBox />
    </>
  );
};

export default DashboardUser;
