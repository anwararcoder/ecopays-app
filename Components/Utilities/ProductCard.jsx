"use client";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { ContextAuth } from "@/Context/contextAuth";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import {
  addToCart,
  addToWishlist,
  getCart,
  getCategoryById,
  getWishlist,
  removeFromWishlist,
} from "@/ReactQuery/FunctionsReactQuery";
import useAddToCartMutation from "@/Hooks/useAddToCartMutation";
import useAddToWishlistMutation from "@/Hooks/useAddToWishlistMutation";
import useRemoveFromWishlistMutation from "@/Hooks/useRemoveFromWishlistMutation";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const { isLogged } = useContext(ContextAuth);
  const { data: category } = useQuery({
    queryKey: ["Category", product.category],
    queryFn: () => getCategoryById(product.category),
  });
  const { data: wishlist, refetch } = useQuery({
    queryKey: ["Wishlist"],
    queryFn: getWishlist,
  });
  const { data: cart, refetch: refetchCart } = useQuery({
    queryKey: ["Cart"],
    queryFn: getCart,
  });
  const isInWishlist = wishlist?.data.some((item) => item._id === product._id);
  const addToWishlistMutation = useAddToWishlistMutation(refetch);
  const removeFromWishlistMutation = useRemoveFromWishlistMutation(refetch);
  const addToCartMutation = useAddToCartMutation(product, refetchCart);

  const wishlistHandelClick = async (productId) => {
    if (!isLogged) {
      toast.error("You are not logged in. Please login to get access");
      return;
    }
    if (isInWishlist) {
      toast("Removing From Wishlist");
      await removeFromWishlistMutation.mutateAsync(productId);
    } else {
      toast("Adding To Wishlist");
      await addToWishlistMutation.mutateAsync({ productId });
    }
  };
  const cartHandelClick = async (productId) => {
    if (!isLogged) {
      toast.error("You are not logged in. Please login to get access");
      return;
    }
    await addToCartMutation.mutateAsync({ productId });
  };

  return (
    <div className="relative flex flex-col bg-transparent">
      <Link
        className="absolute inset-0"
        href={`/products/${product._id}`}
      ></Link>
      <div className="relative flex-shrink-0 bg-white rounded-3xl overflow-hidden z-1 group">
        <Link className="block" href={`/products/${product._id}`}>
          <div className="flex aspect-w-11 aspect-h-12 w-full">
            <Image
            width={500}
            height={500}
              className="w-full object-cover"
              src={product.imageCover}
              alt={product.title}
            />
          </div>
        </Link>
        {product.quantity <= 0 ? (
          <div className="rounded-full flex items-center justify-center absolute top-3 start-3 px-2.5 py-1.5 text-xs bg-white text-[#3D5A80]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="w-3.5 h-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
              ></path>
            </svg>
            <span className="ms-1 leading-none">Sold Out</span>
          </div>
        ) : null}

        <button
          onClick={() => wishlistHandelClick(product._id)}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#3D5A80] absolute top-3 end-3 z-10"
        >
          <svg
            className={`w-5 h-5 hover:fill-[#e74c3c] hover:text-[#e74c3c] ${
              isInWishlist ? "fill-[#e74c3c]" : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </svg>
        </button>

        {product.quantity >= 1 ? (
          <div className="absolute bottom-0 group-hover:bottom-4 inset-x-1 flex justify-center opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
            <button
              onClick={() => cartHandelClick(product._id)}
              className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-xs py-2 px-4 disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#3D5A80] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 "
            >
              <svg className="w-3.5 h-3.5 mb-0.5 fill-[#FFF]" viewBox="0 0 9 9">
                <path d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"></path>
                <path d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"></path>
              </svg>
              <span className="ms-1">Add to Cart</span>
            </button>
          </div>
        ) : null}
      </div>
      <div className="space-y-4 px-2.5 pt-5 pb-2.5">
        <div>
          <h2 className="text-base font-semibold transition-colors">
            {product.title}
          </h2>
          <p className="text-sm text-white0 mt-1 ">{category?.data.name}</p>
        </div>
        <div className="flex justify-between items-end ">
          <div className="">
            <div className="flex items-center border-2 border-[#98C1D9] rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
              <span className="text-[#98C1D9] !leading-none">
                ${product.price}
              </span>
            </div>
          </div>
          {product.ratingsQuantity > 0 && (
            <div className="flex items-center mb-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-5 h-5 pb-[1px] fill-[#98C1D9]"
              >
                <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"></path>
              </svg>
              <span className="text-sm ms-1 text-white0">
                {product.ratingsQuantity}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
