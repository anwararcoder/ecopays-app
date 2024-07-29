"use client"
import ProductCard from '@/Components/Utilities/ProductCard'
import SecTitle from '@/Components/Utilities/SecTitle'
import { getAllProducts } from '@/ReactQuery/FunctionsReactQuery';
import {
    useQuery,
    QueryClient,
} from "@tanstack/react-query";import Link from 'next/link';
 import React, { useState } from 'react'
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

const ProductsSec = ({ categoriesIds, limit, subTitle, title }) => {
    const [queryClient] = useState(() => new QueryClient())
    const { data: products, isLoading, isError } = useQuery({
        queryKey: ["Products", limit],
        queryFn: () => getAllProducts(limit, categoriesIds),
    });

    if (isLoading) {
        return (<section className='pt-[100px] relative'>
            <div className='container px-[15px] mx-auto'>
                <SecTitle subTitle="Our Products" title="Explore our Products" />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]'>
                    <div className=''>
                        <div className='h-[330px] overflow-hidden w-full rounded-3xl'>
                            <Skeleton height={330} />
                        </div>
                        <Skeleton height={25} className='mt-[25px]' />
                        <Skeleton height={20} width={100} className='mb-[12px]' />
                        <div className='flex items-center justify-between'>
                            <Skeleton height={30} width={60} />
                            <Skeleton height={20} width={120} />
                        </div>
                    </div>
                    <div className=''>
                        <div className='h-[330px] overflow-hidden w-full rounded-3xl'>
                            <Skeleton height={330} />
                        </div>
                        <Skeleton height={25} className='mt-[25px]' />
                        <Skeleton height={20} width={100} className='mb-[12px]' />
                        <div className='flex items-center justify-between'>
                            <Skeleton height={30} width={60} />
                            <Skeleton height={20} width={120} />
                        </div>
                    </div>
                    <div className=''>
                        <div className='h-[330px] overflow-hidden w-full rounded-3xl'>
                            <Skeleton height={330} />
                        </div>
                        <Skeleton height={25} className='mt-[25px]' />
                        <Skeleton height={20} width={100} className='mb-[12px]' />
                        <div className='flex items-center justify-between'>
                            <Skeleton height={30} width={60} />
                            <Skeleton height={20} width={120} />
                        </div>
                    </div>
                    <div className=''>
                        <div className='h-[330px] overflow-hidden w-full rounded-3xl'>
                            <Skeleton height={330} />
                        </div>
                        <Skeleton height={25} className='mt-[25px]' />
                        <Skeleton height={20} width={100} className='mb-[12px]' />
                        <div className='flex items-center justify-between'>
                            <Skeleton height={30} width={60} />
                            <Skeleton height={20} width={120} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        )
    }

    if (isError) {
        toast.error("Products Not Here");
    }

    return (
        <section className='pt-[100px] relative'>
            <div className='container px-[15px] mx-auto'>
                <SecTitle subTitle={subTitle} title={title} />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[30px]'>
                    {products?.data.map(product => {
                        return (
                            <ProductCard key={product._id} product={product} />
                        )
                    })}
                </div>
                <div className='mt-[30px] text-center'>
                    <Link className="btn-1 btn-3" href="/products"><span>View All Products</span></Link>
                </div>
            </div>
        </section>
    )
}

export default ProductsSec
