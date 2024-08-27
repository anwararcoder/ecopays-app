import React from "react";
import AdminAsideLogoBox from "./AdminAsideLogoBox";
import AdminAsideLinks from "./AdminAsideLinks";

const AdminAside = ({ openAside, setOpenAside }) => {
  return (
    <>
      <aside
        className={`absolute left-0 top-0 z-[9999] lg:static flex h-screen w-[300px] flex-col overflow-y-hidden bg-[#1a539a] lg:translate-x-0 ${
          openAside ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminAsideLogoBox openAside={openAside} setOpenAside={setOpenAside} />
        <div className="no-scrollbar flex flex-col overflow-y-auto h-full justify-between p-[25px]">
          <div>
            <h3 className="mb-[15px] ml-[15px] text-[16px] font-[500] text-white uppercase">
              Menu
            </h3>
            <AdminAsideLinks openAside={openAside} setOpenAside={setOpenAside} />
          </div>
          <div className="mx-auto mt-[30px] w-full rounded-[3px] bg-[#133b6e] p-[20px] text-center">
            <h3 className="mb-2 text-[18px] font-[600] text-white capitalize">
              EcoPays
            </h3>
            <p className="text-[15px] text-white capitalize font-[500]">
              Exclusive collection for everyone
            </p>
          </div>
        </div>
      </aside>
      {openAside && (
        <div
          onClick={() => setOpenAside(!openAside)}
          className="absolute inset-0 z-[9998] lg:hidden"
        ></div>
      )}
    </>
  );
};

export default AdminAside;
