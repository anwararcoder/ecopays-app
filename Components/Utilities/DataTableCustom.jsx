import Image from "next/image";
import React, { Fragment } from "react";

const DataTableCustom = ({ data }) => {
  return (
    <Fragment>
      {/* "flex gap-[30px] flex-wrap items-center justify-center max-w-[980px] mx-auto mt-[30px]" */}

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="">
            <tr className="text-left">
              <th className="font-[600] p-6">IMAGES</th>
              <th className="font-[600] p-6">CATEGORY NAME</th>
              <th className="font-[600] p-6">SLUG</th>
              <th className="font-[600] p-6 text-center">ACTIONS</th>
            </tr>
          </thead>
          <thead>
            {data.map((item, index) => {
              return (
                <tr key={index} className="intro-x bg-white border-b-[15px] border-[#F5F5FA]">
                  <td className="px-4 py-6 w-[200px]">
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <Image loading='lazy'
                        height={500}
                        width={500}
                          className="cursor-pointer rounded-full shadow-[0px_0px_0px_2px_#fff,_1px_1px_5px_rgba(0,0,0,0.32)] dark:shadow-[0px_0px_0px_2px_#3f4865,_1px_1px_5px_rgba(0,0,0,0.32)]"
                          alt={item.name}
                          src={item.image}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-6 min-w-[225px]">
                    <a
                      className="group flex items-center mr-3 text-[#9B9B9B] hover:text-[#3498db]"
                      href={item.slug}
                    >
                      {item.name}
                    </a>
                  </td>
                  <td className="px-4 py-6 min-w-[325px]">
                    <a
                      className="group flex items-center mr-3 text-[#9B9B9B] hover:text-[#3498db]"
                      href={`categories/${item.slug}/`}
                    >
                      <svg
                        className="mr-[10px]"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" x2="21" y1="14" y2="3"></line>
                      </svg>
                      {`categories/${item.slug}/`}
                    </a>
                  </td>
                  <td className="px-4 py-6 w-[300px]">
                    <div className="flex items-center justify-center">
                      <a
                        className="group flex items-center mr-[20px] text-[#9B9B9B] hover:text-[#3498db]"
                        href={item.slug}
                      >
                        <svg
                          className="stroke-1.5 w-4 h-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" x2="21" y1="14" y2="3"></line>
                        </svg>
                        Edit
                      </a>
                      <a
                        className="group flex items-center text-[#9B9B9B] hover:text-[#3498db]"
                        href={item.slug}
                      >
                        <svg
                          className="stroke-1.5 w-4 h-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" x2="21" y1="14" y2="3"></line>
                        </svg>
                        Delete
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </thead>
        </table>
      </div>
    </Fragment>
  );
};

export default DataTableCustom;
