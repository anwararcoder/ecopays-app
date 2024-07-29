import { clearCart, removeFromCart, removeFromWishlist } from '@/ReactQuery/FunctionsReactQuery';
import toast from 'react-hot-toast';
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from 'react';

const useClearCartMutation = (refetchCart) => {
    const [queryClient] = useState(() => new QueryClient());
    return useMutation({
      mutationFn: clearCart,
      onSuccess: () => {
        queryClient.prefetchQuery({ queryKey: ["Cart"] });
        refetchCart();
        toast.success("All Product Removed Successfully From Your Cart");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };

export default useClearCartMutation
 