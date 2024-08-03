"use client";
import React, { useContext } from "react";
import Cart from "@/Components/Cart/Cart";
import { ContextAuth } from "@/Context/contextAuth";
import { getCart } from "@/ReactQuery/FunctionsReactQuery";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/Components/Loading/Loading";

const CartPage = () => {
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
            <Cart cart={cart} refetchCart={refetchCart} />
          ) : (
            <section className="py-[100px]">
              <div className="container mx-auto px-[15px]">
                <h3 className="text-[38px] leading-[1.3] capitalize font-[600] mb-[50px]">
                  My Cart on Ecopays
                </h3>
                <div className="py-[100px] text-center col-span-1 md:col-span-2 lg:col-span-3">
                  <h4 className="text-[28px] leading-[1.3] capitalize font-[600]">
                    Your cart is empty.
                  </h4>
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="py-[100px]">
          <div className="container mx-auto px-[15px]">
            <h3 className="text-[38px] leading-[1.3] capitalize font-[600] mb-[50px]">
              My Cart on Ecopays
            </h3>
            <div className="py-[100px] text-center col-span-1 md:col-span-2 lg:col-span-3">
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

export default CartPage;
