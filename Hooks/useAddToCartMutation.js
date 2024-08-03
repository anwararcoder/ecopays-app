import React, { useState } from 'react'
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { addToCart } from '@/ReactQuery/FunctionsReactQuery';
import Link from 'next/link';
import Image from 'next/image';

const useAddToCartMutation = (product, refetchCart) => {
  const [queryClient] = useState(() => new QueryClient());
  return useMutation({
    mutationFn: addToCart,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["Cart"] });
      if (refetchCart) {
        refetchCart()
      }
      if (product) {
        toast.custom(
          (t) => (
            <div
              className={`${t.visible ? "animate-enter" : "animate-leave"
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="p-4 max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-2xl pointer-events-auto ring-1 ring-black/5 dark:ring-white/10 text-slate-900 dark:text-slate-200 opacity-100 translate-x-0">
                <p className="flex items-center justify-between text-base font-semibold leading-none">
                  Added to cart!
                  <span
                    onClick={() => toast.dismiss(t.id)}
                    className="block cursor-pointer"
                  >
                    ✘
                  </span>
                </p>
                <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>
                <div className="flex ">
                  <div className="h-24 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    <Image loading='lazy' src={product?.imageCover} alt={product?.title} />
                  </div>
                  <div className="ms-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between ">
                        <div>
                          <h3 className="text-base font-medium ">
                            {product?.title}
                          </h3>
                        </div>
                        <div className="mt-0.5">
                          <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                            <span className="text-green-500 !leading-none">
                              ${product?.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <p className="text-gray-500 dark:text-slate-400">Qty 1</p>
                      <div className="flex">
                        <Link
                          href="/cart"
                          className="font-medium text-primary-6000 dark:text-primary-500 "
                        >
                          View cart
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ), { position: "top-right" });
      } else{
        toast.success("Product Is Added");
      }

    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    },
  });
};

export default useAddToCartMutation
