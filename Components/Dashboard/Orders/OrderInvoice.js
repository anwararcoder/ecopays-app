"use client";
import { getOrderById } from "@/ReactQuery/FunctionsReactQuery";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useRef } from "react";
import logoImage from "../../public/images/logo/2logo.png";
import Image from "next/image";
import formatDateTime from "@/Components/Utilities/formatDateTime";
import ReactToPrint from "react-to-print";

const OrderInvoice = () => {
  const componentRef = useRef();
  const params = useParams();
  const orderId = params._id;
  const { data: order } = useQuery({
    queryKey: ["Order", orderId],
    queryFn: () => getOrderById(orderId),
  });
  const { formattedDate } = formatDateTime(order?.data.createdAt);

  return (
    <div>
      <div>
        <ReactToPrint
          trigger={() => <button className="mb-[30px] relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-[16px] py-[15px] px-[30px] disabled:bg-opacity-90 bg-[#EE6C4D] hover:bg-[#3D5A80] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 gap-[10px]">Print this out!</button>}
          content={() => componentRef.current}
        />
      </div>
      <div className="overflow-x-auto" ref={componentRef}>
        <div className="min-w-[800px]">
          <div class="flex flex-wrap items-center rounded-t-3xl justify-between gap-6 bg-[#EE6C4D] p-8 relative after:rotate-[133deg] after:rounded-ss-none after:-bottom-3 after:start-[50%] after:absolute after:border-[25px] after:border-t-[#EE6C4D] after:border-e-[#EE6C4D] after:border-transparent">
            <Image className="max-w-[150px]" src={logoImage} alt="Ecopays" />
            <h4 class="text-5xl font-semibold uppercase tracking-widest text-white float-right">
              Invoice
            </h4>
          </div>
          <div class="bg-white md:p-16 p-10">
            <div class="flex flex-wrap items-center justify-between gap-6">
              <div class="flex gap-3">
                <h1 class="text-xl font-semibold tracking-widest">
                  Invoice to:
                </h1>
                <div>
                  <h4 class="text-lg font-semibold">{order?.data.user.name}</h4>
                  <p class="w-52 text-sm font-medium text-gray-500 mt-2">
                    {order?.data.shippingAddress.details},{" "}
                    {order?.data.shippingAddress.city},{" "}
                    {order?.data.shippingAddress.postalCode}
                  </p>
                </div>
              </div>

              <div>
                <p class="text-xl font-semibold">
                  Invoice #:{" "}
                  <span class="ps-5 text-gray-500">{order?.data.id}</span>
                </p>
                <p class="text-xl font-semibold">
                  Date: <span class="ps-5 text-gray-500">{formattedDate}</span>
                </p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="border-gray-400 table-auto w-full text-sm mt-14 mb-12 whitespace-pre">
                <thead>
                  <tr>
                    <th class="p-4 uppercase tracking-widest text-lg font-medium text-start">
                      SL.
                    </th>
                    <th class="p-4 uppercase tracking-widest text-lg font-medium text-start">
                      Item Description
                    </th>
                    <th class="p-4 uppercase tracking-widest text-lg font-medium text-start">
                      Price
                    </th>
                    <th class="p-4 pe-7 uppercase tracking-widest text-lg font-medium text-center">
                      Qty
                    </th>
                    <th class="p-4 uppercase tracking-widest text-lg font-medium text-end">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  {order?.data.cartItems.map((item, index) => {
                    return (
                      <tr key={item._id} class="bg-gray-200">
                        <td class="p-5 border-b border-gray-400 text-base font-medium">
                          {index + 1}
                        </td>
                        <td class="p-5 border-b border-gray-400 text-base font-medium">
                          {item.product.title}
                        </td>
                        <td class="p-5 border-b border-gray-400 text-base font-medium">
                          {item.price} EG
                        </td>
                        <td class="p-5 border-b border-gray-400 text-base font-medium text-center">
                          {item.count}
                        </td>
                        <td class="p-5 border-b border-gray-400 text-base font-medium text-end">
                          {item.count * item.price} EG
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div class="flex flex-wrap justify-between gap-6 mb-5">
              <div>
                <h1 class="text-xl font-semibold">
                  Thank you for your business
                </h1>

                <p class="text-base font-medium text-[#98C1D9] mt-5">
                  Payment info:
                </p>
                <p class="text-sm font-normal">
                  Name:{" "}
                  {order?.data.paymentMethodType === "cash"
                    ? "Cash On Delivery"
                    : "Payment via credit card"}
                </p>
              </div>

              <div>
                <div class="flex flex-wrap items-center justify-end">
                  <div>
                    <h2 class="pb-1 text-base font-normal">Sub total:</h2>
                    <h2 class="pb-4 text-base font-normal">Tax:</h2>
                    <h2 class="pb-4 text-base font-normal">Shipping:</h2>
                    <h2 class="py-3 text-base font-medium border-t border-gray-500 text-[#98C1D9]">
                      Total:
                    </h2>
                  </div>
                  <div>
                    <h4 class="ps-7 pb-1 text-base font-medium text-end">
                      {order?.data.totalOrderPrice} EG
                    </h4>
                    <h4 class="ps-7 pb-4 text-base font-medium text-end">
                      {order?.data.taxPrice} EG
                    </h4>
                    <h4 class="ps-7 pb-4 text-base font-medium text-end">
                      {order?.data.shippingPrice} EG
                    </h4>
                    <h4 class="py-3 text-base font-medium text-end border-t border-gray-500 text-[#98C1D9]">
                      {order?.data.totalOrderPrice} EG
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <hr class="w-40 border border-gray-500 mt-1" />
            <h3 class="text-xl font-semibold border-gray-500">AR-Coder</h3>
          </div>

          <div class="bg-[#EE6C4D] p-6 relative rounded-3xl after:-rotate-45 rounded-tr-none rounded-ss-none after:-top-3 after:start-[50%] after:absolute after:border-[25px] after:border-t-[#EE6C4D] after:border-e-[#EE6C4D] after:border-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default OrderInvoice;
