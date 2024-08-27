import React from "react";
import AdminNavbarLogoBox from "./AdminNavbarLogoBox";
import AdminNavbarSearchBox from "./AdminNavbarSearchBox";
import DropdownBox from "@/Components/Utilities/DropdownBox";

const AdminNavbar = ({ openAside, setOpenAside }) => {
  return (
    <header className="sticky top-0 z-[999] flex w-full bg-white shadow-[0_5px_40px_rgba(34,34,34,0.11)]">
      <div className="flex flex-grow items-center justify-between px-4 py-4 md:px-6 2xl:px-11">
        <div className="lg:hidden">
            <AdminNavbarLogoBox openAside={openAside} setOpenAside={setOpenAside} />
        </div>
        <div className="hidden md:block">
            <AdminNavbarSearchBox />
        </div>
        <div>
            <DropdownBox />
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
