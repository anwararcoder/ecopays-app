import React, { useState } from 'react'
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import toast from 'react-hot-toast';
import { addWriteReview } from '@/ReactQuery/FunctionsReactQuery';

const useWriteReview = () => {
    const [queryClient] = useState(() => new QueryClient());

    return useMutation({
        mutationFn: addWriteReview,
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: ["Review"] });
            toast.success("Your Review Has Been Added");
        },
        onError: (error) => {
            if (error.response?.data?.errors) {
                error.response.data.errors.forEach(err => {
                    toast.error(err.msg || "An error occurred");
                });
            } else {
                const errorMessage = error.response?.data?.message || error.message;
                toast.error(errorMessage);
            }
        },
    });
}

export default useWriteReview
