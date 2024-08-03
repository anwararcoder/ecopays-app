"use client";
import React, { useContext } from "react";
import Checkout from "@/Components/Checkout/Checkout";
import { ContextAuth } from "@/Context/contextAuth";
import { useRouter } from "next/navigation";
import { getCart } from "@/ReactQuery/FunctionsReactQuery";
import { useQuery } from "@tanstack/react-query";

const CheckoutPage = () => {
  const { isLogged } = useContext(ContextAuth);
  const {
    data: cart,
    isLoading: isLoadingCart,
    refetch: refetchCart,
  } = useQuery({
    queryKey: ["Cart"],
    queryFn: getCart,
    enabled: isLogged,
  });
  if (isLoadingCart) {
    return (
      <div className="text-center py-[200px] font-[600] text-[30px]">
        Loading....
      </div>
    );
  }
  return (
    <>
      {isLogged ? (
        <>
          {cart?.status === "success" ? (
            <Checkout
            cart={cart}
            isLoadingCart={isLoadingCart}
            refetchCart={refetchCart}
          />
          ) : (
            <section className="py-[100px]">
              <div className="container mx-auto px-[15px]">
                <div className="py-[100px] text-center col-span-1 md:col-span-2 lg:col-span-3">
                  <h4 className="text-[28px] leading-[1.3] capitalize font-[600]">
                    Please Add Item On Your Cart
                  </h4>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-[100px]">
          <div className="container mx-auto px-[15px]">
            <div className="py-[200px] text-center col-span-1 md:col-span-2 lg:col-span-3">
              <h4 className="text-[28px] leading-[1.3] capitalize font-[600]">
                Please Login First
              </h4>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CheckoutPage;
