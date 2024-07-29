"use client"
import React, { useContext, useState } from 'react'
import Breadcrumb from '../Utilities/Breadcrumb'
import { getCart, getCategoryById, getProductById, getSubCategoryById, getWishlist } from '@/ReactQuery/FunctionsReactQuery';
import { useParams } from 'next/navigation';
import { useQueries, useQuery } from '@tanstack/react-query';
import ProductDetailsImages from './ProductDetailsImages';
import Rating from 'react-rating';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { ContextAuth } from '@/Context/contextAuth';
import toast from 'react-hot-toast';
import useAddToCartMutation from '@/Hooks/useAddToCartMutation';
import useAddToWishlistMutation from '@/Hooks/useAddToWishlistMutation';
import useRemoveFromWishlistMutation from '@/Hooks/useRemoveFromWishlistMutation';
import ProductDetailsBox from './ProductDetailsBox';
import ProductDetailsTab from './ProductDetailsTab';
import Skeleton from 'react-loading-skeleton';


const ProductDetails = () => {
    const { isLogged, dataUser } = useContext(ContextAuth);
    const params = useParams();
    const productId = params._id;
    const [activeIndexColor, setActiveIndexColor] = useState(null);
    const [colorItem, setColorItem] = useState("");
    const [productCount, setProductCount] = useState(1);

    const { data: product, refetch, isLoading: isLoadingProduct } = useQuery({
        queryKey: ["Product", productId],
        queryFn: () => getProductById(productId),
    });

    const { data: category } = useQuery({
        queryKey: ["Category", product?.data.category],
        queryFn: () => getCategoryById(product?.data.category),
    });
    const { data: subCategory } = useQuery({
        queryKey: ["SubCategory", product?.data.subcategory[0]],
        queryFn: () => getSubCategoryById(product?.data.subcategory[0]),
    });
    const { data: wishlist, refetch: refetchWishlist } = useQuery({
        queryKey: ["Wishlist"],
        queryFn: getWishlist,
    });
    const { data: cart, refetch: refetchCart } = useQuery({
        queryKey: ["Cart"],
        queryFn: getCart,
    });

    const isInWishlist = wishlist?.data.some((item) => item._id === product?.data._id);
    const addToWishlistMutation = useAddToWishlistMutation(refetchWishlist);
    const removeFromWishlistMutation = useRemoveFromWishlistMutation(refetchWishlist);
    const addToCartMutation = useAddToCartMutation(product?.data, refetchCart);
    const cartHandelClick = async (productId, color) => {
        if (!isLogged) {
            toast.error("You are not logged in. Please login to get access");
            return;
        }
        await addToCartMutation.mutateAsync({ productId, color });
    };
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
    if (isLoadingProduct) {
        return <div className='py-[100px]'>
            <div className=" container mx-auto px-[15px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[50px]">
                    <div className='flex items-center'>
                        <div className='w-full'>
                            <Skeleton className='rounded-2xl' height={600} />
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='w-full'>
                            <Skeleton width={180} height={25} />
                            <Skeleton className='' height={36} />
                            <Skeleton className='' height={27} />
                            <Skeleton width={180} height={28} />
                            <Skeleton width={180} height={25} />
                            <Skeleton className='' height={36} />
                            <Skeleton className='' height={27} />
                            <Skeleton width={180} height={28} />
                            <Skeleton width={180} height={25} />
                            <Skeleton className='' height={36} />
                            <Skeleton className='' height={27} />
                            <Skeleton width={180} height={28} />
                        </div>

                    </div>
                </div>
            </div>

        </div>
    }
    return (
        <>
            <Breadcrumb pageTitle={product?.data.title} />
            <section className='pb-[100px]'>
                <div className=' container mx-auto px-[15px]'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-[50px]'>
                        <div className='flex items-center'>
                            <div className='w-full'>
                                <ProductDetailsImages productTitle={product?.data.title} imageCover={product?.data.imageCover} images={product?.data.images} />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='w-full'>
                                <ProductDetailsBox cartHandelClick={cartHandelClick} wishlistHandelClick={wishlistHandelClick} colorItem={colorItem} setColorItem={setColorItem} product={product} category={category} subCategory={subCategory} isInWishlist={isInWishlist} activeIndexColor={activeIndexColor} setActiveIndexColor={setActiveIndexColor} />
                            </div>
                        </div>
                    </div>
                    <div className='mt-[50px]'>
                        <ProductDetailsTab productRefetch={refetch} product={product} isLogged={isLogged} userId={dataUser?.data?._id ? dataUser?.data?._id : null} />
                    </div>
                </div>
            </section></>
    )
}

export default ProductDetails
