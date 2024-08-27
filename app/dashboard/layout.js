"use client";
import React, { useContext } from "react";
import { ContextAuth } from "../../Context/contextAuth";
import Login from "@/Components/Login/Login";
import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer/Footer";

const DashboardLayout = ({ admin, user }) => {
  let { dataUser, isLogged } = useContext(ContextAuth);
  return (
    <>
      {isLogged ? (
        dataUser?.data?.role === "admin" ? (
          admin
        ) : (
          <>
            <Navbar />
            {user}
            <Footer />
          </>
        )
      ) : (
        <Login />
      )}
    </>
  );
};

export default DashboardLayout;
