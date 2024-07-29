import { removeFromCart, removeFromWishlist } from '@/ReactQuery/FunctionsReactQuery';
import toast from 'react-hot-toast';
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from 'react';

const useRemoveFromCartMutation = (refetch) => {
    const [queryClient] = useState(() => new QueryClient());
    return useMutation({
      mutationFn: removeFromCart,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["Cart"] });
        refetch();
        toast.success("Product Removed successfully to your Cart");
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };

export default useRemoveFromCartMutation
 