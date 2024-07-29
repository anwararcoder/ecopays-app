"use client";
import React from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteAddress, getAllAddresses } from "@/ReactQuery/FunctionsReactQuery";
import Link from "next/link";


const Address = () => {
  const {
    data: addresses,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["Addresses"],
    queryFn: getAllAddresses,
    keepPreviousData: true,
  });
  
  const useDeleteAddressMutation = () => {
    return useMutation({
        mutationFn: deleteAddress,
        onSuccess: (response) => {
            toast.success("Address Removed Successfully");
        },
        onError: (error) => {
          if (error.response?.data?.errors) {
            error.response.data.errors.forEach(err => {
                toast.error(err.msg || "An error occurred");
            });
        } else {
            const errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
        },
    });
  };
  
  const { mutateAsync: deleteAddressHandel } = useDeleteAddressMutation();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[30px]">
        {addresses?.data.map((item) => {
          return (
            <div
              key={item._id}
              className="border-[#DDD] border-[2px] rounded-[8px] py-[40px] px-[30px] relative flex flex-col gap-[12px]"
            >
              <div className="absolute top-[10px] right-[10px] z-10 flex items-center gap-[10px]">
                <Link href={`/dashboard/address/${item._id}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 512 511"
                    className="w-[20px] h-[20px]"
                    fill="#2ecc71"
                  >
                    <g>
                      <path d="M405.332 256.484c-11.797 0-21.332 9.559-21.332 21.332v170.668c0 11.754-9.559 21.332-21.332 21.332H64c-11.777 0-21.332-9.578-21.332-21.332V149.816c0-11.754 9.555-21.332 21.332-21.332h170.668c11.797 0 21.332-9.558 21.332-21.332 0-11.777-9.535-21.336-21.332-21.336H64c-35.285 0-64 28.715-64 64v298.668c0 35.286 28.715 64 64 64h298.668c35.285 0 64-28.714 64-64V277.816c0-11.796-9.54-21.332-21.336-21.332zm0 0"></path>
                      <path d="M200.02 237.05a10.793 10.793 0 0 0-2.922 5.438l-15.082 75.438c-.703 3.496.406 7.101 2.922 9.64a10.673 10.673 0 0 0 7.554 3.114c.68 0 1.387-.063 2.09-.211l75.414-15.082c2.09-.43 3.988-1.43 5.461-2.926l168.79-168.79-75.415-75.41zM496.383 16.102c-20.797-20.801-54.633-20.801-75.414 0l-29.524 29.523 75.414 75.414 29.524-29.527C506.453 81.465 512 68.066 512 53.816s-5.547-27.648-15.617-37.714zm0 0"></path>
                    </g>
                  </svg>
                </Link>
                <button onClick={() => {
                  deleteAddressHandel(item._id)
                  refetch()
                }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    viewBox="0 0 24 24"
                    className="w-[20px] h-[20px]"
                    fill="#e74c3c"
                  >
                    <g>
                      <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1ZM20 4h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"></path>
                      <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0ZM15 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"></path>
                    </g>
                  </svg>
                </button>
              </div>
              <div className="flex items-start gap-[10px] font-semibold text-sm capitalize leading-[1.25]">
                <span className="min-w-[110px]">Title Address :</span>
                <p className="leading-[1.25]">{item.alias}</p>
              </div>
              <div className="flex items-start gap-[10px] font-semibold text-sm capitalize leading-[1.25]">
                <span className="min-w-[110px]">Address Details :</span>
                <p className="leading-[1.25]">{item.details}</p>
              </div>
              <div className="flex items-start gap-[10px] font-semibold text-sm capitalize leading-[1.25]">
                <span className="min-w-[110px]">City :</span>
                <p className="leading-[1.25]">{item.city}</p>
              </div>
              <div className="flex items-start gap-[10px] font-semibold text-sm capitalize leading-[1.25]">
                <span className="min-w-[110px]">Postal Code :</span>
                <p className="leading-[1.25]">{item.postalCode}</p>
              </div>
              <div className="flex items-start gap-[10px] font-semibold text-sm capitalize leading-[1.25]">
                <span className="min-w-[110px]">Phone :</span>
                <p className="leading-[1.25]">{item.phone}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Address;
