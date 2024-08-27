"use client";
import AdminAside from "@/Components/Admin/AdminAside/AdminAside";
import AdminNavbar from "@/Components/Admin/AdminNavbar/AdminNavbar";
import React, { useState } from "react";

const LayoutAdmin = ({ children }) => {
  const [openAside, setOpenAside] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden bg-[#f5f5f5]">
      <AdminAside openAside={openAside} setOpenAside={setOpenAside} />
      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <AdminNavbar openAside={openAside} setOpenAside={setOpenAside} />
        <main className="p-4 md:p-6 2xl:p-10">
          <div className="w-full min-h-[50vh]">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default LayoutAdmin;
