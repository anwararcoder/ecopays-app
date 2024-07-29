import React, { useEffect, useState } from "react";
import Breadcrumb from "../Utilities/Breadcrumb";
import CartItem from "../Cart/CartItem";
import CartItemsDetails from "../Cart/CartItemsDetails";
import PaymentMethods from "./PaymentMethods";

const Checkout = ({ cart, isLoadingCart, refetchCart }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cart?.data?.products) {
      setProducts(cart.data.products);
    }
  }, [cart]);
  return (
    <>
      <Breadcrumb pageTitle="Checkout" />
      <section className="pb-[100px]">
        <div className="container mx-auto px-[15px]">
          <h3 className="text-[38px] leading-[1.3] capitalize font-[600] mb-[50px]">
            Checkout
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
            <div>
              <PaymentMethods cart={cart} refetchCart={refetchCart} />
            </div>
            <div>
              <div className="flex flex-col gap-[30px]">
              {products.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  refetchCart={refetchCart}
                  products={products}
                  setProducts={setProducts}
                />
              ))}
              </div>
              <CartItemsDetails cart={cart} refetchCart={refetchCart} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
