import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

const ProductDetailsImages = ({ productTitle, imageCover, images }) => {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [activeImage, setActiveImage] = useState(imageCover);

    const allImages = Array.isArray(images) ? [imageCover, ...images] : [imageCover];

    const pagination = {
        el: ".ProductDetailsImagesPagination",
        clickable: true,
        renderBullet: function (index, className) {
            const imageUrl = allImages[index];
            return `
                <div class='${className}'>
                    <img src="${imageUrl}" alt="${productTitle}" />
                </div>
            `;
        },
    };
    return (
        <>
            <div className='relative'>
                <i onClick={() => setIsOpenPopup(!isOpenPopup)} className='group absolute z-10 top-[30px] left-[30px] text-[#3D5A80] bg-white hover:bg-[#98C1D9] w-[50px] h-[50px] rounded-full flex items-center justify-center cursor-pointer'>
                    <svg className='group-hover:fill-white w-[20px] h-[20px] inline-flex' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="M5.009 5.008A16.991 16.991 0 0 0 0 17.1v79.945a12.525 12.525 0 1 0 25.049 0V42.761l112.7 112.7a12.525 12.525 0 0 0 17.713-17.712l-112.7-112.7h54.284a12.525 12.525 0 0 0 0-25.049H17.1A16.98 16.98 0 0 0 5.009 5.008zM506.992 506.991A16.991 16.991 0 0 1 494.9 512h-79.945a12.525 12.525 0 1 1 0-25.049h54.284l-112.7-112.7a12.525 12.525 0 1 1 17.712-17.713l112.7 112.7v-54.284a12.525 12.525 0 0 1 25.049 0V494.9a16.98 16.98 0 0 1-5.008 12.091zM5.008 506.991A16.991 16.991 0 0 0 17.1 512h79.945a12.525 12.525 0 1 0 0-25.049H42.761l112.7-112.7a12.525 12.525 0 1 0-17.712-17.713l-112.7 112.7v-54.284a12.525 12.525 0 0 0-25.049 0V494.9a16.98 16.98 0 0 0 5.008 12.091zM506.991 5.008A16.991 16.991 0 0 1 512 17.1v79.945a12.525 12.525 0 1 1-25.049 0V42.761l-112.7 112.7a12.525 12.525 0 1 1-17.713-17.712l112.7-112.7h-54.284a12.525 12.525 0 0 1 0-25.049H494.9a16.98 16.98 0 0 1 12.091 5.008z"></path></g></svg>
                </i>
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    pagination={pagination}
                    modules={[Pagination]}
                    className="ProductDetailsImagesSwiper"
                    onSlideChange={(swiper) => {
                        const activeIndex = swiper.realIndex;
                        if (activeIndex === 0 && imageCover) {
                            setActiveImage(imageCover)
                        } else if (images && images.length > 0) {
                            setActiveImage(images[activeIndex - 1])
                        }
                    }}
                >
                    {imageCover && (
                        <SwiperSlide key="imageCover">
                            <div>
                                <Image width={500} height={500} className='w-full h-full aspect-square bg-cover bg-center rounded-2xl' src={imageCover} alt={productTitle} />
                            </div>
                        </SwiperSlide>
                    )}

                    {images && images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div>
                                <Image width={500} height={500} className='w-full h-full aspect-square bg-cover bg-center rounded-2xl' src={image} alt={productTitle} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='ProductDetailsImagesPagination'></div>
            </div>
            {isOpenPopup && (
                <div className='fixed inset-0 bg-black/75 z-[9999] flex items-center justify-center' onClick={() => setIsOpenPopup(false)}>
                    <div className='max-w-[800px] mx-auto relative px-[15px] w-full' onClick={(e) => e.stopPropagation()}>
                        <div className="flex flex-wrap items-center justify-between mb-[60px] gap-[30px]">
                            <div className="hidden md:block"></div>
                            <h1 className="font-[500] text-[16px] sm:text-[24px] leading-[28px] text-white">{productTitle}</h1>
                            <div onClick={() => setIsOpenPopup(false)}>
                                <svg className="fill-[#FFF] hover:fill-[#98C1D9] cursor-pointer" width="16" height="16" viewBox="0 0 16 16">
                                    <path d="M15.2806 14.2193C15.3502 14.289 15.4055 14.3717 15.4432 14.4628C15.4809 14.5538 15.5003 14.6514 15.5003 14.7499C15.5003 14.8485 15.4809 14.9461 15.4432 15.0371C15.4055 15.1281 15.3502 15.2109 15.2806 15.2806C15.2109 15.3502 15.1281 15.4055 15.0371 15.4432C14.9461 15.4809 14.8485 15.5003 14.7499 15.5003C14.6514 15.5003 14.5538 15.4809 14.4628 15.4432C14.3717 15.4055 14.289 15.3502 14.2193 15.2806L7.99993 9.06024L1.78055 15.2806C1.63982 15.4213 1.44895 15.5003 1.24993 15.5003C1.05091 15.5003 0.860034 15.4213 0.719304 15.2806C0.578573 15.1398 0.499512 14.949 0.499512 14.7499C0.499512 14.5509 0.578573 14.36 0.719304 14.2193L6.93962 7.99993L0.719304 1.78055C0.578573 1.63982 0.499512 1.44895 0.499512 1.24993C0.499512 1.05091 0.578573 0.860034 0.719304 0.719304C0.860034 0.578573 1.05091 0.499512 1.24993 0.499512C1.44895 0.499512 1.63982 0.578573 1.78055 0.719304L7.99993 6.93962L14.2193 0.719304C14.36 0.578573 14.5509 0.499512 14.7499 0.499512C14.949 0.499512 15.1398 0.578573 15.2806 0.719304C15.4213 0.860034 15.5003 1.05091 15.5003 1.24993C15.5003 1.44895 15.4213 1.63982 15.2806 1.78055L9.06024 7.99993L15.2806 14.2193Z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <Image width={500} height={500} className='w-full h-full aspect-square bg-cover bg-center rounded-2xl' src={activeImage} alt={productTitle} />
                        </div>
                    </div>
                </div>
            )}


        </>
    );
}

export default ProductDetailsImages;
