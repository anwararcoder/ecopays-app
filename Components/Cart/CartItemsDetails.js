import useClearCartMutation from "@/Hooks/useClearCartMutation";
import { applyCouponToCart } from "@/ReactQuery/FunctionsReactQuery";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CartItemsDetails = ({ cart, refetchCart }) => {
  const queryClient = new QueryClient();

  const router = useRouter();
  const [isOpenCoupon, setIsOpenCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");

  const useApplyCouponToCartMutation = (refetchCart) => {
    return useMutation({
      mutationFn: applyCouponToCart,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["Cart"] });
        if (refetchCart) {
          refetchCart();
        }
        toast.success("Product Is Added");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };
  const clearCartMutation = useClearCartMutation(refetchCart);
  const applyCouponToCartMutation = useApplyCouponToCartMutation(refetchCart);

  const clearCartMutationHandel = async () => {
    try {
      toast("Clear Your Cart");
      await clearCartMutation.mutateAsync();
      refetchCart();
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handelCoupon = async (e) => {
    e.preventDefault();
    toast("Discount Is Being Applied");
    await applyCouponToCartMutation.mutateAsync({ couponName: coupon });
  };

  const handelCheckout = () => {
    router.push("/checkout");
  };
  return (
    <div className="sticky top-[120px] mt-[60px]">
      <div className="border border-[#DDD] rounded-[8px] px-[25px] py-[30px]">
        <h3 className="text-[20px] leading-[1.3] capitalize font-[600] mb-[15px]">
          Order Summary
        </h3>
        <div className="flex flex-col gap-[25px]">
          <div className="flex justify-between items-center">
            <span className="text-[16px] leading-[1.3] capitalize font-[400]">
              Subtotal
            </span>
            <span className="text-[16px] leading-[1.3] capitalize font-[600]">
              {cart?.data?.totalCartPrice} EG
            </span>
          </div>
          {cart?.data?.totalAfterDiscount ? (
            <div className="flex justify-between items-center">
              <span className="text-[16px] leading-[1.3] capitalize font-[400]">
                Discount
              </span>
              <span className="text-[16px] leading-[1.3] capitalize font-[600]">
                -{cart?.data?.totalCartPrice - cart?.data?.totalAfterDiscount}
                EG
              </span>
            </div>
          ) : null}
          <div className="flex justify-between items-center">
            <span className="text-[16px] leading-[1.3] capitalize font-[400]">
              Shipping fee
            </span>
            <span className="text-[16px] leading-[1.3] capitalize font-[600]">
              0.00 EG
            </span>
          </div>
          <div className="h-[1px] w-full bg-[#DDD]"></div>
          <div className="flex justify-between items-center">
            <span className="text-[18px] leading-[1.3] capitalize font-[600]">
              Total
            </span>
            <span className="text-[18px] leading-[1.3] capitalize font-[600]">
              {cart?.data?.totalAfterDiscount
                ? cart?.data?.totalAfterDiscount
                : cart?.data?.totalCartPrice}
              EG
            </span>
          </div>
          <button
            onClick={handelCheckout}
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-[16px] py-[15px] px-[30px] disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#98C1D9] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
          >
            <svg
              className="w-[20px] h-[20px] mb-0.5 fill-[#FFF]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <switch>
                  <g>
                    <path d="M512 171c-1-40.1-16.6-78-43.9-106.7-27.6-29-64.3-45.7-103.3-46.9C323.9 16 285 31.6 256 59.9c-28.1-27.3-65.4-42.8-104.6-42.7-39.5.2-76.8 16.1-105.3 44.9C16.5 92.1-.3 133.7 0 176.3c.3 41.5 16 80.5 44.3 110L238 487.1c4.9 5.1 11.4 7.6 18 7.6 6.2 0 12.5-2.3 17.4-7 9.9-9.6 10.2-25.4.6-35.4L80.3 251.7C61 231.5 50.2 204.6 50 175.9c-.2-29.4 11.3-58 31.6-78.6 19-19.3 43.9-30 70-30.1h.4c33 0 64.1 17 83.2 45.4 4.6 6.9 12.4 11 20.7 11s16.1-4.1 20.7-11c19.9-29.5 52.2-46.5 86.4-45.4 25.8.8 50.2 12 68.7 31.4 18.8 19.7 29.5 45.8 30.1 73.4.7 29.5-9.7 57.3-29.2 78.4 0 .1-.1.1-.1.2l-126 130.9c-9.6 9.9-9.3 25.8.7 35.3 9.9 9.6 25.8 9.3 35.3-.7l126.4-131.4.8-.8C498 253.5 513 213.4 512 171z"></path>
                  </g>
                </switch>
              </g>
            </svg>
            <span>Proceed to Checkout</span>
          </button>
          <button
            onClick={clearCartMutationHandel}
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-[16px] py-[15px] px-[30px] disabled:bg-opacity-90 bg-[#EE6C4D] hover:bg-[#3D5A80] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 gap-[10px]"
          >
            Clear All Items
          </button>
          <div>
            <button
              onClick={() => setIsOpenCoupon(!isOpenCoupon)}
              className="underline cursor-pointer inline-block text-sm font-medium text-[#3D5A80] capitalize"
            >
              Have a coupon?
            </button>
            {isOpenCoupon && (
              <form onSubmit={handelCoupon} className="relative mt-[12px]">
                <input
                  value={coupon}
                  onChange={(event) => setCoupon(event.target.value)}
                  type="text"
                  placeholder="Enter Coupon"
                  className="w-full h-[50px] leading-[50px] border-[1px] border-[#DDD] px-[15px] bg-[#F5F5F5] rounded-[3px]"
                />
                <button className="absolute top-[50%] translate-y-[-50%] right-[5px] h-[40px] bg-[#98C1D9] hover:bg-[#3D5A80] px-[12px] text-white font-[500]">
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItemsDetails;
