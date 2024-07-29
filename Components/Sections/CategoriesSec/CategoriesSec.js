"use client";
import React, { useRef, useState } from 'react';
import SecTitle from '@/Components/Utilities/SecTitle';
import { useQuery, QueryClient } from "@tanstack/react-query";
import { getAllCategories } from "@/ReactQuery/FunctionsReactQuery";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperNextPrev from '@/Components/Utilities/SwiperNextPrev';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import Image from 'next/image';

const CategoriesSec = () => {
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [queryClient] = useState(() => new QueryClient());
    const { data: categories, isLoading, isError } = useQuery({
        queryKey: ["Categories"],
        queryFn: getAllCategories,
    });

    if (isLoading) {
        return (
            <section className='pt-[100px] relative'>
                <div className='container px-[15px] mx-auto'>
                    <div className='flex flex-wrap items-center justify-between'>
                        <SecTitle subTitle="Categories" title="Browse by Category" />
                    </div>
                    <div className='grid grid-cols-6 gap-[30px]'>
                    <div className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                            <Skeleton height={64} width={64} className='mb-[15px]' />
                            <Skeleton height={16} />
                        </div>
                        <div className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                            <Skeleton height={64} width={64} className='mb-[15px]' />
                            <Skeleton height={16} />
                        </div>
                        <div className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                            <Skeleton height={64} width={64} className='mb-[15px]' />
                            <Skeleton height={16} />
                        </div>
                        <div className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                            <Skeleton height={64} width={64} className='mb-[15px]' />
                            <Skeleton height={16} />
                        </div>
                        <div className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                            <Skeleton height={64} width={64} className='mb-[15px]' />
                            <Skeleton height={16} />
                        </div>
                        <div className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                            <Skeleton height={64} width={64} className='mb-[15px]' />
                            <Skeleton height={16} />
                        </div>
                    </div>
                </div>
            </section>
        )
    }

    if (isError) {
        toast.error("Categories Not Here");
    }

    return (
        <section className='pt-[100px] relative'>
            <div className='container px-[15px] mx-auto'>
                <div className='flex flex-wrap items-center justify-between'>
                    <SecTitle subTitle="Categories" title="Browse by Category" />
                    <SwiperNextPrev prevRef={prevRef} nextRef={nextRef} />
                </div>

                <Swiper
                    breakpoints={{
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 30,
                        }
                    }}
                    modules={[Navigation]}
                    navigation={{
                        prevEl: prevRef.current,
                        nextEl: nextRef.current,
                    }}
                    onInit={(swiper) => {
                        if (swiper.params.navigation) {
                            swiper.params.navigation.prevEl = prevRef.current;
                            swiper.params.navigation.nextEl = nextRef.current;
                            swiper.navigation.init();
                            swiper.navigation.update();
                        }
                    }}
                    className="Categories-Swiper"
                    slidesPerView={2}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                >
                    {categories?.data.map(item => {
                        return (
                            <SwiperSlide key={item._id}>
                                <Link href={`/products?category[in][]=${item._id}`} className='group block border-[1px] border-[#DDD]/50 hover:border-[##98C1D9] hover:text-[##98C1D9] bg-white p-[30px] text-center shadow-md'>
                                    <Image width={500} height={500} className='w-[64px] h-[64px] object-cover mx-auto mb-[15px]' src={item.image} alt={item.name} />
                                    <h4 className='text-[16px] leading-[1] font-[500] group-hover:text-[##98C1D9]'>{item.name}</h4>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
}

export default CategoriesSec;
