"use client";
import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../Utilities/Breadcrumb";
import CartItem from "./CartItem";
import CartItemsDetails from "./CartItemsDetails";

const Cart = ({ cart, refetchCart }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cart?.data?.products) {
      setProducts(cart.data.products);
    }
  }, [cart]);
  return (
    <>
      <Breadcrumb pageTitle="Cart" />
      {products.length <= 0 ? (
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
      ) : (
        <section className="pb-[100px]">
          <div className="container mx-auto px-[15px]">
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-[30px]">
              <div className="col-span-1 lg:col-span-5">
                <h3 className="text-[30px] leading-[1.3] capitalize font-[600] mb-[25px]">
                  My Cart on Ecopays
                </h3>
                <div className="flex flex-col gap-[30px]">
                  {products.map((item) => (
                    <CartItem key={item._id} item={item} refetchCart={refetchCart} products={products} setProducts={setProducts} />
                  ))}
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2">
                <CartItemsDetails cart={cart} refetchCart={refetchCart} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
