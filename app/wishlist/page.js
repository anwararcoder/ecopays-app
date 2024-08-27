"use client";
import Footer from "@/Components/Footer/Footer";
import Navbar from "@/Components/Navbar/Navbar";
import Wishlist from "@/Components/Wishlist/Wishlist";
import { ContextAuth } from "@/Context/contextAuth";
import React, { useContext } from "react";

const WishlistPage = () => {
  const { isLogged } = useContext(ContextAuth);

  return (
    <>
    <Navbar />
      {isLogged ? (
        <Wishlist />
      ) : (
        <section className="py-[100px]">
          <div className="container mx-auto px-[15px]">
            <h3 className="text-[38px] leading-[1.3] capitalize font-[600] mb-[50px]">
              My Wishlist on Ecopays
            </h3>
            <div className="py-[100px] text-center col-span-1 md:col-span-2 lg:col-span-3">
              <h4 className="text-[28px] leading-[1.3] capitalize font-[600]">
                Please Login First
              </h4>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
};

export default WishlistPage;
