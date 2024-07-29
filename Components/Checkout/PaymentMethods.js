import {
  createCashOrder,
  createViaCreditOrder,
  getAllAddresses,
} from "@/ReactQuery/FunctionsReactQuery";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

const PaymentMethods = ({ cart, refetchCart }) => {
  const router = useRouter();
  const queryClient = new QueryClient();

  const [paymentMethods, setPaymentMethods] = useState();
  const [selectAddress, setSelectAddress] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const { data: addresses, refetch: refetchAddresses } = useQuery({
    queryKey: ["Addresses"],
    queryFn: getAllAddresses,
  });

  const options = addresses?.data.map((item) => ({
    ...item,
    value: item._id,
    label: item.alias,
  }));

  const useCreateCashOrderMutation = () => {
    return useMutation({
      mutationFn: ({ cartId, address }) => createCashOrder(cartId, address),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
        refetchCart();
        toast.success("Your Order Successfully");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };
  const createCashOrderMutation = useCreateCashOrderMutation();
  const handleCreateCashOrderMutation = async (cartId, address) => {
    try {
      await createCashOrderMutation.mutateAsync({ cartId, address });
      // router.push("/dashboard");
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Failed Cash Order", error);
    }
  };

  const useCreateViaCreditOrderMutation = () => {
    return useMutation({
      mutationFn: ({ cartId, address }) =>
        createViaCreditOrder(cartId, address),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
        // router.push(response.session.url);
        window.location.href = response.session.url;
        toast.success("Your Order Successfully");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };
  const createViaCreditOrderMutation = useCreateViaCreditOrderMutation();
  const handleCreateViaCreditOrderMutation = async (cartId, address) => {
    try {
      await createViaCreditOrderMutation.mutateAsync({ cartId, address });
      // router.push("/dashboard");
    } catch (error) {
      console.error("Failed Cash Order", error);
    }
  };

  const handelCompleteOrder = () => {
    if (!selectedOption) {
      toast.error("Please Select the appropriate address First");
      return;
    }
    if (!paymentMethods) {
      toast.error("Please Select Your Payment Methods First");
      return;
    }
    if (paymentMethods === 1) {
      handleCreateCashOrderMutation(cart?.data._id, selectedOption);
    }
    if (paymentMethods === 2) {
      handleCreateViaCreditOrderMutation(cart?.data._id, selectedOption);
    }
  };

  if (createCashOrderMutation.isPending) {
    return (
      <div className="text-center py-[200px] font-[600] text-[30px]">
        Loading....
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[30px]">
      <div
        className={`${
          selectAddress === true ? "border-[#98C1D9]" : "border-[#DDD]"
        } border-[2px] rounded-[8px] p-[25px] flex items-center justify-between flex-wrap gap-[25px] cursor-pointer`}
      >
        <div className="flex flex-wrap gap-[15px]">
          <i>
            <svg
              className={`w-6 h-6 dark:text-slate-400 mt-0.5 ${
                selectAddress === true ? "text-[#98C1D9]" : "text-[#3D5A80]"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </i>
          <div>
            <h3 className=" text-[#3D5A80] flex capitalize">
              Select the appropriate address First
            </h3>
            <div className="font-semibold mt-1 text-sm capitalize">
              <span className="">CONTACT INFO</span>
            </div>
          </div>
        </div>
        <div>
          <button
            onClick={() => setSelectAddress(!selectAddress)}
            className="py-2 px-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 mt-5 sm:mt-0  text-sm font-medium rounded-lg"
          >
            {selectAddress ? "Close" : "Open"}
          </button>
        </div>
        {selectAddress && (
          <div className="w-full border-t-[2px] border-[#98C1D9] pt-[25px]">
            <div className="border-[#DDD] border-[1px] rounded-[8px]">
              <Select
                options={options}
                value={selectedOption}
                onChange={setSelectedOption}
                placeholder="Select The Appropriate Address"
              />
            </div>
            {/* <p>value select is : {selectedOption ? selectedOption.label : "None"}</p> */}
          </div>
        )}
      </div>

      <div
        onClick={() => setPaymentMethods(1)}
        className={`${
          paymentMethods === 1 ? "border-[#98C1D9]" : "border-[#DDD]"
        } border-[2px] rounded-[8px] p-[25px] flex items-center justify-between flex-wrap gap-[25px] cursor-pointer`}
      >
        <div className="flex flex-wrap gap-[15px]">
          <i>
            <svg
              className={`w-6 h-6 dark:text-slate-400 mt-0.5 ${
                paymentMethods === 1 ? "text-[#98C1D9]" : "text-[#3D5A80]"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1401 15.0701V13.11C12.1401 10.59 14.1801 8.54004 16.7101 8.54004H18.6701"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M5.62012 8.55005H7.58014C10.1001 8.55005 12.1501 10.59 12.1501 13.12V13.7701V17.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M7.14008 6.75L5.34009 8.55L7.14008 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M16.8601 6.75L18.6601 8.55L16.8601 10.35"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </i>
          <div>
            <h3 className=" text-[#3D5A80] flex capitalize">Cash on delivery</h3>
            <div className="font-semibold mt-1 text-sm capitalize">
              <span className="">Select the appropriate address First</span>
            </div>
          </div>
        </div>
        <div>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className={`w-7 h-57ml-3 dark:text-slate-100 ${
              paymentMethods === 1 ? "text-[#98C1D9]" : "text-[#3D5A80]"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        </div>
      </div>

      <div
        onClick={() => setPaymentMethods(2)}
        className={`${
          paymentMethods === 2 ? "border-[#98C1D9]" : "border-[#DDD]"
        } border-[2px] rounded-[8px] p-[25px] flex items-center justify-between flex-wrap gap-[25px] cursor-pointer`}
      >
        <div className="flex flex-wrap gap-[15px]">
          <i>
            <svg
              className={`w-6 h-6 ${
                paymentMethods === 2 ? "text-[#98C1D9]" : "text-[#3D5A80]"
              } mt-0.5`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.92969 15.8792L15.8797 3.9292"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M11.1013 18.2791L12.3013 17.0791"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M13.793 15.5887L16.183 13.1987"
                stroke="currentColor"
                strokeWidth="1.5"
                stroke-miterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M3.60127 10.239L10.2413 3.599C12.3613 1.479 13.4213 1.469 15.5213 3.569L20.4313 8.479C22.5313 10.579 22.5213 11.639 20.4013 13.759L13.7613 20.399C11.6413 22.519 10.5813 22.529 8.48127 20.429L3.57127 15.519C1.47127 13.419 1.47127 12.369 3.60127 10.239Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M2 21.9985H22"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </i>
          <div>
            <h3 className=" text-[#3D5A80] flex capitalize">
              Payment via credit card
            </h3>
            <div className="font-semibold mt-1 text-sm capitalize">
              <span className="">Select the appropriate address First</span>
            </div>
          </div>
        </div>
        <div>
          <svg
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2.5"
            stroke="currentColor"
            className={`w-7 h-57ml-3 dark:text-slate-100 ${
              paymentMethods === 2 ? "text-[#98C1D9]" : "text-[#3D5A80]"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            ></path>
          </svg>
        </div>
      </div>

      <button onClick={() => handelCompleteOrder()} className="btn-1 btn-4">
        <span>Confirm order</span>
      </button>
    </div>
  );
};

export default PaymentMethods;
