import React from "react";
import LoadingImage from '@/public/images/loading.gif';
import Image from "next/image";

const Loading = () => {
  return (
      <div className="fixed top-0 left-0 right-0 bottom-0 inline-flex font-semibold leading-6 text-sm bg-[#FFF] transition ease-in-out duration-150 flex-col items-center justify-center w-[100%] min-h-[100vh]">
        <Image width={160} height={24} className="scale-110" src={LoadingImage.src} alt="Loading..." />
      </div>
  );
};

export default Loading;
