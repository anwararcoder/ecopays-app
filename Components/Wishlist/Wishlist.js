"use client"
import React, { useContext, useState } from 'react'
import Breadcrumb from '../Utilities/Breadcrumb'
import { getCart, getWishlist } from '@/ReactQuery/FunctionsReactQuery';
import { QueryClient, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import useRemoveFromWishlistMutation from '@/Hooks/useRemoveFromWishlistMutation';
import toast from 'react-hot-toast';
import useAddToCartMutation from '@/Hooks/useAddToCartMutation';
import Skeleton from 'react-loading-skeleton';
import Image from 'next/image';
import { ContextAuth } from '@/Context/contextAuth';

const Wishlist = () => {
    const [queryClient] = useState(() => new QueryClient());
    const { isLogged } = useContext(ContextAuth);
    const { data: wishlist, isLoading: isLoadingWishlist, refetch: refetchWishlist } = useQuery({
        queryKey: ["Wishlist"],
        queryFn: getWishlist,
        enabled: isLogged,
    });
    const removeFromWishlistMutation = useRemoveFromWishlistMutation(refetchWishlist);
    const wishlistHandelClick = async (productId) => {
        toast("Removing From Wishlist");
        await removeFromWishlistMutation.mutateAsync(productId);
    };
    const { data: cart, refetch: refetchCart } = useQuery({
        queryKey: ["Cart"],
        queryFn: getCart,
        enabled: isLogged,
    });
    const addToCartMutation = useAddToCartMutation(false, refetchCart);
    const cartHandelClick = async (productId) => {
        toast("Adding To Cart");
        await addToCartMutation.mutateAsync({ productId });
    };
    if (isLoadingWishlist) {
        return <>
            <Breadcrumb pageTitle="Wishlist" />
            <section className='pb-[100px]'>
                <div className='container mx-auto px-[15px]'>
                    <h3 className="text-[38px] leading-[1.3] capitalize font-[600] mb-[50px]">My Wishlist on Ecopays</h3>
                    <div className='flex flex-col gap-[30px]'>
                        <div className='flex flex-wrap items-center justify-between gap-[20px] border-[#DDD] border-[1px] rounded-[8px] p-[25px]'>
                            <div className='block'>
                                <Image height={100} width={100} className='w-[100px] h-[100px] object-cover rounded-[8px]' src="https://cdn-icons-png.flaticon.com/512/10446/10446694.png" alt="product" />
                            </div>
                            <div className='min-w-[350px] text-center'>
                                <Skeleton height={28} width={300} />
                            </div>
                            <div>
                                <Skeleton height={44} width={80} className='rounded-[8px]' />
                                <div>
                                    <Skeleton height={28} width={70} />
                                </div>
                                <div className='inline-flex items-center gap-[10px]'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    }

    return (
        <>
            <Breadcrumb pageTitle="Wishlist" />
            <section className='pb-[100px]'>
                <div className='container mx-auto px-[15px]'>
                    <h3 className="text-[38px] leading-[1.3] capitalize font-[600] mb-[50px]">My Wishlist on Ecopays</h3>
                    <div className='flex flex-col gap-[30px]'>
                        {
                            wishlist?.data.length >= 1 ? <>
                            {wishlist?.data.map(item => {
                            return <div key={item._id} className='flex flex-wrap items-center justify-between gap-[20px] border-[#DDD] border-[1px] rounded-[8px] p-[25px]'>
                                <Link href={`/products/${item._id}`} className='block'>
                                    <Image height={100} width={100} className='w-[100px] h-[100px] object-cover rounded-[8px]' src="https://cdn-icons-png.flaticon.com/512/10446/10446694.png" alt={item.title} />
                                </Link>
                                <div className='min-w-[350px] text-center'>
                                    <Link href={`/products/${item._id}`} className='block'>
                                        <h2 className="text-xl font-semibold transition-colors">{item.title}</h2>
                                    </Link>
                                </div>
                                <div>
                                    <div className="flex items-center border-2 border-[#98C1D9] rounded-lg py-[10px] px-[20px] text-xl font-[500]"><span className="text-[#98C1D9] !leading-none">${item.price}</span></div>                        </div>
                                <div>
                                    <p className='inline-block text-[#98C1D9] font-[500] text-lg'>{item.quantity <= 0 ? "Out Of Stock" : "In Stock"}</p>
                                </div>
                                <div className='inline-flex items-center gap-[10px]'>
                                    <button onClick={() => cartHandelClick(item._id)} className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-[16px] py-[15px] px-[30px] disabled:bg-opacity-90 bg-[#3D5A80] hover:bg-[#98C1D9] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 gap-[10px]">
                                        <svg className="w-[20px] h-[20px] mb-0.5 fill-[#FFF]" viewBox="0 0 9 9"><path d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z"></path><path d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z"></path></svg>

                                        <span className="ms-1">Add to Cart</span>
                                    </button>
                                    <button onClick={() => wishlistHandelClick(item._id)} className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-[16px] py-[15px] px-[30px] disabled:bg-opacity-90 bg-[#EE6C4D] hover:bg-[#3D5A80] text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 gap-[10px]">
                                        <svg className="w-[20px] h-[20px] mb-0.5 fill-[#FFF]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 329.269 329"><g><path d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"></path></g></svg>
                                    </button>
                                </div>
                            </div>
                        })}
                            </> : <div className='py-[100px] text-center col-span-1 md:col-span-2 lg:col-span-3'>
                                    <h4 className="text-[28px] leading-[1.3] capitalize font-[600]">No Product Found On Wishlist</h4>
                                </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Wishlist
