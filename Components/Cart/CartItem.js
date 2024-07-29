import Link from "next/link";
import React, { useState } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import {
  getWishlist,
  updateCartProductQuantity,
} from "@/ReactQuery/FunctionsReactQuery";
import useAddToWishlistMutation from "@/Hooks/useAddToWishlistMutation";
import useRemoveFromCartMutation from "@/Hooks/useRemoveFromCartMutation";
import toast from "react-hot-toast";
import Image from "next/image";

const CartItem = ({ products, setProducts, item, refetchCart }) => {
  const queryClient = new QueryClient();

  const { data: wishlist, refetch: refetchWishlist } = useQuery({
    queryKey: ["Wishlist"],
    queryFn: getWishlist,
  });
  const isInWishlist = (productId) => {
    return wishlist?.data.some((item) => item._id === productId) ? true : false;
  };
  const incrementCount = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, count: product.count + 1 } : product
      )
    );
  };
  const decrementCount = (id) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, count: Math.max(1, product.count - 1) }
          : product
      )
    );
  };
  const handleIncrement = (item) => {
    const newCount = item.count + 1;
    incrementCount(item.id);
    handleUpdateQuantity(item._id, newCount);
  };
  const handleDecrement = (item) => {
    const newCount = Math.max(1, item.count - 1);
    decrementCount(item.id);
    handleUpdateQuantity(item._id, newCount);
  };
  const addToWishlistMutation = useAddToWishlistMutation(refetchWishlist);
  const useUpdateCartProductQuantityMutation = () => {
    return useMutation({
      mutationFn: ({ cartId, count }) =>
        updateCartProductQuantity(cartId, count),
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["Cart"] });
        refetchCart();
        toast.success("Quantity updated successfully!");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };
  const { mutateAsync } = useUpdateCartProductQuantityMutation();
  const removeFromCartMutation = useRemoveFromCartMutation(refetchCart);
  const handleUpdateQuantity = async (cartId, count) => {
    try {
      await mutateAsync({ cartId, count });
    } catch (error) {
      console.error("Failed to update quantity", error);
    }
  };

  const wishlistHandel = async (productId) => {
    await addToWishlistMutation.mutateAsync({ productId });
  };
  const removeHandelCartItem = async (productId) => {
    toast("Removing From Wishlist");
    await removeFromCartMutation.mutateAsync(productId);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-[20px] border-[#DDD] border-[1px] rounded-[8px] p-[25px]">
      <Link className="block" href={`/products/${item.product._id}`}>
        {/* <img
          className="w-[100px] h-[100px] object-cover rounded-[8px]"
          src="https://cdn-icons-png.flaticon.com/512/10446/10446694.png"
          alt={item.product.title}
        /> */}
        <Image
          src="https://cdn-icons-png.flaticon.com/512/10446/10446694.png"
          alt={item.product.title}
          width={100}
          height={100}
          className="object-cover rounded-[8px]"
        />
      </Link>
      <div className="min-w-[200px] w-full max-w-[300px] text-center">
        <Link className="block" href={`/products/${item.product._id}`}>
          <h2 className="text-xl font-semibold transition-colors">
            {item.product.title}
          </h2>
        </Link>
      </div>
      <div>
        <div className="flex items-center border-2 border-[#98C1D9] rounded-lg py-[10px] px-[20px] text-xl font-[500]">
          <span className="text-[#98C1D9] !leading-none">${item.price}</span>
        </div>
      </div>
      <div className="flex items-center gap-[10px]">
        <button
          onClick={() => handleDecrement(item)}
          className="relative inline-flex items-center justify-center rounded-full transition-colors text-[26px] font-bold w-[50px] h-[50px] disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#98C1D9] text-white hover:text-white focus:text-white shadow-lg focus:outline-none"
        >
          <span className=" leading-[0.1]">‒</span>
        </button>
        <input
          className="w-[50px] bg-transparent border-none text-center font-bold text-[18px] text-[#9B9B9B]"
          type="text"
          min="1"
          value={item.count}
          readOnly
        />
        <button
          onClick={() => handleIncrement(item)}
          className="relative inline-flex items-center justify-center rounded-full transition-colors text-[18px] font-bold w-[50px] h-[50px] disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#98C1D9] text-white shadow-lg focus:outline-none"
        >
          <span className=" leading-[1]">✚</span>
        </button>
      </div>
      <div className="inline-flex items-center gap-[10px]">
        {!isInWishlist(item.product._id) && (
          <button
            onClick={() => wishlistHandel(item.product._id)}
            className="relative h-[50px] w-[50px] inline-flex items-center justify-center rounded-full transition-colors text-[16px]  disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#98C1D9] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <svg
              className="w-[20px] h-[20px] mb-0.5 fill-[#FFF]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M512 171c-1-40.1-16.6-78-43.9-106.7-27.6-29-64.3-45.7-103.3-46.9C323.9 16 285 31.6 256 59.9c-28.1-27.3-65.4-42.8-104.6-42.7-39.5.2-76.8 16.1-105.3 44.9C16.5 92.1-.3 133.7 0 176.3c.3 41.5 16 80.5 44.3 110L238 487.1c4.9 5.1 11.4 7.6 18 7.6 6.2 0 12.5-2.3 17.4-7 9.9-9.6 10.2-25.4.6-35.4L80.3 251.7C61 231.5 50.2 204.6 50 175.9c-.2-29.4 11.3-58 31.6-78.6 19-19.3 43.9-30 70-30.1h.4c33 0 64.1 17 83.2 45.4 4.6 6.9 12.4 11 20.7 11s16.1-4.1 20.7-11c19.9-29.5 52.2-46.5 86.4-45.4 25.8.8 50.2 12 68.7 31.4 18.8 19.7 29.5 45.8 30.1 73.4.7 29.5-11.5 57.7-33.3 79.1l-158.6 162.7c-12.1 12.2-12 30.8.2 42.8 12.2 12.1 30.8 12 42.8-.2l158.6-162.7c23.8-24.2 36.5-56.7 36.1-90.5z"></path>
            </svg>
          </button>
        )}

        <button
          onClick={() => removeHandelCartItem(item._id)}
          className="relative h-[50px] w-[50px] inline-flex items-center justify-center rounded-full transition-colors text-[16px] disabled:bg-opacity-90 bg-[#EF233C] hover:bg-[#D90429] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <svg
            className="w-[17.5px] h-[17.5px] mb-0.5 fill-[#FFF]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 329.269 329"
          >
            <g>
              <path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
