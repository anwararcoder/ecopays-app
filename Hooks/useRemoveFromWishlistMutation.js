import { removeFromWishlist } from '@/ReactQuery/FunctionsReactQuery';
import toast from 'react-hot-toast';
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useState } from 'react';

const useRemoveFromWishlistMutation = (refetch) => {
    const [queryClient] = useState(() => new QueryClient());
    return useMutation({
      mutationFn: removeFromWishlist,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["Wishlist"] });
        refetch();
        toast.success(response.message);
      },
      onError: (error) => {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
      },
    });
  };

export default useRemoveFromWishlistMutation
