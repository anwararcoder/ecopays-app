import React from "react";
import LogoImage from "./../../../public/images/logo/logo.png";
import Image from "next/image";

const AdminNavbarLogoBox = ({ openAside, setOpenAside }) => {
  return (
    <div className="inline-flex items-center gap-[15px]">
      <Image className="max-w-[120px]" src={LogoImage} alt="LogoImage" />
      <button
        onClick={() => setOpenAside(!openAside)}
        className="border-[1px] border-[#9b9b9b] hover:border-[#3498db] p-[3px] inline-flex"
      >
        <svg
          className="w-[30px] h-[30px] cursor-pointer hover:fill-[#3498db] fill-[#9b9b9b]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g>
            <path d="M2 7h20a1 1 0 0 0 0-2H2a1 1 0 0 0 0 2zM22 11H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2zM22 17H2a1 1 0 0 0 0 2h20a1 1 0 0 0 0-2z"></path>
          </g>
        </svg>
      </button>
    </div>
  );
};

export default AdminNavbarLogoBox;
