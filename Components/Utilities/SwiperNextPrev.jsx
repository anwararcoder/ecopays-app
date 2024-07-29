import React from "react";

const SwiperNextPrev = ({ prevRef, nextRef }) => {
  return (
    <div className="mb-[40px] flex flex-wrap items-center gap-[15px]">
      <button className="bg-[#F5F5F5] text-[#3D5A80] w-[40px] h-[40px] flex items-center justify-center hover:bg-[#98C1D9] hover:text-white rounded-[2px]" ref={prevRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-left"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button className="bg-[#F5F5F5] text-[#3D5A80] w-[40px] h-[40px] flex items-center justify-center hover:bg-[#98C1D9] hover:text-white rounded-[2px]" ref={nextRef}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-chevron-right"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default SwiperNextPrev;
